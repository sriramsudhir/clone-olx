"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, MessageCircle, Heart, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Explore", href: "/", icon: Compass },
  { name: "Chat", href: "/messages", icon: MessageCircle },
  { name: "Post", href: "/create", icon: Plus, isCentral: true },
  { name: "Saved", href: "/saved", icon: Heart },
  { name: "Account", href: "/profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t h-16 flex items-center justify-around z-50 safe-area-pb">
      {navLinks.map((link) => {
        // Special check for Explore to be active on both / and /listings
        const isActive = link.name === 'Explore' 
          ? (pathname === '/' || pathname.startsWith('/listings'))
          : pathname.startsWith(link.href);

        if (link.isCentral) {
          return (
            <Link href={link.href} key={link.name} className="-mt-6" aria-label={link.name}>
              <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-full text-primary-foreground shadow-lg hover:bg-primary/90 transform transition-all hover:scale-105 active:scale-95">
                <link.icon className="h-7 w-7" />
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors w-1/5 pt-1 pb-2 px-1",
              isActive && "text-primary font-semibold"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <link.icon className="h-5 w-5 mb-1" />
            <span className="text-[10px] leading-tight text-center">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}