import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { profile } from "../data/content";

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 items-center justify-center pt-32 pb-24 sm:pt-40">
        <div className="section text-center">
          <p className="section-eyebrow">Coming Soon</p>
          <h1 className="section-title">{profile.secondaryRole.organization}</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            This page is currently being designed. Check back soon.
          </p>
          <Link
            to="/bijmr"
            className="mt-8 inline-flex items-center gap-2 rounded-button bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-soft-lg transition-colors hover:bg-accent"
          >
            Visit BIJMR Journal
            <FiArrowRight />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
