export const serviceRoleHashAliases = {
 "full-stack": "full-stack-web",
 frontend: "full-stack-web",
 backend: "full-stack-web",
 software: "full-stack-app",
 mobile: "full-stack-app",
};

export const serviceRoles = [
 {
  id: "full-stack-web",
  packageType: "web",
  label: { TR: "Full Stack Web Geliştirici", EN: "Full Stack Web Developer" },
  image: "/images/services/full-stack.svg",
  intro: {
   TR: "Web sitesi geliştirme hizmeti — frontend arayüzden backend altyapısına kadar tüm web sürecini tek elden yönetir.",
   EN: "Website development — I manage the entire web process from frontend interface to backend infrastructure in one place.",
  },
  description: {
   TR: "Portföy, kurumsal ve e-ticaret projelerinde frontend ve backend süreçlerini tek çatı altında yönetiyorum. React ve Next.js ile hızlı, erişilebilir ve dönüşüm odaklı arayüzler geliştirirken; Node.js ve Express.js ile güvenilir RESTful API katmanları, kimlik doğrulama ve veritabanı mimarisini kuruyorum. MySQL, MongoDB ve PostgreSQL üzerinde ölçeklenebilir veri yapıları planlayarak performans, SEO ve kullanıcı deneyimini birlikte ele alıyorum. Responsive tasarım, modern UI/UX, hosting ve yayın süreçleriyle web projenizi uçtan uca teslim ediyorum.",
   EN: "For portfolio, corporate, and e-commerce projects, I manage frontend and backend under one roof. I build fast, accessible, conversion-focused interfaces with React and Next.js while establishing reliable RESTful APIs, authentication, and database architecture with Node.js and Express.js. I plan scalable data structures on MySQL, MongoDB, and PostgreSQL, addressing performance, SEO, and user experience together—from responsive design and modern UI/UX to hosting and launch.",
  },
  menuDescription: {
   TR: "Frontend ve backend'i bir arada sunuyorum: React/Next.js arayüzler, Node.js/Express API'ler, MySQL/MongoDB/PostgreSQL veri katmanı, SEO ve performans optimizasyonu. Portföy, kurumsal ve e-ticaret web projelerinde uçtan uca çözüm.",
   EN: "I deliver frontend and backend together: React/Next.js interfaces, Node.js/Express APIs, MySQL/MongoDB/PostgreSQL data layers, SEO and performance optimization—end-to-end for portfolio, corporate, and e-commerce web projects.",
  },
  technologies: [
   "FaHtml5",
   "FaCss3Alt",
   "SiRedux",
   "TbSeo",
   "SiGooglemaps",
   "SiGoogleanalytics",
   "SiGooglesearchconsole",
   "SiTailwindcss",
   "FaBootstrap",
   "SiShadcnui",
   "SiNextui",
   "SiChakraui",
   "SiHeadlessui",
   "SiRadixui",
   "FaJsSquare",
   "SiTypescript",
   "FaReact",
   "SiNextdotjs",
   "FaNodeJs",
   "SiExpress",
   "TbApi",
   "SiPostman",
   "SiMysql",
   "SiMongodb",
   "SiPostgresql",
   "SiPrisma",
   "SiVercel",
   "IxirhostIcon",
   "FaCpanel",
  ],
 },
 {
  id: "full-stack-app",
  packageType: "app",
  label: { TR: "Full Stack Uygulama Geliştirici", EN: "Full Stack Application Developer" },
  image: "/images/services/mobile.svg",
  intro: {
   TR: "Mobil uygulama geliştirme hizmeti — iOS ve Android için arayüz, API ve yayın sürecini uçtan uca yönetir.",
   EN: "Mobile application development — I manage UI, API, and publishing for iOS and Android end to end.",
  },
  description: {
   TR: "React Native ve Flutter ile iOS ve Android için performanslı mobil uygulamalar geliştirirken, Node.js tabanlı API ve veritabanı altyapısını aynı projede kuruyorum. Tek kod tabanından hızlı geliştirme sağlarken push bildirim, offline destek, kimlik doğrulama ve üçüncü parti entegrasyonları güvenli biçimde kurguluyorum. App Store ve Google Play yayın süreçlerinde rehberlik ederek uygulamanızın büyümesine uyum sağlayan sürdürülebilir mobil çözümler sunuyorum.",
   EN: "I build performant mobile apps for iOS and Android with React Native and Flutter while setting up Node.js-based API and database infrastructure in the same project. From a single codebase, I implement push notifications, offline support, authentication, and third-party integrations securely. I guide App Store and Google Play publishing to deliver sustainable mobile solutions that scale with your product.",
  },
  menuDescription: {
   TR: "React Native ve Flutter mobil arayüzler, Node.js/Express API katmanı, push bildirim ve mağaza yayın desteği. iOS ve Android uygulamalarınız için full stack mobil çözüm.",
   EN: "React Native and Flutter mobile UI, Node.js/Express API layer, push notifications, and store publishing support—a full stack mobile solution for your iOS and Android apps.",
  },
  technologies: [
   "TbBrandReactNative",
   "SiFlutter",
   "SiAndroidstudio",
   "SiExpo",
   "FaReact",
   "FaJsSquare",
   "SiTypescript",
   "FaNodeJs",
   "SiExpress",
   "TbApi",
   "SiPostman",
   "SiMysql",
   "SiMongodb",
   "SiPostgresql",
   "SiPrisma",
   "SiRailway",
   "SiRender",
   "FaCloud",
   "FaServer",
   "FaAppStoreIos",
   "FaGooglePlay",
  ],
 },
];

