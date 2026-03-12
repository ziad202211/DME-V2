import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Linkedin, Building2, Briefcase, Users, ShieldCheck, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AboutStatistic, TeamMember, AboutClient, AboutCertification } from "@/types/supabase";

const iconMap: Record<string, any> = {
  Building2,
  Briefcase,
  Users,
  ShieldCheck,
  Award,
};

const About = () => {
  const [headerPhoto, setHeaderPhoto] = useState("/about.jpg");
  const [statistics, setStatistics] = useState<AboutStatistic[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [clients, setClients] = useState<AboutClient[]>([]);
  const [certifications, setCertifications] = useState<AboutCertification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const [settingsRes, statsRes, teamRes, clientsRes, certsRes] = await Promise.all([
        supabase.from("about_settings").select("*").eq("key", "header_photo_url").single(),
        supabase.from("about_statistics").select("*").order("order_index", { ascending: true }),
        supabase.from("team_members").select("*").order("order_index", { ascending: true }),
        supabase.from("about_clients").select("*").order("order_index", { ascending: true }),
        supabase.from("about_certifications").select("*").order("order_index", { ascending: true }),
      ]);

      if (settingsRes.data?.value) setHeaderPhoto(settingsRes.data.value);
      if (statsRes.data) setStatistics(statsRes.data);
      if (teamRes.data) setTeamMembers(teamRes.data);
      if (clientsRes.data) setClients(clientsRes.data);
      if (certsRes.data) setCertifications(certsRes.data);
    } catch (err) {
      console.error("About fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-lg">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      
      {/* HERO */}
<section className="relative h-screen w-full">
  <img
    src='/lisa-adminis-F6wSkISfvEg-unsplash.jpg'
    className="absolute w-full h-full object-cover"
    alt="Header"
  />
  <div className="absolute inset-0 bg-black/70"></div> {/* transparent overlay */}
  <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center md:grid md:grid-cols-2 items-center">
    <div className="text-white">
      <h1 className="font-heading text-5xl font-black leading-tight">
        Engineering Excellence Since 2001
      </h1>

      <p className="mt-6 text-md leading-relaxed">
        DME is a full-service engineering firm specializing in innovative infrastructure solutions. With over 500 dedicated professionals and 25+ years of combined experience, we deliver comprehensive engineering services that connect communities and build sustainable futures.
      </p>
    </div>
  </div>
</section>

      {/* STORY */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-10 text-[#190ab0]">Our Story</h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Over the years, our team has grown in expertise and capability, achieving key milestones in water/wastewater projects, environmental engineering, and large-scale infrastructure programs. Today, with over 50 years of combined leadership experience, DME is a trusted partner for public and private clients recognized for our commitment to safety, innovation, and delivering projects on time and within budget.
          </p>
          <a href="/contact">
          <button className="mt-8 px-8 py-3 bg-[#190ab0] text-white rounded-lg font-semibold hover:opacity-90 transition">
            Let's Connect
          </button>
          </a>
        </div>
      </section>

      {/* VALUES + STATS */}
      <section className="py-20">
        <div className="container mx-auto px-10 grid md:grid-cols-2 gap-10 items-center">

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#190ab0]/10 rounded-lg ">
                <Users className="text-[#190ab0]" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Our Professional Team</h3>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our team's extensive experience, professional qualifications, and unwavering commitment to safety and quality make us the go-to choice for engineering consulting services. Our principals, with over 50 years of combined experience, bring a wealth of knowledge and expertise to every project.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {statistics.map((stat) => {
              const Icon = iconMap[stat.icon_name] || Award;

              return (
                <div key={stat.id} className="text-center space-y-3">
                  <div className="mx-auto w-fit p-3 bg-primary/10 rounded-lg">
                    <Icon className="text-[#190ab0]" size={28} />
                  </div>

                  <h3 className="text-3xl font-bold text-[#190ab0]">
                    {stat.number}
                  </h3>

                  <p className="text-sm text-[#190ab0]">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24">
        <div className="container mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Leadership Team
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">

                <div className="relative">
                  <img
                    src={member.photo_url || "/team/default.jpg"}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                    alt={member.name}
                  />

                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shadow-lg hover:opacity-90"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>

                <h3 className="font-bold text-lg">{member.name}</h3>

                <p className="text-primary text-sm mb-2">{member.position}</p>

                <p className="text-muted-foreground text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-24 bg-gradient-to-r from-[#190ab0] to-[#0a3d6b] text-white">
        <div className="container mx-auto px-6 text-center">

          <h2 className="text-5xl font-extrabold mb-6">Clients</h2>

          <p className="max-w-3xl mx-auto mb-12 text-lg">
            Partnerships built on engineering precision and trusted delivery.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-12 items-center">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center justify-center">
                {client.logo_url ? (
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="h-20 w-auto object-contain"
                  />
                ) : (
                  <div className="text-white/70 text-sm text-center">{client.name}</div>
                )}
              </div>
            ))}
            {clients.length === 0 && (
              <div className="col-span-full text-white/70">No clients added yet</div>
            )}
          </div>
        </div>
      </section>

      
      {/* CERTIFICATIONS */}
<section className="py-20 overflow-hidden">
  <div className="container mx-auto text-center">

    <h2 className="text-3xl font-bold mb-12">
      Certifications & Accreditations
    </h2>

    <div className="relative overflow-hidden py-8">

      <div className="flex animate-scroll">

        {/* first row */}
        <div className="flex">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-white rounded-lg shadow-sm mx-3"
            >
              {cert.image_url ? (
                <img
                  src={cert.image_url}
                  alt={cert.name}
                  className="max-h-20 max-w-40 object-contain"
                />
              ) : (
                <div className="text-gray-400 text-sm text-center px-2">
                  {cert.name}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* duplicated for infinite scroll */}
        <div className="flex">
          {certifications.map((cert) => (
            <div
              key={`dup-${cert.id}`}
              className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-white rounded-lg shadow-sm mx-3"
            >
              {cert.image_url ? (
                <img
                  src={cert.image_url}
                  alt={cert.name}
                  className="max-h-20 max-w-40 object-contain"
                />
              ) : (
                <div className="text-gray-400 text-sm text-center px-2">
                  {cert.name}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {certifications.length === 0 && (
        <div className="text-gray-500 mt-6">
          No certifications added yet
        </div>
      )}

    </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default About;