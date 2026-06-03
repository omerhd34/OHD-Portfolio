import SkillIcon from "./SkillIcon";
import { getSkillCardClasses } from "./skillCardStyles";

export default function SkillCardDesktop({ skill, index, translations }) {
 const { card, iconWrap } = getSkillCardClasses(skill.isPrimary, "desktop", skill.categoryIconClass);

 return (
  <div
   className="group relative"
   style={{
    animationDelay: `${index * 100}ms`,
    animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
   }}
  >
   <div className={card}>
     <div className="flex items-center space-x-3">
      <div className={iconWrap}>
       <SkillIcon iconName={skill.icon} size="default" color={skill.color} />
      </div>
     <div className="flex-1">
      <h4 className="font-bold text-[16px] sm:text-lg mb-1">{skill.name}</h4>
      <p className="text-[12px] sm:text-xs text-primary/70">
       {skill.experience} {translations.yearsExp}
      </p>
     </div>
    </div>
   </div>
  </div>
 );
}