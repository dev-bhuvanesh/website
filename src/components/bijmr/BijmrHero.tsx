import { motion } from "framer-motion";
import { FiArrowRight, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { journal } from "../../data/bijmr";
import BijmrHeroIllustration from "./BijmrHeroIllustration";

function BijmrHero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-primary/[0.05] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-8%] h-[26rem] w-[26rem] rounded-full bg-teal-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"
      />

      <div className="section relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <p className="section-eyebrow">{journal.tagline}</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
            {journal.shortName}
          </h1>
          <p className="mt-5 text-lg font-medium leading-snug text-text-secondary sm:text-xl">
            {journal.name}
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0">
            {journal.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <motion.a
              href={`mailto:${journal.contactEmail}?subject=Manuscript Submission - ${journal.shortName}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-button bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-soft-lg transition-colors hover:bg-accent"
            >
              Submit Manuscript
              <FiSend />
            </motion.a>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/bijmr#about"
                className="inline-flex items-center gap-2 rounded-button border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-text-primary shadow-soft transition-colors hover:border-primary hover:text-primary"
              >
                Explore Journal
                <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <BijmrHeroIllustration />
        </motion.div>
      </div>
    </section>
  );
}

export default BijmrHero;
