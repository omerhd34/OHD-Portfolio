"use client";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import { SiFiverr, SiUpwork } from "react-icons/si";

const freelanceLinks = [
 {
  name: "Bionluk",
  url: "https://bionluk.com/omerhd1/profesyonel-bireysel-veya-kurumsal-web-sitesi-kodlarim-821141",
  type: "image",
 },
 {
  name: "Fiverr",
  url: "https://www.fiverr.com/omerhd16/build-responsive-frontend-websites-with-html-css-js-ts-react-nextjs?ref_ctx_id=28b59d10571e49fcb3dbf403eb9dc56b&pckg_id=1&source=seller_page",
  type: "fiverr",
 },
 {
  name: "Upwork",
  url: "https://www.upwork.com/services/product/development-it-full-stack-web-developer-2041191025072031480?ref=fl_profile",
  type: "upwork",
 },
];

export default function SocialLinksCard({ language, isVisible }) {
 const lang = language === "EN" ? "EN" : "TR";
 const title = lang === "EN" ? "Links & Platforms" : "Bağlantılar & Platformlar";

 const profileLinks = [
  {
   name: "LinkedIn",
   url: "https://www.linkedin.com/in/%C3%B6mer-halis-demir-7a9b79169/",
   icon: FaLinkedin,
  },
  {
   name: "GitHub",
   url: "https://github.com/omerhd34",
   icon: FaGithub,
  },
  {
   name: "CV",
   url: lang === "EN" ? "/pdf/cv-eng.pdf#zoom=35" : "/pdf/cv.pdf#zoom=35",
   icon: FaFileDownload,
  },
 ];

 return (
  <div
   className={`bg-secondary p-3 sm:p-8 rounded-b-2xl shadow-b-2xl sm:rounded-b-4xl sm:shadow-b-4xl transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
   <h3 className="text-xl font-bold mb-3 sm:mb-6 flex items-center justify-center space-x-2">
    <span>{title}</span>
   </h3>
   <div className="flex justify-center gap-8 sm:gap-10">
    {profileLinks.map((link, index) => {
     const IconComponent = link.icon;
     const isExternal = link.url.startsWith("http");
     return (
      <Link
       key={link.name}
       href={link.url}
       target={isExternal ? "_blank" : undefined}
       rel={isExternal ? "noopener noreferrer" : undefined}
       aria-label={link.name}
       className="group relative transition-all duration-300 cursor-pointer"
       style={{
        animationDelay: `${index * 100}ms`,
        animation: `bounceIn 0.8s ease-out ${index * 100}ms both`,
       }}
      >
       <div className="absolute inset-0 bg-primary rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
       <div className="relative h-10 w-10 sm:w-14 sm:h-14 bg-primary rounded-full flex items-center justify-center border-2 border-[#01438882] group-hover:border-white transition-all duration-300 group-hover:scale-110">
        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-[#d4e6f9] transition-colors duration-300" />
       </div>
      </Link>
     );
    })}
   </div>

   <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#66bb6a]/20">
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch">
     {freelanceLinks.map((platform, index) => (
      <Link
       key={platform.name}
       href={platform.url}
       target="_blank"
       rel="noopener noreferrer"
       aria-label={platform.name}
       className="group flex flex-1 items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 bg-muted border border-info hover:border-2 text-primary rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 min-w-0 cursor-pointer"
       style={{
        animationDelay: `${(index + 2) * 100}ms`,
        animation: `bounceIn 0.8s ease-out ${(index + 2) * 100}ms both`,
       }}
      >
       {platform.type === "image" ? (
        <Image
         src="/images/bionluk.png"
         width={100}
         height={32}
         alt="Bionluk"
         className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
        />
       ) : platform.type === "fiverr" ? (
        <SiFiverr className="h-7 sm:h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
       ) : (
        <SiUpwork className="h-7 sm:h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
       )}
      </Link>
     ))}
    </div>
   </div>
  </div>
 );
}