import { Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GeospatialTechnologies = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <Navbar />
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Globe className="text-[#190ab0]" size={32} />
          <h1 className="text-4xl font-bold text-slate-900">Geospatial Technologies</h1>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Cutting edge GIS solutions and analytical services to meet your specific needs. Our team of GIS professionals 
            will work with you, in the office or in the field, to learn how you work before we build.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Our Approach</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Custom GIS solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Field-to-office workflow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Analytical services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Client-centered design</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Services</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>GIS Mapping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Remote Sensing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Spatial Analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Asset Mapping</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition">
              Discuss Your Geospatial Technology Needs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeospatialTechnologies;
