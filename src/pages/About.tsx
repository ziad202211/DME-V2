import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-secondary uppercase">Who We Are</p>
          <h1 className="font-heading mt-2 text-5xl font-black text-primary-foreground md:text-6xl">
            About DME
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            DM Enterprise Consulting, LLC (DME) is a professional consulting firm established in 2004, 
            headquartered in Elkridge, Maryland. We specialize in providing comprehensive engineering, 
            information technology, and construction management services to public and private sector clients.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            As a certified MBE/DBE/SBE firm, DME is committed to delivering innovative solutions 
            that meet the highest standards of quality and efficiency. Our team of experienced 
            professionals brings decades of combined expertise in infrastructure development, 
            utility engineering, and project management.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Target, title: "Our Mission", text: "To provide exceptional engineering and consulting services that exceed client expectations while maintaining the highest standards of integrity and professionalism." },
              { icon: Users, title: "Our Team", text: "Our diverse team of engineers, project managers, and IT specialists brings a wealth of experience across multiple disciplines and industries." },
              { icon: Award, title: "Our Values", text: "Quality, integrity, innovation, and commitment to client satisfaction drive everything we do at DME Consulting." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-border bg-card p-8 text-center">
                  <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-lg bg-primary p-3">
                    <Icon size={28} className="text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
