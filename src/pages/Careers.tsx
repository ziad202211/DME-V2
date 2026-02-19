import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Send, Mail, MapPin, DollarSign, Users, Clock } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-primary pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-secondary uppercase">Join Our Team</p>
          <h1 className="font-heading mt-2 text-5xl font-black text-primary-foreground md:text-6xl">
            Careers
          </h1>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="mx-auto mb-8 inline-flex items-center justify-center rounded-full bg-primary p-5">
            <Briefcase size={40} className="text-secondary" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
            Build Your Career With DME
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We are always looking for motivated and experienced people. Please send your resume to:
          </p>
          <div className="flex flex-col items-center gap-2 mb-10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={16} />
              <span>maltamimi@dmeconsulting-us.com</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={16} />
              <span>amoutanabi@dmeconsulting-us.com</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-12 text-center">
            Current Openings
          </h2>
          
          <div className="grid gap-8 max-w-4xl mx-auto">
            {/* Computer Network Support Specialist */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                COMPUTER NETWORK SUPPORT SPECIALIST
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>Requirements:</strong> Bachelor of Science in Computer Engineering</p>
                <p><strong>Location:</strong> Baltimore, MD</p>
                <p><strong>Salary:</strong> $85,280 per year</p>
                <p><strong>Email:</strong> angad@dmeconsulting-us.com</p>
              </div>
            </div>

            {/* Administrative Services Manager */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                ADMINISTRATIVE SERVICES MANAGER
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>Requirements:</strong> 24 months managerial experience</p>
                <p><strong>Location:</strong> Baltimore, MD</p>
                <p><strong>Salary:</strong> $127,650 per year</p>
                <p><strong>Email:</strong> angad@dmeconsulting-us.com</p>
              </div>
            </div>

            {/* Public Works Inspector */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                PUBLIC WORKS INSPECTOR I, and II
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>Location:</strong> Baltimore/Laurel, MD</p>
                <p><strong>Requirements:</strong> High School graduate + 3 years construction inspection experience</p>
                <p><strong>Experience:</strong> Water main, sewer main, storm drain, stream restoration</p>
              </div>
            </div>

            {/* Project Engineer */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                PROJECT ENGINEER
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>Location:</strong> Baltimore/Laurel, MD</p>
                <p><strong>Experience:</strong> 2-7 years consulting engineering</p>
                <p><strong>Requirements:</strong> Bachelor's in Civil/Environmental/Mechanical Engineering</p>
                <p><strong>Skills:</strong> AutoCAD Civil 3D, MicroStation, ArcGIS</p>
              </div>
            </div>

            {/* Project/Document Controls */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                PROJECT/DOCUMENT CONTROLS
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>Location:</strong> Baltimore/Laurel, MD/Washington DC</p>
                <p><strong>Email:</strong> amoutanabi@dmeconsulting-us.com</p>
                <p><strong>Experience:</strong> 3-7 years consulting engineering</p>
                <p><strong>Skills:</strong> Oracle Primavera Unifier, P6, SharePoint, PMIS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
