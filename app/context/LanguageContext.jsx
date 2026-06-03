"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getTranslations } from "../../data/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
 const [language, setLanguage] = useState("TR");

 useEffect(() => {
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage === "TR" || savedLanguage === "EN") {
   setLanguage(savedLanguage);
  }
 }, []);

 const translations = useMemo(() => getTranslations(language), [language]);

 const handleLanguageChange = (newLanguage) => {
  setLanguage(newLanguage);
  localStorage.setItem("preferredLanguage", newLanguage);
 };

 const t = (key) => {
  const keys = key.split(".");
  let value = translations;

  for (const k of keys) {
   value = value?.[k];
   if (value === undefined) {
    return key;
   }
  }

  return value || key;
 };

 return (
  <LanguageContext.Provider
   value={{
    language,
    handleLanguageChange,
    translations,
    t,
    loading: false,
   }}
  >
   {children}
  </LanguageContext.Provider>
 );
}

export function useLanguage() {
 const context = useContext(LanguageContext);
 if (!context) {
  throw new Error("useLanguage must be used within a LanguageProvider");
 }
 return context;
}
