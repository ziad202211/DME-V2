import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    slug: "us-route-29",
    title: "US Route 29 Transmission Water Main",
    description: "Major transmission water main installation along US Route 29 corridor.",
  },
  {
    slug: "cedar-lane",
    title: "Cedar Lane Pumping Station",
    description: "Design and construction management for a critical pumping station upgrade.",
  },
  {
    slug: "baltimore-water",
    title: "Baltimore City Water Main Replacement",
    description: "Comprehensive water main replacement and rehabilitation program for Baltimore City.",
  },
  {
    slug: "wilde-lake",
    title: "Wilde Lake",
    description: "Infrastructure improvements and utility engineering for the Wilde Lake area.",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-secondary uppercase">Our Work</p>
          <h2 className="font-heading mt-2 text-4xl font-extrabold text-foreground md:text-5xl">
            Featured Projects
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-secondary rounded-full" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-lg border border-border bg-primary p-10 transition-all hover:shadow-xl"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-secondary" />
              <h3 className="font-heading text-xl font-bold text-primary-foreground mb-3">
                {project.title}
              </h3>
              <p className="text-sm text-primary-foreground/60 mb-6 leading-relaxed">
                {project.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-all group-hover:gap-3">
                View Details <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
