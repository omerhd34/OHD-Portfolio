"use client";
import { useState, useEffect } from "react";
import {
 FaUser,
 FaCode,
 FaDatabase,
 FaLaptopCode,
 FaServer,
 FaTools,
} from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { useData } from "../../context/DataContext";
import Title from "../../../components/extra/Title";
import CategoryButton from "../../../components/extra/CategoryButton";
import SkillsContent from "../../../components/PageComponents/Skill/SkillsContent";
import "../../styles/about.css";
import InterestsCard from "../../../components/PageComponents/About/InterestsCard";
import PersonalInfoCard from "../../../components/PageComponents/About/PersonalInfoCard";
import JourneyCard from "../../../components/PageComponents/About/JourneyCard";
import LoadingScreen from "../../../components/extra/LoadingScreen";

export default function AboutPage() {
 const { language, t, loading } = useLanguage();
 const { skills } = useData();
 const [isVisible, setIsVisible] = useState(false);
 const [activeCategory, setActiveCategory] = useState("frontend");

 useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 100);
  return () => clearTimeout(timer);
 }, []);

 if (loading) return <LoadingScreen language={language} />;

 const getTextPreview = (text, maxSentences = 3) => {
  if (!text) return { preview: '', hasMore: false };

  const sentences = text
   .split(". ")
   .filter((sentence) => sentence.trim().length > 0);

  if (sentences.length <= maxSentences) {
   return { preview: text, hasMore: false };
  }

  const preview = sentences.slice(0, maxSentences).join(". ") + ".";
  const remaining =
   sentences.slice(maxSentences).join(". ") +
   (sentences[sentences.length - 1].endsWith(".") ? "" : ".");

  return { preview, remaining, hasMore: true };
 };

 const journeyText = getTextPreview(t('about.journeyDescription'), 3);
 const interestsText = getTextPreview(t('about.interestsDescription'), 3);

 const categoryIcons = {
  frontend: FaLaptopCode,
  backend: FaServer,
  tools: FaTools,
  database: FaDatabase,
 };

 const categoryColors = {
  frontend: "bg-green-700",
  backend: "bg-green-700",
  database: "bg-green-700",
  tools: "bg-green-700",
 };

 const skillsData = Object.keys(skills).reduce((acc, key) => {
  acc[key] = {
   ...skills[key],
   icon: categoryIcons[key],
   color: categoryColors[key],
  };
  return acc;
 }, {});

 const skillsTranslations = {
  title: language === "EN" ? "Skills" : "Yetenekler",
  subtitle: language === "EN" ? "Technical Skills" : "Teknik Beceriler",
  description:
   language === "EN"
    ? "With the deep technical knowledge and experience I've gained throughout my web development journey, I create user-centric and innovative solutions. I confidently navigate across a broad technology spectrum from frontend to backend, excelling at every layer."
    : "Web geliştirme serüvenimde edindiğim derin teknik bilgi ve deneyimle, kullanıcı odaklı ve yenilikçi çözümler üretiyorum. Frontend'den backend'e uzanan geniş teknoloji yelpazesinde, her katmanda güvenle hareket ediyorum.",
  categories: {
   frontend: {
    title: "Frontend",
    description:
     language === "EN"
      ? "Frontend technologies and frameworks"
      : "Frontend teknolojileri ve framework'ler",
   },
   backend: {
    title: "Backend",
    description:
     language === "EN"
      ? "Backend technologies and frameworks"
      : "Backend teknolojileri ve framework'ler",
   },
   database: {
    title: language === "EN" ? "Database" : "Veritabanı",
    description:
     language === "EN"
      ? "Database Technologies"
      : "Veritabanı Teknolojileri",
   },
   tools: {
    title:
     language === "EN" ? "Development Environment" : "Geliştirme Ortamı",
    description:
     language === "EN"
      ? "Development tools and platforms"
      : "Geliştirme araçları ve platformlar",
   },
  },
  categoryStats: {
   skills: language === "EN" ? "Skills" : "Yetenek",
   technologies: language === "EN" ? "Technologies" : "Teknoloji",
  },
  yearsExp: language === "EN" ? "Years Experience" : "Yıl Deneyim",
 };

 const getCategoryStats = (category) => {
  const categorySkills = skillsData[category]?.skills || [];
  return { count: categorySkills.length };
 };

 return (
  <section id="about" className="relative mt-5 sm:mt-10 md:mt-20 min-h-screen">
   <div className="block sm:hidden h-1" />
   <div className="min-h-screen relative overflow-hidden text-primary">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
     <FaUser
      className={`w-8 h-8 text-green-200 mx-auto mb-2 sm:mb-3 transition-all duration-1000 ${isVisible
       ? "opacity-100 translate-y-0"
       : "opacity-0 translate-y-10"
       }`}
     />

     <Title
      title={language === "EN" ? "About" : "Hakkımda"}
      subtitle={language === "EN" ? "Career and Vision" : "Kariyerim ve Vizyonum"}
      isVisible={isVisible}
      description={language === "EN" ? "The experiences I have gained throughout my career, my personal development journey, and my future goals are detailed below." : "Kariyerim boyunca edindiğim deneyimler, kişisel gelişim yolculuğum ve geleceğe dair hedeflerim aşağıda detaylandırılmıştır."}
     />

     <div className="max-w-none mx-auto space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
       <JourneyCard journeyText={journeyText} language={language} isVisible={isVisible} />
       <InterestsCard interestsText={interestsText} language={language} isVisible={isVisible} />
      </div>
      <PersonalInfoCard language={language} isVisible={isVisible} />
     </div>

     <div id="skills" className="mt-16 sm:mt-20 md:mt-24">
      <div
       className={`text-center mb-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
       <FaCode className="w-8 h-8 mx-auto text-green-200" />
      </div>

      <Title
       title={skillsTranslations.title}
       subtitle={skillsTranslations.subtitle}
       description={skillsTranslations.description}
       isVisible={isVisible}
      />

      <div
       className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-5 sm:mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
       {Object.entries(skillsData).map(([key, data]) => {
        const stats = getCategoryStats(key);
        return (
         <CategoryButton
          key={key}
          categoryKey={key}
          title={skillsTranslations.categories[key]?.title || key}
          count={stats.count}
          countLabel={skillsTranslations.categoryStats.skills}
          icon={data.icon}
          color={data.color}
          isActive={activeCategory === key}
          onClick={setActiveCategory}
         />
        );
       })}
      </div>

      <SkillsContent
       activeCategory={activeCategory}
       skillsData={skillsData}
       translations={skillsTranslations}
       isVisible={isVisible}
      />
     </div>
    </div>
   </div>
  </section>
 );
}
