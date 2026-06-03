import "./styles/globals.css";
import { Suspense } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { DataProvider } from "./context/DataContext";
import LayoutContent from "./LayoutContent.jsx";
import ScrollToTop from "../components/extra/ScrollToTop";

export const metadata = {
 title: "Ömer Halis Demir | Full Stack Developer",
 description: "Modern web uygulamaları geliştiriyorum.",
 icons: {
  icon: [
   { url: '/favicon.ico', sizes: 'any' },
   { url: '/favicon.svg', type: 'image/svg+xml' },
  ],
  apple: '/apple-touch-icon.png',
 },
};

function LoadingFallback() {
 return (
  <div className="min-h-screen flex items-center justify-center">
   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
  </div>
 );
}

export default function RootLayout({ children }) {
 return (
  <html lang="tr">
   <head>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
   </head>
   <body>
    <LanguageProvider>
     <DataProvider>
      <Suspense fallback={<LoadingFallback />}>
       <LayoutContent>
        <ScrollToTop />
        {children}
       </LayoutContent>
      </Suspense>
     </DataProvider>
    </LanguageProvider>
   </body>
  </html>
 );
}