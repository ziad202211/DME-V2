import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Building,
  Clock,
} from "lucide-react";

export default function Footer() {
  const [footerContent, setFooterContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooterContent();
  }, []);

  const fetchFooterContent = async () => {
    try {
      const { data, error } = await supabase
        .from("footer_content")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;

      const grouped = (data || []).reduce((acc: any, item: any) => {
        acc[item.section] = item;
        return acc;
      }, {});

      setFooterContent(grouped);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const defaultContent = {
    company: {
      title: "DM ENTERPRISE",
      content: {
        description:
          "A certified MBE/DBE/SBE firm providing professional engineering, IT, and construction management services.",
        address: "6000 Brooktree Road, Suite 306, Elkridge, MD 21075",
        phone: "(443) 583-2455",
        email: "info@dmeconsulting-us.com",
      },
    },
    services: {
      content: {
        links: [
          { title: "Program Management", url: "/services/program-management" },
          {
            title: "Construction Management",
            url: "/services/construction-management",
          },
          { title: "IT Solutions", url: "/services/it-solutions" },
          { title: "Project Controls", url: "/services/project-controls" },
          {
            title: "Geospatial Technologies",
            url: "/services/geospatial-technologies",
          },
          { title: "Utility Engineering", url: "/services/utility-engineering" },
        ],
      },
    },
    contact: {
      content: {
        hours: "Monday - Friday: 8:00 AM - 6:00 PM",
        address: "6000 Brooktree Road, Suite 306, Elkridge, MD 21075",
        phone: "(443) 583-2455",
        email: "info@dmeconsulting-us.com",
      },
    },
    social: {
      content: {
        links: [
          { platform: "Facebook", url: "https://facebook.com" },
          { platform: "Twitter", url: "https://twitter.com" },
          { platform: "LinkedIn", url: "https://linkedin.com" },
          { platform: "Instagram", url: "https://instagram.com" },
        ],
      },
    },
  };

  const content = { ...defaultContent, ...footerContent };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      default:
        return <Building className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <footer className="bg-[#0b0666] text-white py-16 text-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-white mx-auto rounded-full" />
      </footer>
    );
  }

  return (
    <footer className="relative bg-[#0b0666] text-white overflow-hidden">
      {/* glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#190ab0]/30 blur-[120px]" />

      {/* accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#190ab0] to-transparent" />

      <div className="relative container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-7">
              <img
                src="/logo.png"
                alt="DM Enterprise"
                className="h-12 w-auto"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-logo.png";
                }}
              />
            </div>
            <div className="space-y-4 text-white text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white mt-[2px]" />
                <span>{content.contact?.content?.location || content.company?.content?.address}</span>
              </div>

              {(content.contact?.content?.phones || [content.contact?.content?.phone || content.company?.content?.phone]).map((phone: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-white" />
                  <span>{phone}</span>
                </div>
              ))}

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white" />
                <span>{content.contact?.content?.email || content.company?.content?.email}</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Projects", to: "/projects" },
                
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white">
              Services
            </h4>

            <div className="flex flex-col gap-2">
              {content.services?.content?.links?.map((link: any, i: number) => (
                <Link
                  key={i}
                  to={link.url}
                  className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white">
              Follow Us
            </h4>

            <div className="flex gap-4">
              {content.social?.content?.links?.map((link: any, i: number) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white hover:scale-110 transition-all duration-200"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 tracking-wide">
            {currentYear} {content.company?.title}. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-white/40">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-white transition">
              Terms
            </Link>

            <Link to="/sitemap" className="hover:text-white transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}