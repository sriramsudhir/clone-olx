import type { Metadata, Viewport } from 'next';
import './globals.css';
import MobileNav from '@/components/layout/MobileNav';
import { Toaster } from "@/components/ui/toaster";
import { Poppins, Inter } from 'next/font/google';

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
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${poppins.variable} ${inter.variable} font-body antialiased`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow pb-20 md:pb-0">
            <div className="md:hidden">
              {children}
            </div>
            <div className="hidden md:flex flex-col items-center justify-center h-screen bg-gray-100">
              <p className="text-2xl font-bold">Please view on a mobile device</p>
              <p className="text-muted-foreground">This experience is designed for mobile.</p>
            </div>
          </main>
          <MobileNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
