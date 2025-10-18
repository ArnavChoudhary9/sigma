import { Routes, Route } from "react-router-dom";

// Pages
import Home from "@/pages/Home.tsx";

import Footer from "@/components/footer";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}
