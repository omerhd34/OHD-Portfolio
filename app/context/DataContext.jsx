"use client";
import { createContext, useContext, useMemo } from "react";
import { useLanguage } from "./LanguageContext";
import { groupedSkills } from "../../data/skills";
import { getGroupedExperience } from "../../data/experience";
import { getProjects } from "../../data/projects";

const DataContext = createContext();

export function DataProvider({ children }) {
 const { language } = useLanguage();
 const skills = groupedSkills;
 const experience = useMemo(() => getGroupedExperience(language), [language]);
 const projects = useMemo(() => getProjects(language), [language]);

 const contextValue = useMemo(
  () => ({
   skills,
   experience,
   projects,
   loading: false,
   error: null,
  }),
  [skills, experience, projects]
 );

 return (
  <DataContext.Provider value={contextValue}>
   {children}
  </DataContext.Provider>
 );
}

export function useData() {
 const context = useContext(DataContext);
 if (!context) {
  throw new Error("useData must be used within a DataProvider");
 }
 return context;
}
