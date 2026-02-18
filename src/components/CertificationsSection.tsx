import { Shield } from "lucide-react";

const certifications = [
  "MBE – Minority Business Enterprise",
  "DBE – Disadvantaged Business Enterprise",
  "SBE – Small Business Enterprise",
  "MDOT MBE Certified",
  "SBA 8(a) Certified",
];

const CertificationsSection = () => {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-secondary uppercase">Trusted & Certified</p>
          <h2 className="font-heading mt-2 text-4xl font-extrabold text-foreground md:text-5xl">
            Certifications
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {certifications.map((cert) => (
            <div
              key={cert}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-secondary/40 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center rounded-lg bg-primary p-2">
                <Shield size={18} className="text-secondary" />
              </div>
              <span className="text-sm font-semibold text-foreground">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
