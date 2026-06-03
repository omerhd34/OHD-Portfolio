const sharedPrimary =
 "skill-card-primary transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]";
const sharedSecondary =
 "skill-card-secondary transition-all duration-300 hover:shadow-lg";

export function getSkillCardClasses(isPrimary, variant = "desktop", categoryIconClass = "") {
 const iconWrapClass =
  categoryIconClass || (isPrimary ? "skill-card-icon-primary" : "skill-card-icon-secondary");
 if (variant === "mobile") {
  return {
   card: isPrimary
    ? `${sharedPrimary} p-3 rounded-xl hover:scale-105`
    : `${sharedSecondary} p-3 rounded-xl hover:scale-[1.02]`,
   iconWrap: `${iconWrapClass} p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 mb-1`,
  };
 }

 return {
  card: isPrimary
   ? `${sharedPrimary} relative p-5 sm:p-6 rounded-2xl overflow-hidden`
   : `${sharedSecondary} relative p-5 sm:p-6 rounded-2xl overflow-hidden`,
  iconWrap: `${iconWrapClass} p-3 rounded-xl transition-all duration-300 group-hover:scale-110`,
 };
}
