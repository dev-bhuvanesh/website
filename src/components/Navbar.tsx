import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../data/content";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
  label: string;
  to: string;
  section?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Profile", to: "/profile", section: "home" },
  { label: "Publications", to: "/publications" },
  { label: "Awards", to: "/profile#awards", section: "awards" },
  { label: "CV", to: "#" },
  { label: "Contact", to: "/profile#contact", section: "contact" },
];

const SECTION_IDS = ["home", "awards", "contact"];

interface NavbarProps {
  isAdmin?: boolean;
}

function Navbar({ isAdmin = false }: NavbarProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/profile") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleCvClick = () => {
    setMobileOpen(false);
    window.open(profile.cvUrl, "_blank", "noopener,noreferrer");
  };

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const isActive = (link: NavLink) => {
    if (link.to === "/publications") return location.pathname === "/publications";
    if (link.to === "/") return location.pathname === "/";
    if (link.section) return location.pathname === "/profile" && activeSection === link.section;
    return false;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="section flex h-20 items-center justify-between py-4">
        <Link
          to="/profile"
          className="text-lg font-bold tracking-tight text-primary transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) =>
              link.to === "#" ? (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={handleCvClick}
                    className="relative text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={handleLinkClick}
                    className={`relative text-sm font-medium transition-colors duration-200 ${
                      isActive(link)
                        ? "text-primary"
                        : "text-text-secondary hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-accent transition-all duration-300 ${
                        isActive(link) ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                </li>
              )
            )}
          </ul>

          {isAdmin && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-button border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Login
            </motion.button>
          )}

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-button text-primary"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-surface/95 backdrop-blur-md md:hidden"
        >
          <ul className="section flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) =>
              link.to === "#" ? (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={handleCvClick}
                    className="block w-full rounded-button px-3 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={handleLinkClick}
                    className={`block rounded-button px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive(link)
                        ? "bg-primary/5 text-primary"
                        : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
            {isAdmin && (
              <li>
                <button
                  type="button"
                  className="mt-2 block w-full rounded-button border border-primary px-3 py-2.5 text-center text-sm font-semibold text-primary"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;
