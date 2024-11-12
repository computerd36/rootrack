import { Route, Routes } from "react-router-dom";
import { PageStart } from "./pages/PageStart";
import { PageForm } from "./pages/PageForm";
import { BettingDataContextProvider } from "./hooks/bettingDataContext";
import { PageStats } from "./pages/PageStats";
import { PageFAQ } from "./pages/PageFAQ";
import { PageAbout } from "./pages/PageAbout";
import { PageLegal } from "./pages/PageLegal";

export default function App() {

  return (
    <BettingDataContextProvider>
      <Routes>
        <Route path="/" element={<PageStart />} />
        <Route path="/form" element={<PageForm />} />
        <Route path="/stats" element={<PageStats />} />
        <Route path="/faq" element={<PageFAQ />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/legal" element={<PageLegal />} />

        {/* all unknown routes lead to / */}
        <Route path="*" element={<PageStart />} />
      </Routes>
    </BettingDataContextProvider>
  )
}