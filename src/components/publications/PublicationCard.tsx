import { useState } from "react";
import { FiChevronDown, FiExternalLink, FiFileText } from "react-icons/fi";
import type { Publication } from "../../data/publications";

interface PublicationCardProps {
  publication: Publication;
  index: number;
}

function PublicationCard({ publication, index }: PublicationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const abstractId = `abstract-${publication.id}`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="rounded-card border border-border bg-surface p-6 shadow-none transition-shadow duration-200 hover:shadow-soft sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-7">
        <div className="flex shrink-0 flex-row items-center gap-3 sm:w-20 sm:flex-col sm:items-start sm:gap-2">
          <span className="text-xs font-semibold tabular-nums text-text-secondary/70">
            {number}
          </span>
          <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {publication.year}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold leading-snug text-text-primary sm:text-xl">
            {publication.title}
          </h3>
          <p className="mt-1.5 text-sm text-text-secondary">{publication.authors.join(", ")}</p>
          <p className="mt-1 text-sm text-text-secondary">
            <span className="font-medium text-text-primary">{publication.venue}</span>
            {" · "}
            {publication.type}
          </p>

          <div
            id={abstractId}
            className={`mt-3 overflow-hidden transition-[max-height] duration-200 ease-out ${
              expanded ? "max-h-[1000px]" : "max-h-12"
            }`}
          >
            <p
              className={`text-sm leading-relaxed text-text-secondary ${
                expanded ? "" : "line-clamp-2"
              }`}
            >
              {publication.abstract}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-controls={abstractId}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent"
          >
            {expanded ? "Hide abstract" : "Read abstract"}
            <FiChevronDown
              size={14}
              className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          {publication.researchAreas.length > 0 && (
            <p className="mt-4 text-xs leading-relaxed text-text-secondary">
              <span className="font-semibold uppercase tracking-wide text-text-secondary/80">
                Research Areas:{" "}
              </span>
              {publication.researchAreas.join(" · ")}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {publication.pdfUrl && (
              <a
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-button border border-border px-4 py-2.5 text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white"
              >
                <FiFileText size={14} aria-hidden="true" />
                View PDF
              </a>
            )}
            {publication.doi && (
              <a
                href={publication.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-button border border-border px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                <FiExternalLink size={14} aria-hidden="true" />
                DOI
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default PublicationCard;
