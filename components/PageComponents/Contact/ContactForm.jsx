"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
 FaPaperPlane,
 FaUser,
 FaComment,
 FaEnvelope,
 FaPhone,
 FaTag,
 FaClock,
 FaPaperclip,
 FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
 MAX_ATTACHMENTS,
 validateFiles,
 formatFileSize,
} from "../../../lib/contactAttachments";
import {
 serviceRoles,
 sitePackages,
 mobilePackages,
 tierKeys,
 tierLabels,
} from "../../../data/services";

const SUBJECT_OTHER_ID = "other";
const VALID_TIERS = new Set(tierKeys);
const ROLE_IDS = new Set(serviceRoles.map((r) => r.id));

function getPackagesForRole(roleId) {
 const role = serviceRoles.find((r) => r.id === roleId);
 if (!role) return [];
 return role.packageType === "app" ? mobilePackages : sitePackages;
}

function isValidPackageForRole(roleId, packageId) {
 return getPackagesForRole(roleId).some((p) => p.id === packageId);
}

export default function ContactForm({ language, isVisible }) {
 const searchParams = useSearchParams();
 const lang = language === "EN" ? "EN" : "TR";

 const initialQuote = {
  serviceRoleId: "",
  packageId: "",
  tier: "",
 };

 const initialFormData = {
  name: "",
  email: "",
  phone: "",
  customSubject: "",
  message: "",
 };

 const [formData, setFormData] = useState(initialFormData);
 const [quote, setQuote] = useState(initialQuote);
 const [attachments, setAttachments] = useState([]);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const fileInputRef = useRef(null);

 const urlParamsKey = searchParams.toString();

 useEffect(() => {
  const roleParam = searchParams.get("role");
  const packageParam = searchParams.get("package");
  const tierParam = searchParams.get("tier");

  if (!roleParam || !ROLE_IDS.has(roleParam)) return;

  const nextQuote = { serviceRoleId: roleParam, packageId: "", tier: "" };

  if (packageParam && isValidPackageForRole(roleParam, packageParam)) {
   nextQuote.packageId = packageParam;
  }

  if (tierParam && VALID_TIERS.has(tierParam)) {
   nextQuote.tier = tierParam;
  }

  setQuote((prev) => {
   if (
    prev.serviceRoleId === nextQuote.serviceRoleId &&
    prev.packageId === nextQuote.packageId &&
    prev.tier === nextQuote.tier
   ) {
    return prev;
   }
   return nextQuote;
  });
 }, [urlParamsKey]);

 const isOtherSubject = quote.serviceRoleId === SUBJECT_OTHER_ID;

 const activeRole = useMemo(
  () =>
   isOtherSubject
    ? null
    : serviceRoles.find((r) => r.id === quote.serviceRoleId),
  [quote.serviceRoleId, isOtherSubject]
 );

 const availablePackages = useMemo(
  () => (quote.serviceRoleId ? getPackagesForRole(quote.serviceRoleId) : []),
  [quote.serviceRoleId]
 );

 const selectedPackage = useMemo(
  () => availablePackages.find((p) => p.id === quote.packageId),
  [availablePackages, quote.packageId]
 );

 const translations = {
  formTitle: lang === "EN" ? "Request a Quote" : "Teklif İste",
  name: lang === "EN" ? "Name & Surname:" : "İsim & Soyisim:",
  email: lang === "EN" ? "Email:" : "E-posta:",
  phone: lang === "EN" ? "Phone:" : "Telefon:",
  serviceLabel: lang === "EN" ? "Service:" : "Hizmet:",
  packageLabelWeb:
   lang === "EN" ? "Website type:" : "Web sitesi türü:",
  packageLabelApp:
   lang === "EN" ? "Application type:" : "Uygulama türü:",
  tierLabel: lang === "EN" ? "Package tier:" : "Paket seviyesi:",
  message: lang === "EN" ? "Additional requests:" : "Ek istekler:",
  send: lang === "EN" ? "Submit Quote" : "Teklifi Gönder",
  sending: lang === "EN" ? "Sending..." : "Gönderiliyor...",
  responseNote:
   lang === "EN"
    ? "We will get back to you within 24 hours."
    : "Talebinize 24 saat içinde geri dönüş yapılacaktır.",
  namePlaceholder:
   lang === "EN" ? "Name & Surname" : "Adınız ve soyadınız",
  emailPlaceholder: lang === "EN" ? "Your email" : "E-posta adresiniz",
  phonePlaceholder:
   lang === "EN" ? "Phone number" : "Telefon numaranız",
  messagePlaceholder:
   lang === "EN"
    ? "Specify any additional requests..."
    : "Ek isteklerinizi belirtebilirsiniz...",
  selectService: lang === "EN" ? "Select a service" : "Hizmet seçin",
  selectPackage:
   lang === "EN" ? "Select a package type" : "Paket türü seçin",
  selectTier: lang === "EN" ? "Select a tier" : "Paket seviyesi seçin",
  other: lang === "EN" ? "Other" : "Diğer",
  customSubjectLabel: lang === "EN" ? "Subject title:" : "Konu başlığı:",
  customSubjectPlaceholder:
   lang === "EN" ? "Briefly describe your request" : "Talebinizi kısaca yazın",
  messageGeneral: lang === "EN" ? "Message:" : "Mesaj:",
  messageGeneralPlaceholder:
   lang === "EN" ? "Your message..." : "Mesajınız...",
  sendMessage: lang === "EN" ? "Send Message" : "Mesajı Gönder",
  sendMessageSuccess:
   lang === "EN"
    ? "Your message has been sent! I will get back to you within 24 hours."
    : "Mesajınız gönderildi! 24 saat içinde size dönüş yapacağım.",
  attachmentsLabel:
   lang === "EN" ? "Attachments (optional):" : "Dosya ekle (isteğe bağlı):",
  attachmentsHint:
   lang === "EN"
    ? `PDF, Word, or images — max ${MAX_ATTACHMENTS} files, 5 MB each`
    : `PDF, Word veya resim — en fazla ${MAX_ATTACHMENTS} dosya, dosya başına 5 MB`,
  chooseFiles: lang === "EN" ? "Choose files" : "Dosya seç",
  removeFile: lang === "EN" ? "Remove file" : "Dosyayı kaldır",
 };

 const buildSubject = () => {
  if (isOtherSubject) {
   const title = formData.customSubject.trim();
   return title
    ? `${translations.other} — ${title}`
    : translations.other;
  }
  if (!activeRole || !selectedPackage || !quote.tier) return "";
  const tierLabel = tierLabels[quote.tier]?.[lang] ?? quote.tier;
  return `${activeRole.label[lang]} — ${selectedPackage.title[lang]} — ${tierLabel}`;
 };

 const handleChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 const handleRoleSelect = (roleId) => {
  setQuote((prev) => ({
   serviceRoleId: roleId,
   packageId:
    roleId === SUBJECT_OTHER_ID || roleId !== prev.serviceRoleId
     ? ""
     : prev.packageId,
   tier:
    roleId === SUBJECT_OTHER_ID || roleId !== prev.serviceRoleId
     ? ""
     : prev.tier,
  }));
 };

 const handlePackageSelect = (packageId) => {
  setQuote((prev) => ({ ...prev, packageId }));
 };

 const handleTierSelect = (tier) => {
  setQuote((prev) => ({ ...prev, tier }));
 };

 const handleFileChange = (e) => {
  const selected = Array.from(e.target.files ?? []);
  if (!selected.length) return;

  const merged = [...attachments, ...selected];
  const validation = validateFiles(merged, lang);
  if (!validation.ok) {
   toast.error(validation.error, {
    duration: 4000,
    position: "top-center",
    style: {
     background: "#EF4444",
     color: "#fff",
     padding: "16px",
     borderRadius: "10px",
     fontSize: "15px",
    },
   });
   e.target.value = "";
   return;
  }

  setAttachments(validation.files);
  e.target.value = "";
 };

 const removeAttachment = (index) => {
  setAttachments((prev) => prev.filter((_, i) => i !== index));
 };

 const pillBase =
  "px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border";
 const pillActive =
  "bg-[#1b5e20] text-[#e8f5e9] border-[#66bb6a]";
 const pillInactive =
  "bg-[#143d32]/60 text-[#81c784] border-[#2e7d32]/50 hover:border-[#66bb6a]/40 hover:text-[#c8e6c9]";

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!quote.serviceRoleId) {
   toast.error(
    lang === "TR" ? "Lütfen bir konu seçin." : "Please select a subject.",
    {
     duration: 4000,
     position: "top-center",
     style: {
      background: "#EF4444",
      color: "#fff",
      padding: "16px",
      borderRadius: "10px",
      fontSize: "15px",
     },
    }
   );
   return;
  }

  if (isOtherSubject) {
   if (!formData.customSubject.trim()) {
    toast.error(
     lang === "TR"
      ? "Lütfen konu başlığını yazın."
      : "Please enter a subject title.",
     {
      duration: 4000,
      position: "top-center",
      style: {
       background: "#EF4444",
       color: "#fff",
       padding: "16px",
       borderRadius: "10px",
       fontSize: "15px",
      },
     }
    );
    return;
   }
   if (!formData.message.trim()) {
    toast.error(
     lang === "TR" ? "Lütfen mesajınızı yazın." : "Please enter your message.",
     {
      duration: 4000,
      position: "top-center",
      style: {
       background: "#EF4444",
       color: "#fff",
       padding: "16px",
       borderRadius: "10px",
       fontSize: "15px",
      },
     }
    );
    return;
   }
  } else if (!quote.packageId || !quote.tier) {
   toast.error(
    lang === "TR"
     ? "Lütfen paket türü ve paket seviyesini seçin."
     : "Please select a package type and tier.",
    {
     duration: 4000,
     position: "top-center",
     style: {
      background: "#EF4444",
      color: "#fff",
      padding: "16px",
      borderRadius: "10px",
      fontSize: "15px",
     },
    }
   );
   return;
  }

  const fileCheck = validateFiles(attachments, lang);
  if (!fileCheck.ok) {
   toast.error(fileCheck.error, {
    duration: 4000,
    position: "top-center",
    style: {
     background: "#EF4444",
     color: "#fff",
     padding: "16px",
     borderRadius: "10px",
     fontSize: "15px",
    },
   });
   return;
  }

  setIsSubmitting(true);
  const subject = buildSubject();
  const payload = new FormData();
  payload.append("name", formData.name);
  payload.append("email", formData.email);
  payload.append("phone", formData.phone);
  payload.append("message", formData.message);
  payload.append("subject", subject);
  payload.append("subjectType", isOtherSubject ? "other" : "quote");

  if (!isOtherSubject) {
   payload.append("serviceLabel", activeRole?.label[lang] ?? "");
   payload.append("packageLabel", selectedPackage?.title[lang] ?? "");
   payload.append("tierLabel", tierLabels[quote.tier]?.[lang] ?? "");
  }

  attachments.forEach((file) => payload.append("attachments", file));

  try {
   const response = await fetch("/api/contact", {
    method: "POST",
    body: payload,
   });

   const data = await response.json();

   if (response.ok) {
    toast.success(
     isOtherSubject
      ? translations.sendMessageSuccess
      : lang === "TR"
       ? "Teklif talebiniz alındı! 24 saat içinde size dönüş yapacağım."
       : "Your quote request has been received! I will get back to you within 24 hours.",
     {
      duration: 5000,
      position: "top-center",
      style: {
       background: "#10B981",
       color: "#fff",
       padding: "16px",
       borderRadius: "10px",
       fontSize: "15px",
      },
     }
    );
    setFormData(initialFormData);
    setQuote(initialQuote);
    setAttachments([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
   } else {
    toast.error(
     lang === "TR"
      ? `Hata: ${data.error || "Talep gönderilemedi. Lütfen tekrar deneyin."}`
      : `Error: ${data.error || "Request could not be sent. Please try again."}`,
     {
      duration: 5000,
      position: "top-center",
      style: {
       background: "#EF4444",
       color: "#fff",
       padding: "16px",
       borderRadius: "10px",
       fontSize: "15px",
      },
     }
    );
   }
  } catch {
   toast.error(
    lang === "TR"
     ? "Bir hata oluştu. Lütfen daha sonra tekrar deneyin."
     : "An error occurred. Please try again later.",
    {
     duration: 5000,
     position: "top-center",
     style: {
      background: "#EF4444",
      color: "#fff",
      padding: "16px",
      borderRadius: "10px",
      fontSize: "15px",
     },
    }
   );
  } finally {
   setIsSubmitting(false);
  }
 };

 const inputStyles =
  "contact-field w-full px-4 py-3 bg-[#0d2821] text-[#e8f5e9] caret-[#66bb6a] border border-[#66bb6a] rounded-lg placeholder-[#81c784] focus:outline-none focus:border-[#81c784] focus:ring-2 focus:ring-[#66bb6a]/20 transition-all duration-300 text-[16px] sm:text-base hover:border-[#81c784]";

 const packageStepLabel =
  activeRole?.packageType === "app"
   ? translations.packageLabelApp
   : translations.packageLabelWeb;

 return (
  <div
   className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
    }`}
  >
   <div className="bg-secondary p-3 sm:p-8 rounded-2xl shadow-2xl sm:rounded-4xl sm:shadow-4xl h-full">
    <h3 className="text-[20px] sm:text-2xl font-bold mb-5 sm:mb-6 flex items-center space-x-4 sm:space-x-2">
     <FaPaperPlane className="w-5 h-5 mr-4" />
     <span>{translations.formTitle}</span>
    </h3>

    <form onSubmit={handleSubmit} className="space-y-6">
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="group">
       <label htmlFor="name" className="block text-[17px] sm:text-md font-medium mb-2">
        <FaUser className="inline w-4 h-4 mr-2 mb-1" />
        {translations.name}
       </label>
       <input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder={translations.namePlaceholder}
        required
        autoComplete="name"
        className={inputStyles}
       />
      </div>

      <div className="group">
       <label htmlFor="email" className="block text-[17px] sm:text-md font-medium mb-2">
        <FaEnvelope className="inline w-4 h-4 mr-2 mb-1" />
        {translations.email}
       </label>
       <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={translations.emailPlaceholder}
        required
        autoComplete="email"
        className={inputStyles}
       />
      </div>
     </div>

     <div className="group">
      <label htmlFor="phone" className="block text-[17px] sm:text-md font-medium mb-2">
       <FaPhone className="inline w-4 h-4 mr-2 mb-1" />
       {translations.phone}
      </label>
      <input
       id="phone"
       type="tel"
       name="phone"
       value={formData.phone}
       onChange={handleChange}
       placeholder={translations.phonePlaceholder}
       autoComplete="tel"
       className={inputStyles}
      />
     </div>

     <div
      className="space-y-5 rounded-xl border border-[#2e7d32]/35 bg-[#0d2821]/40 p-4 sm:p-5"
      role="group"
      aria-labelledby="contact-service-heading"
     >
      <p
       id="contact-service-heading"
       className="text-[17px] sm:text-md font-medium flex items-center gap-2"
      >
       <FaTag className="w-4 h-4 shrink-0" />
       {translations.serviceLabel}
      </p>

      <div>
       <div className="flex flex-wrap gap-2" role="group" aria-label={translations.selectService}>
        {serviceRoles.map((role) => {
         const isActive = quote.serviceRoleId === role.id;
         return (
          <button
           key={role.id}
           type="button"
           onClick={() => handleRoleSelect(role.id)}
           className={`${pillBase} ${isActive ? pillActive : pillInactive}`}
          >
           {role.label[lang]}
          </button>
         );
        })}
        <button
         type="button"
         onClick={() => handleRoleSelect(SUBJECT_OTHER_ID)}
         className={`${pillBase} ${isOtherSubject ? pillActive : pillInactive}`}
        >
         {translations.other}
        </button>
       </div>
      </div>

      {isOtherSubject ? (
       <div>
        <label
         htmlFor="customSubject"
         className="block text-sm text-[#a5d6a7] mb-2.5"
        >
         {translations.customSubjectLabel}
        </label>
        <input
         id="customSubject"
         type="text"
         name="customSubject"
         value={formData.customSubject}
         onChange={handleChange}
         placeholder={translations.customSubjectPlaceholder}
         required
         autoComplete="off"
         className={inputStyles}
        />
       </div>
      ) : null}

      {quote.serviceRoleId && !isOtherSubject ? (
       <div>
        <p className="text-sm text-[#a5d6a7] mb-2.5">{packageStepLabel}</p>
        <div className="flex flex-col gap-2" role="group" aria-label={translations.selectPackage}>
         {availablePackages.map((pkg) => {
          const isActive = quote.packageId === pkg.id;
          return (
           <button
            key={pkg.id}
            type="button"
            onClick={() => handlePackageSelect(pkg.id)}
            className={`${pillBase} text-left w-full sm:w-auto ${isActive ? pillActive : pillInactive}`}
           >
            {pkg.title[lang]}
           </button>
          );
         })}
        </div>
       </div>
      ) : null}

      {quote.packageId ? (
       <div>
        <p className="text-sm text-[#a5d6a7] mb-2.5">{translations.tierLabel}</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label={translations.selectTier}>
         {tierKeys.map((key) => {
          const isActive = quote.tier === key;
          return (
           <button
            key={key}
            type="button"
            onClick={() => handleTierSelect(key)}
            className={`${pillBase} ${isActive ? pillActive : pillInactive}`}
           >
            {tierLabels[key][lang]}
           </button>
          );
         })}
        </div>
       </div>
      ) : null}
     </div>

     <div className="group mb-2">
      <label htmlFor="message" className="block text-[17px] sm:text-md font-medium mb-2">
       <FaComment className="inline w-4 h-4 mr-2 mb-1" />
       {isOtherSubject ? translations.messageGeneral : translations.message}
      </label>
      <textarea
       id="message"
       name="message"
       value={formData.message}
       onChange={handleChange}
       placeholder={
        isOtherSubject
         ? translations.messageGeneralPlaceholder
         : translations.messagePlaceholder
       }
       rows={5}
       required={isOtherSubject}
       autoComplete="off"
       className={`${inputStyles} resize-none`}
      />

      <div className="mt-4">
       <label
        htmlFor="attachments"
        className="block text-sm font-medium text-[#a5d6a7] mb-2"
       >
        <FaPaperclip className="inline w-3.5 h-3.5 mr-2 mb-0.5" />
        {translations.attachmentsLabel}
       </label>
       <p className="text-xs text-[#81c784] mb-3">{translations.attachmentsHint}</p>
       <input
        ref={fileInputRef}
        id="attachments"
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
        onChange={handleFileChange}
        disabled={isSubmitting || attachments.length >= MAX_ATTACHMENTS}
        className="sr-only"
       />
       <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isSubmitting || attachments.length >= MAX_ATTACHMENTS}
        className={`${pillBase} ${pillInactive} w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed`}
       >
        <FaPaperclip className="inline w-3.5 h-3.5 mr-2" />
        {translations.chooseFiles}
       </button>
       {attachments.length > 0 ? (
        <ul className="mt-3 space-y-2">
         {attachments.map((file, index) => (
          <li
           key={`${file.name}-${file.size}-${index}`}
           className="flex items-center justify-between gap-3 rounded-lg border border-[#2e7d32]/40 bg-[#143d32]/50 px-3 py-2 text-sm text-[#c8e6c9]"
          >
           <span className="min-w-0 truncate" title={file.name}>
            {file.name}{" "}
            <span className="text-[#81c784]">({formatFileSize(file.size)})</span>
           </span>
           <button
            type="button"
            onClick={() => removeAttachment(index)}
            disabled={isSubmitting}
            aria-label={translations.removeFile}
            className="shrink-0 p-1 text-[#81c784] hover:text-[#e8f5e9] transition-colors disabled:opacity-50"
           >
            <FaTimes className="w-4 h-4" />
           </button>
          </li>
         ))}
        </ul>
       ) : null}
      </div>
     </div>

     <p className="flex items-start gap-2 text-sm text-[#81c784] bg-[#143d32]/50 border border-[#2e7d32]/40 rounded-lg px-4 py-3">
      <FaClock className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{translations.responseNote}</span>
     </p>

     <button
      type="submit"
      disabled={isSubmitting}
      className="w-60 sm:w-full max-w-xs sm:max-w-sm md:max-w-md py-2 sm:py-3 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-base shadow-lg hover:shadow-xl text-[15px] mx-auto lg:text-base bg-linear-to-r from-[#2e7d32] to-[#66bb6a] hover:from-[#1b5e20] hover:to-[#2e7d32] border-0 hover:ring-2 hover:ring-[#81c784] hover:ring-opacity-50 mb-2 mt-5 cursor-pointer"
     >
      <FaPaperPlane className="w-4 h-4" />
      <span>
       {isSubmitting
        ? translations.sending
        : isOtherSubject
         ? translations.sendMessage
         : translations.send}
      </span>
     </button>
    </form>
   </div>
  </div>
 );
}
