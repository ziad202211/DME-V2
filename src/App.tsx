import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import ProgramManagement from "./pages/ProgramManagement";
import ConstructionManagement from "./pages/ConstructionManagement";
import ITSolutions from "./pages/ITSolutions";
import ProjectControls from "./pages/ProjectControls";
import GeospatialTechnologies from "./pages/GeospatialTechnologies";
import UtilityEngineering from "./pages/UtilityEngineering";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/services/program-management" element={<ProgramManagement />} />
          <Route path="/services/construction-management" element={<ConstructionManagement />} />
          <Route path="/services/it-solutions" element={<ITSolutions />} />
          <Route path="/services/project-controls" element={<ProjectControls />} />
          <Route path="/services/geospatial-technologies" element={<GeospatialTechnologies />} />
          <Route path="/services/utility-engineering" element={<UtilityEngineering />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
