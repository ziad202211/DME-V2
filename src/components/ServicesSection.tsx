import { Settings, Monitor, BarChart3, HardHat, Globe, Wrench } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Settings,
    title: "Program Management",
    items: [
      "Project Planning", "Standard Operating Procedures", "Design Review",
      "QA/QC", "Utility Coordination", "Asset Management",
      "Public Outreach", "Environmental Compliance"
    ],
  },
  {
    icon: Monitor,
    title: "IT Solutions",
    items: [
      "Network Design & Implementation", "Virtualization", "SharePoint Administration",
      "Web Technologies", "Database Management", "IT Strategic Planning",
      "System Integration", "Cloud Solutions"
    ],
  },
  {
    icon: BarChart3,
    title: "Project Controls",
    items: [
      "Schedule Reviews & Updates", "Claims Review & Analysis", "Risk Analysis",
      "Earned Value Management", "Cost Estimating", "Document Control",
      "Progress Reporting", "Change Order Management"
    ],
  },
  {
    icon: HardHat,
    title: "Construction Management",
    items: [
      "Traffic Maintenance", "Sediment & Erosion Control", "Field Inspection",
      "Materials Testing Coordination", "Safety Compliance", "Contract Administration",
      "Quality Assurance", "Permit Management"
    ],
  },
  {
    icon: Globe,
    title: "Geospatial Technologies",
    items: [
      "GIS Analysis & Mapping", "Geodatabase Design", "GPS Data Collection",
      "Remote Sensing", "Spatial Analysis", "Web GIS Applications",
      "CAD/GIS Integration", "Asset Mapping"
    ],
  },
  {
    icon: Wrench,
    title: "Utility Engineering",
    items: [
      "Infrastructure Rehab Design", "Pumping Stations", "AMI/AMR Water Meters",
      "Water Distribution Systems", "Sewer Systems", "Stormwater Management",
      "Utility Relocation", "Condition Assessment"
    ],
  },
];

const ServicesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="services" className="bg-muted py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-secondary uppercase">What We Do</p>
          <h2 className="font-heading mt-2 text-4xl font-extrabold text-foreground md:text-5xl">
            Our Services
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-secondary rounded-full" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isOpen = expanded === i;
            return (
              <div
                key={service.title}
                className="group cursor-pointer rounded-lg border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-secondary/50"
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary p-3">
                  <Icon size={28} className="text-secondary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <ul
                  className={cn(
                    "space-y-1.5 overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-96 opacity-100" : "max-h-16 opacity-70"
                  )}
                >
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs font-medium text-secondary">
                  {isOpen ? "Show less" : "Show more →"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
