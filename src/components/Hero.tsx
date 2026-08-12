import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import { profile, researchAreas } from "../data/content";
import professorPhoto from "../assets/images/professor-photo.png";

const MotionLink = motion.create(Link);

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-80 w-80 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="section relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="section-eyebrow">{profile.title}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-text-secondary">
            {profile.university}
          </p>
          <p className="mt-1 text-base font-medium text-text-secondary">
            {profile.secondaryRole.organization}, {profile.secondaryRole.location}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {researchAreas.map((area) => (
              <li
                key={area.name}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-primary shadow-soft"
              >
                {area.name}
              </li>
            ))}
          </ul>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MotionLink
              to="/publications"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-button bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-soft-lg transition-colors hover:bg-accent"
            >
              View Publications
              <FiArrowRight />
            </MotionLink>
            <motion.a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-button border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-text-primary shadow-soft transition-colors hover:border-primary hover:text-primary"
            >
              Download CV
              <FiDownload />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-card bg-surface shadow-soft-lg ring-1 ring-border">
            <img
              src={professorPhoto}
              alt={`Portrait of ${profile.name}`}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
