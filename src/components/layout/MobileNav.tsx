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

  // Hide nav on listing detail page on mobile for a more immersive view
  if (pathname.startsWith('/listings/')) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t h-16 flex items-center justify-around z-50">
      {navLinks.map((link) => {
        // Special check for Explore to be active on both / and /listings
        const isActive = link.name === 'Explore' 
          ? (pathname === '/' || pathname.startsWith('/listings'))
          : pathname.startsWith(link.href);

        if (link.isCentral) {
          return (
            <Link href={link.href} key={link.name} className="-mt-8" aria-label={link.name}>
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full text-primary-foreground shadow-lg hover:bg-primary/90 transform transition-transform hover:scale-105">
                <link.icon className="h-8 w-8" />
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors w-1/5 pt-1",
              isActive && "text-primary font-semibold"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <link.icon className="h-6 w-6" />
            <span className="text-[10px] mt-1">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
