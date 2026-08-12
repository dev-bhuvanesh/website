import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { awards } from "../data/content";

function RecentAwards() {
  return (
    <section id="awards" className="bg-surface py-20 sm:py-28">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="section-eyebrow">Recognition</p>
          <h2 className="section-title">Recent Awards</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col gap-4 rounded-card border border-border bg-background p-7 shadow-soft transition-shadow duration-300 hover:shadow-soft-hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <FiAward size={22} />
              </span>
              <div>
                <h3 className="text-base font-bold leading-snug text-text-primary">
                  {award.name}
                </h3>
                {award.organization && (
                  <p className="mt-1.5 text-sm text-text-secondary">{award.organization}</p>
                )}
                <p className="mt-1 text-sm font-semibold text-primary">{award.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentAwards;
