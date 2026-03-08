import { BarChart3 } from "lucide-react";

const ProjectControls = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <BarChart3 className="text-[#190ab0]" size={32} />
          <h1 className="text-4xl font-bold text-slate-900">Project Controls</h1>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Data-driven project controls designed to keep complex engineering projects on track—on time, on budget, 
            and within scope. We combine data-driven insight with proven methodologies to monitor progress, manage changes, 
            and control costs.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Our Methodology</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Data-driven decision making</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Progress monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Change management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Cost control strategies</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Services</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Risk Analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Cost Estimating</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Progress Reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Change Management</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition">
              Discuss Your Project Control Needs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectControls;
