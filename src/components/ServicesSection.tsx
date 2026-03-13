import { Settings, Monitor, BarChart3, HardHat, Globe, Wrench, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Settings, title: "Project Management", description: "Strategic oversight and coordination for complex engineering initiatives.", slug: "program-management" },
  { icon: HardHat, title: "Construction Management", description: "Field supervision ensuring safety, efficiency, and execution quality.", slug: "construction-management" },
  { icon: Monitor, title: "IT Solutions", description: "Technology infrastructure supporting modern engineering operations.", slug: "it-solutions" },
  { icon: BarChart3, title: "Project Controls", description: "Performance monitoring, cost management, and project forecasting.", slug: "project-controls" },
  { icon: Globe, title: "GIS Services", description: "Spatial data analysis supporting infrastructure planning and delivery.", slug: "geospatial-technologies" },
  { icon: Wrench, title: "Utility Engineering", description: "Design and modernization of essential public infrastructure systems.", slug: "utility-engineering" },
];

const BRAND = "#190ab0";

const ServicesSection = () => {
  return (
    <section id="services" className="bg-neutral-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xl tracking-[0.15em] uppercase font-medium mb-3" style={{ color: BRAND }}>
            Services
          </p>
          
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-neutral-200">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                to={`/services/${service.slug}`}
                className="group flex flex-col gap-4 p-8 border-r border-b border-neutral-200 bg-white hover:bg-neutral-50 transition-colors duration-200 cursor-pointer no-underline"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg shrink-0"
                  style={{ backgroundColor: `${BRAND}10` }}
                >
                  <Icon size={18} style={{ color: BRAND }} />
                </div>

                {/* Title */}
                <h3 className="text-[20px] font-medium text-neutral-900 leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] leading-relaxed text-neutral-500 flex-1">
                  {service.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-auto">
                  <span className="text-[14px] font-medium tracking-wide" style={{ color: BRAND }}>
                    Learn more
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-neutral-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: `group-hover:${BRAND}` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;