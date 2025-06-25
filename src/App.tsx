
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Research from "@/pages/Research";
import Hobbies from "@/pages/Hobbies";
import Certifications from "@/pages/Certifications";
import SecretAdmin from "@/pages/SecretAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PortfolioProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/research" element={<Research />} />
              <Route path="/hobbies" element={<Hobbies />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/secret-admin-panel-xyz123" element={<SecretAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PortfolioProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
