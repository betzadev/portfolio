import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://yanethdoria.vercel.app"),
  title: "Yaneth Doria | Computer Engineer",
  description:
    "Design-minded computer engineer focused on building beautiful, human-centered digital experiences.",
  keywords: ["Yaneth Doria", "Portfolio", "Computer Engineer", "Software Developer", "Designer", "React", "Next.js"],
  openGraph: {
    title: "Yaneth Doria | Computer Engineer",
    description: "Design-minded computer engineer focused on building beautiful, human-centered digital experiences.",
    url: "https://yanethdoria.vercel.app",
    siteName: "Yaneth Doria Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yaneth Doria - Portfolio Preview",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yaneth Doria | Computer Engineer",
    description: "Software Developer & Designer Portfolio",
    images: ["/og-image.png"],
    creator: "@betzadev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flash: set theme synchronously before any render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
