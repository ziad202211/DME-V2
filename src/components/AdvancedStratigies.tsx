// AdvancedStratigies.tsx
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AboutStatistic } from "@/types/supabase";

const checks = [
  "Proven civil and environmental engineering expertise",
  "Cutting-edge geospatial and IT solutions",
  "Strong safety and budget control measures",
  "Tailored services for public and private sectors",
];

const PHOTOS = [
  "/team/thumbnail_IMG_0085-1.jpg",
  "/team/36-768x512.jpg",
];

const AdvancedStratigies = () => {
  const [statistics, setStatistics] = useState<AboutStatistic[]>([]);
  const [stats, setStats] = useState([
      { label: "XP Years", value: "50+" },
      { label: "Projects", value: "500+" },
      { label: "Clients", value: "30+" },
      { label: "Certifications", value: "17" },
  ]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      console.log("Fetching statistics...");
      const { data, error } = await supabase
        .from("about_statistics")
        .select("*")
        .order("order_index", { ascending: true });
      
      console.log("Data:", data);
      console.log("Error:", error);
      
      if (data && data.length > 0) {
        const statsData = data.map((stat) => ({ 
          label: stat.label, 
          value: stat.value || stat.number || stat.count || 'N/A'
        }));
        console.log("Stats data:", statsData);
        setStats(statsData);
        setStatistics(data);
      } else {
        console.log("No data found, using defaults");
      }
      // If no data, keep the default stats
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <section className="bg-[#c8cdd6] pt-12 sm:pt-16 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h2 className="text-center font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-neutral-900 leading-tight mb-5 px-2">
          Advanced Strategies for Modern Development
        </h2>

        {/* Body */}
        <p className="text-center text-sm sm:text-md leading-relaxed text-black mx-auto mb-8 px-2 max-w-3xl">
          DM Enterprise (DME) is a Maryland-based MBE/DBE engineering firm specializing in
          civil engineering, project management, IT solutions, and construction oversight.
          With 50+ years of combined experience, we ensure projects are delivered safely,
          efficiently, and within budget. Here's why you should partner with us:
        </p>

        {/* Checklist */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 items-center px-2">
          {checks.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm sm:text-md leading-snug text-neutral-800">
              <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#190ab0] flex items-center justify-center">
                <CheckCircle2 size={11} className="text-white fill-white stroke-[#190ab0]" />
              </span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex justify-center mb-12 px-2">
            <a href="/about">
          <button className="bg-[#190ab0] hover:bg-[#1408d4] text-white text-xs sm:text-sm font-semibold tracking-wide px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-colors duration-200">
            Read About Us
          </button>
            </a>
        </div>

        {/* Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-1 mb-4">
          {PHOTOS.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-t-md sm:rounded-t-lg">
              <img
                src={src}
                alt={`Team photo ${i + 1}`}
                className="w-full h-48 sm:h-56 md:h-64 object-cover object-top"
              />
            </div>
          ))}
        </div>

      </div>

      {/* Stats — full bleed white bar */}
      <div className="bg-white mt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 sm:divide-x divide-neutral-200 py-8 sm:py-10">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 px-2 sm:px-4 first:pl-0 last:pr-0">
              <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center">
                {s.label}
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#190ab0] leading-none">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedStratigies;