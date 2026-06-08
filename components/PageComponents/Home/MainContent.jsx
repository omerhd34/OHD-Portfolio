"use client";
import { FaCode } from "react-icons/fa";
import ActionButtons from "./ActionButtons";

export default function MainContent({ description, language }) {
 const professionTitle =
  language === "EN" ? "Full Stack Developer" : "Full Stack Geliştirici";

 return (
  <div className="grow text-center lg:text-left">
   <div className="mb-4 sm:mb-6">
    <h1 className="text-[26px] sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-linear-to-r from-[#e8f5e9] via-[#a5d6a7] to-[#66bb6a] bg-clip-text text-transparent leading-tight tracking-tight mb-3">
     Ömer Halis DEMİR
    </h1>

    <div className="w-16 sm:w-20 h-0.5 bg-linear-to-r from-[#66bb6a] to-transparent mx-auto lg:mx-0 mb-4" />

    <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1a5745]/60 border border-[#66bb6a]/30 text-[#c8e6c9] text-base sm:text-lg font-semibold shadow-md backdrop-blur-sm">
     <FaCode className="w-4 h-4 sm:w-5 sm:h-5 text-[#66bb6a] shrink-0" />
     <span>{professionTitle}</span>
    </div>
   </div>

   <p className="text-accent leading-relaxed text-[15px] sm:text-[16px] lg:text-[17px] mb-5 sm:mb-7 max-w-2xl mx-auto lg:mx-0 text-left">
    {description}
   </p>

   <ActionButtons />
  </div>
 );
}
