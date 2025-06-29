import type { Metadata, Viewport } from 'next';
import '../app/globals.css';
import 'leaflet/dist/leaflet.css';

import AdminSidebar from '@/admin/components/layout/AdminSidebar';
import AdminHeader from '@/admin/components/layout/AdminHeader';
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

const APP_NAME = "TradeZone Admin";
const APP_DESCRIPTION = "Admin panel for TradeZone marketplace management.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: "#7C3AED",
};

export default function AdminLayout({
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
          <div className="flex h-screen bg-background">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-auto">
                <div className="container mx-auto px-6 py-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}