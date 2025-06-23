"use client";

import Link from "next/link";
import { Search, PlusCircle, MessageSquare, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/saved", label: "Saved", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold font-headline text-primary">
              TradeZone
            </Link>
          </div>

          <div className="flex-1 flex justify-center px-4 lg:px-12">
            <div className="w-full max-w-lg relative">
              <Input
                type="search"
                placeholder="Search for anything..."
                className="pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <nav className="hidden md:flex items-center space-x-2">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Button
                  key={href}
                  variant="ghost"
                  asChild
                  className={cn(
                    "text-muted-foreground",
                    pathname === href && "text-primary"
                  )}
                >
                  <Link href={href}>
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </Button>
              ))}
              <Button variant="ghost" className="text-muted-foreground">
                 <User className="h-5 w-5" />
                 <span className="sr-only">Profile</span>
              </Button>
            </nav>
            <Button asChild>
              <Link href="/create">
                <PlusCircle className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Post Listing</span>
                <span className="inline sm:hidden">Post</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
