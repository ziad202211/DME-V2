import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { Service, Project } from '@/types/supabase';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchService();
      fetchRelatedProjects();
    }
  }, [slug]);

  const fetchService = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      setService(data);
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      setRelatedProjects(data || []);
    } catch (error) {
      console.error('Error fetching related projects:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-slate-400">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-slate-500 text-sm">Service not found.</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-[#190ab0] hover:opacity-60 transition-opacity"
          >
            <ArrowLeft size={12} /> All Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-[#190ab0] hover:opacity-60 transition-opacity no-underline mb-6"
          >
            <ArrowLeft size={12} /> All Services
          </Link>

          <h1 className="text-5xl font-light text-slate-900 leading-tight tracking-tight mb-6">
            {service.title}
          </h1>

          <p className="text-base text-slate-500 leading-relaxed max-w-xl mb-8">
            {service.description}
          </p>

          {service.image_url && (
            <div className="mb-8">
              <img
                src={service.webp_image_url || service.image_url}
                alt={service.title}
                className="w-full rounded-xl object-cover h-64 sm:h-80"
              />
            </div>
          )}

          {service.content && (
            <div className="prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: service.content }} />
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-12">
              <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-slate-400 mb-5">
                Related Projects
              </p>
              <div className="flex flex-col gap-3">
                {relatedProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-[#190ab0]/30 transition-all no-underline"
                  >
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 group-hover:text-[#190ab0] transition-colors truncate">
                        {project.title}
                      </p>
                      {project.location && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} />
                          {project.location}
                        </p>
                      )}
                    </div>
                    <ArrowRight size={12} className="text-slate-300 group-hover:text-[#190ab0] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-slate-200 pt-12">
          <div>
            <p className="text-sm font-semibold text-slate-900 mb-1">Ready to talk?</p>
            <p className="text-xs text-slate-400">Bring us the scope. We'll bring the structure.</p>
          </div>
          <a href="/contact">
            <button className="group flex items-center gap-2 bg-[#190ab0] text-white text-xs font-medium tracking-wide px-6 py-3 rounded-full hover:bg-[#190ab0]/80 transition-all duration-200">
              Discuss Your Needs
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}