import { motion } from "framer-motion";
import { FiExternalLink, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import { publications } from "../data/publications";

const latestPublications = [...publications]
  .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
  .slice(0, 3);

function RecentPublications() {
  return (
    <section id="publications" className="section py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <p className="section-eyebrow">Research</p>
          <h2 className="section-title">Latest Publications</h2>
        </div>
        <Link
          to="/publications"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent"
        >
          View all publications
          <FiExternalLink size={14} />
        </Link>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {latestPublications.map((pub, index) => (
          <motion.article
            key={pub.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="flex h-full flex-col rounded-card border border-border bg-surface p-7 shadow-soft transition-shadow duration-300 hover:shadow-soft-hover"
          >
            <span className="w-fit rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-primary">
              {pub.year}
            </span>
            <h3 className="mt-4 text-lg font-bold leading-snug text-text-primary">
              {pub.title}
            </h3>
            <p className="mt-2 text-sm font-medium italic text-text-secondary">{pub.venue}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
              {pub.abstract}
            </p>

            <div className="mt-6 flex items-center gap-4 border-t border-border pt-5">
              {pub.pdfUrl && (
                <a
                  href={pub.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent"
                >
                  View PDF
                  <FiFileText size={14} />
                </a>
              )}
              {pub.doi && (
                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-primary"
                >
                  DOI
                  <FiExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default RecentPublications;
