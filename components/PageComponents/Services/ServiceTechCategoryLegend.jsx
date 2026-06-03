import { serviceTechCategoryMeta } from "../../../data/services";

export default function ServiceTechCategoryLegend({ language = "TR", className = "" }) {
 const lang = language === "EN" ? "EN" : "TR";
 const legendTitle = lang === "TR" ? "Renk kodları" : "Color legend";

 return (
  <div className={`mt-4 ${className}`}>
   <p className="text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#81c784]/80 mb-2.5">
    {legendTitle}
   </p>
   <ul className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-2.5 list-none p-0 m-0 max-w-4xl mx-auto">
    {serviceTechCategoryMeta.map(({ id, className: categoryClass, label }) => (
     <li key={id} className="flex items-center gap-2 text-[11px] sm:text-xs text-[#c8e6c9]">
      <span
       className={`shrink-0 w-3.5 h-3.5 rounded-sm ${categoryClass}`}
       aria-hidden
      />
      <span>{label[lang]}</span>
     </li>
    ))}
   </ul>
  </div>
 );
}
