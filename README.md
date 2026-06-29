# 🚀 omerhalisdemir.com.tr

> Modern ve dinamik kişisel portföy web sitesi — Next.js 15 ve React 19 ile geliştirilmiştir.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 İçindekiler

- [Hakkında](#-hakkında)
- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Veri Yapısı](#-veri-yapısı)
- [Ortam Değişkenleri](#-ortam-değişkenleri)
- [Proje Yapısı](#-proje-yapısı)
- [İletişim](#-iletişim)

## 🎯 Hakkında

Bu proje, yazılım geliştirme kariyerim boyunca edindiğim deneyimleri, tamamladığım projeleri ve teknik yeteneklerimi sergilemek amacıyla geliştirdiğim kişisel portföy web sitesidir. Modern web teknolojileri kullanılarak, responsive tasarım prensipleri ve kullanıcı deneyimi odaklı bir yaklaşımla oluşturulmuştur.

### 🌟 Temel Hedefler

- ✨ Modern ve kullanıcı dostu arayüz
- 🌍 Çok dilli destek (Türkçe/İngilizce)
- 📱 Tam responsive tasarım
- ⚡ Yüksek performans ve hız
- 🛠 Hizmet ve paket tanıtımı
- 📊 Merkezi statik veri yönetimi

## ✨ Özellikler

### 🎨 Arayüz ve Kullanıcı Deneyimi

- **Responsive Tasarım**: Tüm cihazlarda tutarlı görünüm
- **Smooth Animations**: CSS ve JavaScript ile akıcı geçişler
- **Interactive Components**: Genişletilebilir proje kartları, kategori sekmeleri, hizmet dropdown menüsü
- **Modern UI/UX**: Tailwind CSS 4 ile güncel tasarım

### 🌐 Çok Dilli Destek

- **Türkçe/İngilizce**: Tam dil desteği
- **Statik Çeviri Sistemi**: `data/translations.js` üzerinden yönetilen metinler
- **Dil Tercihi**: Seçim `localStorage` ile kalıcı olarak saklanır
- **SEO**: Sayfa bazlı metadata ve `lang` attribute güncellemesi

### 📊 İçerik Bölümleri

- **Ana Sayfa**: Profil özeti, kısa tanıtım ve istatistik kartları
- **Hakkımda**: Kişisel bilgiler, yolculuk özeti, ilgi alanları ve yetenekler (`/about#skills`)
- **Deneyimler**: Eğitim, iş deneyimi, sertifikalar ve projeler (`/experience#projects`)
- **Hizmetler**: Full stack web/mobil hizmet rolleri, site paketleri ve teknoloji ikonları
- **İletişim**: Form ile direkt mesaj gönderme (Nodemailer)

### ⚡ Performans

- **Next.js App Router**: Server ve client bileşenleri
- **Standalone Output**: Docker ve sunucu dağıtımı için optimize edilmiş build
- **Code Splitting**: Webpack vendor chunk ayırımı
- **Legacy Yönlendirmeler**: `/skills` → `/about/#skills`, `/projects` → `/experience/#projects`

## 🛠 Teknolojiler

### Frontend

| Teknoloji | Versiyon | Kullanım Alanı |
|-----------|----------|----------------|
| **Next.js** | 15.5.x | Framework |
| **React** | 19.2.x | UI Library |
| **Tailwind CSS** | 4.1.x | Styling |
| **react-icons** | 5.5.x | İkon seti |
| **react-country-flag** | 3.1.x | Dil seçici bayrakları |
| **react-hot-toast** | 2.6.x | Bildirimler |

### Backend

| Teknoloji | Versiyon | Kullanım Alanı |
|-----------|----------|----------------|
| **Node.js** | 20.x | Runtime |
| **Nodemailer** | 7.x | İletişim formu e-posta servisi |

### DevOps & Tools

- **ESLint**: Kod kalitesi
- **PostCSS & Autoprefixer**: CSS işleme
- **tw-animate-css**: Animasyon yardımcıları
- **clsx & tailwind-merge**: Koşullu sınıf birleştirme
- **Git**: Versiyon kontrolü

## 📦 Kurulum

### Gereksinimler

- Node.js 18.x veya üzeri
- npm veya yarn

### Adım 1: Projeyi Klonlayın

```bash
git clone https://github.com/omerhd34/omerhalisdemir.com.tr.git
cd omerhalisdemir.com.tr
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
```

### Adım 3: Ortam Değişkenlerini Ayarlayın

İletişim formunun çalışması için `.env.local` dosyası oluşturun:

```env
# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient@email.com

# Optional
NODE_ENV=development
PORT=3000
```

### Adım 4: Geliştirme Sunucusunu Başlatın

```bash
npm run dev
# veya
yarn dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

### Adım 5: Production Build

```bash
npm run build
npm start
```

### Diğer Komutlar

```bash
npm run lint    # ESLint kontrolü
```

## 🗂 Veri Yapısı

Site içeriği veritabanı yerine `data/` klasöründeki JavaScript modüllerinden okunur. İçerik güncellemek için ilgili dosyayı düzenlemeniz yeterlidir.

| Dosya | Açıklama |
|-------|----------|
| `data/translations.js` | TR/EN çeviri metinleri |
| `data/skills.js` | Yetenekler ve kategori grupları |
| `data/experience.js` | Eğitim, iş deneyimi ve sertifikalar |
| `data/projects.js` | Proje listesi ve detayları |
| `data/services.js` | Hizmet rolleri, paketler ve teknoloji kategorileri |

Veri akışı React Context üzerinden sağlanır:

- `LanguageContext` — dil seçimi ve `t()` çeviri fonksiyonu
- `DataContext` — yetenekler, deneyimler ve projeler

## 🔐 Ortam Değişkenleri

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `EMAIL_USER` | Gönderici e-posta adresi | `your@gmail.com` |
| `EMAIL_PASS` | E-posta uygulama şifresi | `xxxx xxxx xxxx xxxx` |
| `EMAIL_TO` | Alıcı e-posta adresi | `contact@example.com` |
| `NODE_ENV` | Ortam modu | `production` |
| `PORT` | Sunucu portu | `3000` |

### E-posta Kurulumu (Gmail)

1. Google hesabınıza gidin
2. "2-Step Verification" aktif edin
3. "App passwords" oluşturun
4. Oluşturulan şifreyi `EMAIL_PASS` olarak kullanın

## 📁 Proje Yapısı

```
omerhalisdemir.com.tr/
├── app/
│   ├── (pages)/              # Sayfa rotaları
│   │   ├── about/            # Hakkımda + yetenekler
│   │   ├── contact/          # İletişim formu
│   │   ├── experience/       # Deneyimler + projeler
│   │   └── services/         # Hizmetler ve paketler
│   ├── api/
│   │   └── contact/          # İletişim formu API
│   ├── context/              # React Context
│   │   ├── DataContext.jsx
│   │   └── LanguageContext.jsx
│   ├── styles/               # Sayfa ve global CSS
│   ├── layout.jsx
│   ├── LayoutContent.jsx
│   └── page.jsx              # Ana sayfa
├── components/
│   ├── extra/                # Yardımcı bileşenler
│   ├── Footer/
│   ├── Header/
│   └── PageComponents/       # Sayfa özel bileşenler
│       ├── About/
│       ├── Contact/
│       ├── Experience/
│       ├── Home/
│       ├── Project/
│       ├── Services/
│       └── Skill/
├── data/                     # Statik site içeriği
├── public/
│   ├── images/
│   └── pdf/                  # CV dosyaları
├── utils/
│   └── turkishText.js
├── next.config.js
├── postcss.config.mjs
└── package.json
```

## 👤 İletişim

**Ömer Halis Demir**

- 🌐 Website: [omerhalisdemir.com.tr](https://omerhalisdemir.com.tr)
- 💼 LinkedIn: [linkedin.com/in/omerhd1](https://www.linkedin.com/in/omerhd1/)
- 📧 Email: omerhd16@outlook.com
- 💻 GitHub: [@omerhd34](https://github.com/omerhd34)

## 🙏 Teşekkürler

Bu projeyi geliştirirken kullandığım açık kaynak toplulukların ve teknolojilerin geliştiricilerine teşekkür ederim.

---