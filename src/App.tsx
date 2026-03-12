import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
// import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import ProgramManagement from "./pages/ProgramManagement";
import ConstructionManagement from "./pages/ConstructionManagement";
import ITSolutions from "./pages/ITSolutions";
import ProjectControls from "./pages/ProjectControls";
import GeospatialTechnologies from "./pages/GeospatialTechnologies";
import UtilityEngineering from "./pages/UtilityEngineering";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import AdminServices from "./pages/admin/Services";
import AdminHome from "./pages/admin/Home";
import AdminAbout from "./pages/admin/About";
import AdminContact from "./pages/admin/Contact";
import AdminFooter from "./pages/admin/Footer";
import AdminServiceDetail from "./pages/admin/ServiceDetail";
import AdminProjectDetail from "./pages/admin/ProjectDetail";

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
          {/* <Route path="/careers" element={<Careers />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/services/program-management" element={<ProgramManagement />} />
          <Route path="/services/construction-management" element={<ConstructionManagement />} />
          <Route path="/services/it-solutions" element={<ITSolutions />} />
          <Route path="/services/project-controls" element={<ProjectControls />} />
          <Route path="/services/geospatial-technologies" element={<GeospatialTechnologies />} />
          <Route path="/services/utility-engineering" element={<UtilityEngineering />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/new" element={<AdminProjectDetail />} />
          <Route path="/admin/projects/edit/:id" element={<AdminProjectDetail />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/services/new" element={<AdminServiceDetail />} />
          <Route path="/admin/services/edit/:id" element={<AdminServiceDetail />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/about" element={<AdminAbout />} />
          <Route path="/admin/contact" element={<AdminContact />} />
          <Route path="/admin/footer" element={<AdminFooter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
