import { motion } from "framer-motion";
import { FiMail, FiSend } from "react-icons/fi";
import { journal } from "../../data/bijmr";
import successImage from "../../assets/images/bijmr-success.png";

function BijmrSubmissionCta() {
  return (
    <section id="contact" className="section py-20 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-card border border-border bg-surface p-3 shadow-soft-lg"
        >
          <img
            src={successImage}
            alt="Illustration of a researcher holding a trophy at the summit, representing successful publication"
            className="w-full rounded-[10px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-card bg-brand-navy px-8 py-10 shadow-soft-lg sm:px-10 sm:py-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-400">
            Manuscript Submission
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Submit Your Manuscript
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            {journal.manuscriptScope}
          </p>

          <div className="mt-6 flex items-center gap-3 text-sm text-white/85">
            <FiMail className="shrink-0 text-sky-400" size={18} />
            {journal.contactEmail}
          </div>

          <motion.a
            href={`mailto:${journal.contactEmail}?subject=Manuscript Submission - ${journal.shortName}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-button bg-white px-7 py-4 text-sm font-semibold text-brand-navy shadow-soft transition-colors hover:bg-sky-400 hover:text-white"
          >
            Submit Your Manuscript
            <FiSend />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default BijmrSubmissionCta;
