import Link from "next/link";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";

export default function CertificateButtons({ language }) {
 const certificateText = language === "EN" ? "Certificate" : "Sertifika";
 const achievementText = language === "EN" ? "Achievement Certificate" : "Başarı Belgesi";

 const buttonBaseClass = "inline-flex items-center px-4 py-2 bg-linear-to-r from-[#2e7d32] to-[#1a5745] hover:from-[#43a047] hover:to-[#388e3c] text-accent rounded-lg transition-all duration-300 group text-sm shadow-lg hover:shadow-xl";

 const buttons = [
  {
   href: "/images/Sertifika.png",
   icon: GrCertificate,
   text: certificateText,
  },
  {
   href: "/images/UstunBasari.png",
   icon: FaAward,
   text: achievementText,
  },
 ];

 return (
  <div className="flex flex-wrap gap-3">
   {buttons.map((button, index) => {
    const IconComponent = button.icon;
    return (
     <Link
      key={index}
      href={button.href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonBaseClass}
     >
      <IconComponent className="w-4 h-4 mr-2 text-orange-300" />
      {button.text}
      <FaExternalLinkAlt className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-200 text-orange-300" />
     </Link>
    );
   })}
  </div>
 );
}