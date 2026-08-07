import { FiExternalLink } from "react-icons/fi";
import BijmrFooter from "../components/bijmr/BijmrFooter";
import BijmrNavbar from "../components/bijmr/BijmrNavbar";
import { authorGuidelines, journal } from "../data/bijmr";

function BijmrAuthorGuidelines() {
  return (
    <div className="min-h-screen bg-background">
      <BijmrNavbar />
      <main className="pt-32 pb-24 sm:pt-40">
        <div className="mx-auto w-full max-w-[900px] px-6 sm:px-8 lg:px-10">
          <header>
            <p className="section-eyebrow">{journal.shortName}</p>
            <h1 className="section-title">Author Guidelines</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Please review the following guidelines carefully before preparing and submitting
              your manuscript to {journal.shortName}.
            </p>
            <a
              href={journal.submitFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-button bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-soft-lg transition-colors hover:bg-accent"
            >
              Submit Article (Google Form)
              <FiExternalLink size={16} />
            </a>
          </header>

          <div className="mt-12 flex flex-col gap-5">
            {authorGuidelines.map((item, index) => (
              <article
                key={item.title}
                className="rounded-card border border-border bg-surface p-6 shadow-soft sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/8 text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-text-primary">{item.title}</h2>
                    {item.points.length === 1 ? (
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                        {item.points[0]}
                      </p>
                    ) : (
                      <ul className="mt-3 flex flex-col gap-2">
                        {item.points.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex gap-2.5 text-sm leading-relaxed text-text-secondary sm:text-base"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <BijmrFooter />
    </div>
  );
}

export default BijmrAuthorGuidelines;
