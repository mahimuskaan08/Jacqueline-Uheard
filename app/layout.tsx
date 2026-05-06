import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/ui/cart-drawer";

export const metadata: Metadata = {
  title: "U-Heard | Handcrafted Candles & Home Fragrance",
  description:
    "Discover U-Heard's collection of handcrafted candles and home fragrances. Premium, artisanal scents inspired by nature and memory.",
  keywords: "candles, handcrafted candles, home fragrance, soy candles, artisanal candles, U-Heard",
  openGraph: {
    title: "U-Heard | Handcrafted Candles & Home Fragrance",
    description: "Premium artisanal candles inspired by nature and memory.",
    type: "website",
    siteName: "U-Heard",
  },
  twitter: {
    card: "summary_large_image",
    title: "U-Heard | Handcrafted Candles",
    description: "Premium artisanal candles inspired by nature and memory.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full antialiased bg-white text-[#434343] overflow-x-hidden" style={{ maxWidth: '100vw' }}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
