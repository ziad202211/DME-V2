import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const projectData: Record<string, { title: string; description: string[]; image: string }> = {
  "cedar-lane": {
    title: "Cedar Lane Pumping Station",
    image: "/cedar.avif",
    description: [
      "Project Overview",
      "The Cedar Lane Water Pumping Station project was initiated to provide a backup water supply to increase reliability in zone. Associated site improvements include grading, driveway parking, stormwater management, fencing and landscaping. Howard County DPW is the project owner, and our team performed as a subconsultant under another Prime consultant.",
      "Scope of Work",
      "Construction of new 4 MGD water pumping station, complete and in place. The scope of work consists of furnishing of all materials and construction, complete in place, of new excavation, grading, landscaping, yard piping, hydrants, fencing, paving, stormwater management, erosion/sediment control, concrete building foundation, masonry, roofing, doors, windows, water pumps, piping, chemical feed system, HVAC, plumbing, electrical and controls equipment and miscellaneous appurtenances & incidental items.",
      "Construction Phase",
      "Our team provided resident inspection and coordination, document control, schedule reviews, assistance with RFI's and Change Orders, and payment application approvals.",
    ],
  },
  "us-route-29": {
    title: "US Route 29 Transmission Water Main",
    image: "/us route.avif",
    description: [
      "Project Overview",
      "DME provided support for US Route 29 Water Transmission Main Project from Little Patuxent Parkway to Maryland Route 108 within Howard County. This scope of work for this project includes but is not limited to: tunneling under the Route 108 Ramp for installation of a 60-inch diameter casing via micro-tunneling operation, which will require 24 hour per day construction inspection and two 12-hour shifts for 7 days per week. DME senior engineers provided construction oversight for all field activities, approved monthly estimates, and directed progress meetings. Inspection services were provided during contractors work activities, ensure compliance with plans and specifications, document progress, provide detailed daily reporting, site supervision, and complete additional construction management tasks. Inspectors utilized Prolog for all document management as needed for RFIs, submittals, daily reports, and meeting minutes.",
      "Scope of Work",
      "This scope of work for this project includes installation of 7,300 linear feet of 36\" BWCCP water main, approximately 752 linear feet of 60-inch diameter casing via tunneling methods, a cathodic protection system, access manhole/blow-off assemblies, air release valve manholes and assemblies, connections to existing mains, abandonment of existing main, traffic control, surface restoration.",
      "Construction Phase",
      "Our team provided resident inspection and coordination, Progress meetings, document control, schedule reviews, assistance with RFI's and Change Orders, and payment application approvals.",
    ],
  },
  "baltimore-water": {
    title: "Baltimore City Water Main Replacement/Rehab Program",
    image: "/1273.avif",
    description: [
      "Scope of work for this project includes but is not limited to design and staff augmentation for the Water Utility Project Delivery Section including of design review of various water main replacement and rehabilitation projects and other contracts, design phase engineering and management support services, support for A/E consultant management, permitting assistance, construction phase support, and support for community outreach. DME is providing the following services: Technical Reviews, Constructability Reviews, GIS Analysis, and Construction Inspection"
    ],
  },
  "wilde-lake": {
    title: "Wilde Lake",
    image: "/wild lake.avif",
    description: [
      "Project Scope Project Scope includes replacement of approximately 17,000 linear feet of 4-inch, 6-inch, and 8-inch PVC water distribution main in the Wilde Lake – Bryant Woods section of Howard County including the replacement of water services (to property lines), installation of new meter settings, new in-line valves, new fire hydrants, new cathodic protection, temporary water service systems, traffic control, surface restoration. Construction Phase: Our team provided resident inspection and coordination, document control (SharePoint), schedule reviews, maintained field records and GPS the location of the new water mains as they are being installed, punch list walk through,assistance with RFI's and Change Orders, and payment application approvals"
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
          
          {/* Project Image */}
          <div className="relative mb-10 group flex justify-center">
            <div className="inline-block rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200">
              <img 
                src={project.image} 
                alt={project.title}
                className="h-96 object-contain transition-transform duration-700 group-hover:scale-105"
                style={{
                  imageRendering: 'crisp-edges',
                  filter: 'contrast(1.1) brightness(1.05)',
                  maxWidth: '100%',
                  display: 'block'
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-40" />
            </div>
            {/* Subtle border accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
          </div>
          
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
