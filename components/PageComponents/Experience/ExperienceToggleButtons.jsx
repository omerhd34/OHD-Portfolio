import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export function MobileToggleButton({ isExpanded, onClick, translations }) {
 return (
  <button
   onClick={onClick}
   className="flex items-center space-x-2 cursor-pointer text-green-400 hover:text-green-300 transition-colors duration-200 sm:hidden group"
   aria-expanded={isExpanded}
   aria-label={isExpanded ? translations.showLess : translations.showMore}
  >
   {isExpanded ? (
    <>
     <FaChevronDown className="w-3 h-3 group-hover:translate-y-1 transition-transform duration-200" />
     <span className="text-[15px] font-medium">{translations.showLess}</span>
    </>
   ) : (
    <>
     <FaChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
     <span className="text-[15px] font-medium">{translations.showMore}</span>
    </>
   )}
  </button>
 );
}

export function DesktopToggleButton({ isExpanded, onClick, translations, showExpandButton }) {
 if (!showExpandButton) return null;

 return (
  <button
   onClick={onClick}
   className="hidden sm:flex items-center space-x-2 cursor-pointer text-green-400 hover:text-green-300 transition-colors duration-200 group"
   aria-expanded={isExpanded}
   aria-label={isExpanded ? translations.showLess : translations.showMore}
  >
   {isExpanded ? (
    <>
     <FaChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" />
     <span className="text-[15px] font-medium">{translations.showLess}</span>
    </>
   ) : (
    <>
     <FaChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
     <span className="text-[15px] font-medium">{translations.showMore}</span>
    </>
   )}
  </button>
 );
}