"use client";

import { useState, useEffect, useMemo } from "react";

import { FaBriefcase, FaGraduationCap, FaProjectDiagram } from "react-icons/fa";

import { useLanguage } from "../../context/LanguageContext";

import { useData } from "../../context/DataContext";

import CategoryTabs from "../../../components/PageComponents/Experience/CategoryTabs";

import ExperienceItem from "../../../components/PageComponents/Experience/ExperienceItem";

import ProjectCard from "../../../components/PageComponents/Project/ProjectCard";

import ProjectStats from "../../../components/PageComponents/Project/ProjectStats";

import Title from "../../../components/extra/Title";

import "../../styles/experience.css";

import LoadingScreen from "../../../components/extra/LoadingScreen";

import { GrCertificate } from "react-icons/gr";



export default function ExperiencePage() {

 const { language, t, loading: langLoading } = useLanguage();

 const { experience, projects } = useData();

 const [isVisible, setIsVisible] = useState(false);

 const [activeCategory, setActiveCategory] = useState("education");

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



 const categoryIcons = {

  education: FaGraduationCap,

  internship: FaBriefcase,

  certificates: GrCertificate

 };



 const categoryColors = {

  education: "bg-green-700",

  internship: "bg-green-700",

  certificates: "bg-green-700"

 };



 const experienceData = Object.keys(experience).reduce((acc, key) => {

  acc[key] = {

   ...experience[key],

   icon: categoryIcons[key],

   color: categoryColors[key]

  };

  return acc;

 }, {});



 const pageTranslations = {

  title: language === "EN" ? "Experiences" : "Deneyimler",

  subtitle: language === "EN" ? "Career Journey" : "Kariyer Yolculuğu",

  description: language === "EN"

   ? "The processes I've gone through from my academic life to my professional career and the experiences I've gained"

   : "Akademik hayatımdan profesyonel kariyerime kadar geçirdiğim süreçler ve kazandığım deneyimler",

 };



 const categoryTranslations = {

  education: {

   title: language === "EN" ? "Academic" : "Akademik",

   description: language === "EN"

    ? "My academic background and educational journey"

    : "Akademik geçmişim ve eğitim yolculuğum",

  },

  internship: {

   title: language === "EN" ? "Career" : "Kariyer",

   description: language === "EN"

    ? "Professional experiences and internships"

    : "Profesyonel deneyimlerim ve stajlarım",

  },

  certificates: {

   title: language === "EN" ? "Certificates" : "Sertifikalar",

   description: language === "EN"

    ? "Professional certifications and achievements"

    : "Profesyonel sertifikalar ve başarılar",

  },

 };



 const statusTranslations = {

  completed: language === "EN" ? "Completed" : "Tamamlandı",

  current: language === "EN" ? "Ongoing" : "Devam Ediyor",

  upcoming: language === "EN" ? "Upcoming" : "Yakında",

 };



 const otherTranslations = {

  duration: language === "EN" ? "Duration" : "Süre",

  location: language === "EN" ? "Location" : "Konum",

  gpa: language === "EN" ? "GPA" : "Not Ortalaması",

  technologies: language === "EN" ? "Technologies" : "Teknolojiler",

  achievements: language === "EN" ? "Achievements" : "Başarılar",

  details: language === "EN" ? "Details" : "Detaylar",

  showMore: language === "EN" ? "Show More" : "Daha Fazla",

  showLess: language === "EN" ? "Show Less" : "Daha Az",

 };



 const translations = {

  ...pageTranslations,

  categories: categoryTranslations,

  status: statusTranslations,

  ...otherTranslations,

 };



 const projectTranslations = {

  status: {

   completed: t('projects.status.completed'),

   current: t('projects.status.current'),

   planned: t('projects.status.planned'),

  },

 };



 const getCategoryStats = (category) => {

  const items = experienceData[category]?.items || [];

  const completed = items.filter((item) => item.status === "completed").length;

  const current = items.filter((item) => item.status === "current").length;

  return { total: items.length, completed, current };

 };



 return (

  <section id="exp" className="relative mt-5 sm:mt-10 md:mt-20 min-h-screen">

   <div className="block sm:hidden h-1" />

   <div className="min-h-screen relative overflow-hidden text-primary">

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">

     <FaBriefcase

      className={`w-8 h-8 text-green-200 mx-auto mb-2 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"

       }`}

     />



     <Title

      title={translations.title}

      subtitle={translations.subtitle}

      description={translations.description}

      isVisible={isVisible}

     />



     <CategoryTabs

      experienceData={experienceData}

      translations={translations}

      activeCategory={activeCategory}

      onCategoryChange={setActiveCategory}

      getCategoryStats={getCategoryStats}

      isVisible={isVisible}

      language={language}

     />



     <div

      className={`bg-secondary p-8 rounded-2xl shadow-2xl sm:rounded-4xl sm:shadow-4xl transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"

       }`}

     >

      <div className="text-center mb-8">

       <h3 className="text-2xl font-bold mb-2">

        {translations.categories[activeCategory]?.title || activeCategory}

       </h3>

       <p className="text-base px-2">

        {translations.categories[activeCategory]?.description || ''}

       </p>

      </div>



      <div className="space-y-6">

       {(experienceData[activeCategory]?.items || []).map((item, index) => (

        <ExperienceItem

         key={item.id}

         item={item}

         translations={translations}

         isVisible={isVisible}

         index={index}

         language={language}

        />

       ))}

      </div>

     </div>



     <div id="projects" className="mt-16 sm:mt-20 md:mt-24">

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

   </div>

  </section>

 );

}

