export default function ExperienceHeader({ item, Icon, iconBgColor, statusTexts, statusBadgeClass }) {
 return (
  <div className="flex items-start space-x-5 sm:space-x-4">
   <div className={`shrink-0 p-3 rounded-full bg-linear-to-r ${iconBgColor} float-animation`}>
    {Icon && <Icon className="w-5 h-5 sm:h-6 sm:w-6" />}
   </div>

   <div className="flex-1 min-w-0">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
     <div className="min-w-0">
      <h4 className="text-[18px] sm:text-[19px] font-bold mb-1 wrap-break-words">
       {item.title}
      </h4>
      {item.institutionUrl ? (
       <a
        href={item.institutionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[16px] sm:text-[17px] font-medium wrap-break-words text-[#a5d6a7] hover:text-[#c8e6c9] underline-offset-2 hover:underline transition-colors"
       >
        {item.institution}
       </a>
      ) : (
       <p className="text-[16px] sm:text-[17px] font-medium wrap-break-words">
        {item.institution}
       </p>
      )}
     </div>
     <div className="text-left sm:text-right shrink-0">
      <div
       className={`text-white inline-flex items-center px-3 py-1 rounded-full text-[14px] font-medium border ${statusBadgeClass}`}
      >
       {statusTexts[item.status]}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}