export const rolesWithSitePackages = serviceRoles
 .filter((role) => role.packageType === "web")
 .map((role) => role.id);

export const rolesWithMobilePackages = serviceRoles
 .filter((role) => role.packageType === "app")
 .map((role) => role.id);

export const mobileServiceNote = {
 TR: {
  title: "Mobil Uygulama Türleri ve Paketler",
  body: "Tüm mobil paketlerde iOS ve Android uyumlu arayüz, modern ve temiz kod altyapısı, API entegrasyonu, kaynak kod teslimi ve mağaza yayın sürecinde rehberlik standart olarak yer alır.",
  cta: "Mobil Proje İçin Teklif Al",
 },
 EN: {
  title: "Mobile App Types & Packages",
  body: "All mobile packages include iOS and Android compatible UI, a modern clean-code foundation, API integration, source code delivery, and app store publishing guidance.",
  cta: "Get a Quote for Mobile",
 },
};

export const sharedMobilePackageIncludes = mobileServiceNote;

export const serviceTechIconCategories = {
 FaHtml5: "frontend",
 FaCss3Alt: "frontend",
 FaJsSquare: "frontend",
 SiTypescript: "frontend",
 FaReact: "frontend",
 SiRedux: "frontend",
 SiNextdotjs: "backend",
 SiGooglemaps: "frontend",
 SiTailwindcss: "ui",
 SiShadcnui: "ui",
 SiNextui: "ui",
 SiChakraui: "ui",
 SiHeadlessui: "ui",
 SiRadixui: "ui",
 FaBootstrap: "ui",
 FaNodeJs: "backend",
 SiExpress: "backend",
 TbApi: "backend",
 FaJava: "backend",
 SiMysql: "database",
 SiMongodb: "database",
 SiPostgresql: "database",
 SiPrisma: "database",
 TbBrandReactNative: "mobile",
 SiFlutter: "mobile",
 SiAndroidstudio: "mobile",
 SiExpo: "mobile",
 SiVercel: "hosting",
 IxirhostIcon: "hosting",
 FaCpanel: "hosting",
 SiRailway: "hosting",
 SiRender: "hosting",
 FaCloud: "hosting",
 FaServer: "hosting",
 SiPostman: "tools",
 TbSeo: "seo",
 SiGooglesearchconsole: "seo",
 SiGoogleanalytics: "seo",
 FaAppStoreIos: "publishing",
 FaGooglePlay: "publishing",
};

