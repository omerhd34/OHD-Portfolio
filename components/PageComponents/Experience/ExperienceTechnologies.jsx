import { iconMap, iconColorMap } from "./experienceConstants";

export default function ExperienceTechnologies({ technologies, isMobileExpanded, language }) {
 if (!technologies || technologies.length === 0) return null;

 const getIconName = (iconKey) => {
  const iconNames = {
   FaGraduationCap: { EN: "Graduation Cap", TR: "Mezuniyet" },
   SiAutodesk: { EN: "Autodesk", TR: "Autodesk" },
   FcElectronics: { EN: "Electronics", TR: "Elektronik" },
   SiAutocad: { EN: "AutoCAD", TR: "AutoCAD" },
   GrCertificate: { EN: "Certificate", TR: "Sertifika" },
   FaServer: { EN: "Server", TR: "Sunucu" },
   FaCloud: { EN: "Cloud", TR: "Cloud" },
   FaCpanel: { EN: "cPanel", TR: "cPanel" },
   FaDatabase: { EN: "Database", TR: "Veritabanı" },
   FaGithub: { EN: "GitHub", TR: "GitHub" },
   FaHtml5: { EN: "HTML5", TR: "HTML5" },
   FaJava: { EN: "Java", TR: "Java" },
   FaReact: { EN: "React", TR: "React" },
   FaCss3Alt: { EN: "CSS3", TR: "CSS3" },
   FaBootstrap: { EN: "Bootstrap", TR: "Bootstrap" },
   SiNextdotjs: { EN: "Next.js", TR: "Next.js" },
   SiMongodb: { EN: "MongoDB", TR: "MongoDB" },
   SiTypescript: { EN: "TypeScript", TR: "TypeScript" },
   SiTailwindcss: { EN: "Tailwind CSS", TR: "Tailwind CSS" },
   SiExpress: { EN: "Express.js", TR: "Express.js" },
   SiMysql: { EN: "MySQL", TR: "MySQL" },
   MdElectricBolt: { EN: "Electric", TR: "Elektrik" },
   MdDomain: { EN: "Domain", TR: "Domain" },
   FaGitAlt: { EN: "Git", TR: "Git" },
   FaJsSquare: { EN: "JavaScript", TR: "JavaScript" },
   FaNodeJs: { EN: "Node.js", TR: "Node.js" },
   SiPrisma: { EN: "Prisma", TR: "Prisma" },
   SiRedux: { EN: "Redux", TR: "Redux" },
   SiVercel: { EN: "Vercel", TR: "Vercel" },
   SiPostgresql: { EN: "PostgreSQL", TR: "PostgreSQL" },
   SiPostman: { EN: "Postman", TR: "Postman" },
   TbApi: { EN: "REST API", TR: "REST API" },
   SiShadcnui: { EN: "shadcn/ui", TR: "shadcn/ui" },
   TbSeo: { EN: "SEO", TR: "SEO" },
   SiGooglegemini: { EN: "Google Gemini", TR: "Google Gemini" },
   SiGoogleanalytics: { EN: "Google Analytics", TR: "Google Analytics" },
   SiGooglesearchconsole: { EN: "Search Console", TR: "Search Console" },
   BsCursorFill: { EN: "Cursor", TR: "Cursor" },
  };

  return iconNames[iconKey]?.[language] || iconKey;
 };

 const getIconColor = (iconName) => {
  return iconColorMap[iconName] || "text-primary";
 };

 return (
  <div className={`flex flex-wrap gap-2 ${!isMobileExpanded ? "hidden sm:flex" : ""}`}>
   {technologies.map((techIconName, techIndex) => {
    const TechIcon = iconMap[techIconName];
    const iconColorClass = getIconColor(techIconName);
    const iconDisplayName = getIconName(techIconName);

    if (!TechIcon) {
     return null;
    }

    return (
     <div
      key={techIndex}
      className="p-2 bg-muted rounded-lg hover:scale-110 transition-all duration-300 group relative"
     >
      <TechIcon
       className={`h-4 w-4 sm:w-5 sm:h-5 ${iconColorClass} transition-colors duration-300`}
      />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
       {iconDisplayName}
      </div>
     </div>
    );
   })}
  </div>
 );
}