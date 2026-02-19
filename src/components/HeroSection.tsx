import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/75 to-primary/95" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="inline-block mb-4 sm:mb-6 rounded-full border border-secondary/30 bg-secondary/10 px-3 sm:px-5 py-1.5 sm:py-2">
          <p className="text-xs font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-secondary uppercase">
            Engineering Excellence Since 2004
          </p>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-tight text-primary-foreground">
          DM ENTERPRISE
        </h1>
        <p className="mt-2 font-heading text-lg sm:text-xl md:text-2xl font-medium tracking-[0.3em] sm:tracking-[0.4em] text-primary-foreground/80">
          CONSULTING
        </p>
        <div className="mx-auto mt-4 sm:mt-6 h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />
        <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-primary-foreground/70 leading-relaxed px-4">
          Professional engineering, IT solutions, and construction management services.
          A certified MBE/DBE/SBE firm dedicated to delivering quality infrastructure projects.
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-secondary transition-opacity hover:opacity-70"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
      </button>
    </section>
  );
};

export default HeroSection;
