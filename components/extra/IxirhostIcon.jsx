export default function IxirhostIcon({ className, ...props }) {
 return (
  <img
   src="/images/ixirhost.png"
   alt=""
   aria-hidden="true"
   className={`aspect-square object-contain ${className ?? ""}`}
   {...props}
  />
 );
}