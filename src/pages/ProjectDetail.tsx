import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const projectData: Record<string, { title: string; description: string[] }> = {
  "us-route-29": {
    title: "US Route 29 Transmission Water Main",
    description: [
      "DME provided comprehensive program management and construction inspection services for the installation of a major transmission water main along the US Route 29 corridor.",
      "The project involved coordination with multiple stakeholders, traffic management planning, and ensuring minimal disruption to the traveling public during construction.",
      "Our team delivered quality assurance and quality control oversight throughout the project lifecycle, ensuring all work met the required specifications and standards.",
    ],
  },
  "cedar-lane": {
    title: "Cedar Lane Pumping Station",
    description: [
      "DME provided engineering and construction management services for the Cedar Lane Pumping Station upgrade project.",
      "The scope included design review, construction inspection, and project controls for the modernization of critical water infrastructure.",
      "Our team ensured the project was completed on schedule and within budget while meeting all regulatory requirements.",
    ],
  },
  "baltimore-water": {
    title: "Baltimore City Water Main Replacement/Rehab Program",
    description: [
      "DME is providing program management and construction inspection services for Baltimore City's extensive water main replacement and rehabilitation program.",
      "This multi-year program involves the systematic replacement and rehabilitation of aging water infrastructure throughout the city.",
      "Our team manages project controls, coordinates with city agencies, and ensures quality construction practices are maintained across all project sites.",
    ],
  },
  "wilde-lake": {
    title: "Wilde Lake",
    description: [
      "DME provided utility engineering and project management services for infrastructure improvements in the Wilde Lake area.",
      "The project involved assessment of existing conditions, design of improvements, and coordination with local authorities.",
      "Our team delivered comprehensive engineering solutions that improved the reliability and efficiency of the utility systems serving the community.",
    ],
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = slug ? projectData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="bg-primary pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-heading text-4xl font-black text-primary-foreground">Project Not Found</h1>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-primary pt-32 pb-20">
        <div className="container mx-auto px-6">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-secondary mb-6 hover:opacity-80 transition-opacity">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <h1 className="font-heading text-4xl font-black text-primary-foreground md:text-5xl">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          {project.description.map((para, i) => (
            <p key={i} className="text-lg text-muted-foreground leading-relaxed mb-6">
              {para}
            </p>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
