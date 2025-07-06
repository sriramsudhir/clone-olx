import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TradeZone Admin Panel',
  description: 'Admin panel for TradeZone marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <nav className="border-b bg-card">
              <div className="flex h-16 items-center px-4">
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-bold">TradeZone Admin</h1>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Admin Panel</span>
                  </div>
                </div>
              </div>
            </nav>
            <div className="flex">
              <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
                <nav className="p-4 space-y-2">
                  <a href="/" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
                    <span>Dashboard</span>
                  </a>
                  <a href="/users" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
                    <span>Users</span>
                  </a>
                  <a href="/listings" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
                    <span>Listings</span>
                  </a>
                  <a href="/analytics" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
                    <span>Analytics</span>
                  </a>
                  <a href="/settings" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
                    <span>Settings</span>
                  </a>
                </nav>
              </aside>
              <main className="flex-1 p-6">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}