import SkillIcon from "./SkillIcon";
import { getSkillCardClasses } from "./skillCardStyles";

export default function SkillCardMobile({ skill, index, translations }) {
 const { card, iconWrap } = getSkillCardClasses(skill.isPrimary, "mobile", skill.categoryIconClass);

 return (
  <div
   className="group relative overflow-hidden"
   style={{
    animationDelay: `${index * 100}ms`,
    animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
   }}
  >
   <div className={card}>
     <div className="flex flex-col items-center text-center">
      <div className={iconWrap}>
       <SkillIcon iconName={skill.icon} size="small" color={skill.color} />
      </div>
     <h4 className="font-semibold text-xs leading-tight mb-1">{skill.name}</h4>
     <p className="text-[10px] text-primary/70">
      {skill.experience} {translations.yearsExp}
     </p>
    </div>
   </div>
  </div>
 );
}