import { FiLinkedin, FiMail } from "react-icons/fi";
import BijmrFooter from "../components/bijmr/BijmrFooter";
import BijmrNavbar from "../components/bijmr/BijmrNavbar";
import { editorialBoard, journal } from "../data/bijmr";
import professorPhoto from "../assets/images/profile-pic-vijayakumar.png";

function BijmrEditorialBoard() {
  const [head, ...members] = editorialBoard;

  return (
    <div className="min-h-screen bg-background">
      <BijmrNavbar />
      <main className="pt-32 pb-24 sm:pt-40">
        <div className="mx-auto w-full max-w-[900px] px-6 sm:px-8 lg:px-10">
          <header>
            <p className="section-eyebrow">{journal.shortName}</p>
            <h1 className="section-title">Editorial Board</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Meet the editorial leadership guiding {journal.shortName}'s peer-review process and
              editorial standards.
            </p>
          </header>

          {head && (
            <article className="mt-12 flex flex-col gap-6 rounded-card border border-border bg-surface p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
              <img
                src={professorPhoto}
                alt={head.name}
                className="h-28 w-28 shrink-0 rounded-full border border-border object-cover shadow-soft sm:h-32 sm:w-32"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {head.role}
                </p>
                <h2 className="mt-1 text-xl font-bold text-text-primary sm:text-2xl">
                  {head.name}
                </h2>
                <ul className="mt-3 flex flex-col gap-1">
                  {head.affiliation.map((line) => (
                    <li key={line} className="text-sm leading-relaxed text-text-secondary sm:text-base">
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {head.email && (
                    <a
                      href={`mailto:${head.email}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
                    >
                      <FiMail size={16} />
                      {head.email}
                    </a>
                  )}
                  {head.linkedin && (
                    <a
                      href={head.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
                    >
                      <FiLinkedin size={16} />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </article>
          )}

          {members.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {members.map((member) => (
                <article
                  key={member.name}
                  className="rounded-card border border-border bg-surface p-6 shadow-soft"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {member.role}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-text-primary">{member.name}</h3>
                  <ul className="mt-2 flex flex-col gap-1">
                    {member.affiliation.map((line) => (
                      <li key={line} className="text-sm leading-relaxed text-text-secondary">
                        {line}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}

          <p className="mt-10 text-sm leading-relaxed text-text-secondary">
            Additional editorial board members will be listed here as they join.
          </p>
        </div>
      </main>
      <BijmrFooter />
    </div>
  );
}

export default BijmrEditorialBoard;
