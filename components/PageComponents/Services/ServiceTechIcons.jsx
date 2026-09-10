import "../../../app/styles/services.css";
import { ICON_MAP, ICON_COLOR_MAP } from "../../extra/icons";
import { primaryServiceTechIcons, serviceTechIconCategories } from "../../../data/services";
import { getServiceTechIconClass, sortServiceTechIcons } from "./serviceTechCategoryUtils";

const TECH_LABELS = {
 FaHtml5: { TR: "HTML5", EN: "HTML5" },
 FaCss3Alt: { TR: "CSS3", EN: "CSS3" },
 FaJsSquare: { TR: "JavaScript", EN: "JavaScript" },
 SiTypescript: { TR: "TypeScript", EN: "TypeScript" },
 FaReact: { TR: "React", EN: "React" },
 TbBrandReactNative: { TR: "React Native", EN: "React Native" },
 SiFlutter: { TR: "Flutter", EN: "Flutter" },
 SiAndroidstudio: { TR: "Android Studio", EN: "Android Studio" },
 SiRedux: { TR: "Redux", EN: "Redux" },
 SiNextdotjs: { TR: "Next.js", EN: "Next.js" },
 SiTailwindcss: { TR: "Tailwind CSS", EN: "Tailwind CSS" },
 SiShadcnui: { TR: "Shadcn", EN: "Shadcn" },
 SiNextui: { TR: "HeroUI", EN: "HeroUI" },
 SiChakraui: { TR: "Chakra UI", EN: "Chakra UI" },
 SiHeadlessui: { TR: "Headless UI", EN: "Headless UI" },
 SiRadixui: { TR: "Radix UI", EN: "Radix UI" },
 FaBootstrap: { TR: "Bootstrap", EN: "Bootstrap" },
 FaNodeJs: { TR: "Node.js", EN: "Node.js" },
 FaJava: { TR: "Java", EN: "Java" },
 SiExpress: { TR: "Express.js", EN: "Express.js" },
 TbApi: { TR: "REST API", EN: "REST API" },
 SiPostman: { TR: "Postman", EN: "Postman" },
 FaDatabase: { TR: "SQL & NoSQL", EN: "SQL & NoSQL" },
 SiMysql: { TR: "MySQL", EN: "MySQL" },
 SiMongodb: { TR: "MongoDB", EN: "MongoDB" },
 SiPostgresql: { TR: "PostgreSQL", EN: "PostgreSQL" },
 SiPrisma: { TR: "Prisma", EN: "Prisma" },
 DiVisualstudio: { TR: "VS Code", EN: "VS Code" },
 BsCursorFill: { TR: "Cursor", EN: "Cursor" },
 FaGitAlt: { TR: "Git", EN: "Git" },
 FaGithub: { TR: "GitHub", EN: "GitHub" },
 SiVercel: { TR: "Vercel", EN: "Vercel" },
 TbSeo: { TR: "SEO", EN: "SEO" },
 SiGooglemaps: { TR: "Google Maps", EN: "Google Maps" },
 SiGoogleanalytics: { TR: "Google Analytics", EN: "Google Analytics" },
 SiGooglesearchconsole: { TR: "Google Search Console", EN: "Google Search Console" },
 IxirhostIcon: {
  TR: "ixirhost | İksir İnternet Hizmetleri A.Ş.", EN: "IXIRHOST | Iksir Internet Services Inc."
 },
 FaCpanel: { TR: "cPanel", EN: "cPanel" },
 SiExpo: { TR: "Expo", EN: "Expo" },
 SiRailway: { TR: "Railway", EN: "Railway" },
 SiRender: { TR: "Render", EN: "Render" },
 FaCloud: { TR: "Cloud", EN: "Cloud" },
 FaServer: { TR: "Server", EN: "Server" },
 FaAppStoreIos: { TR: "App Store", EN: "App Store" },
 FaGooglePlay: { TR: "Google Play", EN: "Google Play" },
 FaTools: { TR: "Bakım Araçları", EN: "Maintenance Tools" },
 FaLaptopCode: { TR: "Kod Denetimi", EN: "Code Review" },
 FaLayerGroup: { TR: "UI Katmanları", EN: "UI Layers" },
 FaSearch: { TR: "Arama Analizi", EN: "Search Analysis" },
 MdDomain: { TR: "Domain", EN: "Domain" },
};

const iconBaseClass =
 "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 group-hover:scale-110";

export default function ServiceTechIcons({ icons, language = "TR", roleId, className = "" }) {
 if (!icons?.length) return null;

 const lang = language === "EN" ? "EN" : "TR";
 const primarySet = new Set(primaryServiceTechIcons[roleId] || []);
 const sortedIcons = sortServiceTechIcons(icons, serviceTechIconCategories);

 return (
  <div className={`flex flex-wrap gap-2.5 mt-4 pb-1 ${className}`}>
   {sortedIcons.map((iconKey) => {
    const Icon = ICON_MAP[iconKey];
    if (!Icon) return null;

    const label = TECH_LABELS[iconKey]?.[lang] || iconKey;
    const colorClass = ICON_COLOR_MAP[iconKey] || "text-[#81c784]";
    const isPrimary = primarySet.has(iconKey);
    const category = serviceTechIconCategories[iconKey] || "frontend";
    const iconWrapClass = getServiceTechIconClass(category, isPrimary);

    return (
     <div key={iconKey} className="group relative flex items-center justify-center">
      <span aria-label={label} className={`${iconBaseClass} ${iconWrapClass}`}>
       <Icon className={`w-[18px] h-[18px] ${colorClass} transition-transform duration-300 group-hover:scale-110`} />
      </span>

      <span className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[#66bb6a]/45 bg-[#1b5e20] px-2.5 py-1 text-[11px] font-semibold text-[#e8f5e9] opacity-0 shadow-[0_4px_14px_rgba(0,0,0,0.35)] translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
       {label}
       <span
        aria-hidden
        className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-[#66bb6a]/45 bg-[#1b5e20]"
       />
      </span>
     </div>
    );
   })}
  </div>
 );
}
