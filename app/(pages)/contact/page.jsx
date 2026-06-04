"use client";
import { useState, useEffect, Suspense } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { useLanguage } from "../../context/LanguageContext";
import ContactForm from "../../../components/PageComponents/Contact/ContactForm";
import ContactInfoCard from "../../../components/PageComponents/Contact/ContactInfoCard";
import SocialLinksCard from "../../../components/PageComponents/Contact/SocialLinksCard";
import Title from "../../../components/extra/Title";
import LoadingScreen from "../../../components/extra/LoadingScreen";

export default function ContactPage() {
 const { language, t, loading: langLoading } = useLanguage();
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 100);
  return () => clearTimeout(timer);
 }, []);

 if (langLoading) {
  return <LoadingScreen language={language} />;
 }

 const title = language === "EN" ? "Contact" : "İletişim";
 const subtitle = language === "EN" ? "Get in Touch" : "İletişime Geçin";
 const description = language === "EN"
  ? "Feel free to reach out for collaborations or just a friendly hello."
  : "İş birlikleri veya sadece merhaba demek için bana ulaşabilirsiniz.";

 return (
  <section id="contact" className="relative mt-5 sm:mt-10 md:mt-20 min-h-screen">
   <Toaster />
   <div className="block sm:hidden h-1" />
   <div className="min-h-screen relative overflow-hidden text-primary">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
     <FaEnvelope
      className={`w-8 h-8 text-green-200 mx-auto mb-2 transition-all duration-1000 delay-100 ${isVisible
       ? "opacity-100 translate-y-0"
       : "opacity-0 translate-y-10"
       }`}
     />
     <Title
      title={title}
      subtitle={subtitle}
      description={description}
      isVisible={isVisible}
     />

     <div className="grid lg:grid-cols-2 gap-5 lg:gap-16">
      <Suspense fallback={null}>
       <ContactForm
        language={language}
        isVisible={isVisible}
       />
      </Suspense>

      <div className="flex flex-col gap-5 lg:gap-8">
       <ContactInfoCard
        language={language}
        isVisible={isVisible}
       />

       <SocialLinksCard
        language={language}
        isVisible={isVisible}
       />
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}