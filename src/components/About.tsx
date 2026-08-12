import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { education, profile } from "../data/content";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function About() {
  return (
    <section id="about" className="section py-20 sm:py-28">
      <motion.div {...fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
        <p className="section-eyebrow">About</p>
        <h2 className="section-title">Biography &amp; Background</h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-12">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="flex flex-col gap-4"
          >
            {profile.bio.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-text-secondary">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}>
            <h3 className="text-lg font-bold text-text-primary">Education</h3>
            <ul className="mt-4 flex flex-col gap-4 border-l-2 border-border pl-5">
              {education.map((item) => (
                <li key={item.degree} className="relative">
                  <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                  <p className="text-sm font-semibold text-text-primary">{item.degree}</p>
                  <p className="text-sm text-text-secondary">
                    {item.year ? `${item.institution} · ${item.year}` : item.institution}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
            <h3 className="text-lg font-bold text-text-primary">Research Interests</h3>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              Robust and interpretable machine learning, uncertainty quantification in deep
              vision models, self-supervised representation learning, and applied AI systems for
              healthcare and scientific discovery.
            </p>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="h-fit rounded-card border border-border bg-surface p-7 shadow-soft"
        >
          <h3 className="text-lg font-bold text-text-primary">Professional Information</h3>
          <dl className="mt-6 flex flex-col gap-5">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                <FiMapPin size={16} />
              </span>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Office
                </dt>
                <dd className="mt-0.5 text-sm text-text-primary">{profile.office}</dd>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                <FiMail size={16} />
              </span>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Email
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm text-primary hover:text-accent"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                <FiPhone size={16} />
              </span>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Phone
                </dt>
                <dd className="mt-0.5 text-sm text-text-primary">{profile.phone}</dd>
              </div>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
