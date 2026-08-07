import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiCpu, FiTrendingUp } from "react-icons/fi";
import { stats } from "../data/content";
import type { IconType } from "react-icons";

const ICONS: Record<string, IconType> = {
  publications: FiBookOpen,
  awards: FiAward,
  experience: FiTrendingUp,
  projects: FiCpu,
};

function Stats() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <p className="section-eyebrow">By the Numbers</p>
          <h2 className="section-title">Academic Statistics</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = ICONS[stat.id];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center gap-3 rounded-card border border-border bg-background px-6 py-9 text-center shadow-soft transition-shadow duration-300 hover:shadow-soft-hover"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={22} />
                </span>
                <span className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
                  {stat.value}
                  <span className="text-accent">+</span>
                </span>
                <span className="text-sm font-medium text-text-secondary">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Stats;
