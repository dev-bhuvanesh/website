import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-primary hover:text-primary ${className}`}
    >
      {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
    </motion.button>
  );
}

export default ThemeToggle;
