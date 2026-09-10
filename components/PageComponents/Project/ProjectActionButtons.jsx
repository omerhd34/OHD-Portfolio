import Link from "next/link";
import { FaEye, FaExternalLinkAlt, FaImage, FaAward } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";

export default function ProjectActionButtons({
 project,
 electronicsImageUrl,
 buttonTexts,
 isMobile = false,
}) {
 const baseClasses = "flex flex-wrap gap-2 xs:gap-3";
 const displayClasses = isMobile ? "" : "hidden sm:flex sm:gap-4 mb-3 xs:mb-4";

 const certificateUrl = project.id === 7 ? "/images/UstunBasari.png" : null;
 const achievementUrl = project.id === 7 ? "/images/Sertifika.png" : null;

 return (
  <div className={`${baseClasses} ${displayClasses}`}>
   {certificateUrl && (
    <Link
     href={certificateUrl}
     target="_blank"
     rel="noopener noreferrer"
     className="inline-flex items-center px-4 py-2 bg-linear-to-rrom-[#2e7d32] to-[#1a5745] hover:from-[#43a047] hover:to-[#388e3c] text-accent rounded-lg transition-all duration-300 group text-sm shadow-lg hover:shadow-xl"
    >
     <GrCertificate className="w-4 h-4 mr-2 text-orange-300" />
     {buttonTexts.certificate || "Sertifika"}
     <FaExternalLinkAlt className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-200 text-orange-300" />
    </Link>
   )}

   {achievementUrl && (
    <Link
     href={achievementUrl}
     target="_blank"
     rel="noopener noreferrer"
     className="inline-flex items-center px-4 py-2 bg-linear-to-r from-[#2e7d32] to-[#1a5745] hover:from-[#43a047] hover:to-[#388e3c] text-accent rounded-lg transition-all duration-300 group text-sm shadow-lg hover:shadow-xl"
    >
     <FaAward className="w-4 h-4 mr-2 text-orange-300" />
     {buttonTexts.achievement || "Başarı Belgesi"}
     <FaExternalLinkAlt className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-200 text-orange-300" />
    </Link>
   )}

   {project.liveUrl && !certificateUrl && (
    <Link
     href={project.liveUrl}
     target="_blank"
     rel="noopener noreferrer"
     className="inline-flex items-center px-4 py-2 bg-linear-to-r from-[#2e7d32] to-[#1a5745] hover:from-[#43a047] hover:to-[#388e3c] text-accent rounded-lg transition-all duration-300 group text-sm shadow-lg hover:shadow-xl"
    >
     <FaEye className="w-4 h-4 mr-2 text-orange-300" />
     {buttonTexts.liveSite || "Canlı Site"}
     <FaExternalLinkAlt className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-200 text-orange-300" />
    </Link>
   )}

   {!project.liveUrl && !certificateUrl && electronicsImageUrl && (
    <Link
     href={electronicsImageUrl}
     target="_blank"
     rel="noopener noreferrer"
     className="inline-flex items-center px-4 py-2 bg-linear-to-r from-[#2e7d32] to-[#1a5745] hover:from-[#43a047] hover:to-[#388e3c] text-accent rounded-lg transition-all duration-300 group text-sm shadow-lg hover:shadow-xl"
    >
     <FaImage className="w-4 h-4 mr-2 text-orange-300" />
     {buttonTexts.viewImage || "Görsel"}
     <FaExternalLinkAlt className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-200 text-orange-300" />
    </Link>
   )}
  </div>
 );
}