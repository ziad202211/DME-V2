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

<section id="projects" className="bg-background py-24">

<div className="container mx-auto px-6">

<div className="text-center mb-20">
<h2 className="mt-3 text-4xl font-bold text-foreground">
 Projects
</h2>

</div>

<div className="grid gap-10 md:grid-cols-2">

{projects.map((project,i)=>(

<Link
key={project.slug}
to={`/projects/${project.slug}`}
className="group relative overflow-hidden rounded-2xl"
>

<img
src={project.image}
alt={project.title}
className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
/>

<div className="absolute inset-0 bg-black/50"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>

<div className="absolute bottom-0 p-8 text-white">

<span className="text-xs tracking-widest text-white">
0{i+1}
</span>

<h3 className="text-xl font-semibold mt-2">
{project.title}
</h3>

<p className="text-sm text-white/70 mt-2 max-w-md">
{project.description}
</p>

<div className="mt-4 flex items-center gap-1 text-sm text-secondary font-bold">
View Details <ArrowRight size={15}/>
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
