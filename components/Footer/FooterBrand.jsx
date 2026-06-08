import Link from "next/link";
import { FaCode } from "react-icons/fa";

const roleByLanguage = {
 TR: "Full-stack Geliştirici",
 EN: "Full-stack Developer",
};

export default function FooterBrand({ language = "EN" }) {
 const role = roleByLanguage[language] || roleByLanguage.EN;

 return (
  <div className="lg:col-span-1">
   <Link href="/" className="inline-block group">
    <div className="space-y-3">
     <h3 className="text-2xl sm:text-[28px] font-bold bg-linear-to-r from-[#c8e6c9] via-[#66bb6a] to-[#81c784] bg-clip-text text-transparent leading-tight tracking-wide font-[Garamond] transition-all duration-500 group-hover:brightness-110">
      Ömer Halis DEMİR
     </h3>

     <div className="w-10 h-0.5 bg-linear-to-r from-[#66bb6a] to-transparent group-hover:w-16 transition-all duration-500" />

     <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a5745]/50 border border-[#66bb6a]/25 text-[#c8e6c9] text-sm font-medium shadow-sm group-hover:border-[#66bb6a]/50 group-hover:bg-[#1a5745]/70 transition-all duration-300">
      <FaCode className="w-3.5 h-3.5 text-[#66bb6a] shrink-0" />
      <span>{role}</span>
     </div>
    </div>
   </Link>
  </div>
 );
}
