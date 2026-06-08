"use client";
import { useState, useMemo } from "react";
import { ICON_MAP, ICON_SPECIFIC_COLORS, ELECTRONICS_IMAGES, getStatusBg } from "./constants";
import ProjectHeader from "./ProjectHeader";
import ProjectTechnologies from "./ProjectTechnologies";
import ProjectActionButtons from "./ProjectActionButtons";
import ProjectToggleButton from "./ProjectToggleButton";
import ProjectExpandedContent from "./ProjectExpandedContent";

export default function ProjectCard({ project, translations, language, index }) {
 const [isExpanded, setIsExpanded] = useState(false);

 const buttonTexts = useMemo(
  () => ({
   showLess: language === "TR" ? "Daha Az Göster" : "Show Less",
   showDetails: language === "TR" ? "Daha Fazla" : "Show More",
   projectDetails: language === "TR" ? "Proje Detayları" : "Project Details",
   allFeatures: language === "TR" ? "Tüm Özellikler" : "All Features",
   team: language === "TR" ? "Takım" : "Team",
   myRole: language === "TR" ? "Rolüm" : "My Role",
   projectMetrics: language === "TR" ? "Proje Metrikleri" : "Project Metrics",
  }),
  [language]
 );

 const statusTexts = useMemo(
  () => ({
   completed: language === "TR" ? "Tamamlandı" : "Completed",
   current: language === "TR" ? "Devam Ediyor" : "Ongoing",
   planned: language === "TR" ? "Planlanıyor" : "Planned",
   upcoming: language === "TR" ? "Yakında" : "Upcoming",
  }),
  [language]
 );

 const iconNameMap = {
  SiNextdotjs: "Next.js",
  SiTailwindcss: "Tailwind CSS",
  SiExpress: "Express.js",
  SiMongodb: "MongoDB",
  SiMysql: "MySQL",
  SiTypescript: "TypeScript",
  FaBootstrap: "Bootstrap",
  SiPrisma: "Prisma",
  FaReact: "React",
  FaGitAlt: "Git",
  FaGithub: "GitHub",
  FaHtml5: "HTML5",
  FaCss3Alt: "CSS3",
  FaJsSquare: "JavaScript",
  FaNodeJs: "Node.js",
  FaJava: "Java",
  SiVercel: "Vercel",
  SiPrisma: "Prisma",
  SiPostgresql: "PostgreSQL",
  SiRedux: "Redux",
  SiGooglegemini: "Google Gemini",
  TbApi: "RESTful API",
  TbSeo: "SEO",
 };

 const technologyIcons = useMemo(() => {
  if (!project.technologies || !Array.isArray(project.technologies)) {
   return [];
  }


  return project.technologies
   .map((techIconName, techIndex) => {
    const TechIcon = ICON_MAP[techIconName];
    const iconColorClass = ICON_SPECIFIC_COLORS[techIconName] || "text-gray-400";
    const displayName = iconNameMap[techIconName] || techIconName;

    if (!TechIcon) {
     console.warn(`Icon not found: ${techIconName}`);
     return null;
    }

    return {
     id: `${project.id}-tech-${techIndex}`,
     Icon: TechIcon,
     colorClass: iconColorClass,
     name: displayName,
    };
   })
   .filter(Boolean);
 }, [project.technologies, project.id]);

 const featuresList = useMemo(() => {
  if (!project.features || !Array.isArray(project.features)) {
   return [];
  }
  return project.features;
 }, [project.features]);

 const metricsList = useMemo(() => {
  if (!project.metrics || !Array.isArray(project.metrics)) {
   return [];
  }
  return project.metrics;
 }, [project.metrics]);

 const statusBadgeClass = useMemo(() => getStatusBg(project.status), [project.status]);

 const electronicsImageUrl = useMemo(() => {
  return ELECTRONICS_IMAGES[project.id] || null;
 }, [project.id]);

 return (
  <div
   className="bg-secondary rounded-2xl shadow-2xl sm:rounded-4xl sm:shadow-4xl transition-all duration-300 overflow-hidden"
   style={{
    animation: `slideIn 0.6s ease-out ${index * 200}ms both`,
   }}
  >
   <div className="py-3 px-4 xs:p-5 sm:p-6 lg:p-8">
    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 xl:space-x-8">
     <div className="flex-1 mb-2 sm:mb-6 lg:mb-0">
      <ProjectHeader
       project={project}
       statusTexts={statusTexts}
       statusBadgeClass={statusBadgeClass}
      />

      <ProjectTechnologies technologyIcons={technologyIcons} />

      <ProjectActionButtons
       project={project}
       electronicsImageUrl={electronicsImageUrl}
       buttonTexts={buttonTexts}
      />

      <ProjectToggleButton
       isExpanded={isExpanded}
       onClick={() => setIsExpanded(!isExpanded)}
       buttonTexts={buttonTexts}
      />

      {isExpanded && (
       <div className="sm:hidden mt-4 space-y-4">
        <div className="flex justify-start">
         <div
          className={`text-white inline-flex items-center px-3 py-1 rounded-full text-[14px] font-medium border ${statusBadgeClass}`}
         >
          {statusTexts[project.status]}
         </div>
        </div>

        <ProjectTechnologies technologyIcons={technologyIcons} isMobile={true} />

        <ProjectActionButtons
         project={project}
         electronicsImageUrl={electronicsImageUrl}
         buttonTexts={buttonTexts}
         isMobile={true}
        />
       </div>
      )}
     </div>
    </div>
   </div>

   {isExpanded && (
    <ProjectExpandedContent
     project={project}
     featuresList={featuresList}
     metricsList={metricsList}
     buttonTexts={buttonTexts}
    />
   )}
  </div>
 );
}