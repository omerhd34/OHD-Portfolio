"use client";
import { useState } from "react";
import { FaLightbulb, FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function InterestsCard({ interestsText, translations, language, isVisible }) {
 const [isExpanded, setIsExpanded] = useState(false);

 const showMoreText = language === "EN" ? "Show More" : "Daha Fazla";
 const showLessText = language === "EN" ? "Show Less" : "Daha Az";
 const title = language === "EN" ? "My Interests" : "İlgi Alanlarım";


 return (
  <div
   className={`bg-secondary p-4 sm:p-8 rounded-4xl shadow-4xl h-full flex flex-col transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
   <div className="text-center mb-3 sm:mb-6">
    <FaLightbulb className="w-8 h-8 mx-auto mb-3" />
    <h3 className="text-2xl font-bold">{title}</h3>
   </div>
   <div className="flex flex-col flex-1 text-[16px] text-left leading-relaxed">
    <div className="flex-1">
     <p className="mb-4">{interestsText.preview}</p>

     {interestsText.hasMore && (
      <div
       className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
       <p className="mb-4 animate-fadeInUp">{interestsText.remaining}</p>
      </div>
     )}
    </div>

    {interestsText.hasMore && (
     <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="flex items-center gap-2 cursor-pointer text-[#43a047] hover:text-[#388e3c] transition-colors duration-300 font-medium mt-4 mx-auto animate-bounceIn"
     >
      {isExpanded ? (
       <>
        <span>{showLessText}</span>
        <FaChevronDown className="w-3 h-3 text-[#43a047]" />
       </>
      ) : (
       <>
        <span>{showMoreText}</span>
        <FaChevronRight className="w-3 h-3 text-[#43a047]" />
       </>
      )}
     </button>
    )}
   </div>
  </div>
 );
}