export const serviceTechCategoryMeta = [
 { id: "frontend", className: "service-tech-icon-frontend", label: { TR: "Frontend", EN: "Frontend" } },
 { id: "ui", className: "service-tech-icon-ui", label: { TR: "UI", EN: "UI" } },
 { id: "backend", className: "service-tech-icon-backend", label: { TR: "Backend", EN: "Backend" } },
 { id: "database", className: "service-tech-icon-database", label: { TR: "Veritabanı", EN: "Database" } },
 { id: "mobile", className: "service-tech-icon-mobile", label: { TR: "Mobil", EN: "Mobile" } },
 { id: "hosting", className: "service-tech-icon-hosting", label: { TR: "Hosting", EN: "Hosting" } },
 { id: "tools", className: "service-tech-icon-tools", label: { TR: "Araçlar", EN: "Tools" } },
 { id: "seo", className: "service-tech-icon-seo", label: { TR: "SEO & Analitik", EN: "SEO & Analytics" } },
 { id: "publishing", className: "service-tech-icon-publishing", label: { TR: "Yayın", EN: "Publishing" } },
];

export const primaryServiceTechIcons = {
 "full-stack-web": [
  "FaReact",
  "SiRedux",
  "SiNextdotjs",
  "SiTypescript",
  "SiTailwindcss",
  "SiShadcnui",
  "FaNodeJs",
  "SiExpress",
  "TbApi",
  "SiMysql",
  "SiPrisma",
  "SiVercel",
  "TbSeo",
  "SiGoogleanalytics",
  "IxirhostIcon",
 ],
 "full-stack-app": [
  "TbBrandReactNative",
  "SiFlutter",
  "SiAndroidstudio",
  "FaReact",
  "SiTypescript",
  "FaNodeJs",
  "SiExpress",
  "TbApi",
  "SiMysql",
  "SiPostgresql",
  "SiPrisma",
  "SiExpo",
  "FaAppStoreIos",
  "FaGooglePlay",
  "SiRailway",
 ],
};

export const tierKeys = ["temel", "standart", "pro"];

export const tierLabels = {
 pro: { TR: "Pro", EN: "Pro" },
 standart: { TR: "Standart", EN: "Standard" },
 temel: { TR: "Temel", EN: "Basic" },
};

export const sharedPackageIncludes = {
 TR: "Tüm paketlerde markanıza özel tasarım özelleştirmesi, içerik girişi ve düzenlemesi, mobil–tablet–masaüstü uyumlu responsive yapı, modern ve temiz kod altyapısı, çapraz tarayıcı uyumluluğu ile tam kaynak kod teslimi standart olarak yer alır. Temel, Standart ve Pro seviyelerinin her birinde projenizi yayına hazır, ölçeklenebilir ve sürdürülebilir bir altyapıyla sunmayı hedefliyoruz.",
 EN: "Every package includes brand-tailored design customization, content setup and editing, a fully responsive layout across mobile, tablet, and desktop, a modern clean-code foundation, cross-browser compatibility, and full source code delivery. From Basic to Pro, each tier is built to deliver your project on a production-ready, scalable, and maintainable foundation.",
};

