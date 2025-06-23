"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, PlusCircle, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Saved", href: "/saved", icon: Heart },
  { name: "Post", href: "/create", icon: PlusCircle, isCentral: true },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 flex items-center justify-around z-50">
      {navLinks.map((link) => {
        const isActive = link.isCentral ? false : pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors",
              isActive && "text-primary",
              link.isCentral && "-mt-6"
            )}
          >
            {link.isCentral ? (
              <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-full text-primary-foreground shadow-lg">
                <link.icon className="h-7 w-7" />
              </div>
            ) : (
              <>
                <link.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{link.name}</span>
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
