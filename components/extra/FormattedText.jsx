const BOLD_PATTERN = /(\*\*[^*]+\*\*)/g;

export default function FormattedText({ text, boldClassName = "font-bold" }) {
 if (!text) return null;

 return text.split(BOLD_PATTERN).map((part, index) => {
  if (!part) return null;

  if (part.startsWith("**") && part.endsWith("**")) {
   return (
    <strong key={index} className={boldClassName}>
     {part.slice(2, -2)}
    </strong>
   );
  }

  return <span key={index}>{part}</span>;
 });
}