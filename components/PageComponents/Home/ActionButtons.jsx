"use client";
import Link from "next/link";
import Image from "next/image";

const veltStackLink = {
 name: "VeltStack",
 url: "https://www.veltstack.com/",
};

export default function ActionButtons() {
 return (
  <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start items-center">
   <Link
    href={veltStackLink.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={veltStackLink.name}
    className="group flex items-center justify-center space-x-2 lg:space-x-3 px-6 lg:px-8 py-1 lg:py-2 bg-linear-to-r bg-muted border-2 border-info text-primary rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 lg:text-base w-full sm:w-auto min-w-[200px]"
   >
    <Image
     src="/images/veltstack.png"
     width={40}
     height={40}
     alt=""
     aria-hidden
     className="h-8 w-8 lg:h-10 lg:w-10 object-contain transition-transform duration-300 group-hover:scale-125"
    />
    <span className="font-semibold tracking-tight">{veltStackLink.name}</span>
   </Link>
  </div>
 );
}