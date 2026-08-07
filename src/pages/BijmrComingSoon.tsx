import BijmrFooter from "../components/bijmr/BijmrFooter";
import BijmrNavbar from "../components/bijmr/BijmrNavbar";
import { journal } from "../data/bijmr";

interface BijmrComingSoonProps {
  title: string;
}

function BijmrComingSoon({ title }: BijmrComingSoonProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BijmrNavbar />
      <main className="flex flex-1 items-center justify-center pt-32 pb-24 sm:pt-40">
        <div className="section text-center">
          <p className="section-eyebrow">{journal.shortName}</p>
          <h1 className="section-title">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            This page is currently being prepared and will be available soon.
          </p>
        </div>
      </main>
      <BijmrFooter />
    </div>
  );
}

export default BijmrComingSoon;
