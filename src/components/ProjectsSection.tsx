import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    slug: "cedar-lane",
    title: "Cedar Lane Pumping Station",
    description: "Design and construction management for a critical pumping station upgrade.",
    image: "/cedar.avif",
  },
  {
    slug: "baltimore-water",
    title: "Baltimore City Water Main Replacement",
    description: "Comprehensive water main replacement and rehabilitation program for Baltimore City.",
    image: "/1273.avif",
  },
  {
    slug: "us-route-29",
    title: "US Route 29 Transmission Water Main",
    description: "Major transmission water main installation along US Route 29 corridor.",
    image:"/us route.avif"
  },
  {
    slug: "wilde-lake",
    title: "Wilde Lake",
    description: "Infrastructure improvements and utility engineering for the Wilde Lake area.",
    image: "/wild lake.avif",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-16 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-secondary uppercase">Our Work</p>
          <h2 className="font-heading mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            Featured Projects
          </h2>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="relative p-4 sm:p-6 lg:p-8">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-secondary via-secondary/80 to-secondary/40" />
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <span className="mb-2 sm:mb-3 inline-block rounded-full bg-secondary/10 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold text-secondary tracking-wide">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-primary-foreground mb-2 sm:mb-3">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-primary-foreground/60 mb-4 sm:mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-secondary transition-all group-hover:gap-3">
                    View Details <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
