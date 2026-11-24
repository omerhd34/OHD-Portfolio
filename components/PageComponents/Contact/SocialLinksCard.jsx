"use client";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";

export default function SocialLinksCard({ language, isVisible }) {
 const lang = language === "EN" ? "EN" : "TR";
 const title = lang === "EN" ? "Links & Platforms" : "Bağlantılar & Platformlar";

 const profileLinks = [
  {
   name: "VeltStack",
   url: "https://www.veltstack.com/",
   image: "/images/veltstack.png",
  },
  {
   name: "LinkedIn",
   url: "https://www.linkedin.com/in/omerhd1/",
   icon: FaLinkedin,
  },
  {
   name: "GitHub",
   url: "https://github.com/omerhd34",
   icon: FaGithub,
  },
  {
   name: "CV",
   url: lang === "EN" ? "/pdf/cv-eng.pdf" : "/pdf/cv.pdf",
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
        {link.image ? (
         <Image
          src={link.image}
          width={24}
          height={24}
          alt=""
          aria-hidden
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain transition-transform duration-300 group-hover:scale-110"
         />
        ) : (
         <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-[#d4e6f9] transition-colors duration-300" />
        )}
       </div>
      </Link>
     );
    })}
   </div>
  </div>
 );
}