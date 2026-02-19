import { Shield } from "lucide-react";

const certifications = [
  { name: "MBE – Minority Business Enterprise", image: "/c1.avif" },
  { name: "DBE – Disadvantaged Business Enterprise", image: "/c2.avif" },
  { name: "SBE – Small Business Enterprise", image: "/c3.avif" },
  { name: "MDOT MBE Certified", image: "/c4.avif" },
  { name: "SBA 8(a) Certified", image: "/c5.avif" },
  { name: "WOSB – Women-Owned Small Business", image: "/c6.avif" },
  { name: "HUBZone Certified", image: "/c7.avif" },
];

const CertificationsSection = () => {
  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-secondary uppercase">Trusted & Certified</p>
          <h2 className="font-heading mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            Certifications
          </h2>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="group relative"
            >
              <img 
                src={cert.image} 
                alt={cert.name}
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform duration-300 group-hover:scale-110 cursor-pointer"
              />
              {/* Hover tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 sm:px-3 py-1 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                {cert.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
