import { Settings, Monitor, BarChart3, HardHat, Globe, Wrench, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Settings,
    title: "PROGRAM MANAGEMENT",
    bgImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop')",
    overlayColor: "linear-gradient(to right, rgba(60, 90, 120, 0.7) 0%, rgba(60, 90, 120, 0.7) 50%, rgba(26, 37, 47, 0.9) 50%, rgba(26, 37, 47, 0.9) 100%)",
    items: [
      { name: "Project Planning", highlighted: true },
      { name: "Standard Operating Procedures", highlighted: false },
      { name: "Design Review", highlighted: false },
      { name: "QA/QC", highlighted: true },
      { name: "Utility Coordination", highlighted: false },
      { name: "Asset Management", highlighted: false },
      { name: "Public Outreach", highlighted: false },
      { name: "Environmental Compliance", highlighted: true },
    ],
  },
  {
    icon: Monitor,
    title: "IT SOLUTIONS",
    bgImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop')",
    overlayColor: "linear-gradient(to right, rgba(60, 90, 120, 0.7) 0%, rgba(60, 90, 120, 0.7) 50%, rgba(26, 37, 47, 0.9) 50%, rgba(26, 37, 47, 0.9) 100%)",
    items: [
      { name: "Network Design & Implementation", highlighted: false },
      { name: "Virtualization", highlighted: true },
      { name: "SharePoint Administration", highlighted: false },
      { name: "Web Technologies", highlighted: false },
      { name: "Database Management", highlighted: true },
      { name: "IT Strategic Planning", highlighted: false },
      { name: "System Integration", highlighted: false },
      { name: "Cloud Solutions", highlighted: true },
    ],
  },
  {
    icon: BarChart3,
    title: "PROJECT CONTROLS",
    bgImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop')",
    overlayColor: "linear-gradient(to right, rgba(60, 90, 120, 0.7) 0%, rgba(60, 90, 120, 0.7) 50%, rgba(26, 37, 47, 0.9) 50%, rgba(26, 37, 47, 0.9) 100%)",
    items: [
      { name: "Schedule Reviews & Updates", highlighted: false },
      { name: "Claims Review & Analysis", highlighted: true },
      { name: "Risk Analysis", highlighted: false },
      { name: "Earned Value Management", highlighted: false },
      { name: "Cost Estimating", highlighted: true },
      { name: "Document Control", highlighted: false },
      { name: "Progress Reporting", highlighted: false },
      { name: "Change Order Management", highlighted: true },
    ],
  },
  {
    icon: HardHat,
    title: "CONSTRUCTION MANAGEMENT",
    bgImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop')",
    overlayColor: "linear-gradient(to right, rgba(60, 90, 120, 0.7) 0%, rgba(60, 90, 120, 0.7) 50%, rgba(26, 37, 47, 0.9) 50%, rgba(26, 37, 47, 0.9) 100%)",
    items: [
      { name: "Traffic Maintenance", highlighted: false },
      { name: "Sediment & Erosion Control", highlighted: true },
      { name: "Field Inspection", highlighted: false },
      { name: "Materials Testing Coordination", highlighted: false },
      { name: "Safety Compliance", highlighted: true },
      { name: "Contract Administration", highlighted: false },
      { name: "Quality Assurance", highlighted: false },
      { name: "Permit Management", highlighted: true },
    ],
  },
  {
    icon: Globe,
    title: "GEOSPATIAL TECHNOLOGIES",
    bgImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop')",
    overlayColor: "linear-gradient(to right, rgba(60, 90, 120, 0.7) 0%, rgba(60, 90, 120, 0.7) 50%, rgba(26, 37, 47, 0.9) 50%, rgba(26, 37, 47, 0.9) 100%)",
    items: [
      { name: "GIS Analysis & Mapping", highlighted: true },
      { name: "Geodatabase Design", highlighted: false },
      { name: "GPS Data Collection", highlighted: false },
      { name: "Remote Sensing", highlighted: true },
      { name: "Spatial Analysis", highlighted: false },
      { name: "Web GIS Applications", highlighted: false },
      { name: "CAD/GIS Integration", highlighted: true },
      { name: "Asset Mapping", highlighted: false },
    ],
  },
  {
    icon: Wrench,
    title: "UTILITY ENGINEERING",
    bgImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop')",
    overlayColor: "linear-gradient(to right, rgba(60, 90, 120, 0.7) 0%, rgba(60, 90, 120, 0.7) 50%, rgba(26, 37, 47, 0.9) 50%, rgba(26, 37, 47, 0.9) 100%)",
    items: [
      { name: "Infrastructure Rehab Design", highlighted: false },
      { name: "Pumping Stations", highlighted: true },
      { name: "AMI/AMR Water Meters", highlighted: false },
      { name: "Water Distribution Systems", highlighted: false },
      { name: "Sewer Systems", highlighted: true },
      { name: "Stormwater Management", highlighted: false },
      { name: "Utility Relocation", highlighted: false },
      { name: "Condition Assessment", highlighted: true },
    ],
  },
];

const ServicesSection = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section id="services" className="bg-slate-50 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-slate-600 uppercase">What We Do</p>
          <h2 className="font-heading mt-2 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Our Services
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-gradient-to-r from-transparent via-slate-400 to-transparent rounded-full" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredService === index;
            
            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: service.bgImage }}
                />
                
                {/* Split Overlay */}
                <div 
                  className="absolute inset-0"
                  style={{ background: service.overlayColor }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex h-full min-h-[400px]">
                  {/* Left Side - Title and Icon */}
                  <div className="flex w-1/2 flex-col justify-center p-8">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white tracking-wide mb-3">
                      {service.title}
                    </h3>
                    <div className="h-0.5 w-16 bg-white/60 rounded-full" />
                  </div>

                  {/* Right Side - Services List */}
                  <div className="flex w-1/2 flex-col justify-center p-8">
                    <div className="grid gap-2">
                      {service.items.map((item, itemIndex) => (
                        <div
                          key={item.name}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200 text-sm",
                            item.highlighted
                              ? "bg-yellow-400 text-slate-900 font-semibold"
                              : "text-white/90",
                            isHovered && "translate-x-1"
                          )}
                          style={{
                            transitionDelay: `${itemIndex * 50}ms`
                          }}
                        >
                          {item.highlighted ? (
                            <div className="h-1.5 w-1.5 rounded-full bg-yellow-600 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="h-3 w-3 flex-shrink-0 text-white/60" />
                          )}
                          <span className="leading-tight">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-slate-600 mb-6">
            Need a custom solution? We've got you covered.
          </p>
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg">
            Discuss Your Project
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
