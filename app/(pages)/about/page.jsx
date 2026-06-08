"use client";
import { useState, useEffect, useMemo } from "react";
import { FaUser, FaCode } from "react-icons/fa";
import { ICON_MAP } from "../../../components/extra/icons";
import { useLanguage } from "../../context/LanguageContext";
import { useData } from "../../context/DataContext";
import Title from "../../../components/extra/Title";
import CategoryButton from "../../../components/extra/CategoryButton";
import SkillsContent from "../../../components/PageComponents/Skill/SkillsContent";
import "../../styles/about.css";
import "../../styles/skills.css";
import "../../styles/services.css";
import InterestsCard from "../../../components/PageComponents/About/InterestsCard";
import JourneyCard from "../../../components/PageComponents/About/JourneyCard";
import LoadingScreen from "../../../components/extra/LoadingScreen";
import {
 skillCategoryOrder,
 serviceTechCategoryMeta,
 skillCategoryIconKeys,
} from "../../../data/skills";

const categoryIcons = Object.fromEntries(
 Object.entries(skillCategoryIconKeys).map(([key, iconKey]) => [key, ICON_MAP[iconKey]])
);

const categoryColors = {
 frontend: "from-blue-700 to-blue-600",
 ui: "from-teal-700 to-teal-600",
 backend: "from-orange-700 to-orange-600",
 database: "from-slate-600 to-slate-500",
 mobile: "from-cyan-700 to-cyan-600",
 hosting: "from-purple-700 to-purple-600",
 tools: "from-yellow-600 to-amber-600",
 seo: "from-green-700 to-green-600",
 publishing: "from-indigo-700 to-indigo-600",
};

const categoryDescriptions = {
 frontend: {
  TR: "Web arayüzleri, istemci tarafı teknolojiler ve framework'ler",
  EN: "Web interfaces, client-side technologies, and frameworks",
 },
 ui: {
  TR: "UI bileşen kütüphaneleri ve tasarım sistemleri",
  EN: "UI component libraries and design systems",
 },
 backend: {
  TR: "Sunucu tarafı teknolojiler ve API geliştirme",
  EN: "Server-side technologies and API development",
 },
 database: {
  TR: "Veritabanı teknolojileri ve ORM araçları",
  EN: "Database technologies and ORM tools",
 },
 mobile: {
  TR: "iOS ve Android mobil uygulama geliştirme",
  EN: "iOS and Android mobile application development",
 },
 hosting: {
  TR: "Hosting, cloud ve deploy altyapıları",
  EN: "Hosting, cloud, and deployment infrastructure",
 },
 tools: {
  TR: "Geliştirme araçları ve yardımcı platformlar",
  EN: "Development tools and supporting platforms",
 },
 seo: {
  TR: "SEO, arama görünürlüğü ve web analitik",
  EN: "SEO, search visibility, and web analytics",
 },
 publishing: {
  TR: "App Store ve Google Play yayın süreçleri",
  EN: "App Store and Google Play publishing",
 },
};

export default function AboutPage() {
 const { language, t, loading } = useLanguage();
 const { skills } = useData();
 const [isVisible, setIsVisible] = useState(false);
 const [activeCategory, setActiveCategory] = useState("frontend");

 useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 100);
  return () => clearTimeout(timer);
 }, []);

 const lang = language === "EN" ? "EN" : "TR";

 const availableCategories = useMemo(
  () => skillCategoryOrder.filter((id) => (skills[id]?.skills?.length ?? 0) > 0),
  [skills]
 );

 useEffect(() => {
  if (!availableCategories.includes(activeCategory)) {
   setActiveCategory(availableCategories[0] || "frontend");
  }
 }, [activeCategory, availableCategories]);

 const skillsData = useMemo(() => {
  return availableCategories.reduce((acc, key) => {
   acc[key] = {
    ...skills[key],
    icon: categoryIcons[key],
    color: categoryColors[key],
   };
   return acc;
  }, {});
 }, [availableCategories, skills]);

 const skillsTranslations = useMemo(() => {
  const categories = serviceTechCategoryMeta.reduce((acc, category) => {
   if (!availableCategories.includes(category.id)) return acc;
   acc[category.id] = {
    title: category.label[lang],
    description: categoryDescriptions[category.id]?.[lang] || category.label[lang],
   };
   return acc;
  }, {});

  return {
   title: lang === "EN" ? "Skills" : "Yetenekler",
   subtitle: lang === "EN" ? "Technical Expertise" : "Teknik Uzmanlık",
   description:
    lang === "EN"
     ? "Skills grouped by the same categories as my services: frontend, UI, backend, database, mobile, hosting, tools, SEO & analytics, and publishing."
     : "Hizmetlerimdeki kategorilerle aynı gruplama: frontend, UI, backend, veritabanı, mobil, hosting, araçlar, SEO & analitik ve yayın.",
   categories,
   categoryStats: {
    skills: lang === "EN" ? "Skills" : "Yetenek",
    technologies: lang === "EN" ? "Technologies" : "Teknoloji",
   },
   yearsExp: lang === "EN" ? "Years Experience" : "Yıl Deneyim",
  };
 }, [availableCategories, lang]);

 if (loading) return <LoadingScreen language={language} />;

 const getTextPreview = (text, maxSentences = 3) => {
  if (!text) return { preview: "", hasMore: false };

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

 const aboutDescription =
  lang === "EN"
   ? "Born and based in Istanbul, I hold a bachelor's degree in Electrical-Electronics Engineering from Istanbul Commerce University. From my second year of engineering studies onward, I began moving into software development and, after graduation, positioned my career in this field. Building on the analytical foundation of my engineering background, I now specialize in end-to-end delivery across web and application development projects—from design and development to database, hosting, SEO, and publishing workflows. My professional journey, areas of focus, and technical expertise are outlined below."
   : "İstanbul doğumlu ve merkezli olarak faaliyet gösteriyorum. İstanbul Ticaret Üniversitesi Elektrik-Elektronik Mühendisliği lisans programında eğitim alırken ikinci yıldan itibaren yazılıma adım attım; mezuniyetimin ardından kariyerimi bu alanda konumlandırdım. Mühendislik disiplininden edindiğim analitik altyapıyı yazılım geliştirmeye taşıyarak web ve uygulama geliştirme projelerinde tasarımdan yayına kadar tüm süreçleri uçtan uca yönetiyorum. Yolculuğum, uzmanlık alanlarım ve teknik yetkinliklerim aşağıda detaylandırılmıştır.";

 const journeyText = getTextPreview(t("about.journeyDescription"), 3);
 const interestsText = getTextPreview(t("about.interestsDescription"), 3);

 const getCategoryStats = (category) => ({
  count: skillsData[category]?.skills?.length || 0,
 });

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
      title={lang === "EN" ? "About" : "Hakkımda"}
      subtitle={
       lang === "EN" ? "Web & Application Development" : "Web ve Uygulama Geliştirme"
      }
      isVisible={isVisible}
      description={aboutDescription}
     />

     <div className="max-w-none mx-auto space-y-8">
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
       <JourneyCard journeyText={journeyText} language={language} isVisible={isVisible} />
       <InterestsCard interestsText={interestsText} language={language} isVisible={isVisible} />
      </div>
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
       className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 sm:mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
       {availableCategories.map((key) => {
        const data = skillsData[key];
        const stats = getCategoryStats(key);
        return (
         <CategoryButton
          key={key}
          categoryKey={key}
          title={skillsTranslations.categories[key]?.title || key}
          count={stats.count}
          countLabel={skillsTranslations.categoryStats.skills}
          icon={data?.icon}
          color={data?.color}
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
