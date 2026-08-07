import { HashRouter, Route, Routes } from "react-router-dom";
import Bijmr from "./pages/Bijmr";
import BijmrAuthorGuidelines from "./pages/BijmrAuthorGuidelines";
import BijmrComingSoon from "./pages/BijmrComingSoon";
import BijmrEditorialBoard from "./pages/BijmrEditorialBoard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Publications from "./pages/Publications";

function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/bijmr" element={<Bijmr />} />
        <Route path="/bijmr/editorial-board" element={<BijmrEditorialBoard />} />
        <Route path="/bijmr/author-guidelines" element={<BijmrAuthorGuidelines />} />
        <Route
          path="/bijmr/publication-ethics"
          element={<BijmrComingSoon title="Publication Ethics" />}
        />
        <Route
          path="/bijmr/current-issue"
          element={<BijmrComingSoon title="Current Issue" />}
        />
        <Route path="/bijmr/archives" element={<BijmrComingSoon title="Archives" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
