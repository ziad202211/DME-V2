import { Settings } from "lucide-react";

const ProgramManagement = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Settings className="text-[#190ab0]" size={32} />
          <h1 className="text-4xl font-bold text-slate-900">Program Management</h1>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Comprehensive oversight that drives efficiency, quality, and budgetary discipline across complex initiatives. 
            As the trusted representative of project owners, we apply proven methodologies to mitigate risks, enforce standards, 
            and deliver results that stand the test of time.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Our Approach</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Risk mitigation strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Quality assurance protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Budgetary discipline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Stakeholder coordination</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Services</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Project Planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Design Review</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>QA/QC Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#190ab0] mt-1">•</span>
                  <span>Asset Management</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition">
              Discuss Your Program Management Needs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramManagement;
