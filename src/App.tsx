import { Route, Routes } from "react-router-dom";
import { PageStart } from "./pages/PageStart";
import { PageForm } from "./pages/PageForm";
import { BettingDataContextProvider } from "./context/bettingDataContext";
import { PageStats } from "./pages/PageStats";
import { PageFAQ } from "./pages/PageFAQ";

export default function App() {

  return (
    <BettingDataContextProvider>
      <Routes>
        <Route path="/" element={<PageStart />} />
        <Route path="/form" element={<PageForm />} />
        <Route path="/stats" element={<PageStats />} />
        <Route path="/faq" element={<PageFAQ />} />

        {/* all unknown routes lead to / */}
        <Route path="*" element={<PageStart />} />
      </Routes>
    </BettingDataContextProvider>
  )
}