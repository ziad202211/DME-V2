import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />

      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-extrabold">DM ENTERPRISE</h3>
            <p className="text-xs font-medium tracking-[0.25em] text-secondary mb-4">CONSULTING</p>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              A certified MBE/DBE/SBE firm providing professional engineering, IT, and construction management services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-secondary">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Services", to: "/#services" },
                { label: "Projects", to: "/#projects" },
                { label: "Careers", to: "/careers" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:translate-x-1 inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-secondary">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-secondary/10 p-2">
                  <MapPin size={14} className="text-secondary shrink-0" />
                </div>
                <span className="text-sm text-primary-foreground/70">
                  6000 Brooktree Road, Suite 306, Elkridge, MD 21075
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-secondary/10 p-2">
                  <Phone size={14} className="text-secondary shrink-0" />
                </div>
                <span className="text-sm text-primary-foreground/70">(443) 583-2455</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-secondary/10 p-2">
                  <Mail size={14} className="text-secondary shrink-0" />
                </div>
                <span className="text-sm text-primary-foreground/70">info@dmeconsulting-us.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} DM Enterprise Consulting, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
