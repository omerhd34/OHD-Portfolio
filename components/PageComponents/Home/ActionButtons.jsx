"use client";
import Link from "next/link";
import Image from "next/image";
import { SiFiverr, SiUpwork } from "react-icons/si";

const freelanceLinks = [
 {
  name: "Bionluk",
  url: "https://bionluk.com/omerhd1/profesyonel-bireysel-veya-kurumsal-web-sitesi-kodlarim-821141",
  type: "image",
 },
 {
  name: "Fiverr",
  url: "https://www.fiverr.com/omerhd16/build-responsive-frontend-websites-with-html-css-js-ts-react-nextjs?ref_ctx_id=28b59d10571e49fcb3dbf403eb9dc56b&pckg_id=1&source=seller_page",
  type: "fiverr",
 },
 {
  name: "Upwork",
  url: "https://www.upwork.com/services/product/development-it-full-stack-web-developer-2041191025072031480?ref=fl_profile",
  type: "upwork",
 },
];

export default function ActionButtons() {
 return (
  <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start items-center">
   {freelanceLinks.map((platform) => (
    <Link
     key={platform.name}
     href={platform.url}
     target="_blank"
     rel="noopener noreferrer"
     aria-label={platform.name}
     className="group flex items-center justify-center space-x-2 lg:space-x-3 px-6 lg:px-8 py-1 lg:py-2 bg-linear-to-r bg-muted border-2 border-info text-primary rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 lg:text-base w-full sm:w-auto min-w-[200px]"
    >
     {platform.type === "image" ? (
      <Image
       src="/images/bionluk.png"
       width={120}
       height={40}
       alt="Bionluk"
       className="h-8 w-auto lg:h-10 object-contain transition-transform duration-300 group-hover:scale-125"
      />
     ) : platform.type === "fiverr" ? (
      <SiFiverr className="h-8 w-auto lg:h-10 transition-transform duration-300 group-hover:scale-125" />
     ) : (
      <SiUpwork className="h-8 w-auto lg:h-10 transition-transform duration-300 group-hover:scale-125" />
     )}
    </Link>
   ))}
  </div>
 );
}
