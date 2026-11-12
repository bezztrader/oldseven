import type { Metadata, Viewport } from "next";
import { Archivo, Sancreek } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const sancreek = Sancreek({
  variable: "--font-sancreek",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const title = "Old Seven Tattoo · Estúdio de tatuagem na Freguesia, Jacarepaguá";
const description =
  "Realismo em preto e cinza e cobertura de tatuagem no Quality Shopping Freguesia, Jacarepaguá, Rio de Janeiro. Mande sua ideia no WhatsApp e agende.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Old Seven Tattoo",
    title,
    description,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Old Seven Tattoo Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

const INTRO_SCRIPT = `try{var d=document.documentElement;if(!sessionStorage.getItem("os-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="1";sessionStorage.setItem("os-intro","1");setTimeout(function(){d.dataset.intro="done"},1100)}}catch(e){}`;

export const viewport: Viewport = {
  themeColor: "#0f0e0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${sancreek.variable}`} suppressHydrationWarning>
      <body className="min-h-svh">
        {/* First visit of the session: flag the stamp intro before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <div className="intro" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- must paint before hydration */}
          <img src="/images/logo.png" alt="" width={394} height={249} />
        </div>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
