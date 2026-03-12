import { Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface Certification {
  id: string;
  name: string;
  image_url: string | null;
  webp_image_url?: string | null;
  order_index: number;
}
const BRAND = "#190ab0";
const fetchCertifications = async (): Promise<Certification[]> => {
  const { data, error } = await supabase
    .from("about_certifications")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data || [];
};

const CertificationsSection = () => {
  const { data: certifications = [], isLoading, error } = useQuery({
    queryKey: ["certifications"],
    queryFn: fetchCertifications,
  });
  return (
    <section className="bg-muted py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 text-center">
          
          <p className="text-xl tracking-[0.10em] uppercase font-medium mb-3" style={{ color: BRAND }}>
            Certifications
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 7 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-200 rounded-lg animate-pulse"
              />
            ))
          ) : error ? (
            <div className="text-center text-red-500 col-span-full">
              <p>Error loading certifications. Please try again later.</p>
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center text-muted-foreground col-span-full">
              <p>No certifications available at the moment.</p>
            </div>
          ) : (
            certifications.map((cert) => (
              <div
                key={cert.id}
                className="group relative"
              >
                <OptimizedImage 
                  src={cert.image_url || "/placeholder-certification.png"} 
                  webpSrc={cert.webp_image_url}
                  alt={cert.name}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                  fallbackSrc="/placeholder-certification.png"
                />
                
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
