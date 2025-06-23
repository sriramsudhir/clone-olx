import type { Metadata, Viewport } from 'next';
import './globals.css';

import MobileNav from '@/components/layout/MobileNav';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { Poppins, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const APP_NAME = "TradeZone";
const APP_DESCRIPTION = "Your friendly neighborhood marketplace.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#7C3AED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${poppins.variable} ${inter.variable} font-body antialiased bg-secondary/50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
                {children}
              </div>
            </main>
            <Footer />
            <MobileNav />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
