/* Yetenek listesi */
const skillsList = [
 { categories: ["frontend"], name: "HTML5", experience: 5, icon: "FaHtml5", color: "text-orange-600" },
 { categories: ["frontend"], name: "CSS3", experience: 5, icon: "FaCss3Alt", color: "text-blue-500" },
 { categories: ["frontend", "backend"], name: "JavaScript", experience: 5, icon: "FaJsSquare", color: "text-yellow-400" },
 { categories: ["frontend", "backend"], name: "TypeScript", experience: 4, icon: "SiTypescript", color: "text-blue-600" },
 { categories: ["frontend"], name: "React", experience: 5, icon: "FaReact", color: "text-cyan-400" },
 { categories: ["frontend", "backend"], name: "Next.js", experience: 5, icon: "SiNextdotjs", color: "text-adaptive-icon" },
 { categories: ["frontend"], name: "Tailwind CSS", experience: 5, icon: "SiTailwindcss", color: "text-cyan-500" },
 { categories: ["frontend"], name: "Bootstrap", experience: 5, icon: "FaBootstrap", color: "text-purple-600" },
 { categories: ["backend"], name: "Java & OOP", experience: 2, icon: "FaJava", color: "text-red-600" },
 { categories: ["backend"], name: "Node.js", experience: 4, icon: "FaNodeJs", color: "text-green-600" },
 { categories: ["backend"], name: "Express.js", experience: 4, icon: "SiExpress", color: "text-adaptive-icon" },
 { categories: ["database"], name: "SQL & NoSQL", experience: 4, icon: "FaDatabase", color: "text-green-500" },
 { categories: ["database"], name: "MongoDB", experience: 4, icon: "SiMongodb", color: "text-green-500" },
 { categories: ["database"], name: "MySQL", experience: 4, icon: "SiMysql", color: "text-blue-600" },
 { categories: ["database"], name: "PostgreSQL", experience: 4, icon: "SiPostgresql", color: "text-blue-600" },
 { categories: ["database"], name: "Prisma", experience: 4, icon: "SiPrisma", color: "text-indigo-600" },
 { categories: ["tools"], name: "Visual Studio Code", experience: 5, icon: "DiVisualstudio", color: "text-blue-500" },
 { categories: ["tools"], name: "Cursor", experience: 5, icon: "BsCursorFill", color: "text-adaptive-icon" },
 { categories: ["tools"], name: "Git", experience: 5, icon: "FaGitAlt", color: "text-orange-600" },
 { categories: ["tools"], name: "GitHub", experience: 5, icon: "FaGithub", color: "text-adaptive-icon" },
 { categories: ["tools"], name: "Vercel", experience: 4, icon: "SiVercel", color: "text-adaptive-icon" },
 { categories: ["tools"], name: "Postman", experience: 4, icon: "SiPostman", color: "text-orange-500" },
 { categories: ["tools"], name: "Claude AI", experience: 3, icon: "SiClaude", color: "text-orange-400" },
 { categories: ["tools"], name: "ChatGPT", experience: 3, icon: "SiOpenai", color: "text-adaptive-icon" },
 { categories: ["backend"], name: "REST API", experience: 5, icon: "TbApi", color: "text-green-500" },
 { categories: ["backend"], name: "İyzico", experience: 3, icon: "SiStripe", color: "text-purple-500" },
 { categories: ["frontend"], name: "Redux", experience: 3, icon: "SiRedux", color: "text-purple-500" },
];

function groupSkillsByCategory(list) {
 return list.reduce((acc, skill) => {
  skill.categories.forEach((category) => {
   if (!acc[category]) acc[category] = { skills: [] };
   acc[category].skills.push({
    name: skill.name,
    icon: skill.icon,
    experience: String(skill.experience),
    color: skill.color,
   });
  });
  return acc;
 }, {});
}

export const groupedSkills = groupSkillsByCategory(skillsList);
