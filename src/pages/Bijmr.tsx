import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BijmrAbout from "../components/bijmr/BijmrAbout";
import BijmrFooter from "../components/bijmr/BijmrFooter";
import BijmrForAuthors from "../components/bijmr/BijmrForAuthors";
import BijmrHero from "../components/bijmr/BijmrHero";
import BijmrNavbar from "../components/bijmr/BijmrNavbar";
import BijmrScope from "../components/bijmr/BijmrScope";
import BijmrSubmissionCta from "../components/bijmr/BijmrSubmissionCta";
import BijmrWhyPublish from "../components/bijmr/BijmrWhyPublish";

function Bijmr() {
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
      <BijmrNavbar />
      <main>
        <BijmrHero />
        <BijmrAbout />
        <BijmrScope />
        <BijmrForAuthors />
        <BijmrWhyPublish />
        <BijmrSubmissionCta />
      </main>
      <BijmrFooter />
    </div>
  );
}

export default Bijmr;
