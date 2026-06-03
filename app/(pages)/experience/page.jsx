"use client";
import { useState, useEffect } from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { useData } from "../../context/DataContext";
import CategoryTabs from "../../../components/PageComponents/Experience/CategoryTabs";
import ExperienceItem from "../../../components/PageComponents/Experience/ExperienceItem";
import Title from "../../../components/extra/Title";
import "../../styles/experience.css";
import LoadingScreen from "../../../components/extra/LoadingScreen";
import { GrCertificate } from "react-icons/gr";

export default function ExperiencePage() {
 const { language, loading: langLoading } = useLanguage();
 const { experience } = useData();
 const [isVisible, setIsVisible] = useState(false);
 const [activeCategory, setActiveCategory] = useState("education");

 useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 100);
  return () => clearTimeout(timer);
 }, []);

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

 const getCategoryStats = (category) => {
  const items = experienceData[category]?.items || [];
  const completed = items.filter((item) => item.status === "completed").length;
  const current = items.filter((item) => item.status === "current").length;
  return { total: items.length, completed, current };
 };

 const handleCategoryChange = (category) => {
  setActiveCategory(category);
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
      onCategoryChange={handleCategoryChange}
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
    </div>
   </div>
  </section>
 );
}