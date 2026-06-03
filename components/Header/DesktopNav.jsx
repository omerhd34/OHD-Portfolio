import Link from "next/link";
import { ServicesNavDropdown } from "./ServicesNavDropdown";

export function DesktopNav({ navigationItems, activeSection, language = "TR" }) {
 return (
  <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
   {navigationItems.map((item) => {
    const isActive = activeSection === item.key;

    if (item.children?.length) {
     return (
      <ServicesNavDropdown key={item.key} item={item} isActive={isActive} language={language} />
     );
    }

    const IconComponent = item.icon;

    return (
     <Link
      key={item.key}
      href={item.href}
      className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-[17px] xl:text-[18px] font-medium transition-all duration-300 group ${isActive
       ? "text-[#81c784] bg-muted"
       : "text-[#a5d6a7] hover:bg-[#1a5745]/50"
       }`}
     >
      <IconComponent className="w-4 h-4" />
      <span>{item.name}</span>
     </Link>
    );
   })}
  </div>
 );
}