export const sitePackages = [
 {
  id: "portfolio",
  title: {
   TR: "Portföy / Tanıtım Web Sitesi",
   EN: "Portfolio / Promotion Website",
  },
  description: {
   TR: "Hızlı, modern ve temiz kod yapısıyla hazırlanan profesyonel tanıtım veya portföy sitesi. Kişisel markanızı veya işletmenizi etkili biçimde öne çıkarmanız için tasarlanır.",
   EN: "A professional promotion or portfolio site built with fast, modern, and clean code—designed to showcase your personal brand or business effectively.",
  },
  features: {
   temel: {
    TR: [
     "Tamamen Mobil Uyumlu (Responsive) Tasarım",
     "Yüksek Hızlı Sayfa Yükleme Performansı",
     "Temel Arama Motoru (SEO) Uyumluluğu",
     "İletişim Formu ve Sosyal Medya Entegrasyonu",
     "Ücretsiz SSL Sertifikası Kurulumu"
    ],
    EN: [
     "Fully Mobile Responsive Design",
     "Lightning-Fast Page Load Performance",
     "Basic Search Engine (SEO) Compatibility",
     "Contact Form & Social Media Integration",
     "Free SSL Certificate Setup"
    ],
   },
   standart: {
    TR: [
     "Tamamen Mobil Uyumlu (Responsive) Tasarım",
     "Yüksek Hızlı Sayfa Yükleme Performansı",
     "Kapsamlı SEO ve Meta Optimizasyonu",
     "İletişim Formu ve Sosyal Medya Entegrasyonu",
     "Premium ve Modern Arayüz (Animasyonlar, Glassmorphism)",
     "WhatsApp İletişim Butonu Entegrasyonu",
     "Özel Alan Adı (Domain) Bağlantısı"
    ],
    EN: [
     "Fully Mobile Responsive Design",
     "Lightning-Fast Page Load Performance",
     "Comprehensive SEO & Meta Optimization",
     "Contact Form & Social Media Integration",
     "Premium & Modern UI (Animations, Glassmorphism)",
     "WhatsApp Contact Button Integration",
     "Custom Domain Connection"
    ],
   },
   pro: {
    TR: [
     "Tamamen Mobil Uyumlu (Responsive) Tasarım",
     "Yüksek Hızlı Sayfa Yükleme Performansı",
     "Kapsamlı SEO ve Meta Optimizasyonu",
     "Premium ve Modern Arayüz (Animasyonlar, Glassmorphism)",
     "Figma ve Benzeri Tasarımlara Göre Kodlama",
     "Dinamik İçerik Yönetim Paneli (Portföy Ekleme/Çıkarma)",
     "Karanlık / Aydınlık Tema (Dark/Light Mode) Desteği",
     "Çoklu Dil Desteği",
     "Google Analytics ve Search Console Kurulumu"
    ],
    EN: [
     "Fully Mobile Responsive Design",
     "Lightning-Fast Page Load Performance",
     "Comprehensive SEO & Meta Optimization",
     "Premium & Modern UI (Animations, Glassmorphism)",
     "Coding from Figma & Similar Design Files",
     "Dynamic Content Management Panel (Add/Remove Projects)",
     "Dark / Light Mode Support",
     "Multi-language Support",
     "Google Analytics & Search Console Setup"
    ],
   },
  },
  tiers: {
   temel: {
    deliveryDays: 7,
    revisions: 2,
    pages: 3,
    price: 15000,
   },
   standart: {
    deliveryDays: 14,
    revisions: 4,
    pages: 8,
    price: 25000,
   },
   pro: {
    deliveryDays: 21,
    revisions: 6,
    pages: null,
    price: 40000,
   },
  },
 },
 {
  id: "corporate",
  title: {
   TR: "Kurumsal Web Sitesi",
   EN: "Corporate Website",
  },
  description: {
   TR: "Kurumsal kimliğinize uygun, yüksek performanslı ve modern web sitesi çözümü. Markanızın güvenilirliğini dijitalde güçlendirmek için SEO altyapısıyla birlikte sunulur.",
   EN: "A brand-aligned, high-performance modern corporate website solution delivered with SEO infrastructure to strengthen your credibility online.",
  },
  features: {
   temel: {
    TR: [
     "Mobil Uyumlu (Responsive) Kurumsal Tasarım",
     "Hızlı Sayfa Yükleme ve Yüksek Performans",
     "Temel SEO Altyapısı ve Meta Etiketleri",
     "İletişim Formu ve Google Haritalar Entegrasyonu",
     "SSL Sertifikası ve Güvenlik Altyapısı"
    ],
    EN: [
     "Mobile Responsive Corporate Design",
     "Fast Page Loading & High Performance",
     "Basic SEO Infrastructure & Meta Tags",
     "Contact Form & Google Maps Integration",
     "SSL Certificate & Security Infrastructure"
    ],
   },
   standart: {
    TR: [
     "Mobil Uyumlu (Responsive) Kurumsal Tasarım",
     "Hızlı Sayfa Yükleme ve Yüksek Performans",
     "Gelişmiş SEO ve Performans Optimizasyonu",
     "Premium Arayüz ve Modern UI/UX Etkileşimleri",
     "Kapsamlı İçerik Yönetim Paneli (CMS)",
     "Dinamik Blog / Haber ve Duyuru Modülü",
     "Kurumsal E-posta Kurulum Yönlendirmesi"
    ],
    EN: [
     "Mobile Responsive Corporate Design",
     "Fast Page Loading & High Performance",
     "Advanced SEO & Performance Optimization",
     "Premium UI & Modern UX Interactions",
     "Comprehensive Content Management System (CMS)",
     "Dynamic Blog / News & Announcement Module",
     "Corporate Email Setup Guidance"
    ],
   },
   pro: {
    TR: [
     "Mobil Uyumlu (Responsive) Kurumsal Tasarım",
     "Hızlı Sayfa Yükleme ve Yüksek Performans",
     "Gelişmiş SEO ve Performans Optimizasyonu",
     "Premium Arayüz ve Modern UI/UX Etkileşimleri",
     "Figma ve Benzeri Tasarımlara Göre Kodlama",
     "Kapsamlı İçerik Yönetim Paneli (CMS) ve Blog",
     "Karanlık / Aydınlık Tema (Dark/Light Mode) Seçeneği",
     "Çoklu Dil Desteği",
     "Canlı Destek (Live Chat) veya WhatsApp Entegrasyonu",
     "Google Analytics ve Veri Raporlama Kurulumu"
    ],
    EN: [
     "Mobile Responsive Corporate Design",
     "Fast Page Loading & High Performance",
     "Advanced SEO & Performance Optimization",
     "Premium UI & Modern UX Interactions",
     "Coding from Figma & Similar Design Files",
     "Comprehensive Content Management System (CMS) & Blog",
     "Dark / Light Mode Option",
     "Multi-language Support",
     "Live Chat or WhatsApp Integration",
     "Google Analytics & Data Reporting Setup"
    ],
   },
  },
  tiers: {
   temel: {
    deliveryDays: 14,
    revisions: 3,
    pages: 5,
    price: 30000,
   },
   standart: {
    deliveryDays: 21,
    revisions: 5,
    pages: 15,
    price: 45000,
   },
   pro: {
    deliveryDays: 30,
    revisions: 8,
    pages: null,
    price: 70000,
   },
  },
 },
 {
  id: "ecommerce",
  title: {
   TR: "E-ticaret Web Sitesi",
   EN: "E-commerce Website",
  },
  description: {
   TR: "Güvenli ödeme sistemli, gelişmiş yönetim panelli ve ölçeklenebilir e-ticaret platformu. Ürünlerinizi online satışa hazır, yönetilebilir bir yapıda sunmanızı sağlar.",
   EN: "A scalable e-commerce platform with secure payments and an advanced admin panel—ready to present and manage your products for online sales.",
  },
  features: {
   temel: {
    TR: [
     "Mobil Uyumlu (Responsive) E-Ticaret Arayüzü",
     "Yüksek Hızlı Sayfa Yükleme Performansı",
     "Güvenli Sanal POS (Ödeme Sistemi) Entegrasyonu",
     "Temel Ürün, Kategori ve Sepet Yönetimi",
     "SSL Sertifikası ile Güvenli Alışveriş Altyapısı"
    ],
    EN: [
     "Mobile Responsive E-commerce Interface",
     "Lightning-Fast Page Load Performance",
     "Secure Payment Gateway (Virtual POS) Integration",
     "Basic Product, Category & Cart Management",
     "Secure Shopping Infrastructure with SSL"
    ],
   },
   standart: {
    TR: [
     "Mobil Uyumlu (Responsive) E-Ticaret Arayüzü",
     "Yüksek Hızlı Sayfa Yükleme Performansı",
     "Güvenli Sanal POS (Ödeme Sistemi) Entegrasyonu",
     "Gelişmiş SEO ve Ürün Meta Optimizasyonu",
     "Müşteri Üyelik Sistemi ve Sipariş Takip Paneli",
     "İndirim ve Kupon Kodu Sistemi",
     "Premium ve Modern Kullanıcı Deneyimi (UI/UX)"
    ],
    EN: [
     "Mobile Responsive E-commerce Interface",
     "Lightning-Fast Page Load Performance",
     "Secure Payment Gateway (Virtual POS) Integration",
     "Advanced SEO & Product Meta Optimization",
     "Customer Account System & Order Tracking Panel",
     "Discount & Coupon Code System",
     "Premium & Modern User Experience (UI/UX)"
    ],
   },
   pro: {
    TR: [
     "Mobil Uyumlu (Responsive) E-Ticaret Arayüzü",
     "Yüksek Hızlı Sayfa Yükleme Performansı",
     "Güvenli Sanal POS ve Kargo Entegrasyonu Altyapısı",
     "Detaylı Stok, Fiyat ve Varyasyon Yönetimi",
     "İndirim, Kupon ve Terk Edilen Sepet Hatırlatma Sistemi",
     "Figma ve Benzeri Tasarımlara Göre Kodlama",
     "Karanlık / Aydınlık Tema (Dark/Light Mode) Desteği",
     "Çoklu Dil ve Çoklu Para Birimi Desteği",
     "Gelişmiş Satış Analitikleri ve Google E-Ticaret Raporlaması"
    ],
    EN: [
     "Mobile Responsive E-commerce Interface",
     "Lightning-Fast Page Load Performance",
     "Secure Payment Gateway & Shipping Integration Setup",
     "Detailed Stock, Price & Variant Management",
     "Discount, Coupon & Abandoned Cart Recovery System",
     "Coding from Figma & Similar Design Files",
     "Dark / Light Mode Support",
     "Multi-language & Multi-Currency Support",
     "Advanced Sales Analytics & Google E-commerce Reporting"
    ],
   },
  },
  tiers: {
   temel: {
    deliveryDays: 21,
    revisions: 3,
    pages: 15,
    price: 55000,
   },
   standart: {
    deliveryDays: 30,
    revisions: 5,
    pages: 30,
    price: 90000,
   },
   pro: {
    deliveryDays: 45,
    revisions: 10,
    pages: null,
    price: 120000,
   },
  },
 },
];

