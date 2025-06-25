
import Link from 'next/link';
import { Home, Package, Users, PanelLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import DynamicBreadcrumbs from './DynamicBreadcrumbs';

function AdminSidebarNav() {
    return (
        <nav className="grid items-start px-4 text-sm font-medium">
            <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Home className="h-4 w-4" />
                Dashboard
            </Link>
            <Link
            href="/admin/listings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Package className="h-4 w-4" />
                Listings
            </Link>
            <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Users className="h-4 w-4" />
                Users
            </Link>
        </nav>
    );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 lg:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                    <Package className="h-6 w-6" />
                    <span className="">TradeZone Admin</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <AdminSidebarNav />
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 lg:hidden"
                    >
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                        <div className="flex h-[60px] items-center border-b px-6">
                            <Link href="/admin" className="flex items-center gap-2 font-semibold">
                                <Package className="h-6 w-6" />
                                <span className="">TradeZone Admin</span>
                            </Link>
                        </div>
                        <AdminSidebarNav />
                    </SheetContent>
                </Sheet>
                <DynamicBreadcrumbs />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-secondary/50">
                {children}
            </main>
        </div>
    </div>
  );
}
