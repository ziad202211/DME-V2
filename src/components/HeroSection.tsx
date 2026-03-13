import { useState, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { supabase } from "@/lib/supabase";

interface HomeContent {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_cta_text: string;
  hero_cta_link: string;
  hero_background_image: string;
}

const HeroSection = () => {
  const [content, setContent] = useState<HomeContent>({
    hero_title: 'Smart Engineering For Complex Projects',
    hero_subtitle: '',
    hero_description: '50+ years combined leadership experience in Project Management, Geospatial Technology, and Smarter Infrastructure.',
    hero_cta_text: 'Schedule Consultation',
    hero_cta_link: '/contact',
    hero_background_image: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      const { data, error } = await supabase.from('home_content').select('*').single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) setContent(data);
    } catch (e) { 
      console.error('Failed to fetch home content:', e); 
    } finally { 
      setLoading(false); 
    }
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const backgroundImage = content.hero_background_image || heroBg;

  if (loading) {
    return (
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-primary/50" />
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-28 pb-16">
          <div className="max-w-2xl">
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="absolute inset-0 bg-primary/50" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-28 pb-16">

        <div className="max-w-2xl">
          
          {content.hero_subtitle && (
            <p className="text-lg md:text-xl text-primary-foreground font-medium mb-4">
              {content.hero_subtitle}
            </p>
          )}

          <h1 className="mt-4 font-heading text-4xl md:text-5xl lg:text-5xl font-bold text-primary-foreground leading-tight">
            {content.hero_title}
          </h1>

          <p className="mt-4 text-base text-primary-foreground">
            {content.hero_description}
          </p>

          {content.hero_cta_text && content.hero_cta_link && (
            <button 
              className="mt-8 inline-flex items-center gap-2 bg-white text-[#190ab0] px-6 py-3 rounded-md font-medium"
              onClick={() => window.location.href = content.hero_cta_link}
            >
              {content.hero_cta_text}
              <ArrowRight size={16} />
            </button>
          )}

        </div>
      </div>

      {/* Blue Service Bar */}
      {/* <div className="absolute bottom-0 left-0 w-full bg-[white] text-[#190ab0] flex items-center" >

        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-lg font-medium mb-6">50+ years combined leadership experience in</p>
          <div className="flex flex-wrap justify-between gap-8 md:gap-12 max-w-3xl mx-auto">
            <div className="text-center flex-shrink-0">
              <p className="font-semibold">Project Management</p>
            </div>

            <div className="text-center flex-shrink-0">
              <p className="font-semibold">Geospatial Technology</p>
            </div>

            <div className="text-center flex-shrink-0">
              <p className="font-semibold">Smarter Infrastructure</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Scroll */}
      {/* <button
        onClick={scrollToServices}
        className="absolute bottom-1 left-1/2 -translate-x-1/2 animate-bounce text-[#190ab0]"
      >
        <ChevronDown size={28} />
      </button> */}

    </section>
  );
};

export default HeroSection;