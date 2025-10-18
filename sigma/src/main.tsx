import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/hooks/theme-provider";
import { UserProvider } from "@/hooks/user-provider";
import "@/index.css";
import App from "@/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="sigma-ui-theme">
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
