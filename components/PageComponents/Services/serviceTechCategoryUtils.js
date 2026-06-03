import { serviceTechCategoryMeta } from "../../../data/services";

export const serviceTechCategoryClassMap = Object.fromEntries(
 serviceTechCategoryMeta.map((category) => [category.id, category.className])
);

export const serviceTechCategorySortOrder = Object.fromEntries(
 serviceTechCategoryMeta.map((category, index) => [category.id, index])
);

export function getServiceTechIconClass(categoryId, isPrimary = false) {
 const baseClass = serviceTechCategoryClassMap[categoryId] || serviceTechCategoryClassMap.frontend;
 return [baseClass, isPrimary ? "service-tech-icon-emphasis" : ""].filter(Boolean).join(" ");
}

export function sortServiceTechIcons(icons, categories) {
 return [...icons].sort((a, b) => {
  const orderA = serviceTechCategorySortOrder[categories[a] ?? "frontend"] ?? 99;
  const orderB = serviceTechCategorySortOrder[categories[b] ?? "frontend"] ?? 99;
  if (orderA !== orderB) return orderA - orderB;
  return icons.indexOf(a) - icons.indexOf(b);
 });
}
