import { motion } from "framer-motion";
import { FiCheckCircle, FiGlobe, FiGrid } from "react-icons/fi";
import type { IconType } from "react-icons";
import { badges, journal } from "../../data/bijmr";
import thinkingImage from "../../assets/images/bijmr-thinking.png";

const BADGE_STYLES: Record<string, { icon: IconType; bg: string; text: string }> = {
  international: { icon: FiGlobe, bg: "bg-sky-500/10", text: "text-sky-600 dark:text-sky-400" },
  "peer-reviewed": {
    icon: FiCheckCircle,
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  multidisciplinary: {
    icon: FiGrid,
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function BijmrAbout() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="section">
        <motion.div {...fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className="section-eyebrow">About the Journal</p>
          <h2 className="section-title">About {journal.shortName}</h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="flex flex-col gap-5"
          >
            {journal.about.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-text-secondary sm:text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="overflow-hidden rounded-card border border-border bg-surface p-3 shadow-soft-lg"
            >
              <img
                src={thinkingImage}
                alt="Illustration of a researcher thinking through a multidisciplinary problem"
                className="w-full rounded-[10px]"
              />
            </motion.div>

            {badges.map((badge, index) => {
              const style = BADGE_STYLES[badge.id];
              const Icon = style.icon;
              return (
                <motion.div
                  key={badge.id}
                  {...fadeUp}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 + index * 0.08 }}
                  className="flex items-start gap-4 rounded-card border border-border bg-surface p-6 shadow-soft"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${style.bg} ${style.text}`}
                  >
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-base font-bold text-text-primary">{badge.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {badge.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BijmrAbout;
