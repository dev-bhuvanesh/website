<#
.SYNOPSIS
  One-command, re-runnable setup and repair for a self-hosted GitHub Actions
  runner on Windows (repository dev-bhuvanesh/office). Works for any number of
  machines; each one gets its own runner name.

.DESCRIPTION
  Checks the machine and fixes, in order, every problem we hit while bringing
  up our Windows runners (see docs/ci/WINDOWS_RUNNER.md):

    1. DNS / network     router DNS could not resolve *.actions.githubusercontent.com;
                          objects.githubusercontent.com unreachable (bad ISP DNS answer,
                          broken IPv6); system proxy passed on as HTTPS_PROXY
    2. Smart App Control  blocked unsigned Python modules (WinError 4551)
    3. Long paths         deep vcpkg/ICU build paths
    4. Build tools        Visual Studio C++ (MSVC, Windows SDK, CMake, Ninja), Git, gh
    5. Python             winget machine install failed (1603) because a per-user
                          install existed; runner window had a stale PATH
    6. Antivirus          Defender exclusions when Defender is active; manual
                          instructions when another antivirus (e.g. McAfee) is active
    7. Sleep              PC sleeping while a job runs
    8. Runner files       download + SHA-256 check against the official release notes
    9. Runner service     starts at boot (delayed auto start), restarts on failure,
                          runs as NETWORK SERVICE (no password needed; it gets
                          read-only access to your Python and modify access to
                          the runner folder), or as your account with -RunAs User,
                          replaces an interactive run.cmd window
   10. Job PATH           writes PATH into the runner's .env (and .path) so jobs see Python/Git
   11. Labels + online    makes sure the runner has its labels and is Online

  Every step checks first and only changes what is wrong, so it is safe to run
  again at any time (after a Windows update, a new Python, a moved folder...).
  It never disables a security feature by itself: Smart App Control and third-
  party antivirus changes are reported with instructions instead.

.EXAMPLE
  # Administrator PowerShell, from the folder that contains this script:
  powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows-runner.ps1

.EXAMPLE
  # Non-interactive repair, keep current sleep settings:
  powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows-runner.ps1 -Yes -NoPowerChange
#>
[CmdletBinding()]
param(
    [string]   $RunnerDir     = 'C:\actions-runner',
    [string]   $Repo          = 'dev-bhuvanesh/office',
    # Leave empty: an already-registered machine keeps its name; a new machine is
    # asked for one (suggestion: the computer name). Each machine needs its own name.
    [string]   $RunnerName    = '',
    [string[]] $Labels        = @('writer'),
    [string]   $RunnerVersion = '2.337.0',
    [string[]] $DevDirs       = @('C:\dev'),
    # NetworkService (default): no password needed. User: runs as your account (asks for your password).
    [ValidateSet('NetworkService', 'User')]
    [string]   $RunAs         = 'NetworkService',
    [switch]   $SkipToolInstall,
    [switch]   $SkipDnsFix,
    [switch]   $NoPowerChange,
    [switch]   $Yes
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0

# Official SHA-256 of actions-runner-win-x64-2.337.0.zip (from the v2.337.0 release page).
# For any other -RunnerVersion the hash is read from that release's notes.
$PinnedVersion = '2.337.0'
$RunnerSha256  = '1150692afa94e71f872017e254ea55b6eece1eece3fe7e3a6d4c93d0a1b85cfc'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
$script:Results = New-Object System.Collections.Generic.List[object]

function Add-Result([string]$Check, [string]$Status, [string]$Detail) {
    $script:Results.Add([pscustomobject]@{ Check = $Check; Status = $Status; Detail = $Detail })
}
function Write-Step([string]$m) { Write-Host "`n==> $m" -ForegroundColor Cyan }
function Write-Ok([string]$m)   { Write-Host "    OK   $m" -ForegroundColor Green }
function Write-Fix([string]$m)  { Write-Host "    FIX  $m" -ForegroundColor Yellow }
function Write-Warn2([string]$m){ Write-Host "    WARN $m" -ForegroundColor Yellow }
function Write-Bad([string]$m)  { Write-Host "    FAIL $m" -ForegroundColor Red }

function Confirm-Action([string]$Question) {
    if ($Yes) { return $true }
    $a = Read-Host "    $Question [y/N]"
    return ($a -match '^(y|yes)$')
}

# Run a native program without PowerShell 5.1 turning stderr into terminating
# errors. Returns exit code and output lines. NOTE: never pass arguments that
# contain double quotes to native programs from Windows PowerShell 5.1 - it
# does not escape them (this broke our first Python check).
function Invoke-Native([scriptblock]$Block) {
    $old = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $out = & $Block 2>&1 | ForEach-Object { "$_" }
        return [pscustomobject]@{ Code = $LASTEXITCODE; Out = @($out) }
    } finally {
        $ErrorActionPreference = $old
    }
}

function Update-SessionPath {
    $m = [Environment]::GetEnvironmentVariable('Path', 'Machine')
    $u = [Environment]::GetEnvironmentVariable('Path', 'User')
    $env:Path = (@($m, $u) | Where-Object { $_ }) -join ';'
}

function Test-Tcp([string]$HostName, [int]$Port = 443, [int]$TimeoutMs = 5000) {
    # A plain TcpClient() is IPv4-only, so IPv6 addresses need a matching socket.
    $addr = $null
    if ([Net.IPAddress]::TryParse($HostName, [ref]$addr)) {
        $c = New-Object System.Net.Sockets.TcpClient($addr.AddressFamily)
    } else {
        $c = New-Object System.Net.Sockets.TcpClient
    }
    try {
        if ($addr) { $ar = $c.BeginConnect($addr, $Port, $null, $null) }
        else       { $ar = $c.BeginConnect($HostName, $Port, $null, $null) }
        if (-not $ar.AsyncWaitHandle.WaitOne($TimeoutMs)) { return $false }
        $c.EndConnect($ar)
        return $true
    } catch { return $false } finally { $c.Close() }
}

