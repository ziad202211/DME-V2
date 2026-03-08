import { Settings, Monitor, BarChart3, HardHat, Globe, Wrench, ChevronRight } from "lucide-react";

const services = [
{ icon: Settings, title: "Project Management", description: "Strategic oversight and coordination for complex engineering initiatives." },
{ icon: HardHat, title: "Construction Management", description: "Field supervision ensuring safety, efficiency, and execution quality." },
{ icon: Monitor, title: "IT Solutions", description: "Technology infrastructure supporting modern engineering operations." },
{ icon: BarChart3, title: "Project Controls", description: "Performance monitoring, cost management, and project forecasting." },
{ icon: Globe, title: "GIS Services", description: "Spatial data analysis supporting infrastructure planning." },
{ icon: Wrench, title: "Utility Engineering", description: "Design and modernization of essential public infrastructure systems." }
];

const ServicesSection = () => {
return (
<section id="services" className="bg-background py-24">

<div className="container mx-auto px-6">

<div className="text-center mb-20">
<h2 className="text-3xl font-bold text-foreground">Services</h2>
</div>

<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

{services.map((service, index) => {

const Icon = service.icon;

return (

<div key={index} className="border-b border-border pb-8">

<div className="flex items-center gap-4 mb-6">

<div className="text-[#190ab0]">
<Icon size={26}/>
</div>

<h3 className="text-xl font-semibold text-foreground">
{service.title}
</h3>

</div>

<p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
{service.description}
</p>

<div className="mt-6 flex items-center gap-1 text-sm text-[#190ab0] font-medium">
Learn more <ChevronRight size={15}/>
</div>

</div>

);

})}

</div>

</div>

</section>
);
};

export default ServicesSection;