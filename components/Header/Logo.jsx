import Link from "next/link";
import AnimatedGradient from "../extra/AnimatedGradient";

export function Logo({ isHovered, setIsHovered }) {
 return (
  <Link
   href="/"
   className="flex items-center group relative"
   onMouseEnter={() => setIsHovered(true)}
   onMouseLeave={() => setIsHovered(false)}
  >
   <div className="flex items-center space-x-3 relative">
    <div className="relative flex items-center">
     <AnimatedGradient isHovered={isHovered} />
     <div
      className={`absolute top-1/2 -right-2 w-4 h-px bg-linear-to-r from-[#66bb6a] to-transparent transition-all duration-800 ${isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
       }`}
      style={{
       transformOrigin: "left center",
       transform: "translateY(-50%)",
      }}
     />
    </div>

    <div className="relative hidden min-[400px]:flex min-[1152px]:hidden min-[1440px]:flex items-center">
     <div className={`absolute inset-0 bg-linear-to-r from-[#2e7d32]/20 via-[#66bb6a]/20 to-[#2e7d32]/20 rounded-lg transition-all duration-800 ${isHovered ? "opacity-100 blur-sm scale-110" : "opacity-0 scale-100"
      }`} />
     <span className="relative min-[400px]:text-xl min-[768px]:text-2xl min-[1440px]:text-3xl font-bold leading-none bg-linear-to-r from-[#c8e6c9] via-[#66bb6a] to-[#81c784] bg-clip-text text-transparent tracking-wide whitespace-nowrap font-[Garamond]">
      Ömer Halis Demir
     </span>
    </div>
    <div
     className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${isHovered ? "opacity-30" : "opacity-0"
      }`}
     style={{
      background: "radial-gradient(circle at center, rgba(46, 125, 50, 0.1) 0%, transparent 70%)",
      borderRadius: "50%",
      transform: "scale(1.5)",
     }}
    />
   </div>
  </Link>
 );
}