"use client";
import { FaCode, FaRocket, FaGraduationCap } from "react-icons/fa";

export default function StatsCard({ totalSkills, projectsCount, language, isVisible }) {
 const stats = [
  {
   number: `${totalSkills}+`,
   label: language === "EN" ? "Skills" : "Yetenek",
   icon: FaCode
  },
  {
   number: "6",
   label: language === "EN" ? "Years Experience" : "Yıl Deneyim",
   icon: FaGraduationCap
  },
  {
   number: `${projectsCount}`,
   label: language === "EN" ? "Projects" : "Proje",
   icon: FaRocket
  },

 ];

 return (
  <div
   className={`shrink-0 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
  >
   <div className="flex flex-row lg:flex-col gap-8 lg:gap-6 my-4 sm:my-5">
    {stats.map((stat, index) => {
     const IconComponent = stat.icon;
     return (
      <div key={index} className="text-center group">
       <div className="bg-primary w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl">
        <IconComponent className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-primary" />
       </div>
       <div className="text-[15px] sm:text-[16px] lg:text-xl font-bold text-primary mb-1">
        {stat.number}
       </div>
       <div className="text-[15px] sm:text-[16px] lg:text-sm xl:text-base text-primary font-medium px-1 leading-tight">
        {stat.label}
       </div>
      </div>
     );
    })}
   </div>
  </div>
 );
}