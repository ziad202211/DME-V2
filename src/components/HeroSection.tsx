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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-primary/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-secondary uppercase">
          Engineering Excellence Since 2004
        </p>
        <h1 className="font-heading text-5xl font-black leading-tight text-primary-foreground md:text-7xl lg:text-8xl">
          DM ENTERPRISE
        </h1>
        <p className="mt-2 font-heading text-xl font-medium tracking-[0.4em] text-primary-foreground/80 md:text-2xl">
          CONSULTING
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-primary-foreground/70 leading-relaxed">
          Professional engineering, IT solutions, and construction management services.
          A certified MBE/DBE/SBE firm dedicated to delivering quality infrastructure projects.
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-secondary"
        aria-label="Scroll down"
      >
        <ChevronDown size={36} />
      </button>
    </section>
  );
};

export default HeroSection;
