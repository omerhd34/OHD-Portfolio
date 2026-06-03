"use client";
import Link from "next/link";
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import { MdEmail } from "react-icons/md";

export default function ContactInfoCard({ language, isVisible }) {
 const title = language === "EN" ? "Contact Information" : "İletişim Bilgileri";

 const contactInfo = [
  {
   icon: FaMapMarkerAlt,
   label: language === "EN" ? "Location:" : "Konum:",
   value: (
    <div className="flex items-center gap-2">
     <span>İstanbul, Türkiye</span>
     <ReactCountryFlag
      countryCode="TR"
      svg
      style={{ width: "30px", height: "30px" }}
      title="Turkey"
     />
    </div>
   ),
  },
  {
   icon: FaPhone,
   label: language === "EN" ? "Phone:" : "Telefon:",
   value: "+90 507 849 29 03",
  },
  {
   icon: FaEnvelope,
   label: language === "EN" ? "Email:" : "E-posta:",
   value: "omerhd16@outlook.com",
  },
 ];

 return (
  <div
   className={`space-y-4 sm:space-y-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
    }`}
  >
   <div className="bg-secondary p-3 sm:p-8 rounded-t-2xl shadow-t-2xl sm:rounded-t-4xl sm:shadow-t-4xl">
    <h3 className="text-[20px] sm:text-2xl font-bold mb-6 flex items-center space-x-2">
     <FaPhone className="w-5 h-5 mr-4" />
     <span>{title}</span>
    </h3>

    <div className="space-y-5">
     {contactInfo.map((info) => {
      const IconComponent = info.icon;
      return (
       <div
        key={info.label}
        className="mt-5 flex items-start space-x-4 p-1 sm:p-3 rounded-lg hover:bg-[#01438882] transition-colors duration-300"
       >
        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
         <IconComponent className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
         <span className="text-[15px] block">{info.label}</span>
         <div className="font-medium text-[16px] wrap-break-words flex items-center gap-2">
          {info.value}

          {info.label === (language === "TR" ? "Telefon:" : "Phone:") && (
           <Link
            href="https://wa.me/905078492903"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-green-500 hover:bg-green-600 rounded-full transition-all duration-300 hover:scale-110"
            title="WhatsApp"
           >
            <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
           </Link>
          )}
          {info.label === (language === "TR" ? "E-posta:" : "Email:") && (
           <Link
            href="mailto:omerhd16@outlook.com"
            className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110"
            title="Outlook ile e-posta gönder"
           >
            <MdEmail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
           </Link>
          )}
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </div>
  </div>
 );
}
