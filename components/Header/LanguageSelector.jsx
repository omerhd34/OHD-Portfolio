"use client";
import { useState, useRef, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

export function LanguageSelector({ language, handleLanguageChange, languagesConfig }) {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef(null);

 useEffect(() => {
  const handleClickOutside = (event) => {
   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setIsOpen(false);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, []);

 const currentLanguage = languagesConfig.find(lang => lang.code === language);

 return (
  <div className="relative" ref={dropdownRef}>
   <button
    onClick={() => setIsOpen(!isOpen)}
    className="hidden lg:flex items-center space-x-2 px-3 py-2 text-[#a5d6a7] hover:bg-[#2e7d32]/10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#66bb6a]/50 border border-[#66bb6a]/30 text-sm cursor-pointer hover:cursor-pointer font-semibold"
   >
    <div className="flex items-center">
     <ReactCountryFlag
      countryCode={currentLanguage?.countryCode || "TR"}
      svg
      style={{
       width: "20px",
       height: "16px",
      }}
      title={currentLanguage?.name || "Turkey"}
     />
    </div>
    <span className="font-semibold">{language}</span>
    <svg
     className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
     fill="none"
     stroke="currentColor"
     viewBox="0 0 24 24"
    >
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
     />
    </svg>
   </button>

   {isOpen && (
    <div className="absolute top-full left-0 mt-2 py-2 w-22 bg-[#143d32] rounded-lg shadow-xl border border-[#66bb6a]/30 z-50">
     {languagesConfig.map((lang) => (
      <button
       key={lang.code}
       onClick={() => {
        handleLanguageChange(lang.code);
        setIsOpen(false);
       }}
       className={`flex items-center space-x-2 w-full px-3 py-2 text-sm transition-all duration-300 cursor-pointer hover:cursor-pointer font-semibold ${language === lang.code
        ? "text-[#c8e6c9] bg-[#2e7d32]/20"
        : "text-[#a5d6a7] hover:text-[#81c784] hover:bg-[#2e7d32]/10"
        }`}
      >
       <div className="flex items-center">
        <ReactCountryFlag
         countryCode={lang.countryCode}
         svg
         style={{
          width: "20px",
          height: "16px",
         }}
         title={lang.name}
        />
       </div>
       <span>{lang.code}</span>
      </button>
     ))}
    </div>
   )}
  </div>
 );
}
