import { FiLinkedin } from "react-icons/fi";
import { SiGooglescholar, SiOrcid, SiResearchgate } from "react-icons/si";
import { Link } from "react-router-dom";
import { profile } from "../data/content";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Profile", to: "/profile" },
  { label: "About", to: "/profile#about" },
  { label: "Publications", to: "/publications" },
  { label: "Awards", to: "/profile#awards" },
  { label: "Contact", to: "/profile#contact" },
  { label: "BIJMR Journal", to: "/bijmr" },
];

const RESEARCH_PROFILES = [
  { label: "Google Scholar", href: profile.socials.scholar, icon: SiGooglescholar },
  { label: "ResearchGate", href: profile.socials.researchgate, icon: SiResearchgate },
  { label: "ORCID", href: profile.socials.orcid, icon: SiOrcid },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: FiLinkedin },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="section grid grid-cols-1 gap-10 py-16 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold tracking-tight text-primary">{profile.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
            {profile.title} at {profile.university}, researching AI, machine learning, and
            computer vision.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-primary">
            Quick Links
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-primary">
            Research Profiles
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {RESEARCH_PROFILES.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  <link.icon size={15} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section flex flex-col items-center justify-between gap-2 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-text-secondary">
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary">{profile.department}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
