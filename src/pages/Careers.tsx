import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Send } from "lucide-react";

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
            DM Enterprise Consulting is always looking for talented professionals to join our growing team. 
            We offer competitive salaries, comprehensive benefits, and opportunities for professional 
            development in a collaborative work environment.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            If you are a motivated professional with experience in engineering, construction management, 
            IT, or related fields, we'd love to hear from you.
          </p>
          <a
            href="mailto:info@dmeconsulting-us.com"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 font-heading text-sm font-bold text-accent-foreground transition-all hover:opacity-90"
          >
            <Send size={18} />
            Send Your Resume
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
