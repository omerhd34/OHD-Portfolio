"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRight, FaCogs } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import Title from "../../../components/extra/Title";
import LoadingScreen from "../../../components/extra/LoadingScreen";
import ServiceTechIcons from "../../../components/PageComponents/Services/ServiceTechIcons";
import ServiceTechCategoryLegend from "../../../components/PageComponents/Services/ServiceTechCategoryLegend";
import { serviceRoles } from "../../../data/services";
import {
 syncServiceRoleFromHash,
} from "../../../components/Header/serviceNavUtils";
import "../../styles/services.css";

export default function ServicesPage() {
 const { language, loading: langLoading } = useLanguage();
 const pathname = usePathname();
 const [isVisible, setIsVisible] = useState(false);
 const [activeRole, setActiveRole] = useState(serviceRoles[0].id);

 useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 100);
  return () => clearTimeout(timer);
 }, []);

 useEffect(() => {
  const handleHashSync = () => syncServiceRoleFromHash(setActiveRole);

  handleHashSync();
  window.addEventListener("hashchange", handleHashSync);
  window.addEventListener("popstate", handleHashSync);

  return () => {
   window.removeEventListener("hashchange", handleHashSync);
   window.removeEventListener("popstate", handleHashSync);
  };
 }, []);

 useEffect(() => {
  syncServiceRoleFromHash(setActiveRole);
 }, [pathname]);

 if (langLoading) {
  return <LoadingScreen language={language} />;
 }

 const lang = language === "EN" ? "EN" : "TR";
 const currentRole = serviceRoles.find((r) => r.id === activeRole) || serviceRoles[0];

 const title = lang === "TR" ? "Hizmetler" : "Services";
 const subtitle = lang === "TR" ? "Web, Uygulama ve Dijital Hizmetler" : "Web, App & Digital Services";
 const description =
  lang === "TR"
   ? "Web sitesi ve uygulama yapımı, dijital yenileme, SEO, teknik denetim ile bakım-destek hizmetlerimi inceleyebilirsiniz. Sekmeler arasında geçiş yaparak detayları görüntüleyin."
   : "Explore website and app development, digital renewal, SEO, technical audit, and maintenance services. Switch tabs to view the details.";

 return (
  <section id="services" className="relative mt-5 sm:mt-10 md:mt-20 min-h-screen">
   <div className="min-h-screen relative overflow-hidden text-primary">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10 pb-16">
     <FaCogs
      className={`w-8 h-8 text-green-200 mx-auto mb-2 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
       }`}
     />
     <Title
      title={title}
      subtitle={subtitle}
      description={description}
      isVisible={isVisible}
      descriptionMaxWidth="max-w-5xl xl:max-w-6xl"
     />

     <div
      id={`role-${currentRole.id}`}
      className={`mb-10 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
       }`}
     >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
       {serviceRoles.map((role) => (
        <button
         key={role.id}
         type="button"
         onClick={() => {
          setActiveRole(role.id);
          window.history.replaceState(null, "", `#${role.id}`);
         }}
         className={`service-role-tab px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-[#2e7d32]/40 text-secondary hover:bg-muted/30 ${activeRole === role.id ? "active" : ""
          }`}
        >
         {role.label[lang]}
        </button>
       ))}
      </div>

      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto text-center px-2 sm:px-4 space-y-4">
       <p className="text-[#81c784] text-xs sm:text-sm font-semibold leading-relaxed">
        {currentRole.intro[lang]}
       </p>
       <p className="text-accent text-xs sm:text-sm leading-[1.7] text-left sm:text-center">
        {currentRole.description[lang]}
       </p>
       <ServiceTechIcons
        icons={currentRole.technologies}
        language={language}
        roleId={currentRole.id}
        className="justify-center sm:justify-center"
       />
      </div>
     </div>

     <div
      className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
       }`}
     >
      <ServiceTechCategoryLegend language={language} className="mt-10 sm:mt-12" />
      <div className="flex justify-center px-4 mt-8 sm:mt-10">
       <Link
        href={`/contact?role=${currentRole.id}`}
        className="service-package-cta group/cta inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-[15px] tracking-wide text-[#e8f5e9] transition-all duration-300"
       >
        <span>{lang === "TR" ? "Teklif Al" : "Get a Quote"}</span>
        <FaArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" />
       </Link>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}