function Install-WithWinget([string]$Id, [string[]]$Extra) {
    if (-not (Get-Command winget.exe -ErrorAction SilentlyContinue)) {
        throw "winget is not available. Install 'App Installer' from the Microsoft Store, then run this script again."
    }
    $args1 = @('install', '--id', $Id, '--exact', '--silent',
               '--accept-source-agreements', '--accept-package-agreements', '--disable-interactivity') + $Extra
    Write-Fix "winget $($args1 -join ' ')"
    $r = Invoke-Native { & winget.exe @args1 }
    return $r.Code
}

# ---------------------------------------------------------------------------
# 0. Administrator, log file
# ---------------------------------------------------------------------------
$principal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    throw 'Open PowerShell as Administrator and run this script again.'
}

New-Item -ItemType Directory -Path $RunnerDir -Force | Out-Null
$logDir = Join-Path $RunnerDir '_setup-logs'
New-Item -ItemType Directory -Path $logDir -Force | Out-Null
$logFile = Join-Path $logDir ("setup-{0:yyyyMMdd-HHmmss}.log" -f (Get-Date))
Start-Transcript -Path $logFile | Out-Null

try {
Write-Host "`n=== GitHub Actions runner setup for $Repo on $env:COMPUTERNAME ===" -ForegroundColor Cyan
Write-Host "    Log: $logFile"
$repoUrl = "https://github.com/$Repo"

# ---------------------------------------------------------------------------
# 1. Network (issues: router DNS failed for *.actions.githubusercontent.com;
#    objects.githubusercontent.com unreachable on another machine)
# ---------------------------------------------------------------------------
Write-Step 'Network: DNS, proxy and HTTPS reachability'

# Needed by the runner itself: failure here is fatal.
$criticalHosts = @(
    'github.com', 'api.github.com', 'codeload.github.com',
    'pipelines.actions.githubusercontent.com', 'launch.actions.githubusercontent.com',
    'results-receiver.actions.githubusercontent.com'
)
# Needed by builds (release downloads, vcpkg sources, aqtinstall, Qt): warn and offer to continue.
$buildHosts = @(
    'objects.githubusercontent.com', 'release-assets.githubusercontent.com',
    'pypi.org', 'files.pythonhosted.org', 'download.qt.io'
)
$hosts = $criticalHosts + $buildHosts

function Get-HostIps([string]$HostName, [string]$Server) {
    $ips = @()
    foreach ($type in @('A', 'AAAA')) {
        try {
            if ($Server) { $rr = Resolve-DnsName -Name $HostName -Type $type -Server $Server -QuickTimeout -ErrorAction Stop }
            else         { $rr = Resolve-DnsName -Name $HostName -Type $type -QuickTimeout -ErrorAction Stop }
            $ips += @($rr | Where-Object { $_.PSObject.Properties.Name -contains 'IPAddress' } | ForEach-Object { $_.IPAddress })
        } catch { }
    }
    return @($ips | Select-Object -Unique)   # IPv4 first, then IPv6
}

# Connect to each resolved address in turn (IPv4 first), two attempts each.
# Testing by hostname alone gives false failures when IPv6 is broken.
function Test-HostHttps([string]$HostName, [string]$Server) {
    foreach ($ip in (Get-HostIps $HostName $Server)) {
        for ($try = 0; $try -lt 2; $try++) { if (Test-Tcp $ip 443 4000) { return $true } }
    }
    return $false
}

function Set-PublicDns {
    $ifs = Get-NetRoute -DestinationPrefix '0.0.0.0/0' -ErrorAction SilentlyContinue |
           Select-Object -ExpandProperty InterfaceIndex -Unique
    foreach ($i in $ifs) {
        Set-DnsClientServerAddress -InterfaceIndex $i -ServerAddresses @('1.1.1.1', '8.8.8.8')
        Write-Fix "DNS set to 1.1.1.1 / 8.8.8.8 on interface index $i"
    }
    Clear-DnsClientCache
}

# hosts-file overrides
$hostsFile = Join-Path $env:SystemRoot 'System32\drivers\etc\hosts'
$hostEntries = Get-Content $hostsFile -ErrorAction SilentlyContinue |
    Where-Object { $_ -notmatch '^\s*#' -and $_ -match '(github|githubusercontent|pythonhosted|qt\.io)' }
if ($hostEntries) {
    Write-Warn2 'The hosts file overrides these names (remove these lines if GitHub fails):'
    $hostEntries | ForEach-Object { Write-Host "         $_" }
}

# Proxy: Windows' proxy setting -> HTTPS_PROXY for this run and for jobs (.env)
$proxyInUse = $false
if ($env:HTTPS_PROXY -or $env:https_proxy) {
    $proxyInUse = $true
    Write-Ok "Using HTTPS_PROXY from the environment."
} else {
    $inet = Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -ErrorAction SilentlyContinue
    $inetProps = @()
    if ($inet) { $inetProps = @($inet.PSObject.Properties.Name) }
    if (($inetProps -contains 'ProxyEnable') -and ($inetProps -contains 'ProxyServer') -and
        $inet.ProxyEnable -eq 1 -and $inet.ProxyServer) {
        $ps = [string]$inet.ProxyServer
        if ($ps -match 'https=([^;]+)') { $ps = $Matches[1] } elseif ($ps -match 'http=([^;]+)') { $ps = $Matches[1] }
        if ($ps -notmatch '^https?://') { $ps = "http://$ps" }
        $env:HTTPS_PROXY = $ps; $env:HTTP_PROXY = $ps
        $proxyInUse = $true
        Write-Fix "Windows uses a proxy ($ps); passing it to the runner and jobs as HTTPS_PROXY."
    }
}
if ($proxyInUse) {
    Write-Warn2 'With a proxy, direct port-443 tests are skipped; GitHub reachability is checked through the proxy.'
    try {
        Invoke-WebRequest -Uri 'https://api.github.com' -UseBasicParsing -TimeoutSec 15 -Proxy $env:HTTPS_PROXY | Out-Null
        Write-Ok 'api.github.com reachable through the proxy.'
        Add-Result 'Network' 'OK' 'Through proxy'
    } catch {
        Add-Result 'Network' 'FAIL' 'Proxy'
        throw "GitHub is not reachable through the proxy $($env:HTTPS_PROXY): $($_.Exception.Message)"
    }
} else {
    # Step A: DNS resolution
    $unresolved = @($hosts | Where-Object { (Get-HostIps $_ $null).Count -eq 0 })
    # Step B: HTTPS reachability of the addresses the local DNS returns
    $blocked = @($hosts | Where-Object { $unresolved -notcontains $_ -and -not (Test-HostHttps $_ $null) })
    $bad = @($unresolved + $blocked)

    if ($bad.Count -eq 0) {
        Write-Ok 'All hosts resolve and are reachable on HTTPS (443).'
        Add-Result 'Network' 'OK' 'DNS and HTTPS fine'
    } else {
        if ($unresolved.Count) { Write-Bad ('Cannot resolve: ' + ($unresolved -join ', ')) }
        if ($blocked.Count)    { Write-Bad ('Resolve but cannot connect on 443: ' + ($blocked -join ', ')) }

        # Do the same hosts work with public DNS? Then the local/ISP DNS returns
        # missing or bad addresses (seen on Indian ISPs for *.githubusercontent.com).
        $fixable = @($bad | Where-Object { Test-HostHttps $_ '1.1.1.1' })
        if ($fixable.Count -gt 0 -and -not $SkipDnsFix) {
            Write-Fix ('Public DNS (1.1.1.1) gives working addresses for: ' + ($fixable -join ', ') + '. The local or ISP DNS is the problem.')
            if (Confirm-Action 'Switch the active network adapter(s) to DNS 1.1.1.1 and 8.8.8.8?') {
                Set-PublicDns
                $bad = @($hosts | Where-Object { -not (Test-HostHttps $_ $null) })
                Add-Result 'DNS' 'FIXED' 'Switched to 1.1.1.1 / 8.8.8.8'
            }
        }

        $badCritical = @($bad | Where-Object { $criticalHosts -contains $_ })
        $badBuild    = @($bad | Where-Object { $buildHosts -contains $_ })
        $advice = "Check, in order: VPN or ad-blocker (turn off and retry); Windows Firewall or another firewall/antivirus web filter; " +
                  "the router or network (school/office networks often block these - try a phone hotspot); a proxy (set HTTPS_PROXY and run again)."
        if ($badCritical.Count -gt 0) {
            Add-Result 'Network' 'FAIL' ($badCritical -join ', ')
            throw ("The runner cannot work without: " + ($badCritical -join ', ') + ".`n" + $advice)
        }
        if ($badBuild.Count -gt 0) {
            Write-Warn2 ('Still unreachable (needed by builds, not by the runner itself): ' + ($badBuild -join ', '))
            Write-Host "         $advice"
            Add-Result 'Network' 'WARN' ('Unreachable: ' + ($badBuild -join ', '))
            if (-not (Confirm-Action 'Continue setting up the runner anyway? (builds that download from these hosts will fail)')) {
                throw 'Stopped so you can fix the network first.'
            }
        } else {
            Write-Ok 'All hosts reachable now.'
            Add-Result 'Network' 'OK' 'Reachable after fix'
        }
    }
}

# ---------------------------------------------------------------------------
# 2. Smart App Control (issue: WinError 4551 blocked aqtinstall modules)
# ---------------------------------------------------------------------------
Write-Step 'Smart App Control'
$sac = $null
try {
    $sac = (Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy' -Name 'VerifiedAndReputablePolicyState' -ErrorAction Stop).VerifiedAndReputablePolicyState
} catch { $sac = $null }
switch ($sac) {
    1 {
        Add-Result 'Smart App Control' 'FAIL' 'On - blocks unsigned build tools and test programs'
        throw ("Smart App Control is ON. It blocks unsigned Python modules and the programs our build creates.`n" +
               "Turn it off yourself: Windows Security > App & browser control > Smart App Control settings > Off.`n" +
               "(This script never changes security settings on its own. Turning it back on may require resetting Windows.)")
    }
    2 { Write-Warn2 'Smart App Control is in Evaluation mode; Windows may switch it ON later. Consider turning it Off.'
        Add-Result 'Smart App Control' 'WARN' 'Evaluation mode' }
    0 { Write-Ok 'Off.'; Add-Result 'Smart App Control' 'OK' 'Off' }
    default { Write-Warn2 'Could not read the state. Check Windows Security > App & browser control.'
              Add-Result 'Smart App Control' 'WARN' 'Unknown state' }
}

# ---------------------------------------------------------------------------
# 3. Long paths (issue: deep vcpkg/ICU paths)
# ---------------------------------------------------------------------------
Write-Step 'Long paths'
$lp = (Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name LongPathsEnabled -ErrorAction SilentlyContinue)
if ($lp -and $lp.LongPathsEnabled -eq 1) {
    Write-Ok 'Windows long paths enabled.'
} else {
    Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name LongPathsEnabled -Value 1 -Type DWord
    Write-Fix 'Enabled Windows long paths (LongPathsEnabled=1).'
}
Add-Result 'Long paths' 'OK' 'LongPathsEnabled=1'

# ---------------------------------------------------------------------------
# 4. Tools: Git, GitHub CLI, Visual Studio C++ (MSVC, SDK, CMake, Ninja)
# ---------------------------------------------------------------------------
Write-Step 'Build tools'
Update-SessionPath

# Git (+ Git Bash; the CI scripts refuse WSL's bash)
$gitBash = Join-Path $env:ProgramFiles 'Git\bin\bash.exe'
if (-not (Get-Command git.exe -ErrorAction SilentlyContinue)) {
    if ($SkipToolInstall) { throw 'Git is missing.' }
    if ((Install-WithWinget 'Git.Git' @('--scope', 'machine')) -ne 0) { throw 'Git install failed.' }
    Update-SessionPath
}
if (-not (Test-Path $gitBash)) { Write-Warn2 "Git Bash not found at $gitBash (CI needs Git for Windows' bash)." }
$r = Invoke-Native { git config --system core.longpaths }
if (($r.Out -join '') -ne 'true') {
    $null = Invoke-Native { git config --system core.longpaths true }
    Write-Fix 'git config --system core.longpaths true'
}
Write-Ok ('Git: ' + ((Invoke-Native { git --version }).Out -join ''))
Add-Result 'Git' 'OK' 'Installed, long paths on'

# GitHub CLI (used to get runner tokens automatically)
if (-not (Get-Command gh.exe -ErrorAction SilentlyContinue)) {
    if (-not $SkipToolInstall) {
        $null = Install-WithWinget 'GitHub.cli' @('--scope', 'machine')
        Update-SessionPath
    }
}
$ghOk = $false
if (Get-Command gh.exe -ErrorAction SilentlyContinue) {
    $ghOk = ((Invoke-Native { gh auth status }).Code -eq 0)
    if (-not $ghOk) {
        Write-Warn2 'gh is not signed in. Signing in lets this script get runner tokens for you.'
        if (Confirm-Action 'Run "gh auth login" now?') {
            & gh auth login --hostname github.com --git-protocol https --web
            $ghOk = ((Invoke-Native { gh auth status }).Code -eq 0)
        }
    }
}
if ($ghOk) { Write-Ok 'GitHub CLI signed in.'; Add-Result 'GitHub CLI' 'OK' 'Signed in' }
else       { Write-Warn2 'Continuing without gh: you will be asked to paste tokens.'; Add-Result 'GitHub CLI' 'WARN' 'Not signed in' }

# Visual Studio with the C++ toolset
$vswhere   = Join-Path ${env:ProgramFiles(x86)} 'Microsoft Visual Studio\Installer\vswhere.exe'
$vsSetup   = Join-Path ${env:ProgramFiles(x86)} 'Microsoft Visual Studio\Installer\setup.exe'
$vcComp    = 'Microsoft.VisualStudio.Component.VC.Tools.x86.x64'
$wantComps = @($vcComp, 'Microsoft.VisualStudio.Component.VC.CMake.Project', 'Microsoft.VisualStudio.Component.Windows11SDK.22621')

function Get-VsWithVc {
    if (-not (Test-Path $vswhere)) { return $null }
    $p = (Invoke-Native { & $vswhere -latest -products * -requires $vcComp -property installationPath }).Out |
         Where-Object { $_ } | Select-Object -First 1
    return $p
}

$vsPath = Get-VsWithVc
if (-not $vsPath) {
    if ($SkipToolInstall) { throw 'Visual Studio C++ tools are missing.' }
    $anyVs = $null
    if (Test-Path $vswhere) {
        $anyVs = (Invoke-Native { & $vswhere -latest -products * -property installationPath }).Out |
                 Where-Object { $_ } | Select-Object -First 1
    }
    if ($anyVs) {
        Write-Fix "Adding the C++ components to the existing Visual Studio at $anyVs (takes a while)..."
        $addArgs = @('modify', '--installPath', $anyVs, '--quiet', '--norestart', '--includeRecommended')
        foreach ($c in $wantComps) { $addArgs += @('--add', $c) }
        $null = Invoke-Native { & $vsSetup @addArgs }
    } else {
        Write-Fix 'Installing Visual Studio 2022 Community with "Desktop development with C++" (15-30 min)...'
        $null = Install-WithWinget 'Microsoft.VisualStudio.2022.Community' @(
            '--override', '--quiet --wait --norestart --add Microsoft.VisualStudio.Workload.NativeDesktop --includeRecommended')
    }
    $vsPath = Get-VsWithVc
    if (-not $vsPath) { throw 'Visual Studio C++ tools still not found after install. Open Visual Studio Installer and add "Desktop development with C++".' }
}
Write-Ok "Visual Studio C++: $vsPath"

$sdk = Get-ChildItem (Join-Path ${env:ProgramFiles(x86)} 'Windows Kits\10\Include') -Directory -ErrorAction SilentlyContinue |
       Where-Object { Test-Path (Join-Path $_.FullName 'um\windows.h') }
$cmake = Join-Path $vsPath 'Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe'
$ninja = Join-Path $vsPath 'Common7\IDE\CommonExtensions\Microsoft\CMake\Ninja\ninja.exe'
$missingVs = @()
if (-not $sdk)               { $missingVs += 'Windows SDK' }
if (-not (Test-Path $cmake)) { $missingVs += 'CMake (VS component)' }
if (-not (Test-Path $ninja)) { $missingVs += 'Ninja (VS component)' }
if ($missingVs.Count -gt 0) {
    if ($SkipToolInstall) { throw ('Missing: ' + ($missingVs -join ', ')) }
    Write-Fix ('Adding missing VS components: ' + ($missingVs -join ', '))
    $addArgs = @('modify', '--installPath', $vsPath, '--quiet', '--norestart', '--includeRecommended')
    foreach ($c in $wantComps) { $addArgs += @('--add', $c) }
    $null = Invoke-Native { & $vsSetup @addArgs }
}
Write-Ok 'Windows SDK, CMake and Ninja present.'
Add-Result 'Visual Studio C++' 'OK' $vsPath

# ---------------------------------------------------------------------------
# 5. Python 3.10+ (issues: 1603 from machine install over a per-user one;
#    Store alias; runner window with a stale PATH)
# ---------------------------------------------------------------------------
Write-Step 'Python 3.10+'

function Find-Python {
    $cands = New-Object System.Collections.Generic.List[string]
    Get-Command python.exe -All -ErrorAction SilentlyContinue |
        Where-Object { $_.Source -notmatch 'WindowsApps' } | ForEach-Object { $cands.Add($_.Source) }
    if (Get-Command py.exe -ErrorAction SilentlyContinue) {
        $p = (Invoke-Native { py -3 -c 'import sys;print(sys.executable)' }).Out | Select-Object -Last 1
        if ($p -and (Test-Path $p)) { $cands.Add($p) }
    }
    foreach ($g in @("$env:ProgramFiles\Python3*\python.exe", "$env:LOCALAPPDATA\Programs\Python\Python3*\python.exe")) {
        Get-ChildItem $g -ErrorAction SilentlyContinue | Sort-Object FullName -Descending | ForEach-Object { $cands.Add($_.FullName) }
    }
    foreach ($exe in ($cands | Select-Object -Unique)) {
        $v = (Invoke-Native { & $exe --version }).Out -join ' '
        if ($v -match 'Python (\d+)\.(\d+)') {
            if ([int]$Matches[1] -eq 3 -and [int]$Matches[2] -ge 10) {
                return [pscustomobject]@{ Exe = $exe; Version = $v.Trim(); Dir = (Split-Path $exe) }
            }
        }
    }
    return $null
}

$py = Find-Python
if (-not $py) {
    if ($SkipToolInstall) { throw 'Python 3.10+ is missing.' }
    $code = Install-WithWinget 'Python.Python.3.12' @('--scope', 'machine')
    if ($code -ne 0) {
        Write-Warn2 "Machine-wide install returned $code (1603 usually means a per-user Python exists). Trying per-user."
        $null = Install-WithWinget 'Python.Python.3.12' @('--scope', 'user')
    }
    Update-SessionPath
    $py = Find-Python
    if (-not $py) { throw 'Python 3.10+ still not found. Install it from python.org with "Add python.exe to PATH".' }
}
Write-Ok "$($py.Version) at $($py.Exe)"

$isUserPython = $py.Exe -like "$env:USERPROFILE*"
if ($isUserPython) {
    $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    if (-not $userPath) { $userPath = '' }
    if (($userPath -split ';') -notcontains $py.Dir) {
        [Environment]::SetEnvironmentVariable('Path', ("{0};{0}\Scripts;{1}" -f $py.Dir, $userPath).TrimEnd(';'), 'User')
        Write-Fix "Added $($py.Dir) to your user PATH."
        Update-SessionPath
    }
    if ($RunAs -eq 'NetworkService') {
        # The service account can't read your profile by default. Give it read +
        # execute (never write) on just the Python folder, so no password is needed.
        # (S-1-5-20 = NETWORK SERVICE on every Windows language; granting again is harmless.)
        $pyRoot = $py.Dir
        $g = Invoke-Native { icacls.exe $pyRoot /grant '*S-1-5-20:(OI)(CI)RX' /C /Q }
        if ($g.Code -ne 0) { Write-Warn2 "icacls returned $($g.Code) for $pyRoot; if jobs say Python is missing, run again with -RunAs User." }
        else { Write-Ok "NETWORK SERVICE can read and run Python in $pyRoot (read-only)." }
    }
}
$alias = Get-Command python.exe -ErrorAction SilentlyContinue | Select-Object -First 1
if ($alias -and $alias.Source -match 'WindowsApps') {
    Write-Warn2 '"python" still points to the Microsoft Store alias. Turn it off: Settings > Apps > Advanced app settings > App execution aliases.'
}
Add-Result 'Python' 'OK' $py.Version

# ---------------------------------------------------------------------------
# 6. Antivirus exclusions (issue: Defender inactive because McAfee is installed)
# ---------------------------------------------------------------------------
Write-Step 'Antivirus exclusions'
$workDir = Join-Path $RunnerDir '_work'
New-Item -ItemType Directory -Path $workDir -Force | Out-Null
foreach ($d in $DevDirs) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
$excl = @($workDir) + $DevDirs

$mp = $null
try { $mp = Get-MpComputerStatus -ErrorAction Stop } catch { $mp = $null }
$defenderActive = $false
if ($mp) {
    $mode = $null
    if ($mp.PSObject.Properties.Name -contains 'AMRunningMode') { $mode = $mp.AMRunningMode }
    $defenderActive = $mp.AntivirusEnabled -and (($null -eq $mode) -or ($mode -eq 'Normal'))
}

if ($defenderActive) {
    $have = @()
    try { $have = @((Get-MpPreference).ExclusionPath) } catch { $have = @() }
    foreach ($p in $excl) {
        if ($have -contains $p) { Write-Ok "Defender already excludes $p" }
        else {
            try { Add-MpPreference -ExclusionPath $p; Write-Fix "Defender exclusion added: $p" }
            catch { Write-Warn2 "Could not add Defender exclusion for $p ($($_.Exception.Message)). It may be managed by policy or Tamper Protection." }
        }
    }
    Add-Result 'Antivirus' 'OK' 'Defender exclusions set'
} else {
    $others = @()
    try {
        $others = @(Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct -ErrorAction Stop |
                    Where-Object { $_.displayName -ne 'Windows Defender' } | Select-Object -ExpandProperty displayName)
    } catch { $others = @() }
    if ($others.Count -gt 0) {
        Write-Warn2 ("Active antivirus: " + ($others -join ', ') + ". Defender is passive, so add these folder exclusions in that product yourself:")
        $excl | ForEach-Object { Write-Host "         $_" }
        Add-Result 'Antivirus' 'MANUAL' (($others -join ', ') + ': add exclusions manually')
    } else {
        Write-Warn2 'No active antivirus detected. Turn on Windows Security > Virus & threat protection, then run again.'
        Add-Result 'Antivirus' 'WARN' 'No active antivirus found'
    }
}

# ---------------------------------------------------------------------------
# 7. Keep the PC awake on AC power (issue: jobs stalled when the PC slept)
# ---------------------------------------------------------------------------
Write-Step 'Power'
if ($NoPowerChange) {
    Write-Ok 'Skipped (-NoPowerChange).'
} else {
    $null = Invoke-Native { powercfg /change standby-timeout-ac 0 }
    $null = Invoke-Native { powercfg /change hibernate-timeout-ac 0 }
    Write-Ok 'No sleep/hibernate while plugged in (battery settings unchanged).'
}
Add-Result 'Power' 'OK' ($(if ($NoPowerChange) { 'unchanged' } else { 'no sleep on AC' }))

# ---------------------------------------------------------------------------
# 8. Runner files: download and verify (only if missing)
# ---------------------------------------------------------------------------
Write-Step "Runner files in $RunnerDir"
if (Test-Path (Join-Path $RunnerDir 'run.cmd')) {
    Write-Ok 'Runner files present (the runner updates itself).'
} else {
    $zipName = "actions-runner-win-x64-$RunnerVersion.zip"
    $zipUrl  = "https://github.com/actions/runner/releases/download/v$RunnerVersion/$zipName"
    $zipPath = Join-Path $RunnerDir $zipName

    $expected = $null
    if ($RunnerSha256 -and $RunnerVersion -eq $PinnedVersion) {
        $expected = $RunnerSha256.ToLower()
    } else {
        $rel = Invoke-RestMethod -Uri "https://api.github.com/repos/actions/runner/releases/tags/v$RunnerVersion" -UseBasicParsing
        $pattern = 'actions-runner-win-x64-' + [regex]::Escape($RunnerVersion) + '\.zip[^0-9a-fA-F]*?([0-9a-fA-F]{64})'
        if ($rel.body -match $pattern) { $expected = $Matches[1].ToLower() }
    }
    if (-not $expected) { throw 'Could not read the official SHA-256 from the release notes; refusing to install an unverified runner.' }

    Write-Fix "Downloading $zipName"
    Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath -UseBasicParsing
    $actual = (Get-FileHash $zipPath -Algorithm SHA256).Hash.ToLower()
    if ($actual -ne $expected) {
        Remove-Item $zipPath -Force
        throw "SHA-256 mismatch for $zipName (expected $expected, got $actual)."
    }
    Write-Ok 'SHA-256 verified.'
    Expand-Archive -Path $zipPath -DestinationPath $RunnerDir -Force
    Remove-Item $zipPath -Force
}
if (-not (Test-Path (Join-Path $RunnerDir 'config.cmd'))) { throw "config.cmd missing in $RunnerDir" }
Add-Result 'Runner files' 'OK' $RunnerDir

# ---------------------------------------------------------------------------
# 9. Registration and Windows service (starts at boot, as your account)
# ---------------------------------------------------------------------------
Write-Step 'Runner registration and service'

function Get-RunnerToken([string]$Kind) {
    # $Kind: 'registration-token' or 'remove-token'
    if ($ghOk) {
        $t = (Invoke-Native { gh api -X POST "repos/$Repo/actions/runners/$Kind" --jq .token }).Out | Select-Object -Last 1
        if ($t -and $t.Length -ge 20) { return $t }
    }
    Write-Host "    Get a token at $repoUrl/settings/actions/runners/new (registration) or from the runner's page (remove)."
    $s = Read-Host "    Paste the $Kind" -AsSecureString
    $t = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($s))
    if ([string]::IsNullOrWhiteSpace($t)) { throw "No $Kind entered." }
    return $t
}

function Get-RunnerService {
    $esc = [regex]::Escape($RunnerDir)
    return Get-CimInstance Win32_Service |
        Where-Object { $_.Name -like 'actions.runner.*' -and $_.PathName -match $esc } |
        Select-Object -First 1
}

$isRegistered = Test-Path (Join-Path $RunnerDir '.runner')
$svc = Get-RunnerService
$wantUser = "$env:COMPUTERNAME\$env:USERNAME"

$accountOk = $false
if ($svc) {
    if ($RunAs -eq 'User') { $accountOk = ($svc.StartName -match ('\\' + [regex]::Escape($env:USERNAME) + '$')) }
    else                   { $accountOk = ($svc.StartName -match 'NetworkService|NETWORK SERVICE') }
}

# An interactive run.cmd window conflicts with the service (same runner identity)
$listeners = @(Get-Process -Name 'Runner.Listener' -ErrorAction SilentlyContinue)
$svcRunning = $svc -and ($svc.State -eq 'Running')
if ($listeners.Count -gt 0 -and -not $svcRunning) {
    Write-Warn2 'A runner is running in a run.cmd window. It must stop so the service can take over (a running job would be cancelled).'
    if (-not (Confirm-Action 'Stop the interactive runner now?')) { throw 'Close the run.cmd window, then run this script again.' }
    $listeners | Stop-Process -Force
    Get-Process -Name 'Runner.Worker' -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 3
    Write-Fix 'Interactive runner stopped.'
}

# --- Runner name: one unique name per machine ---------------------------------
# Several machines can serve this repository. Each needs its own name; using an
# existing name with --replace would silently take over the other machine's runner.
$ghRunners = @()
if ($ghOk) {
    try { $ghRunners = @(((Invoke-Native { gh api "repos/$Repo/actions/runners" }).Out -join "`n" | ConvertFrom-Json).runners) } catch { $ghRunners = @() }
}
$localName = $null
if ($isRegistered) {
    try { $localName = (Get-Content (Join-Path $RunnerDir '.runner') -Raw | ConvertFrom-Json).agentName } catch { $localName = $null }
}
$useReplace = $false
$lostRegistration = $false

if ($isRegistered -and $localName) {
    if ($RunnerName -and $RunnerName -ne $localName) {
        Write-Warn2 "This machine is registered as '$localName' but -RunnerName '$RunnerName' was given; it will be re-registered under the new name."
    } else {
        $RunnerName = $localName
        Write-Ok "This machine is registered as '$RunnerName'."
    }
    if ($ghOk -and -not (@($ghRunners | Where-Object { $_.name -eq $localName }).Count)) {
        Write-Warn2 "GitHub no longer lists '$localName' (it was deleted, or another machine replaced it). This machine must register again."
        $lostRegistration = $true
    }
}

if (-not $isRegistered -or $lostRegistration -or ($RunnerName -and $localName -and $RunnerName -ne $localName)) {
    if ($ghRunners.Count -gt 0) {
        Write-Host '    Runners already registered for this repository:'
        $ghRunners | ForEach-Object { Write-Host ("         {0,-20} {1,-8} {2}" -f $_.name, $_.status, $_.os) }
    }
    while ($true) {
        if (-not $RunnerName -or ($lostRegistration -and $RunnerName -eq $localName -and -not $Yes)) {
            $suggest = $env:COMPUTERNAME.ToLower()
            if ($lostRegistration -and $localName) { $suggest = $localName }
            if ($Yes) { $RunnerName = $suggest }
            else {
                $answer = Read-Host "    Name for THIS machine's runner (Enter = $suggest)"
                if ([string]::IsNullOrWhiteSpace($answer)) { $RunnerName = $suggest } else { $RunnerName = $answer.Trim() }
            }
        }
        if ($RunnerName -notmatch '^[A-Za-z0-9._-]{1,64}$') {
            Write-Bad 'Use letters, digits, dot, dash or underscore (max 64).'; $RunnerName = $null; continue
        }
        $clash = @($ghRunners | Where-Object { $_.name -eq $RunnerName }) | Select-Object -First 1
        if (-not $clash) { break }
        if ($lostRegistration -and $RunnerName -eq $localName) { $useReplace = $true; break }
        Write-Warn2 "A runner named '$RunnerName' already exists on GitHub (status: $($clash.status)). It probably belongs to another machine."
        # Never take over another machine's runner without an explicit, typed answer.
        if ($Yes) { throw "Runner name '$RunnerName' is taken. Run again with -RunnerName <unique-name>." }
        $a = Read-Host "    Type REPLACE to take over '$RunnerName' (disconnects the other machine), or press Enter to pick another name"
        if ($a -ceq 'REPLACE') { $useReplace = $true; break }
        $RunnerName = $null
    }
    Write-Ok "This machine's runner will be named '$RunnerName'."
}

$needConfigure = (-not $isRegistered) -or $lostRegistration -or (-not $svc) -or (-not $accountOk) -or ($localName -and $RunnerName -ne $localName)

# NETWORK SERVICE needs modify rights on the runner folder (including files that
# earlier run.cmd sessions created as your user) before the service starts.
if ($RunAs -eq 'NetworkService') {
    $nsSid = New-Object Security.Principal.SecurityIdentifier('S-1-5-20')
    $hasAce = @((Get-Acl $RunnerDir).Access | Where-Object {
        try { $_.IdentityReference.Translate([Security.Principal.SecurityIdentifier]) -eq $nsSid } catch { $false }
    } | Where-Object { ($_.FileSystemRights -band [Security.AccessControl.FileSystemRights]::Modify) -eq [Security.AccessControl.FileSystemRights]::Modify }).Count -gt 0
    if ($hasAce -and -not $needConfigure) {
        Write-Ok "NETWORK SERVICE already has modify access to $RunnerDir."
    } else {
        Write-Fix "Giving NETWORK SERVICE modify access to $RunnerDir (can take a minute on a big _work folder)..."
        $g = Invoke-Native { icacls.exe $RunnerDir /grant '*S-1-5-20:(OI)(CI)M' /T /C /Q }
        if ($g.Code -ne 0) { Write-Warn2 "Some files in $RunnerDir could not be updated for NETWORK SERVICE (icacls exit $($g.Code))." }
        else { Write-Ok "NETWORK SERVICE has modify access to $RunnerDir." }
    }
}

if (-not $needConfigure) {
    Write-Ok "Registered, service '$($svc.Name)' runs as $($svc.StartName)."
} else {
    if ($isRegistered) {
        $why = if ($lostRegistration) { 'Its GitHub registration is gone.' }
               elseif (-not $svc) { 'Registered but not installed as a service.' }
               elseif (-not $accountOk) { "Service runs as $($svc.StartName); switching to $RunAs." }
               else { "Renaming '$localName' to '$RunnerName'." }
        Write-Fix "$why Re-registering this machine as '$RunnerName'."
        if (-not (Confirm-Action 'Re-register this runner now?')) { throw 'Stopped at your request.' }
        if ($svc) { Stop-Service -Name $svc.Name -Force -ErrorAction SilentlyContinue }

        $removed = $false
        if (-not $lostRegistration) {
            $rt = Get-RunnerToken 'remove-token'
            Push-Location $RunnerDir
            try { $rr = Invoke-Native { & .\config.cmd remove --token $rt } } finally { Pop-Location; $rt = $null }
            $rr.Out | ForEach-Object { Write-Host "         $_" }
            $removed = -not (Test-Path (Join-Path $RunnerDir '.runner'))
        }
        if (-not $removed) {
            # GitHub no longer knows this registration (or remove failed): clear the
            # local registration files so this machine can register again.
            if ($svc) { $null = Invoke-Native { sc.exe delete $svc.Name } ; $svc = $null }
            foreach ($f in @('.runner', '.credentials', '.credentials_rsaparams', '.service')) {
                Remove-Item (Join-Path $RunnerDir $f) -Force -ErrorAction SilentlyContinue
            }
            Write-Fix 'Cleared the old local registration files.'
        }
    }

    $cfgArgs = @('--unattended', '--url', $repoUrl, '--name', $RunnerName,
                 '--labels', ($Labels -join ','), '--work', '_work', '--runasservice')
    if ($useReplace) { $cfgArgs += '--replace' }
    $pwdPlain = $null
    if ($RunAs -eq 'User') {
        Write-Host "    The service will run as $wantUser so it sees your Python, Git and PATH."
        Write-Host '    Enter your Windows password (Microsoft account password if you sign in with one - not your PIN).'
        $cred = Get-Credential -UserName $wantUser -Message 'Account for the GitHub runner service'
        if (-not $cred) { throw 'No credentials entered.' }
        $pwdPlain = $cred.GetNetworkCredential().Password
        if ($pwdPlain -match '"') { throw 'Passwords containing a double quote cannot be passed safely by Windows PowerShell 5.1. Use -RunAs NetworkService with Python installed for all users, or change the password.' }
        $cfgArgs += @('--windowslogonaccount', $wantUser, '--windowslogonpassword', $pwdPlain)
    }

    $tok = Get-RunnerToken 'registration-token'
    $cfgArgs = @('--token', $tok) + $cfgArgs
    Push-Location $RunnerDir
    $secrets = @($tok, $pwdPlain) | Where-Object { $_ }
    try { $cr = Invoke-Native { & .\config.cmd @cfgArgs } } finally { Pop-Location; $tok = $null; $pwdPlain = $null; $cfgArgs = $null }
    # Show every line (errors matter), but mask the secret values themselves.
    foreach ($line in $cr.Out) {
        $shown = $line
        foreach ($s in $secrets) { $shown = $shown.Replace($s, '***') }
        Write-Host "         $shown"
    }
    $secrets = $null
    $diag = Get-ChildItem (Join-Path $RunnerDir '_diag') -Filter 'Runner_*.log' -ErrorAction SilentlyContinue |
            Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if ($cr.Code -ne 0 -and $diag) {
        Write-Host "    Last errors from $($diag.FullName):" -ForegroundColor Yellow
        Get-Content $diag.FullName | Select-String -Pattern 'ERR|Exception|denied|logon' | Select-Object -Last 15 |
            ForEach-Object { Write-Host "         $($_.Line)" }
    }
    if ($cr.Code -ne 0) {
        throw ("Runner configuration failed (output above). Common causes:`n" +
               "  - wrong password (Microsoft account: use its password, not your PIN)`n" +
               "  - 'Only allow Windows Hello sign-in' is on: Settings > Accounts > Sign-in options > turn it off`n" +
               "  - expired token (just run the script again)")
    }
    $svc = Get-RunnerService
    if (-not $svc) { throw 'Configuration finished but no runner service was created.' }
    Write-Fix "Service '$($svc.Name)' installed, running as $($svc.StartName)."
}

# ---------------------------------------------------------------------------
# 10. Job PATH (.path) and proxy (.env): refreshed every run
# ---------------------------------------------------------------------------
Write-Step 'Job environment'
Update-SessionPath
$parts = @($py.Dir, (Join-Path $py.Dir 'Scripts'), (Join-Path $env:ProgramFiles 'Git\cmd')) + ($env:Path -split ';')
$parts = @($parts | Where-Object { $_ -and (Test-Path $_) } | Select-Object -Unique)
$pathFile = Join-Path $RunnerDir '.path'
$oldPath = ''
if (Test-Path $pathFile) { $oldPath = [IO.File]::ReadAllText($pathFile) }
$envChanged = ($oldPath -ne ($parts -join ';'))
[IO.File]::WriteAllText($pathFile, ($parts -join ';'))

$envFile = Join-Path $RunnerDir '.env'
$envLines = @()
$oldEnv = ''
if (Test-Path $envFile) {
    $oldEnv = [IO.File]::ReadAllText($envFile)
    $envLines = @(Get-Content $envFile | Where-Object { $_ -notmatch '^(https?_proxy|no_proxy|PATH)=' })
}
# .env is the documented way to give the runner service environment variables;
# PATH here makes Python/Git visible to jobs whatever account the service uses.
$envLines += ('PATH=' + ($parts -join ';'))
foreach ($n in @('https_proxy', 'http_proxy', 'no_proxy')) {
    $v = [Environment]::GetEnvironmentVariable($n.ToUpper())
    if (-not $v) { $v = [Environment]::GetEnvironmentVariable($n) }
    if ($v) { $envLines += "$n=$v"; Write-Fix "Proxy setting passed to jobs: $n" }
}
[IO.File]::WriteAllLines($envFile, [string[]]$envLines)
if ([IO.File]::ReadAllText($envFile) -ne $oldEnv) { $envChanged = $true }
Write-Ok ".path and .env written ($($parts.Count) PATH entries, Python first)$(if ($envChanged) { '; changed' } else { '; unchanged' })."
Add-Result 'Job PATH' 'OK' 'Python/Git on job PATH'

# ---------------------------------------------------------------------------
# 11. Service: delayed auto start at boot, restart on failure, start now
# ---------------------------------------------------------------------------
Write-Step 'Service start-up settings'
$null = Invoke-Native { sc.exe config $svc.Name start= delayed-auto }
$null = Invoke-Native { sc.exe failure $svc.Name reset= 86400 actions= restart/60000/restart/60000/restart/60000 }
$null = Invoke-Native { sc.exe failureflag $svc.Name 1 }
# Restarting would cancel a running job, so only restart when something changed.
$cur = Get-Service -Name $svc.Name
if ($cur.Status -ne 'Running') {
    Start-Service -Name $svc.Name
} elseif ($envChanged -or $needConfigure) {
    if (@(Get-Process -Name 'Runner.Worker' -ErrorAction SilentlyContinue).Count -gt 0 -and
        -not (Confirm-Action 'A job is running right now. Restart the service anyway (cancels the job)?')) {
        Write-Warn2 'Not restarted; the new settings apply after the next restart or reboot.'
    } else {
        Restart-Service -Name $svc.Name -Force
    }
} else {
    Write-Ok 'Service already running with current settings; not restarted.'
}
Start-Sleep -Seconds 5
$s = Get-CimInstance Win32_Service -Filter "Name='$($svc.Name)'"
if ($s.State -ne 'Running') { throw "Service $($svc.Name) is $($s.State). Check Event Viewer > Windows Logs > Application." }
Write-Ok "Service $($s.Name): $($s.State), $($s.StartMode) (delayed), as $($s.StartName)."
Add-Result 'Service' 'OK' "$($s.State), starts at boot"

# ---------------------------------------------------------------------------
# 12. Labels and Online status on GitHub
# ---------------------------------------------------------------------------
Write-Step 'GitHub status'
if ($ghOk) {
    $online = $false
    for ($i = 0; $i -lt 12; $i++) {
        $json = (Invoke-Native { gh api "repos/$Repo/actions/runners" }).Out -join "`n"
        $runner = $null
        try { $runner = ($json | ConvertFrom-Json).runners | Where-Object { $_.name -eq $RunnerName } | Select-Object -First 1 } catch { }
        if ($runner -and $runner.status -eq 'online') {
            $have = @($runner.labels | ForEach-Object { $_.name })
            foreach ($l in $Labels) {
                if ($have -notcontains $l) {
                    $null = Invoke-Native { gh api -X POST "repos/$Repo/actions/runners/$($runner.id)/labels" -f "labels[]=$l" }
                    Write-Fix "Label added: $l"
                }
            }
            Write-Ok "$RunnerName is Online. Labels: $((@($have) + @($Labels) | Select-Object -Unique) -join ', ')"
            $online = $true
            break
        }
        Start-Sleep -Seconds 5
    }
    if ($online) { Add-Result 'GitHub' 'OK' 'Online' }
    else { Write-Warn2 "Not Online yet. Check $repoUrl/settings/actions/runners"; Add-Result 'GitHub' 'WARN' 'Not online yet' }
} else {
    Write-Warn2 "Check manually: $repoUrl/settings/actions/runners"
    Add-Result 'GitHub' 'MANUAL' 'Check runner page'
}

}
finally {
    Write-Host "`n=== Summary ===" -ForegroundColor Cyan
    $script:Results | Format-Table -AutoSize | Out-String | Write-Host
    Write-Host "Log saved to $logFile"
    Stop-Transcript | Out-Null
}
