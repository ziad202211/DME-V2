import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, MapPin, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types/supabase";

/* ── font injection ── */
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
  * { font-family: 'IBM Plex Sans', sans-serif; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes spinIt { to { transform:rotate(360deg); } }

  .fu  { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .fu1 { animation-delay:0.04s; }
  .fu2 { animation-delay:0.13s; }
  .fu3 { animation-delay:0.22s; }
  .fu4 { animation-delay:0.32s; }
  .fu5 { animation-delay:0.42s; }

  .proj-prose p   { margin-bottom:1.4em; color:#4b5563; line-height:1.85; font-size:1.0625rem; }
  .proj-prose h2  { font-size:1.4rem; font-weight:600; color:#0d0d0d; margin:2.2em 0 0.55em; letter-spacing:-0.01em; }
  .proj-prose h3  { font-size:1.05rem; font-weight:500; color:#111; margin:1.8em 0 0.45em; }
  .proj-prose a   { color:#190ab0; text-decoration:underline; text-underline-offset:3px; }
  .proj-prose ul  { padding-left:1.4em; margin-bottom:1.4em; color:#4b5563; line-height:1.85; }
  .proj-prose li  { margin-bottom:0.4em; }
`;

/* ── helpers ── */
const parseServices = (raw: unknown): string[] => {
  try {
    if (Array.isArray(raw)) return raw as string[];
    if (typeof raw === "string") return JSON.parse(raw);
  } catch { /* noop */ }
  return [];
};

const MetaItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col gap-1">
    <span className="flex items-center gap-1.5 text-[0.67rem] font-medium tracking-[0.18em] uppercase text-[#190ab0]">
      {icon}
      {label}
    </span>
    <span className="text-sm font-medium text-[#0d0d0d]">{value}</span>
  </div>
);

/* ── component ── */
const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    const cleanSlug = slug?.split(":")[0]?.trim();
    try {
      let { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", cleanSlug)
        .single();

      if (error && error.code === "PGRST116") {
        const titleFromSlug = cleanSlug
          ?.split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        const { data: d2, error: e2 } = await supabase
          .from("projects")
          .select("*")
          .eq("title", titleFromSlug)
          .single();
        if (!e2) data = d2;
      }

      if (!data) throw new Error("Project not found");
      setProject(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* loading */
  if (loading)
    return (
      <>
        <style>{fontStyle}</style>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
          <div
            className="w-7 h-7 rounded-full border-2 border-gray-200"
            style={{ borderTopColor: "#190ab0", animation: "spinIt 0.75s linear infinite" }}
          />
          <p className="text-[0.65rem] tracking-[0.22em] uppercase text-gray-400">Loading</p>
        </div>
      </>
    );

  /* not found */
  if (!project)
    return (
      <>
        <style>{fontStyle}</style>
        <div className="min-h-screen bg-white">
          <Navbar />
          <div className="min-h-[55vh] flex flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-[0.65rem] tracking-[0.22em] uppercase text-gray-400">404</p>
            <h1 className="text-4xl font-light tracking-tight text-[#0d0d0d]">Project Not Found</h1>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#190ab0] hover:opacity-60 transition-opacity"
            >
              <ArrowLeft size={13} /> Back to Projects
            </Link>
          </div>
          <Footer />
        </div>
      </>
    );

  const hasMeta = project.location || project.client;
  const services = parseServices(project.services);

  return (
    <>
      <style>{fontStyle}</style>

      <div className="min-h-screen bg-white text-[#0d0d0d]">
        <Navbar />

        {/* ── HERO ── */}
        <header className="mx-auto px-6 sm:px-10 lg:px-20 pt-28 pb-16">

          {/* back */}
          <Link
            to="/projects"
            className="fu fu1 inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-[#190ab0] hover:opacity-60 transition-opacity no-underline mb-6"
          >
            <ArrowLeft size={12} /> All Projects
          </Link>

          {/* two-col on md+, stacked on mobile */}
          <div className={`grid grid-cols-1 ${project.image_url ? "md:grid-cols-2" : ""} gap-10 md:gap-16 items-center`}>

            {/* text */}
            <div>
              <h1 className="fu fu2 text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-[-0.025em] text-[#0d0d0d] mb-5">
                {project.title}
              </h1>

              {project.description && (
                <p className="fu fu3 text-base sm:text-lg leading-relaxed text-gray-500 max-w-lg mb-0">
                  {project.description}
                </p>
              )}

              {hasMeta && (
                <div className="fu fu4 flex flex-wrap gap-8 mt-8 pt-6 border-t border-gray-200">
                  {project.location && (
                    <MetaItem icon={<MapPin size={11} />} label="Location" value={project.location} />
                  )}
                  {project.client && (
                    <MetaItem icon={<User size={11} />} label="Client" value={project.client} />
                  )}
                </div>
              )}
            </div>

            {/* image */}
            {project.image_url && (
              <div className="fu fu4 rounded-xl overflow-hidden shadow-md">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
                />
              </div>
            )}
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="mx-auto px-6 sm:px-10 lg:px-20 pb-3">
          <div className="fu fu5 bg-white rounded-2xl p-8 sm:p-12 shadow-sm">
            {project.content ? (
              <div
                className="proj-prose max-w-4xl text-[1.07rem]"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            ) : (
              <p className="text-gray-500 leading-relaxed text-[1.0625rem]">
                {project.description || "No detailed description available."}
              </p>
            )}
          </div>
        </main>

        {/* ── SERVICES ── */}
        {services.length > 0 && (
          <section className="fu fu5  mx-auto px-6 sm:px-10 lg:px-20 pb-20">
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm">
              <p className="text-[0.75rem] font-medium tracking-[0.22em] uppercase text-[#190ab0] mb-6">
                Services Provided
              </p>
              <div className="flex flex-wrap gap-2">
                {services.map((service, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border border-gray-200 bg-gray-50 text-sm text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#190ab0] shrink-0" />
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;