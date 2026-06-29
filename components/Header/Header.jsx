"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../app/context/LanguageContext";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { LanguageSelector } from "./LanguageSelector";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileNav } from "./MobileNav";
import { DesktopSocialLinks } from "./DesktopSocialLinks";
import HolidayBadge from "../extra/HolidayBadge";
import { serviceRoles } from "../../data/services";

import {
 FaUser,
 FaBriefcase,
 FaProjectDiagram,
 FaCogs,
 FaEnvelope,
 FaLinkedin,
 FaGithub,
 FaFileDownload,
} from "react-icons/fa";

const languagesConfig = [
 { code: "TR", name: "Türkçe", countryCode: "TR" },
 { code: "EN", name: "English", countryCode: "US" },
];

const getNavigationItems = (t, currentLanguage) => [
 {
  key: 'about',
  href: '/about',
  icon: FaUser,
  name: currentLanguage === 'TR' ? "Hakkımda" : "About"
 },
 {
  key: 'experience',
  href: '/experience',
  icon: FaBriefcase,
  name: currentLanguage === 'TR' ? "Deneyimler" : "Experiences"
 },
 {
  key: 'projects',
  href: '/projects',
  icon: FaProjectDiagram,
  name: currentLanguage === 'TR' ? "Projeler" : "Projects"
 },
 {
  key: 'services',
  href: '/services',
  icon: FaCogs,
  name: currentLanguage === 'TR' ? "Hizmetler" : "Services",
  children: serviceRoles.map((role) => ({
   key: role.id,
   href: `/services#${role.id}`,
   name: role.label[currentLanguage === "TR" ? "TR" : "EN"],
   image: role.image,
   intro: role.intro[currentLanguage === "TR" ? "TR" : "EN"],
   description: role.menuDescription[currentLanguage === "TR" ? "TR" : "EN"],
   technologies: role.technologies || [],
  })),
 },
 {
  key: 'contact',
  href: '/contact',
  icon: FaEnvelope,
  name: currentLanguage === 'TR' ? "İletişim" : "Contact"
 }
];

const getSocialLinks = (t, language) => [
 {
  name: "Linkedin",
  href: 'https://www.linkedin.com/in/omerhd1/',
  icon: FaLinkedin
 },
 {
  name: "FaGithub",
  href: 'https://github.com/omerhd34',
  icon: FaGithub
 },
 {
  name: "CV",
  href: language === 'EN' ? '/pdf/cv-eng.pdf' : '/pdf/cv.pdf',
  icon: FaFileDownload
 }
];

export default function Header({ language = "TR", onLanguageChange }) {
 const pathname = usePathname();
 const { t, loading: langLoading } = useLanguage();
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [isHovered, setIsHovered] = useState(false);

 const toggleMenu = () => {
  setIsMenuOpen((prev) => !prev);
 };

 const handleLanguageChange = (lang) => {
  if (onLanguageChange) {
   onLanguageChange(lang);
  }
 };

 const handleNavigationClick = () => {
  setIsMenuOpen(false);
 };

 useEffect(() => {
  setIsMenuOpen(false);
 }, [pathname]);

 if (langLoading) return null;

 const navigationItems = getNavigationItems(t, language);
 const socialLinks = getSocialLinks(t, language);

 const getActiveSection = () => {
  const currentPath = pathname?.replace(/\/$/, "") || "";
  const activeItem = navigationItems.find((item) => {
   const itemPath = item.href?.replace(/\/$/, "") || "";
   return itemPath === currentPath || currentPath.startsWith(`${itemPath}/`);
  });
  return activeItem?.key || null;
 };

 const activeSection = getActiveSection();

 return (
  <header className="sticky top-0 z-50 2xl:-mb-20 backdrop-blur-md ">
   <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-2 sm:pt-3 ">
    <nav className="bg-[#0d2821] backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl rounded-b-2xl min-[1152px]:rounded-b-none shadow-2xl border border-[#2e7d32]/30 relative z-10 overflow-visible">
     <div className="flex justify-between items-center">
      <Logo isHovered={isHovered} setIsHovered={setIsHovered} />
      <DesktopNav navigationItems={navigationItems} activeSection={activeSection} language={language} />
      <div className="flex min-w-0 shrink items-center gap-2">
       <HolidayBadge language={language} variant="mobile" className="lg:hidden" />
       <LanguageSelector
        language={language}
        handleLanguageChange={handleLanguageChange}
        languagesConfig={languagesConfig}
       />
       <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} t={{ openMenu: t('header.openMenu') }} />
      </div>
     </div>
     <MobileNav
      isMenuOpen={isMenuOpen}
      navigationItems={navigationItems}
      activeSection={activeSection}
      handleNavigationClick={handleNavigationClick}
      language={language}
      languagesConfig={languagesConfig}
      handleLanguageChange={handleLanguageChange}
      socialLinks={socialLinks}
      t={{ cv: t('header.cv') }}
     />
    </nav>
   </div>
   <DesktopSocialLinks socialLinks={socialLinks} t={{ cv: t('header.cv') }} language={language} />
  </header>
 );
}
