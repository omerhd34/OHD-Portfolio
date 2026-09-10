import { serviceTechIconCategories, serviceTechCategoryMeta } from "./services";

const skillsList = [
 { name: "HTML5", experience: 6, icon: "FaHtml5", color: "text-orange-600" },
 { name: "CSS3", experience: 6, icon: "FaCss3Alt", color: "text-blue-500" },
 { name: "JavaScript", experience: 6, icon: "FaJsSquare", color: "text-yellow-400" },
 { name: "TypeScript", experience: 5, icon: "SiTypescript", color: "text-blue-600" },
 { name: "React", experience: 6, icon: "FaReact", color: "text-cyan-400" },
 { name: "Redux", experience: 4, icon: "SiRedux", color: "text-purple-500" },
 { name: "Next.js", experience: 6, icon: "SiNextdotjs", color: "text-adaptive-icon" },
 { name: "Google Maps", experience: 5, icon: "SiGooglemaps", color: "text-red-500" },
 { name: "Tailwind CSS", experience: 6, icon: "SiTailwindcss", color: "text-cyan-500" },
 { name: "Shadcn", experience: 4, icon: "SiShadcnui", color: "text-adaptive-icon" },
 { name: "HeroUI", experience: 4, icon: "SiNextui", color: "text-adaptive-icon" },
 { name: "Chakra UI", experience: 4, icon: "SiChakraui", color: "text-teal-400" },
 { name: "Headless UI", experience: 4, icon: "SiHeadlessui", color: "text-sky-400" },
 { name: "Radix UI", experience: 4, icon: "SiRadixui", color: "text-adaptive-icon" },
 { name: "Bootstrap", experience: 6, icon: "FaBootstrap", color: "text-purple-600" },
 { name: "Node.js", experience: 5, icon: "FaNodeJs", color: "text-green-600" },
 { name: "Express.js", experience: 5, icon: "SiExpress", color: "text-adaptive-icon" },
 { name: "REST API", experience: 6, icon: "TbApi", color: "text-green-500" },
 { name: "Java & OOP", experience: 3, icon: "FaJava", color: "text-red-600" },
 { name: "MongoDB", experience: 5, icon: "SiMongodb", color: "text-green-500" },
 { name: "MySQL", experience: 5, icon: "SiMysql", color: "text-blue-600" },
 { name: "PostgreSQL", experience: 5, icon: "SiPostgresql", color: "text-blue-600" },
 { name: "Prisma", experience: 5, icon: "SiPrisma", color: "text-indigo-600" },
 { name: "React Native", experience: 4, icon: "TbBrandReactNative", color: "text-cyan-400" },
 { name: "Flutter", experience: 4, icon: "SiFlutter", color: "text-sky-400" },
 { name: "Android Studio", experience: 4, icon: "SiAndroidstudio", color: "text-green-500" },
 { name: "Expo", experience: 4, icon: "SiExpo", color: "text-adaptive-icon" },
 { name: "Vercel", experience: 5, icon: "SiVercel", color: "text-adaptive-icon" },
 { name: "ixirhost", experience: 5, icon: "IxirhostIcon", color: "text-adaptive-icon" },
 { name: "cPanel", experience: 4, icon: "FaCpanel", color: "text-orange-600" },
 { name: "Railway", experience: 4, icon: "SiRailway", color: "text-adaptive-icon" },
 { name: "Render", experience: 4, icon: "SiRender", color: "text-adaptive-icon" },
 { name: "VS Code", experience: 6, icon: "DiVisualstudio", color: "text-blue-500" },
 { name: "Cursor", experience: 6, icon: "BsCursorFill", color: "text-adaptive-icon" },
 { name: "Git", experience: 6, icon: "FaGitAlt", color: "text-orange-600" },
 { name: "GitHub", experience: 6, icon: "FaGithub", color: "text-adaptive-icon" },
 { name: "Postman", experience: 5, icon: "SiPostman", color: "text-orange-500" },
 { name: "SEO", experience: 5, icon: "TbSeo", color: "text-emerald-500" },
 { name: "Google Search", experience: 5, icon: "SiGooglesearchconsole", color: "text-blue-500" },
 { name: "Google Analytics", experience: 5, icon: "SiGoogleanalytics", color: "text-orange-500" },
 { name: "App Store", experience: 4, icon: "FaAppStoreIos", color: "text-adaptive-icon" },
 { name: "Google Play", experience: 4, icon: "FaGooglePlay", color: "text-green-500" },
];

const skillCategoryOverrides = {
 DiVisualstudio: "tools",
 BsCursorFill: "tools",
 FaGitAlt: "tools",
 FaGithub: "tools",
};

export const primarySkillIcons = {
 frontend: ["FaReact", "SiNextdotjs", "SiTypescript", "FaJsSquare"],
 ui: ["SiTailwindcss", "SiShadcnui", "SiNextui"],
 backend: ["FaNodeJs", "SiExpress", "TbApi", "FaJava"],
 database: ["SiMysql", "SiMongodb", "SiPostgresql", "SiPrisma"],
 mobile: ["TbBrandReactNative", "SiFlutter", "SiExpo", "SiAndroidstudio"],
 hosting: ["SiVercel", "SiRailway", "SiRender", "IxirhostIcon"],
 tools: ["BsCursorFill", "FaGitAlt", "FaGithub", "SiPostman"],
 seo: ["TbSeo", "SiGooglesearchconsole", "SiGoogleanalytics"],
 publishing: ["FaAppStoreIos", "FaGooglePlay"],
};

function resolveSkillCategory(icon) {
 return skillCategoryOverrides[icon] || serviceTechIconCategories[icon] || "tools";
}

function buildGroupedSkills() {
 const categoryClassById = Object.fromEntries(
  serviceTechCategoryMeta.map((category) => [category.id, category.className])
 );

 const grouped = Object.fromEntries(
  serviceTechCategoryMeta.map((category) => [category.id, { skills: [] }])
 );

 for (const skill of skillsList) {
  const category = resolveSkillCategory(skill.icon);
  if (!grouped[category]) grouped[category] = { skills: [] };

  grouped[category].skills.push({
   name: skill.name,
   icon: skill.icon,
   experience: String(skill.experience),
   color: skill.color,
   isPrimary: primarySkillIcons[category]?.includes(skill.icon) ?? false,
   categoryIconClass: categoryClassById[category],
  });
 }

 return grouped;
}

export const groupedSkills = buildGroupedSkills();

export const skillCategoryOrder = serviceTechCategoryMeta.map((category) => category.id);

export const skillCategoryIconKeys = {
 frontend: "FaLaptopCode",
 ui: "FaLayerGroup",
 backend: "FaServer",
 database: "TbSql",
 mobile: "RxMobile",
 hosting: "MdDomain",
 tools: "FaTools",
 seo: "FaSearch",
 publishing: "FaStore",
};

export { serviceTechCategoryMeta };
