import { Route, Routes } from "react-router-dom";
import { PageStart } from "./pages/PageStart";
import { PageForm } from "./pages/PageForm";
import { BettingDataContextProvider } from "./context/bettingDataContext";

export default function App() {

  return (
    <BettingDataContextProvider>
      <Routes>
        <Route path="/" element={<PageStart />} />
        <Route path="/form" element={<PageForm />} />
      </Routes>
    </BettingDataContextProvider>
  )
}