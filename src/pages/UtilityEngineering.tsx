import { Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UtilityEngineering = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <Navbar />
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Wrench className="text-[#190ab0]" size={32} />
          <h1 className="text-4xl font-bold text-slate-900">Utility Engineering</h1>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Comprehensive utility engineering services focused on maintaining and modernizing essential infrastructure 
            that communities rely on every day. From condition assessments to rehabilitation design.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Our Focus</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Infrastructure modernization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Condition assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Rehabilitation design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Community-focused solutions</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Services</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Water Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Sewer Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Stormwater Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Utility Relocation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition">
              Discuss Your Utility Engineering Needs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityEngineering;
