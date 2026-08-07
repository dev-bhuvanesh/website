import { motion } from "framer-motion";
import {
  FiActivity,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiClipboard,
  FiCompass,
  FiFeather,
  FiFlag,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMessageSquare,
  FiMic,
  FiType,
  FiUsers,
} from "react-icons/fi";
import { FaGavel, FaPalette } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { journal, scopeAreas } from "../../data/bijmr";
import BijmrBackgroundIcons from "./BijmrBackgroundIcons";

interface HueStyle {
  bg: string;
  text: string;
  hoverBorder: string;
}

// Each style must be a complete, static class string so Tailwind's
// build-time scanner can find and generate it (dynamic template
// interpolation like `bg-${hue}-500` is invisible to Tailwind's JIT scan).
const HUES: Record<"sky" | "amber" | "teal" | "rose" | "violet" | "orange", HueStyle> = {
  sky: { bg: "bg-sky-500/10", text: "text-sky-600 dark:text-sky-400", hoverBorder: "hover:border-sky-400" },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-400",
  },
  teal: { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400", hoverBorder: "hover:border-teal-400" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", hoverBorder: "hover:border-rose-400" },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    hoverBorder: "hover:border-violet-400",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    hoverBorder: "hover:border-orange-400",
  },
};

const AREA_STYLES: Record<string, { icon: IconType; hue: keyof typeof HUES }> = {
  "Educational Sciences": { icon: FiBookOpen, hue: "sky" },
  Business: { icon: FiBriefcase, hue: "amber" },
  "Medical Sciences": { icon: FiActivity, hue: "teal" },
  Nursing: { icon: FiHeart, hue: "teal" },
  Languages: { icon: FiType, hue: "rose" },
  "Tourism & Hospitality": { icon: FiCompass, hue: "orange" },
  "Management Sciences": { icon: FiClipboard, hue: "amber" },
  Linguistics: { icon: FiMessageSquare, hue: "rose" },
  Demographics: { icon: FiUsers, hue: "violet" },
  "Social & Cultural Studies": { icon: FiGlobe, hue: "violet" },
  "Political Sciences": { icon: FiFlag, hue: "sky" },
  Law: { icon: FaGavel, hue: "sky" },
  "Communication Arts": { icon: FiMic, hue: "rose" },
  Economics: { icon: FiBarChart2, hue: "amber" },
  "Other Related Multidisciplinary Fields": { icon: FiLayers, hue: "teal" },
};

const BACKGROUND_ICONS = [
  { icon: FaPalette, size: 150, className: "-top-10 -right-8 text-rose-500/[0.06] rotate-12" },
  { icon: FiFeather, size: 110, className: "bottom-6 -left-8 text-violet-500/[0.06] -rotate-12" },
];

function BijmrScope() {
  return (
    <section id="scope" className="relative overflow-hidden bg-surface py-20 sm:py-28">
      <BijmrBackgroundIcons icons={BACKGROUND_ICONS} />
      <div className="section relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="section-eyebrow">Aims &amp; Scope</p>
          <h2 className="section-title">Scope of the Journal</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {journal.shortName} welcomes research from the following multidisciplinary fields of
            social sciences.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scopeAreas.map((area, index) => {
            const { icon: Icon, hue } = AREA_STYLES[area.name];
            const style = HUES[hue];
            return (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: (index % 6) * 0.05 }}
                className={`flex items-center gap-3.5 rounded-card border border-border bg-background px-5 py-4 transition-colors duration-200 ${style.hoverBorder}`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${style.bg} ${style.text}`}
                >
                  <Icon size={17} />
                </span>
                <span className="text-sm font-semibold text-text-primary">{area.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BijmrScope;
