"use client";
import { useState } from "react";
import {
 FaPaperPlane,
 FaUser,
 FaComment,
 FaEnvelope,
 FaPhone,
 FaTag,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function ContactForm({ language, isVisible }) {
 const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
 };

 const [formData, setFormData] = useState(initialFormData);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const translations = {
  formTitle: language === "EN" ? "Send Message" : "Mesaj Gönder",
  name: language === "EN" ? "Name & Surname:" : "İsim & Soyisim:",
  email: language === "EN" ? "Email:" : "E-posta:",
  phone: language === "EN" ? "Phone:" : "Telefon:",
  subject: language === "EN" ? "Subject:" : "Konu:",
  message: language === "EN" ? "Message:" : "Mesaj:",
  send: language === "EN" ? "Send Message" : "Mesajı Gönder",
  sending: language === "EN" ? "Sending..." : "Gönderiliyor...",
  namePlaceholder:
   language === "EN" ? "Name & Surname" : "Adınız ve soyadınız",
  emailPlaceholder: language === "EN" ? "Your email" : "E-posta adresiniz",
  phonePlaceholder:
   language === "EN" ? "Phone number" : "Telefon numaranız",
  subjectPlaceholder: language === "EN" ? "Subject" : "Konu",
  messagePlaceholder: language === "EN" ? "Your message..." : "Mesajınız...",
 };

 const handleChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });

   const data = await response.json();

   if (response.ok) {
    toast.success(
     language === "TR"
      ? "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım."
      : "Your message has been sent successfully! I will get back to you soon.",
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
   } else {
    toast.error(
     language === "TR"
      ? `Hata: ${data.error || "Mesaj gönderilemedi. Lütfen tekrar deneyin."}`
      : `Error: ${data.error || "Message could not be sent. Please try again."}`,
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
    language === "TR"
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
  "w-full px-4 py-3 bg-info border border-[#66bb6a] rounded-lg placeholder-[#a5d6a7] focus:outline-none focus:border-[#81c784] focus:ring-2 focus:ring-[#66bb6a]/20 transition-all duration-300 text-[16px] sm:text-base hover:border-[#81c784] hover:scale-[1.02] transform";

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

     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <div className="group">
       <label htmlFor="subject" className="block text-[17px] sm:text-md font-medium mb-2">
        <FaTag className="inline w-4 h-4 mr-2 mb-1" />
        {translations.subject}
       </label>
       <input
        id="subject"
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder={translations.subjectPlaceholder}
        required
        autoComplete="off"
        className={inputStyles}
       />
      </div>
     </div>

     <div className="group mb-2">
      <label htmlFor="message" className="block text-[17px] sm:text-md font-medium mb-2">
       <FaComment className="inline w-4 h-4 mr-2 mb-1" />
       {translations.message}
      </label>
      <textarea
       id="message"
       name="message"
       value={formData.message}
       onChange={handleChange}
       placeholder={translations.messagePlaceholder}
       rows={5}
       autoComplete="off"
       className={`${inputStyles} resize-none`}
      />
     </div>

     <button
      type="submit"
      disabled={isSubmitting}
      className="w-60 sm:w-full max-w-xs sm:max-w-sm md:max-w-md py-2 sm:py-3 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-base shadow-lg hover:shadow-xl text-[15px] mx-auto lg:text-base bg-linear-to-r from-[#2e7d32] to-[#66bb6a] hover:from-[#1b5e20] hover:to-[#2e7d32] border-0 hover:ring-2 hover:ring-[#81c784] hover:ring-opacity-50 mb-2 mt-5 cursor-pointer"
     >
      <FaPaperPlane className="w-4 h-4" />
      <span>{isSubmitting ? translations.sending : translations.send}</span>
     </button>
    </form>
   </div>
  </div>
 );
}