import { motion } from "framer-motion";
import { FiBarChart2, FiDollarSign, FiFileText, FiGlobe, FiHash, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";
import { whyPublish } from "../../data/bijmr";

interface FeatureStyle {
  icon: IconType;
  bg: string;
  text: string;
}

// Complete, static class strings so Tailwind's build-time scanner picks
// them up (dynamic template interpolation is invisible to Tailwind's JIT).
const FEATURE_STYLES: FeatureStyle[] = [
  { icon: FiZap, bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  { icon: FiHash, bg: "bg-sky-500/10", text: "text-sky-600 dark:text-sky-400" },
  { icon: FiGlobe, bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400" },
  { icon: FiDollarSign, bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
  { icon: FiFileText, bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400" },
  { icon: FiBarChart2, bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400" },
];

function BijmrWhyPublish() {
  return (
    <section id="why-publish" className="bg-surface py-20 sm:py-28">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="section-eyebrow">Why Publish With Us</p>
          <h2 className="section-title">Built for Your Professional Growth</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            We prioritise the professional growth of academicians and researchers by offering a
            seamless, tech-driven publication experience with highly supportive features.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyPublish.map((item, index) => {
            const style = FEATURE_STYLES[index];
            const Icon = style.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                className="flex flex-col gap-4 rounded-card border border-border bg-background p-7 shadow-soft transition-shadow duration-300 hover:shadow-soft-hover"
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

export default BijmrWhyPublish;
