import { ChevronDown, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="absolute inset-0 bg-primary/50" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-28 pb-16">

        <div className="max-w-2xl">
          
          

          <h1 className="mt-4 font-heading text-5xl md:text-5xl lg:text-5xl font-bold text-primary-foreground leading-relaxed">
            Smart Engineering For Complex Projects
          </h1>

            <p className="mt-4 text-base text-primary-foreground">50+ years combined leadership experience in Project Management,
               Geospatial Technology, and Smarter Infrastructure.</p>
    

          <button className="mt-8 inline-flex items-center gap-2 bg-white text-[#190ab0] px-6 py-3 rounded-md font-medium">
            Schedule Consultation
            <ArrowRight size={16} />
          </button>

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