import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { footerLinks, journal } from "../../data/bijmr";

function BijmrFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="section grid grid-cols-1 gap-10 py-16 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold tracking-tight text-primary">{journal.shortName}</p>
          <p className="mt-2 text-sm font-medium text-text-secondary">{journal.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
            {journal.intro}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-primary">
            Important Links
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {footerLinks.map((link) => (
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
            Contact
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <a
                href={`mailto:${journal.contactEmail}`}
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary"
              >
                <FiMail size={15} />
                {journal.contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section flex flex-col items-center justify-between gap-2 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-text-secondary">
            &copy; {year} {journal.shortName}. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary">{journal.name}</p>
        </div>
      </div>
    </footer>
  );
}

export default BijmrFooter;
