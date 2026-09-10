import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { navigateToServiceRole } from "./serviceNavUtils";

export function MobileNav({
 isMenuOpen,
 navigationItems,
 activeSection,
 handleNavigationClick,
 language,
 languagesConfig,
 handleLanguageChange,
 socialLinks,
 t,
}) {
 const [servicesOpen, setServicesOpen] = useState(false);
 const pathname = usePathname();
 const router = useRouter();

 return (
  <div
   className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-[900px] opacity-100 mt-6" : "max-h-0 opacity-0"
    }`}
  >
   <div className="bg-[#143d32]/95 backdrop-blur-sm rounded-xl p-4 space-y-1 md:space-y-2 border border-[#2e7d32]/30">
    {navigationItems.map((item, index) => {
     const IconComponent = item.icon;
     const isActive = activeSection === item.key;

     if (item.children?.length) {
      return (
       <div key={item.key} style={{ animationDelay: `${index * 50}ms` }}>
        <div
         className={`flex w-full items-center rounded-lg text-[15px] md:text-[18px] font-medium transition-all duration-300 ${isActive
          ? "text-[#c8e6c9] bg-info border-l-4 border-[#66bb6a]"
          : "text-[#c8e6c9] hover:bg-[#1a5745]/10"
          }`}
        >
         <Link
          href={item.href}
          onClick={handleNavigationClick}
          className="flex flex-1 items-center space-x-4 sm:space-x-5 py-2 md:py-3 px-3"
         >
          <IconComponent className="w-4 h-4 sm:h-5 sm:w-5" />
          <span>{item.name}</span>
         </Link>
         <button
          type="button"
          onClick={() => setServicesOpen((prev) => !prev)}
          className="flex items-center justify-center px-4 py-2 md:py-3 shrink-0"
          aria-expanded={servicesOpen}
          aria-label={`${item.name} alt menü`}
         >
          <FaChevronDown className={`w-3 h-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
         </button>
        </div>
        {servicesOpen && (
         <div className="ml-8 mt-1 space-y-1 border-l border-[#66bb6a]/30 pl-3">
          {item.children.map((child) => (
           <Link
            key={child.key}
            href={child.href}
            onClick={(e) => {
             e.preventDefault();
             handleNavigationClick();
             navigateToServiceRole(child.key, pathname, router);
            }}
            className="block py-2 text-[13px] md:text-[15px] text-[#a5d6a7] hover:text-[#c8e6c9] transition-colors"
           >
            {child.name}
           </Link>
          ))}
         </div>
        )}
       </div>
      );
     }

     return (
      <Link
       key={item.key}
       href={item.href}
       onClick={handleNavigationClick}
       className={`flex items-center space-x-4 sm:space-x-5 py-2 md:py-3 px-3 rounded-lg text-[15px] md:text-[18px] font-medium transition-all duration-300 ${isActive
        ? "text-[#c8e6c9] bg-info border-l-4 border-[#66bb6a]"
        : "text-[#c8e6c9] hover:bg-[#1a5745]/10"
        }`}
       style={{ animationDelay: `${index * 50}ms` }}
      >
       <IconComponent className="w-4 h-4 sm:h-5 sm:w-5" />
       <span>{item.name}</span>
      </Link>
     );
    })}

    <div className="py-3 my-0 border-t border-[#2e7d32]/30">
     <div className="flex justify-center space-x-3">
      {languagesConfig.map((lang) => (
       <button
        key={lang.code}
        onClick={() => handleLanguageChange(lang.code)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${language === lang.code
         ? "text-[#c8e6c9] bg-[#1b5e20] border border-[#66bb6a]"
         : "text-[#c8e6c9] hover:bg-[#1a5745]/10"
         }`}
       >
        <div className="flex items-center">
         <ReactCountryFlag
          countryCode={lang.countryCode}
          svg
          style={{ width: "20px", height: "16px" }}
          title={lang.name}
         />
        </div>
        <span className="text-xs">{lang.code}</span>
       </button>))}
     </div>
    </div>

    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#66bb6a]/30">
     {socialLinks.map((link) => {
      const IconComponent = link.icon;
      return (
       <Link
        key={link.name}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-1.5 px-3 py-2.5 text-primary bg-linear-to-r from-[#143d32] to-[#1a5745] hover:from-[#2e7d32] hover:to-[#388e3c] rounded-lg text-xs font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
       >
        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-[#c8e6c9]" />
        {link.name === t.cv && (
         <span className="truncate text-[#c8e6c9] font-semibold">{link.name}</span>
        )}
       </Link>
      );
     })}
    </div>
   </div>
  </div>
 );
}