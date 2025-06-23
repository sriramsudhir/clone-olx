"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Post", href: "/create", icon: Send, isCentral: true },
  { name: "Profile", href: "/profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border h-16 flex items-center justify-around z-50">
      {navLinks.map((link) => {
        const isActive = !link.isCentral && pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors",
              link.isCentral ? "-mt-8" : "w-1/4",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.isCentral ? (
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full text-primary-foreground shadow-lg hover:bg-primary/90 transform transition-transform hover:scale-105">
                <link.icon className="h-7 w-7 transform -rotate-45" />
              </div>
            ) : (
              <>
                <link.icon className={cn("h-6 w-6", isActive && "text-primary")} />
                <span className={cn("text-xs mt-1", isActive && "text-primary font-semibold")}>{link.name}</span>
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
