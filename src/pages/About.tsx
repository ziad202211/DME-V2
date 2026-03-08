import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { stats, values, team, clients, certifications } from "@/data/about-data";
import { Linkedin } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <div>
            

            <h1 className="font-heading text-5xl md:text-5xl font-black mt-4 leading-tight">
              Engineering Excellence Since 2001
            </h1>

            <p className="mt-6 text-md text-muted-foreground leading-relaxed">
              DME is a full-service engineering firm specializing in innovative infrastructure solutions. With over 500 dedicated professionals and 25+ years of combined experience, we deliver comprehensive engineering services that connect communities and build sustainable futures.
            </p>
          </div>

          <div>
            <img
              src="/about-hero.webp"
              className="rounded-xl shadow-xl object-cover"
            />
          </div>

        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-6 max-w-4xl text-center">

          

          <p className="text-lg text-muted-foreground leading-relaxed">
            Over the years, our team has grown in expertise and capability, achieving key milestones in water/wastewater projects, environmental engineering, and large-scale infrastructure programs. Today, with over 50 years of combined leadership experience, DME is a trusted partner for public and private clients recognized for our commitment to safety, innovation, and delivering projects on time and within budget.
          </p>

          <button className="mt-8 px-8 py-3 bg-[#190ab0] text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Let's Connect
          </button>

        </div>
      </section>

      {/* STATS & VALUES */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          
          {/* VALUES - LEFT SIDE */}
          <div className="space-y-8">
            
            <div className="space-y-6">

              {values.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
                      <Icon className="text-primary" size={24}/>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* STATS - RIGHT SIDE (2x2 GRID) */}
          <div>
            
            <div className="grid grid-cols-2 gap-8">

              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="text-center space-y-3">
                    <div className="mx-auto w-fit p-3 rounded-lg bg-primary/10">
                      <Icon className="text-primary" size={28}/>
                    </div>

                    <h3 className="text-3xl font-bold">{item.number}</h3>

                    <p className="text-muted-foreground text-sm">{item.label}</p>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </section>

      {/* TEAM */}
      <section className="py-24">
        <div className="container mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Leadership Team
          </h2>

          <div className="grid md:grid-cols-4 gap-10">

            {team.map((member) => (
              <div key={member.name} className="text-center relative">
                <div className="relative">
                  <img
                    src={member.image}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  <div className="absolute top-4 right-4">
                    <a 
                      href="#" 
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>

                <h3 className="font-bold text-lg">{member.name}</h3>

                <p className="text-primary text-sm mb-2">{member.role}</p>

                <p className="text-muted-foreground text-sm">
                  {member.desc}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-24 bg-gradient-to-r from-[#190ab0] to-[#0a3d6b] text-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-5xl font-extrabold mb-6 tracking-tight">
      Clients
    </h2>
    <p className="text-lg mb-12 max-w-3xl mx-auto">
      At DM Enterprise (DME), we take pride in the partnerships we've built each project a reflection of our commitment to engineering excellence, client trust, and impactful results.
    </p>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-12 items-center">
      {clients.map((logo, i) => (
        <div
          key={i}
          className="flex justify-center items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition"
        >
          <img
            src={logo}
            className="h-16 object-contain opacity-90 hover:opacity-100 transition duration-300"
            alt={`Client logo ${i + 1}`}
          />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* CERTIFICATIONS */}
      <section className="py-20">

        <div className="container mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-12">
            Certifications & Accreditations
          </h2>

          <div className="flex flex-wrap justify-center gap-12">

            {certifications.map((cert, i) => (
              <img
                key={i}
                src={cert}
                className="h-14 object-contain opacity-80 hover:opacity-100"
              />
            ))}

          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
};

export default About;