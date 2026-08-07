import { motion } from "framer-motion";
import { FiArrowRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { profile } from "../data/content";

function ContactPreview() {
  return (
    <section id="contact" className="section py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="overflow-hidden rounded-card bg-brand-navy px-8 py-12 shadow-soft-lg sm:px-14 sm:py-16"
      >
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-400">
              Get in Touch
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Let&apos;s Connect
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-white/70">
              For research collaborations, speaking engagements, or student inquiries, feel free
              to reach out.
            </p>

            <dl className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <FiMapPin className="shrink-0 text-sky-400" size={18} />
                <dd className="text-sm text-white/85">{profile.address}</dd>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="shrink-0 text-sky-400" size={18} />
                <dd className="text-sm text-white/85">{profile.email}</dd>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="shrink-0 text-sky-400" size={18} />
                <dd className="text-sm text-white/85">{profile.phone}</dd>
              </div>
            </dl>
          </div>

          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex shrink-0 items-center gap-2 rounded-button bg-white px-7 py-4 text-sm font-semibold text-brand-navy shadow-soft transition-colors hover:bg-sky-400 hover:text-white"
          >
            Contact Me
            <FiArrowRight />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactPreview;
