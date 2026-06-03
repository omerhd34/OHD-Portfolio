"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaCogs } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import Title from "../../../components/extra/Title";
import LoadingScreen from "../../../components/extra/LoadingScreen";
import SitePackageCard from "../../../components/PageComponents/Services/SitePackageCard";
import ServiceTechIcons from "../../../components/PageComponents/Services/ServiceTechIcons";
import ServiceTechCategoryLegend from "../../../components/PageComponents/Services/ServiceTechCategoryLegend";
import { serviceRoles, sitePackages, mobilePackages, sharedPackageIncludes, sharedMobilePackageIncludes } from "../../../data/services";
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
 const showSitePackages = currentRole.packageType === "web";
 const showMobilePackages = currentRole.packageType === "app";
 const showPackages = showSitePackages || showMobilePackages;

 const activePackages = showMobilePackages ? mobilePackages : sitePackages;
 const packagesIntro = showMobilePackages
  ? sharedMobilePackageIncludes[lang].body
  : sharedPackageIncludes[lang];

 const title = lang === "TR" ? "Hizmetler & Paketler" : "Services & Packages";
 const subtitle = lang === "TR" ? "Web ve Uygulama Geliştirme Paketleri" : "Web & Application Development Packages";
 const description =
  lang === "TR"
   ? "Full stack web ve uygulama geliştirme hizmetlerim için paket seviyelerini inceleyebilirsiniz. Sekmeler arasında geçiş yaparak detayları görüntüleyin."
   : "Explore package tiers for my full stack web and application development services. Switch tabs to view the details.";

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
       <p className="text-accent text-xs sm:text-sm leading-[1.7] text-left sm:text-center">
        {packagesIntro}
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
      {showPackages ? (
       <>
        <div className="services-packages-grid grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 max-w-7xl xl:max-w-360 mx-auto w-full">
         {activePackages.map((pkg, index) => (
          <SitePackageCard
           key={pkg.id}
           sitePackage={pkg}
           language={language}
           index={index}
          />
         ))}
        </div>
        <ServiceTechCategoryLegend language={language} className="mt-10 sm:mt-12" />
       </>
      ) : null}
     </div>
    </div>
   </div>
  </section>
 );
}
