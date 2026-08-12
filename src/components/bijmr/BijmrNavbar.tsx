import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import { journal, navLinks } from "../../data/bijmr";
import benevolentLogo from "../../assets/images/WhatsApp Image 2026-08-12 at 2.14.55 PM.jpeg";

const SECTION_IDS = ["home", "about", "scope", "contact"];

function BijmrNavbar() {
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
    if (location.pathname !== "/bijmr") return;

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

  const handleLinkClick = () => setMobileOpen(false);

  const isActive = (to: string) => {
    const [path, hash] = to.split("#");
    if (hash) return location.pathname === path && activeSection === hash;
    if (path === "/bijmr") return location.pathname === "/bijmr" && activeSection === "home";
    return location.pathname === path;
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
        <Link to="/bijmr" className="flex items-center gap-2.5">
          <img 
            src={benevolentLogo} 
            alt="Benevolent Trust Logo"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-lg font-bold tracking-tight text-primary transition-colors hover:text-accent">
            {journal.shortName}
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={handleLinkClick}
                  className={`relative whitespace-nowrap text-sm font-medium transition-colors duration-200 ${
                    isActive(link.to)
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-accent transition-all duration-300 ${
                      isActive(link.to) ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
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
          className="border-t border-border bg-surface/95 backdrop-blur-md lg:hidden"
        >
          <ul className="section flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={handleLinkClick}
                  className={`block rounded-button px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "bg-primary/5 text-primary"
                      : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}

export default BijmrNavbar;
