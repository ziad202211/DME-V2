// Testimonials.tsx

const StarRating = () => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const testimonials = [
  {
    quote:
      "DME was one of the pioneers in supporting our migration and deployment of Oracle Unifier. They are now developing integrated solutions for our enterprise applications, bringing a wealth of experience and staff who go the extra mile. We highly recommend their services for any program.",
    name: "Michael Walsh",
    designation: "LFDC Program Manager",
    org: "DC Water",
    initials: "MW",
    featured: true,
  },
  {
    quote:
      "DME continues to set the standard for excellence in Project Controls, Program Management, and software integration. Their collaborative, proactive approach and depth of expertise make them an ideal partner for any organization seeking to deliver capital projects successfully.",
    name: "Eric Atandi, M.Sc., MBA, PMI-PMP",
    designation: "Engineering Supervisor, PPCO",
    org: "Baltimore Department of Public Works",
    initials: "EA",
    featured: false,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#f4f5f7] py-12 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="text-xl uppercase font-medium mb-6 text-[#190ab0] text-center">
          Client Testimonials
        </p>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`
                flex flex-col gap-5 rounded-2xl p-8 border transition-shadow duration-200
                hover:shadow-[0_6px_28px_rgba(25,10,176,0.09)]
                ${t.featured
                  ? "bg-[#190ab0] border-[#190ab0]"
                  : "bg-white border-neutral-200/70"
                }
              `}
            >
              <StarRating />

              {/* Quote */}
              <div className="relative flex-1 pt-2">
                <span
                  className={`absolute -top-1 -left-1.5 font-serif text-[72px] leading-none select-none pointer-events-none
                    ${t.featured ? "text-white/10" : "text-neutral-100"}`}
                >
                  &ldquo;
                </span>
                <p className={`relative text-sm leading-[1.8] ${t.featured ? "text-white" : "text-neutral-600"}`}>
                  {t.quote}
                </p>
              </div>

              <hr className={t.featured ? "border-white/15" : "border-neutral-100"} />

              {/* Author */}
              <div className="flex items-start gap-3">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
                    ${t.featured ? "bg-white/15 text-white" : "bg-blue-100 text-blue-700"}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className={`text-[13.5px] font-semibold mb-0.5 ${t.featured ? "text-white" : "text-neutral-900"}`}>
                    {t.name}
                  </p>
                  <p className={`text-[11.5px] font-medium mb-0.5 ${t.featured ? "text-white/60" : "text-[#190ab0]"}`}>
                    {t.designation}
                  </p>
                  <p className={`text-[11px] leading-snug ${t.featured ? "text-white/45" : "text-neutral-400"}`}>
                    {t.org}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;