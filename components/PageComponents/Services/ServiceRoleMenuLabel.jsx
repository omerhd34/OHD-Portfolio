import { ICON_MAP } from "../../extra/icons";

export default function ServiceRoleMenuLabel({
 menuIcon,
 label,
 iconClassName = "w-4 h-4",
 labelClassName = "",
 className = "gap-2.5",
}) {
 const IconComponent = menuIcon ? ICON_MAP[menuIcon] : null;

 if (!IconComponent) {
  return <span className={labelClassName}>{label}</span>;
 }

 return (
  <span className={`flex items-center min-w-0 ${className}`}>
   <IconComponent
    className={`shrink-0 text-[#81c784] ${iconClassName}`}
    aria-hidden
   />
   <span className={`min-w-0 leading-snug ${labelClassName}`}>{label}</span>
  </span>
 );
}