const translationsData = [
 {
  keyPath: "home.shortDescription",
  translations: {
   TR: "Web ve uygulama geliştirme tutkusuyla 6+ yıldır dijital dünyada iz bırakıyorum. React ve Next.js ile kullanıcıların gözlerini kamaştıran web arayüzleri tasarlarken, Node.js ve Express.js ile güvenilir uygulama altyapıları kuruyorum. PostgreSQL ve MongoDB ile veri yönetiminde güçlü çözümler sunarak, her proje benim için bir sanat eseri haline geliyor: performanslı, erişilebilir ve kullanıcı dostu. Yeteneklerimle işinizi bir üst seviyeye taşımaya hazırım.",
   EN: "I've been making my mark in the digital world for over 6 years with a passion for web and application development. While crafting eye-catching web interfaces with React and Next.js, I build reliable application foundations with Node.js and Express.js. By delivering powerful solutions in data management with PostgreSQL and MongoDB, every project becomes a work of art for me: performant, accessible, and user-friendly. Ready to elevate your business with my skills.",
  },
 },
 {
  keyPath: "about.journeyDescription",
  translations: {
   TR: "Yazılım geliştirme yolculuğum, üniversitede aldığım Elektrik-Elektronik Mühendisliği eğitimiyle başladı ve zamanla tutkuya dönüştü. HTML, CSS ve JavaScript temellerinden React, Next.js ve Tailwind/Shadcn gibi modern UI araçlarıyla web arayüzlerine; Node.js ve Express.js ile güvenilir web ve uygulama altyapılarına uzandım. React Native, Flutter ve Expo ile mobil uygulama geliştirmeyi sürecime ekleyerek iOS ve Android için uçtan uca çözümler sunmaya başladım. MySQL, MongoDB, PostgreSQL ve Prisma ile veritabanı mimarisi; SEO, Google Analytics ve Search Console ile görünürlük; Vercel, Railway, Render ve hosting altyapıları ile yayın süreçlerini tek çatı altında yönetiyorum. Gömülü sistemler ve Arduino projelerinde edindiğim mühendislik bakış açısı problem çözmeye odaklı yaklaşımımı güçlendirdi. Portföy, kurumsal ve e-ticaret web siteleri ile mobil uygulamalarda performanslı, erişilebilir ve sürdürülebilir projeler üretmeye devam ediyorum.",
   EN: "My software development journey began with my Electrical and Electronics Engineering degree at university and gradually became a passion. From HTML, CSS, and JavaScript fundamentals, I expanded into web interfaces with React, Next.js, and modern UI tools like Tailwind and Shadcn, and into reliable web and application foundations with Node.js and Express.js. I added mobile development with React Native, Flutter, and Expo to deliver end-to-end solutions for iOS and Android. I manage database architecture with MySQL, MongoDB, PostgreSQL, and Prisma; visibility with SEO, Google Analytics, and Search Console; and deployment with Vercel, Railway, Render, and hosting infrastructure—all under one roof. The engineering mindset I gained from embedded systems and Arduino projects strengthened my problem-solving focus. I continue building performant, accessible, and sustainable projects across portfolio, corporate, and e-commerce websites and mobile applications.",
  },
 },
 {
  keyPath: "about.interestsDescription",
  translations: {
   TR: "Web ve uygulama geliştirmede tasarım, arayüz kütüphaneleri, veritabanı, mobil, hosting, SEO, analitik ve mağaza yayın süreçlerini bir arada ele almayı seviyorum. React ve Next.js ile hızlı, erişilebilir web arayüzleri; React Native, Flutter ve Expo ile iOS/Android uygulamaları; Node.js/Express ile güvenilir web servisleri geliştirmek benim için temel odak noktası. Tailwind, Shadcn ve modern UI/UX yaklaşımlarıyla dönüşüm odaklı deneyimler tasarlıyor; MySQL, MongoDB, PostgreSQL ve Prisma üzerinde ölçeklenebilir veri yapıları kuruyorum. SEO optimizasyonu, analitik entegrasyonları, Railway/Render/Vercel ile deploy, App Store ve Google Play yayın desteği sunarak projeleri fikirden canlıya taşıyorum. Temiz kod, performans optimizasyonu ve kullanıcı deneyimi her zaman önceliğim; her proje benim için yeni bir öğrenme ve gelişim alanı.",
   EN: "In web and application development, I enjoy addressing design, UI libraries, database, mobile, hosting, SEO, analytics, and app store publishing together. Building fast, accessible web interfaces with React and Next.js; iOS/Android apps with React Native, Flutter, and Expo; and reliable web services with Node.js/Express is my core focus. I design conversion-focused experiences with Tailwind, Shadcn, and modern UI/UX approaches, and plan scalable data structures on MySQL, MongoDB, PostgreSQL, and Prisma. I take projects from idea to launch with SEO optimization, analytics integrations, deployment on Railway/Render/Vercel, and App Store and Google Play publishing support. Clean code, performance optimization, and user experience are always my priorities—every project is a new opportunity to learn and grow.",
  },
 },
 {
  keyPath: "header.openMenu",
  translations: {
   TR: "Menüyü aç",
   EN: "Open menu",
  },
 },
 {
  keyPath: "header.cv",
  translations: {
   TR: "CV İndir",
   EN: "Download CV",
  },
 },
 {
  keyPath: "projects.status.completed",
  translations: {
   TR: "Tamamlandı",
   EN: "Completed",
  },
 },
 {
  keyPath: "projects.status.current",
  translations: {
   TR: "Devam Ediyor",
   EN: "Ongoing",
  },
 },
 {
  keyPath: "projects.status.planned",
  translations: {
   TR: "Planlandı",
   EN: "Planned",
  },
 },
];

function buildNestedTranslations(langCode) {
 const lang = langCode.toUpperCase();
 const result = {};

 for (const item of translationsData) {
  const text = item.translations[lang];
  if (text === undefined) continue;

  const keys = item.keyPath.split(".");
  let current = result;

  keys.forEach((key, index) => {
   if (index === keys.length - 1) {
    current[key] = text;
   } else {
    if (typeof current[key] !== "object" || current[key] === null) {
     current[key] = {};
    }
    current = current[key];
   }
  });
 }

 return result;
}

export const translationsByLang = {
 TR: buildNestedTranslations("TR"),
 EN: buildNestedTranslations("EN"),
};

export function getTranslations(lang) {
 const code = String(lang || "TR").toUpperCase();
 return translationsByLang[code] || translationsByLang.TR;
}
