```powershell
$ErrorActionPreference = 'Stop'

# ==========================================
# GitHub Actions Runner - Windows Auto Start
# Repository: dev-bhuvanesh/office
# Runner version: 2.337.0
# ==========================================

$r = 'C:\actions-runner'
$repo = 'https://github.com/dev-bhuvanesh/office'
$zipName = 'actions-runner-win-x64-2.337.0.zip'
$zipUrl = "https://github.com/actions/runner/releases/download/v2.337.0/$zipName"

# Require Administrator
$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = [Security.Principal.WindowsPrincipal]::new($identity)

if (-not $principal.IsInRole(
    [Security.Principal.WindowsBuiltInRole]::Administrator
)) {
    throw 'Open PowerShell as Administrator and run this script again.'
}

Write-Host "`n=== GitHub Actions Runner Setup ===" -ForegroundColor Cyan

# Ask for the runner name
do {
    $runnerName = (Read-Host 'Enter a name for this PC runner (e.g. Office-PC)').Trim()

    if ([string]::IsNullOrWhiteSpace($runnerName)) {
        Write-Host 'Runner name cannot be empty.' -ForegroundColor Yellow
    }
} while ([string]::IsNullOrWhiteSpace($runnerName))

Write-Host "Selected runner name: $runnerName" -ForegroundColor Green

# 1. Create/download/extract only when needed
if (-not (Test-Path "$r\run.cmd")) {
    New-Item -ItemType Directory -Path $r -Force | Out-Null
    $zipPath = Join-Path $r $zipName

    Write-Host 'Downloading runner...'
    Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath

    Write-Host 'Extracting runner...'
    Expand-Archive -Path $zipPath -DestinationPath $r -Force
}

if (-not (Test-Path "$r\config.cmd")) {
    throw "config.cmd is missing from $r"
}

# 2. Register only if this folder is not already configured
if (-not (Test-Path "$r\.runner")) {
    Write-Host 'A new runner registration is required.'
    Write-Host "Generate a fresh token at: $repo/settings/actions/runners/new"

    $token = Read-Host 'Enter the fresh GitHub runner registration token'

    if ([string]::IsNullOrWhiteSpace($token)) {
        throw 'No registration token entered.'
    }

    Push-Location $r
    try {
        & .\config.cmd `
            --url $repo `
            --token $token `
            --name $runnerName `
            --runasservice

        if ($LASTEXITCODE -ne 0) {
            throw 'Runner configuration failed. Check the output above.'
        }
    }
    finally {
        Pop-Location
        $token = $null
    }
}
else {
    Write-Host 'Existing runner registration found; preserving it.'
    Write-Host "The entered name applies only to a new registration."
}

# 3. Find the service associated with this runner folder
$escapedPath = [regex]::Escape($r)

$svc = Get-CimInstance Win32_Service |
    Where-Object {
        $_.PathName -match $escapedPath -and
        $_.Name -like 'actions.runner*'
    } |
    Select-Object -First 1

if (-not $svc) {
    throw "No installed runner service found for $r. Check the runner service installation."
}

# 4. Grant runner-folder access if service uses NETWORK SERVICE
if ($svc.StartName -match 'NETWORK SERVICE') {
    & icacls.exe $r /grant 'NETWORK SERVICE:(OI)(CI)F' /T /C

    if ($LASTEXITCODE -ne 0) {
        throw 'Runner folder permissions could not be fully applied.'
    }
}

# 5. Configure automatic and delayed startup
Set-Service -Name $svc.Name -StartupType Automatic

& sc.exe config $svc.Name start= delayed-auto
if ($LASTEXITCODE -ne 0) {
    throw 'Could not configure automatic startup.'
}

# 6. Restart service after failures
& sc.exe failure $svc.Name reset= 86400 actions= restart/60000/restart/60000/restart/60000
if ($LASTEXITCODE -ne 0) {
    throw 'Could not configure service recovery.'
}

# 7. Start the service
$serviceStatus = Get-Service -Name $svc.Name

if ($serviceStatus.Status -eq 'Running') {
    Write-Host 'Runner service is already running.'
}
else {
    Start-Service -Name $svc.Name
}

Start-Sleep -Seconds 5

# 8. Display final status
Get-CimInstance Win32_Service -Filter "Name='$($svc.Name)'" |
    Select-Object Name, State, StartMode, StartName |
    Format-List

Write-Host 'Setup completed. Verify the runner is Online in GitHub.' -ForegroundColor Green
```
