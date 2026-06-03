import Link from "next/link";

export function DesktopSocialLinks({ socialLinks, t }) {
 return (
  <div className="hidden lg:block">
   <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 z-0">
    <div className="flex justify-end">
     <div className="flex items-center justify-center bg-info space-x-3 p-3 rounded-b-2xl shadow-xl border-x border-b border-[#2e7d32]/30">
      {socialLinks.map((link) => {
       const IconComponent = link.icon;
       return (
        <Link
         key={link.name}
         href={link.href}
         target="_blank"
         rel="noopener noreferrer"
         className="group relative flex items-center justify-center px-3 py-2.5 bg-[#143d32] hover:bg-[#1a5745] rounded-lg text-xs font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-[#66bb6a]/30 hover:border-[#81c784] min-w-[40px]"
        >
         {link.name === t.cv ? (
          <div className="flex items-center space-x-1">
           <IconComponent className="w-4 h-4 text-[#c8e6c9]" />
           <span className="text-xs whitespace-nowrap text-[#c8e6c9] font-semibold">
            {link.name}
           </span>
          </div>
         ) : (
          <IconComponent className="w-4 h-4 text-[#c8e6c9]" />
         )}
         <div className="absolute inset-0 bg-linear-to-r from-[#1b5e20] to-[#2e7d32] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </Link>
       );
      })}
     </div>
    </div>
   </div>
  </div>
 );
}
