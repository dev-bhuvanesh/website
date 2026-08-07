import { motion } from "framer-motion";
import { FiBook, FiEdit3, FiFileText, FiGrid, FiTarget } from "react-icons/fi";
import type { IconType } from "react-icons";
import { forAuthors } from "../../data/bijmr";
import achievementImage from "../../assets/images/bijmr-achievement.png";

interface AuthorStyle {
  icon: IconType;
  bg: string;
  text: string;
}

// Complete, static class strings so Tailwind's build-time scanner picks
// them up (dynamic template interpolation is invisible to Tailwind's JIT).
const AUTHOR_STYLES: AuthorStyle[] = [
  { icon: FiFileText, bg: "bg-sky-500/10", text: "text-sky-600 dark:text-sky-400" },
  { icon: FiEdit3, bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
  { icon: FiBook, bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  { icon: FiGrid, bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400" },
  { icon: FiTarget, bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400" },
];

function BijmrForAuthors() {
  return (
    <section className="py-20 sm:py-28">
      <div className="section">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="section-eyebrow">For Researchers &amp; Authors</p>
            <h2 className="section-title">What We Publish</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              BIJMR welcomes the following types of scholarly contributions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="overflow-hidden rounded-card border border-border bg-surface p-3 shadow-soft-lg"
          >
            <img
              src={achievementImage}
              alt="Illustration of a researcher reaching the summit and planting a flag, representing academic achievement"
              className="w-full rounded-[10px]"
            />
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {forAuthors.map((item, index) => {
            const style = AUTHOR_STYLES[index];
            const Icon = style.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                className="flex flex-col gap-4 rounded-card border border-border bg-surface p-7 shadow-soft transition-shadow duration-300 hover:shadow-soft-hover"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${style.bg} ${style.text}`}
                >
                  <Icon size={19} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BijmrForAuthors;
