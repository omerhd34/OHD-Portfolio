"use client";
import { useState } from "react";
import { iconMap, categoryColorMap, getStatusBg } from "./experienceConstants";
import ExperienceHeader from "./ExperienceHeader";
import ExperienceMetaInfo from "./ExperienceMetaInfo";
import ExperienceTechnologies from "./ExperienceTechnologies";
import { MobileToggleButton, DesktopToggleButton } from "./ExperienceToggleButtons";
import ExperienceAchievements from "./ExperienceAchievements";
import CertificateButtons from "./CertificateButtons";

export default function ExperienceItem({ item, translations, isVisible, index, language }) {
 const [isExpanded, setIsExpanded] = useState(false);
 const [isMobileExpanded, setIsMobileExpanded] = useState(false);

 const Icon = typeof item.icon === 'string' ? iconMap[item.icon] : item.icon;
 const showExpandButton = item.achievements && item.achievements.length > 0;

 const showCertificateButtons = item.category === "certificates" &&
  (item.institution === "Europe Coding School & Ecodation" || item.institution?.includes("Europe Coding School & Ecodation"));

 const iconBgColor = categoryColorMap[item.category] || "from-green-900 to-green-400";
 const statusBadgeClass = getStatusBg(item.status);

 return (
  <div
   className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
   style={{
    animationDelay: `${index * 200}ms`,
    animation: `slideIn 0.6s ease-out ${index * 200}ms both`,
   }}
  >
   <div className="bg-info rounded-4xl transition-all duration-300 overflow-hidden">
    <div className="p-5 sm:p-6">
     <ExperienceHeader
      item={item}
      Icon={Icon}
      iconBgColor={iconBgColor}
      statusTexts={translations.status}
      statusBadgeClass={statusBadgeClass}
     />

     <ExperienceMetaInfo item={item} isMobileExpanded={isMobileExpanded} />

     <p
      className={`text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] tracking-tight sm:tracking-normal mb-5 ${!isMobileExpanded ? "hidden sm:block" : ""
       }`}
     >
      {item.description}
     </p>

     <div className="flex flex-col min-[1152px]:flex-row min-[1152px]:items-center min-[1152px]:justify-between gap-4 mb-4">
      <ExperienceTechnologies
       technologies={item.technologies}
       isMobileExpanded={isMobileExpanded}
       language={language}
      />

      {showCertificateButtons && (
       <div className="hidden min-[1152px]:flex min-[1152px]:items-center">
        <CertificateButtons language={language} />
       </div>
      )}
     </div>

     {showCertificateButtons && (
      <div className="flex min-[1152px]:hidden mb-4">
       <CertificateButtons language={language} />
      </div>
     )}

     <MobileToggleButton
      isExpanded={isMobileExpanded}
      onClick={() => setIsMobileExpanded(!isMobileExpanded)}
      translations={translations}
     />

     <DesktopToggleButton
      isExpanded={isExpanded}
      onClick={() => setIsExpanded(!isExpanded)}
      translations={translations}
      showExpandButton={showExpandButton}
     />
    </div>
   </div>

   <ExperienceAchievements
    item={item}
    translations={translations}
    isExpanded={isExpanded}
    isMobileExpanded={isMobileExpanded}
    language={language}
   />
  </div>
 );
}