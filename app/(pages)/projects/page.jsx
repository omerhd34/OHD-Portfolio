"use client";

import { useState, useEffect, useMemo } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { useData } from "../../context/DataContext";
import Title from "../../../components/extra/Title";
import ProjectCard from "../../../components/PageComponents/Project/ProjectCard";
import ProjectStats from "../../../components/PageComponents/Project/ProjectStats";
import LoadingScreen from "../../../components/extra/LoadingScreen";

export default function ProjectsPage() {
 const { language, t, loading: langLoading } = useLanguage();
 const { projects } = useData();
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 100);
  return () => clearTimeout(timer);
 }, []);

 const stats = useMemo(() => {
  if (!projects) return { total: 0, completed: 0, current: 0 };

  return {
   total: projects.length,
   completed: projects.filter((p) => p.status === "completed").length,
   current: projects.filter((p) => p.status === "current").length,
  };
 }, [projects]);

 if (langLoading) {
  return <LoadingScreen language={language} />;
 }

 const lang = language === "EN" ? "EN" : "TR";

 const projectTranslations = {
  status: {
   completed: t("projects.status.completed"),
   current: t("projects.status.current"),
   planned: t("projects.status.planned"),
  },
 };

 return (
  <section id="projects" className="relative mt-5 sm:mt-10 md:mt-20 min-h-screen">
   <div className="block sm:hidden h-1" />
   <div className="min-h-screen relative overflow-hidden text-primary">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10 pb-16">
     <FaProjectDiagram
      className={`w-8 h-8 text-green-200 mx-auto mb-2 transition-all duration-1000 delay-100 ${
       isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
     />

     <Title
      title={lang === "EN" ? "Projects" : "Projeler"}
      subtitle={lang === "EN" ? "Portfolio" : "Çalışmalarım"}
      description={
       lang === "EN"
        ? "Web and mobile projects I have delivered — from portfolio sites to full-stack applications."
        : "Portföy sitelerinden full-stack uygulamalara kadar geliştirdiğim web ve mobil projeler."
      }
      isVisible={isVisible}
     />

     <ProjectStats stats={stats} language={language} isVisible={isVisible} />

     <div
      className={`transition-all duration-1000 delay-300 ${
       isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
     >
      {!projects || projects.length === 0 ? (
       <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">
         {lang === "TR" ? "Proje bulunamadı" : "No projects found"}
        </h3>
       </div>
      ) : (
       <div className="grid gap-6">
        {projects.map((project, index) => (
         <ProjectCard
          key={project.id}
          project={project}
          translations={projectTranslations}
          language={language}
          index={index}
         />
        ))}
       </div>
      )}
     </div>
    </div>
   </div>
  </section>
 );
}
