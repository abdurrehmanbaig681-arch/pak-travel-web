import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { initialSiteSettings } from "@/lib/data/initialData";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pak Travel and Tours - Official Website | Adventure & Travels",
  description:
    "Providing the best travelling experiences across Pakistan (Skardu, Hunza, Swat, Kashmir) and international packages (Thailand, Malaysia, Singapore, Turkey). 12+ years experience.",
  keywords: [
    "Pak Travel",
    "Pak Travel and Tours",
    "Skardu tour by air",
    "Hunza valley tour",
    "Pakistan tour packages",
    "Lahore travel agency",
    "Thailand Malaysia Singapore tour",
  ],
  authors: [{ name: "Pak Travel and Tours" }],
  openGraph: {
    title: "Pak Travel and Tours - Discover the Real Adventure",
    description: "12+ Years experience. Explore Northern Pakistan and International Destinations.",
    url: "https://paktravel.com.pk",
    siteName: "Pak Travel and Tours",
    images: [
      {
        url: initialSiteSettings.logos.header,
        width: 800,
        height: 600,
        alt: "Pak Travel and Tours Logo",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  icons: {
    icon: initialSiteSettings.logos.favicon,
    shortcut: initialSiteSettings.logos.favicon,
    apple: initialSiteSettings.logos.favicon,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={initialSiteSettings.logos.favicon} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                        m.target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                  if (document.documentElement) {
                    observer.observe(document.documentElement, {
                      subtree: true,
                      attributes: true,
                      attributeFilter: ['bis_skin_checked']
                    });
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
