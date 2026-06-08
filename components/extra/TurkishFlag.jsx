import ReactCountryFlag from "react-country-flag";

export function TurkishFlag({ size = 48, className = "" }) {
 const flagHeight = Math.round(size * 0.62);
 const flagWidth = Math.round(flagHeight * 1.5);

 return (
  <div className={`inline-flex ${className}`}>
   <ReactCountryFlag
    countryCode="TR"
    svg
    style={{
     width: `${flagWidth}px`,
     height: `${flagHeight}px`,
     borderRadius: "1px",
    }}
    title="Türkiye"
   />
  </div>
 );
}
