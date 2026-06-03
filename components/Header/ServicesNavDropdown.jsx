"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { navigateToServiceRole } from "./serviceNavUtils";
import ServiceTechIcons from "../PageComponents/Services/ServiceTechIcons";

export function ServicesNavDropdown({ item, isActive, language = "TR" }) {
 const [isOpen, setIsOpen] = useState(false);
 const [hoveredKey, setHoveredKey] = useState(null);
 const [panelTop, setPanelTop] = useState(0);
 const [panelLeft, setPanelLeft] = useState(0);
 const [panelWidth, setPanelWidth] = useState(0);
 const dropdownRef = useRef(null);
 const panelRef = useRef(null);
 const closeTimerRef = useRef(null);
 const pathname = usePathname();
 const router = useRouter();
 const IconComponent = item.icon;

 const previewChild =
  item.children.find((child) => child.key === hoveredKey) || item.children[0];

 const updatePanelPosition = useCallback(() => {
  const nav = dropdownRef.current?.closest("nav");
  if (nav) {
   const rect = nav.getBoundingClientRect();
   setPanelTop(rect.bottom);
   setPanelLeft(rect.left);
   setPanelWidth(rect.width);
  }
 }, []);

 const openMenu = () => {
  if (closeTimerRef.current) {
   clearTimeout(closeTimerRef.current);
   closeTimerRef.current = null;
  }
  updatePanelPosition();
  setIsOpen(true);
 };

 const closeMenu = () => {
  closeTimerRef.current = setTimeout(() => {
   setIsOpen(false);
   setHoveredKey(null);
  }, 120);
 };

 const linkClass = `relative flex items-center space-x-2 pl-3 pr-1 py-2 rounded-l-lg text-[17px] xl:text-[18px] font-medium transition-all duration-300 ${isActive
  ? "text-[#81c784]"
  : "text-[#a5d6a7] hover:text-[#c8e6c9]"
  }`;

 const wrapperClass = `relative flex items-center rounded-lg transition-all duration-300 ${isActive
  ? "bg-muted"
  : "hover:bg-[#1a5745]/50"
  }`;

 useEffect(() => {
  const handleClickOutside = (event) => {
   const inTrigger = dropdownRef.current?.contains(event.target);
   const inPanel = panelRef.current?.contains(event.target);
   if (!inTrigger && !inPanel) {
    setIsOpen(false);
    setHoveredKey(null);
   }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

 useEffect(() => {
  if (!isOpen) return undefined;

  updatePanelPosition();
  window.addEventListener("scroll", updatePanelPosition, true);
  window.addEventListener("resize", updatePanelPosition);

  return () => {
   window.removeEventListener("scroll", updatePanelPosition, true);
   window.removeEventListener("resize", updatePanelPosition);
  };
 }, [isOpen, updatePanelPosition]);

 useEffect(() => {
  setIsOpen(false);
  setHoveredKey(null);
 }, [pathname]);

 useEffect(
  () => () => {
   if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  },
  []
 );

 const megaMenu =
  isOpen &&
  typeof document !== "undefined" &&
  createPortal(
   <div
    ref={panelRef}
    className="fixed z-40 bg-[#143d32] border border-t-0 border-[#2e7d32]/50 shadow-2xl rounded-b-2xl overflow-hidden"
    style={{ top: panelTop, left: panelLeft, width: panelWidth }}
    onMouseEnter={openMenu}
    onMouseLeave={closeMenu}
   >
    <div className="px-4 sm:px-6 py-8">
     <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 min-h-[280px]">
      <div className="lg:w-[260px] xl:w-[280px] shrink-0 py-1">
       <p className="text-[11px] uppercase tracking-[0.2em] text-[#66bb6a] mb-4 font-semibold">
        {item.name}
       </p>
       {item.children.map((child) => (
        <Link
         key={child.key}
         href={child.href}
         onMouseEnter={() => setHoveredKey(child.key)}
         onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          navigateToServiceRole(child.key, pathname, router);
         }}
         className={`block px-3.5 py-3 text-[15px] font-medium rounded-lg transition-all duration-300 border-l-[3px] mb-1 ${hoveredKey === child.key
          ? "text-[#c8e6c9] bg-[#1b5e20]/40 border-[#66bb6a]"
          : "text-[#a5d6a7] border-transparent hover:text-[#81c784] hover:bg-[#2e7d32]/10"
          }`}
        >
         {child.name}
        </Link>
       ))}
      </div>

      {previewChild?.image && (
       <div className="flex-1 flex flex-col sm:flex-row items-center gap-6 lg:gap-8 border-t lg:border-t-0 lg:border-l border-[#2e7d32]/40 pt-6 lg:pt-0 lg:pl-8 min-h-[260px]">
        <div className="relative w-full sm:w-[260px] lg:w-[280px] xl:w-[300px] shrink-0 aspect-square max-h-[280px] rounded-2xl overflow-hidden bg-linear-to-br from-[#0a1f1a] via-[#143d32] to-[#1b5e20] border border-[#66bb6a]/35 shadow-[0_8px_32px_rgba(46,125,50,0.25)] ring-1 ring-[#81c784]/20 flex items-center justify-center self-center">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(102,187,106,0.15),transparent_70%)]" />
         <Image
          src={previewChild.image}
          alt={previewChild.name}
          width={240}
          height={200}
          className="relative z-10 w-[88%] h-auto object-contain transition-all duration-300 drop-shadow-[0_4px_24px_rgba(129,199,132,0.35)]"
          sizes="300px"
         />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1 self-center py-2 max-w-xl xl:max-w-2xl">
         <h3 className="text-base xl:text-lg font-bold text-[#c8e6c9] mb-2">
          {previewChild.name}
         </h3>
         {previewChild.intro && (
          <p className="text-xs sm:text-sm font-semibold text-[#81c784] mb-3 leading-snug">
           {previewChild.intro}
          </p>
         )}
         {previewChild.description && (
          <p className="text-xs sm:text-sm leading-[1.7] text-[#a5d6a7]">
           {previewChild.description}
          </p>
         )}
         <ServiceTechIcons
          icons={previewChild.technologies}
          language={language}
          roleId={previewChild.key}
         />
        </div>
       </div>
      )}
     </div>
    </div>
   </div>,
   document.body
  );

 return (
  <>
   <div
    className="relative"
    ref={dropdownRef}
    onMouseEnter={openMenu}
    onMouseLeave={closeMenu}
   >
    <div className={wrapperClass}>
     <Link href={item.href} className={linkClass}>
      <IconComponent className="w-4 h-4" />
      <span>{item.name}</span>
     </Link>
     <button
      type="button"
      onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
      className={`flex items-center justify-center px-2 py-2 rounded-r-lg transition-all duration-300 cursor-pointer ${isActive
       ? "text-[#81c784]"
       : "text-[#a5d6a7] hover:text-[#c8e6c9]"
       }`}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label={`${item.name} menüsü`}
     >
      <svg
       className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
      >
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
     </button>
    </div>
   </div>
   {megaMenu}
  </>
 );
}