export const mobilePackages = [
 {
  id: "mobile-portfolio",
  statLabels: {
   pages: { TR: "Ekranlar", EN: "SCREENS" },
  },
  title: {
   TR: "Tanıtım / Portföy Mobil Uygulama",
   EN: "Promotion / Portfolio Mobile App",
  },
  description: {
   TR: "Markanızı veya hizmetlerinizi iOS ve Android'de sunan, hızlı ve modern bir tanıtım uygulaması. React Native veya Flutter ile tek kod tabanından geliştirilir.",
   EN: "A fast, modern promotion app for iOS and Android to showcase your brand or services—built from a single codebase with React Native or Flutter.",
  },
  features: {
   temel: {
    TR: [
     "iOS ve Android Uyumlu Arayüz",
     "Temel Navigasyon ve Bilgi Ekranları",
     "İletişim Formu veya WhatsApp Yönlendirmesi",
     "REST API Entegrasyonu",
     "Temel Performans Optimizasyonu",
    ],
    EN: [
     "iOS & Android Compatible UI",
     "Basic Navigation & Info Screens",
     "Contact Form or WhatsApp Redirect",
     "REST API Integration",
     "Basic Performance Optimization",
    ],
   },
   standart: {
    TR: [
     "iOS ve Android Uyumlu Arayüz",
     "Temel Navigasyon ve Bilgi Ekranları",
     "İletişim Formu veya WhatsApp Yönlendirmesi",
     "REST API Entegrasyonu",
     "Temel Performans Optimizasyonu",
     "Premium UI/UX ve Akıcı Animasyonlar",
     "Push Bildirim Altyapısı",
     "Sosyal Medya Bağlantıları",
     "Offline (Çevrimdışı) Temel Destek",
    ],
    EN: [
     "iOS & Android Compatible UI",
     "Basic Navigation & Info Screens",
     "Contact Form or WhatsApp Redirect",
     "REST API Integration",
     "Basic Performance Optimization",
     "Premium UI/UX & Smooth Animations",
     "Push Notification Infrastructure",
     "Social Media Links",
     "Basic Offline Support",
    ],
   },
   pro: {
    TR: [
     "iOS ve Android Uyumlu Arayüz",
     "Temel Navigasyon ve Bilgi Ekranları",
     "İletişim Formu veya WhatsApp Yönlendirmesi",
     "REST API Entegrasyonu",
     "Temel Performans Optimizasyonu",
     "Premium UI/UX ve Akıcı Animasyonlar",
     "Push Bildirim Altyapısı",
     "Sosyal Medya Bağlantıları",
     "Offline (Çevrimdışı) Temel Destek",
     "Figma ve Benzeri Tasarımlara Göre Kodlama",
     "Karanlık / Aydınlık Tema (Dark/Light Mode) Desteği",
     "Çoklu Dil Desteği",
     "App Store ve Google Play Yayın Desteği",
    ],
    EN: [
     "iOS & Android Compatible UI",
     "Basic Navigation & Info Screens",
     "Contact Form or WhatsApp Redirect",
     "REST API Integration",
     "Basic Performance Optimization",
     "Premium UI/UX & Smooth Animations",
     "Push Notification Infrastructure",
     "Social Media Links",
     "Basic Offline Support",
     "Coding from Figma & Similar Design Files",
     "Dark / Light Mode Support",
     "Multi-language Support",
     "App Store & Google Play Publishing Support",
    ],
   },
  },
  tiers: {
   temel: { deliveryDays: 21, revisions: 2, pages: 5, price: 45000 },
   standart: { deliveryDays: 30, revisions: 4, pages: 10, price: 70000 },
   pro: { deliveryDays: 45, revisions: 6, pages: null, price: 95000 },
  },
 },
 {
  id: "mobile-corporate",
  statLabels: {
   pages: { TR: "Ekranlar", EN: "SCREENS" },
  },
  title: {
   TR: "Kurumsal Mobil Uygulama",
   EN: "Corporate Mobile App",
  },
  description: {
   TR: "Kurumsal kimliğinize uygun, güvenilir ve ölçeklenebilir mobil uygulama. Çalışan veya müşteri odaklı paneller ve bildirim sistemleriyle desteklenir.",
   EN: "A reliable, scalable corporate mobile app aligned with your brand—supported by employee or customer-focused panels and notification systems.",
  },
  features: {
   temel: {
    TR: [
     "iOS ve Android Kurumsal Arayüz",
     "Haber / Duyuru ve İçerik Ekranları",
     "İletişim ve Destek Formu",
     "Güvenli API ve Kimlik Doğrulama Altyapısı",
     "Temel Analitik Entegrasyonu",
    ],
    EN: [
     "iOS & Android Corporate UI",
     "News / Announcement & Content Screens",
     "Contact & Support Form",
     "Secure API & Authentication Infrastructure",
     "Basic Analytics Integration",
    ],
   },
   standart: {
    TR: [
     "iOS ve Android Kurumsal Arayüz",
     "Haber / Duyuru ve İçerik Ekranları",
     "İletişim ve Destek Formu",
     "Güvenli API ve Kimlik Doğrulama Altyapısı",
     "Temel Analitik Entegrasyonu",
     "Push Bildirim ve Duyuru Sistemi",
     "Kullanıcı Rolleri ve Yetkilendirme",
     "Offline İçerik Görüntüleme",
    ],
    EN: [
     "iOS & Android Corporate UI",
     "News / Announcement & Content Screens",
     "Contact & Support Form",
     "Secure API & Authentication Infrastructure",
     "Basic Analytics Integration",
     "Push Notification & Announcement System",
     "User Roles & Authorization",
     "Offline Content Viewing",
    ],
   },
   pro: {
    TR: [
     "iOS ve Android Kurumsal Arayüz",
     "Haber / Duyuru ve İçerik Ekranları",
     "İletişim ve Destek Formu",
     "Güvenli API ve Kimlik Doğrulama Altyapısı",
     "Temel Analitik Entegrasyonu",
     "Push Bildirim ve Duyuru Sistemi",
     "Kullanıcı Rolleri ve Yetkilendirme",
     "Offline İçerik Görüntüleme",
     "Figma ve Benzeri Tasarımlara Göre Kodlama",
     "Karanlık / Aydınlık Tema Desteği",
     "Çoklu Dil Desteği",
     "Canlı Destek veya WhatsApp Entegrasyonu",
     "App Store ve Google Play Yayın Desteği",
    ],
    EN: [
     "iOS & Android Corporate UI",
     "News / Announcement & Content Screens",
     "Contact & Support Form",
     "Secure API & Authentication Infrastructure",
     "Basic Analytics Integration",
     "Push Notification & Announcement System",
     "User Roles & Authorization",
     "Offline Content Viewing",
     "Coding from Figma & Similar Design Files",
     "Dark / Light Mode Support",
     "Multi-language Support",
     "Live Support or WhatsApp Integration",
     "App Store & Google Play Publishing Support",
    ],
   },
  },
  tiers: {
   temel: { deliveryDays: 30, revisions: 3, pages: 8, price: 60000 },
   standart: { deliveryDays: 45, revisions: 5, pages: 15, price: 90000 },
   pro: { deliveryDays: 60, revisions: 8, pages: null, price: 125000 },
  },
 },
 {
  id: "mobile-ecommerce",
  statLabels: {
   pages: { TR: "Ekranlar", EN: "SCREENS" },
  },
  title: {
   TR: "E-ticaret Mobil Uygulama",
   EN: "E-commerce Mobile App",
  },
  description: {
   TR: "Güvenli ödeme, ürün yönetimi ve sipariş takibi sunan ölçeklenebilir e-ticaret mobil uygulaması. iOS ve Android mağazalarında satışa hazır yapı.",
   EN: "A scalable e-commerce mobile app with secure payments, product management, and order tracking—ready for iOS and Android app stores.",
  },
  features: {
   temel: {
    TR: [
     "iOS ve Android E-Ticaret Arayüzü",
     "Ürün Listeleme ve Detay Ekranları",
     "Sepet ve Güvenli Ödeme Entegrasyonu",
     "Temel Sipariş Takip Ekranı",
     "SSL ve Güvenli Veri Aktarımı",
    ],
    EN: [
     "iOS & Android E-commerce UI",
     "Product Listing & Detail Screens",
     "Cart & Secure Payment Integration",
     "Basic Order Tracking Screen",
     "SSL & Secure Data Transfer",
    ],
   },
   standart: {
    TR: [
     "iOS ve Android E-Ticaret Arayüzü",
     "Ürün Listeleme ve Detay Ekranları",
     "Sepet ve Güvenli Ödeme Entegrasyonu",
     "Temel Sipariş Takip Ekranı",
     "SSL ve Güvenli Veri Aktarımı",
     "Kullanıcı Üyelik ve Profil Yönetimi",
     "Push Bildirim (Sipariş / Kampanya)",
     "İndirim ve Kupon Kodu Desteği",
    ],
    EN: [
     "iOS & Android E-commerce UI",
     "Product Listing & Detail Screens",
     "Cart & Secure Payment Integration",
     "Basic Order Tracking Screen",
     "SSL & Secure Data Transfer",
     "User Account & Profile Management",
     "Push Notifications (Orders / Campaigns)",
     "Discount & Coupon Code Support",
    ],
   },
   pro: {
    TR: [
     "iOS ve Android E-Ticaret Arayüzü",
     "Ürün Listeleme ve Detay Ekranları",
     "Sepet ve Güvenli Ödeme Entegrasyonu",
     "Temel Sipariş Takip Ekranı",
     "SSL ve Güvenli Veri Aktarımı",
     "Kullanıcı Üyelik ve Profil Yönetimi",
     "Push Bildirim (Sipariş / Kampanya)",
     "İndirim ve Kupon Kodu Desteği",
     "Stok, Varyasyon ve Fiyat Yönetimi",
     "Figma ve Benzeri Tasarımlara Göre Kodlama",
     "Karanlık / Aydınlık Tema Desteği",
     "Çoklu Dil ve Para Birimi Desteği",
     "App Store ve Google Play Yayın Desteği",
    ],
    EN: [
     "iOS & Android E-commerce UI",
     "Product Listing & Detail Screens",
     "Cart & Secure Payment Integration",
     "Basic Order Tracking Screen",
     "SSL & Secure Data Transfer",
     "User Account & Profile Management",
     "Push Notifications (Orders / Campaigns)",
     "Discount & Coupon Code Support",
     "Stock, Variant & Price Management",
     "Coding from Figma & Similar Design Files",
     "Dark / Light Mode Support",
     "Multi-language & Currency Support",
     "App Store & Google Play Publishing Support",
    ],
   },
  },
  tiers: {
   temel: { deliveryDays: 45, revisions: 3, pages: 12, price: 85000 },
   standart: { deliveryDays: 60, revisions: 5, pages: 20, price: 120000 },
   pro: { deliveryDays: 90, revisions: 8, pages: null, price: 160000 },
  },
 },
];