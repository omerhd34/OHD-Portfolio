"use client";

import { useEffect, useState } from "react";
import { getActiveNationalHoliday } from "../../utils/nationalHolidays";
import { TurkishFlag } from "./TurkishFlag";
import "../../app/styles/nationalHoliday.css";

const VARIANT_STYLES = {
 mobile:
  "min-w-0 gap-1.5 rounded-lg border border-[#66bb6a]/30 bg-[#143d32] px-2 py-1.5 shadow-md max-[469px]:max-w-none min-[470px]:max-w-[calc(100vw-10.5rem)] sm:max-w-[calc(100vw-12rem)]",
 desktop:
  "min-h-[44px] gap-2.5 rounded-lg border border-[#66bb6a]/30 bg-[#143d32] px-3 py-2.5 shadow-lg",
};

const FLAG_SIZES = {
 mobile: 22,
 desktop: 44,
};

export default function HolidayBadge({ language = "TR", className = "", variant = "mobile" }) {
 const [holiday, setHoliday] = useState(null);

 useEffect(() => {
  setHoliday(getActiveNationalHoliday());
 }, []);

 if (!holiday) return null;

 const lang = language === "EN" ? "EN" : "TR";
 const holidayName = holiday.name[lang];
 const shortName = holiday.shortName?.[lang] ?? holidayName;
 const styles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.mobile;
 const flagSize = FLAG_SIZES[variant] ?? FLAG_SIZES.mobile;

 return (
  <div
   className={`animate-holiday-banner-in flex min-w-0 items-center ${styles} ${className}`}
   role="status"
   aria-label={holidayName}
   title={holidayName}
  >
   <TurkishFlag size={flagSize} className="shrink-0" />

   {variant === "mobile" ? (
    <>
     <span className="hidden min-[470px]:inline font-semibold leading-snug whitespace-normal text-[#c8e6c9] text-[10px] sm:text-[11px]">
      {holidayName}
     </span>
     <span className="font-semibold whitespace-nowrap text-[#c8e6c9] text-[11px] min-[470px]:hidden">
      {shortName}
     </span>
    </>
   ) : (
    <span className="font-semibold leading-snug whitespace-normal text-[#c8e6c9] text-xs tracking-wide">
     {holidayName}
    </span>
   )}
  </div>
 );
}
