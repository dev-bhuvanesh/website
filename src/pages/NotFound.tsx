import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">404</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-secondary">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-button bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-soft-lg transition-colors hover:bg-accent"
      >
        <FiArrowLeft />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
