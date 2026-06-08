export default function FooterBottom({ languageSelector }) {
 return (
  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
   <div className="hidden md:block">{languageSelector}</div>
   <div className="text-accent text-sm text-center md:text-right">
    <p className="flex items-center justify-center md:justify-end space-x-1">
     <span>Ömer Halis DEMİR | 2023 -  {new Date().getFullYear()}</span>
    </p>
   </div>
  </div>
 );
}
