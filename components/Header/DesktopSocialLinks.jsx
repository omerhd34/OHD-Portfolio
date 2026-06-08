"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HolidayBadge from "../extra/HolidayBadge";
import { getActiveNationalHoliday } from "../../utils/nationalHolidays";

export function DesktopSocialLinks({ socialLinks, t, language = "TR" }) {
 const [hasHoliday, setHasHoliday] = useState(false);

 useEffect(() => {
  setHasHoliday(!!getActiveNationalHoliday());
 }, []);

 return (
  <div className="hidden lg:block">
   <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 z-0">
    <div className="flex justify-end">
     <div className="flex items-center gap-3 rounded-b-2xl border-x border-b border-[#2e7d32]/30 bg-info p-3 shadow-xl">
      {hasHoliday && (
       <>
        <HolidayBadge language={language} variant="desktop" className="shrink-0" />
        <div className="h-9 w-px shrink-0 bg-[#66bb6a]/25" aria-hidden="true" />
       </>
      )}

      <div className="flex items-center space-x-3">
       {socialLinks.map((link) => {
        const IconComponent = link.icon;
        return (
         <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-w-[40px] items-center justify-center rounded-lg border border-[#66bb6a]/30 bg-[#143d32] px-3 py-2.5 text-xs font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#81c784] hover:bg-[#1a5745] hover:shadow-xl"
         >
          {link.name === t.cv ? (
           <div className="flex items-center space-x-1">
            <IconComponent className="h-4 w-4 text-[#c8e6c9]" />
            <span className="text-xs font-semibold whitespace-nowrap text-[#c8e6c9]">
             {link.name}
            </span>
           </div>
          ) : (
           <IconComponent className="h-4 w-4 text-[#c8e6c9]" />
          )}
          <div className="absolute inset-0 rounded-lg bg-linear-to-r from-[#1b5e20] to-[#2e7d32] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
         </Link>
        );
       })}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
