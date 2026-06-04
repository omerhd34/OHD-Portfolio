"use client";

import { useState } from "react";
import Link from "next/link";
import {
 FaClock,
 FaPencilAlt,
 FaFileAlt,
 FaCheck,
 FaArrowRight,
 FaIdCard,
 FaBuilding,
 FaShoppingCart,
 FaMobileAlt,
} from "react-icons/fa";
import { tierKeys, tierLabels } from "../../../data/services";
import { localeUppercase } from "../../../utils/turkishText";

const packageIcons = {
 portfolio: FaIdCard,
 corporate: FaBuilding,
 ecommerce: FaShoppingCart,
 "mobile-portfolio": FaMobileAlt,
 "mobile-corporate": FaBuilding,
 "mobile-ecommerce": FaShoppingCart,
};

const cardAccent = "from-[#1b5e20] to-[#388e3c]";

export default function SitePackageCard({ sitePackage, language, index = 0 }) {
 const [activeTier, setActiveTier] = useState("standart");
 const lang = language === "EN" ? "EN" : "TR";
 const tier = sitePackage.tiers[activeTier];
 const tierFeatures = sitePackage.features[activeTier][lang];
 const Icon = packageIcons[sitePackage.id] || FaIdCard;

 const revisionText =
  tier.revisions == null
   ? lang === "TR"
    ? "Sınırsız"
    : "Unlimited"
   : lang === "TR"
    ? `${tier.revisions}`
    : `${tier.revisions}`;

 const pagesText =
  tier.pages == null
   ? lang === "TR"
    ? "Sınırsız"
    : "Unlimited"
   : lang === "TR"
    ? `${tier.pages}`
    : `${tier.pages}`;

 const revisionLabel =
  lang === "TR" ? localeUppercase("Revizyon", "TR") : "REVISIONS";
 const customPagesLabel = sitePackage.statLabels?.pages?.[lang];
 const pagesLabel = customPagesLabel
  ? lang === "TR"
   ? localeUppercase(customPagesLabel, "TR")
   : customPagesLabel.toUpperCase()
  : lang === "TR"
   ? localeUppercase("Sayfalar", "TR")
   : "PAGES";

 return (
  <article
   className="service-package-card group relative flex flex-col h-full rounded-2xl border border-[#2e7d32]/35 bg-[#0d2821]/90 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#66bb6a]/50 group-hover:shadow-[0_0_28px_rgba(102,187,106,0.15)]"
   style={{ animationDelay: `${index * 120}ms` }}
  >
   <div className={`h-1 w-full bg-linear-to-r ${cardAccent}`} />

   <div className="flex flex-col flex-1 p-5 sm:p-6">
    <div className="flex items-start gap-4 mb-5">
     <div
      className={`shrink-0 w-12 h-12 rounded-xl bg-linear-to-br ${cardAccent} flex items-center justify-center shadow-lg border border-[#66bb6a]/25`}
     >
      <Icon className="w-5 h-5 text-[#e8f5e9]" />
     </div>
     <div className="min-w-0 flex-1">
      <h3 className="text-base sm:text-[17px] font-bold text-[#c8e6c9] leading-snug mb-1.5">
       {sitePackage.title[lang]}
      </h3>
      <p className="text-xs sm:text-sm text-[#a5d6a7] leading-relaxed">
       {sitePackage.description[lang]}
      </p>
     </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-5">
     {tierKeys.map((key) => {
      const isActive = activeTier === key;
      return (
       <button
        key={key}
        type="button"
        onClick={() => setActiveTier(key)}
        className={`service-tier-pill px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${isActive
         ? "bg-[#1b5e20] text-[#e8f5e9] border-[#66bb6a] shadow-md scale-[1.02]"
         : "bg-[#143d32]/60 text-[#81c784] border-[#2e7d32]/50 hover:border-[#66bb6a]/40 hover:text-[#c8e6c9]"
         }`}
       >
        {tierLabels[key][lang]}
       </button>
      );
     })}
    </div>

    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
     <div className="service-stat-box rounded-xl bg-[#143d32]/70 border border-[#2e7d32]/40 px-3 py-3 min-w-0">
      <div className="flex items-center gap-2 text-[#81c784] mb-1 min-w-0">
       <FaClock className="w-3.5 h-3.5 shrink-0" />
       <span className="service-stat-label text-[10px] sm:text-[11px] tracking-wide font-medium">
        {lang === "TR"
         ? localeUppercase("Teslim (gün)", "TR")
         : "DELIVERY (Day)"}
       </span>
      </div>
      <p className="text-xs sm:text-sm font-bold text-[#c8e6c9] whitespace-nowrap">
       {tier.deliveryDays}
      </p>
     </div>
     <div className="service-stat-box rounded-xl bg-[#143d32]/70 border border-[#2e7d32]/40 px-3 py-3 min-w-0">
      <div className="flex items-center gap-2 text-[#81c784] mb-1 min-w-0">
       <FaPencilAlt className="w-3.5 h-3.5 shrink-0" />
       <span className="service-stat-label text-[10px] sm:text-[11px] tracking-wide font-medium">
        {revisionLabel}
       </span>
      </div>
      <p className="text-xs sm:text-sm font-bold text-[#c8e6c9] whitespace-nowrap">
       {revisionText}
      </p>
     </div>
     <div className="service-stat-box rounded-xl bg-[#143d32]/70 border border-[#2e7d32]/40 px-3 py-3 min-w-0">
      <div className="flex items-center gap-2 text-[#81c784] mb-1 min-w-0">
       <FaFileAlt className="w-3.5 h-3.5 shrink-0" />
       <span className="service-stat-label text-[10px] sm:text-[11px] tracking-wide font-medium">
        {pagesLabel}
       </span>
      </div>
      <p className="text-xs sm:text-sm font-bold text-[#c8e6c9] whitespace-nowrap">
       {pagesText}
      </p>
     </div>
    </div>

    <ul className="space-y-2 mb-6 flex-1">
     {tierFeatures.map((feature) => (
      <li
       key={feature}
       className="flex items-center gap-2.5 text-xs sm:text-sm text-[#a5d6a7] group/feature"
      >
       <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#1b5e20]/80 border border-[#66bb6a]/30">
        <FaCheck className="w-2.5 h-2.5 text-[#81c784]" />
       </span>
       <span className="group-hover/feature:text-[#c8e6c9] transition-colors">
        {feature}
       </span>
      </li>
     ))}
    </ul>

    <div className="mt-auto pt-5 border-t border-[#2e7d32]/30 flex justify-center">
     <Link
      href="/contact/"
      className="service-package-cta group/cta w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-[15px] tracking-wide text-[#e8f5e9] transition-all duration-300"
     >
      <span>{lang === "TR" ? "Teklif Al" : "Get a Quote"}</span>
      <FaArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" />
     </Link>
    </div>
   </div>
  </article>
 );
}
