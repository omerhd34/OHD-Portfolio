"use client";
import { useState, useEffect, useMemo } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { useData } from "../../context/DataContext";
import ProjectCard from "../../../components/PageComponents/Project/ProjectCard";
import ProjectStats from "../../../components/PageComponents/Project/ProjectStats";
import Title from "../../../components/extra/Title";
import LoadingScreen from "../../../components/extra/LoadingScreen";

export default function ProjectsPage() {
 const { language, t, loading: langLoading } = useLanguage();
 const { projects } = useData();
 const [isVisible, setIsVisible] = useState(false);
 const [searchTerm] = useState("");
 const [filteredProjects, setFilteredProjects] = useState([]);

 useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 100);
  return () => clearTimeout(timer);
 }, []);

 const stats = useMemo(() => {
  if (!projects) return { total: 0, completed: 0, current: 0 };

  const total = projects.length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const current = projects.filter((p) => p.status === "current").length;
  return { total, completed, current };
 }, [projects]);

 useEffect(() => {
  if (!projects) return;

  let filtered = projects;

  if (searchTerm) {
   filtered = filtered.filter(
    (project) =>
     project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.description.toLowerCase().includes(searchTerm.toLowerCase())
   );
  }

  setFilteredProjects(filtered);
 }, [searchTerm, projects]);

 if (langLoading) {
  return <LoadingScreen language={language} />;
 }

 const translations = {
  status: {
   completed: t('projects.status.completed'),
   current: t('projects.status.current'),
   planned: t('projects.status.planned'),
  },
 };

 return (
  <section id="projects" className="relative mt-5 sm:mt-10 md:mt-20 min-h-screen">
   <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
    <FaProjectDiagram
     className={`w-8 h-8 text-green-200 mx-auto mb-2 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    />

    <Title
     title={language === "EN" ? "Projects" : "Projeler"}
     subtitle={language === "EN" ? "Portfolio" : "Çalışmalarım"}
     description={language === "EN" ? "My projects in web and mobile fields" : "Web ve mobil alanlarındaki çalışmalarım"}
     isVisible={isVisible}
    />

    <ProjectStats stats={stats} language={language} isVisible={isVisible} />

    <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
     {filteredProjects.length === 0 ? (
      <div className="text-center py-12">
       <h3 className="text-lg font-semibold mb-2">
        {language === "TR" ? "Proje bulunamadı" : "No projects found"}
       </h3>
       <p className="text-sm">
        {language === "TR"
         ? "Arama kriterlerinizi değiştirmeyi deneyin"
         : "Try changing your search criteria"}
       </p>
      </div>
     ) : (
      <div className="grid gap-6">
       {filteredProjects.map((project, index) => (
        <ProjectCard
         key={project.id}
         project={project}
         translations={translations}
         language={language}
         index={index}
        />
       ))}
      </div>
     )}
    </div>
   </div>
  </section>
 );
}