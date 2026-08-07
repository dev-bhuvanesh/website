import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../components/About";
import ContactPreview from "../components/ContactPreview";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import RecentAwards from "../components/RecentAwards";
import RecentPublications from "../components/RecentPublications";
import Stats from "../components/Stats";

function Profile() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <RecentPublications />
        <RecentAwards />
        <ContactPreview />
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
