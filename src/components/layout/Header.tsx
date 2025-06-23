"use client";

import Link from "next/link";
import { Search, PlusCircle, MessageSquare, Heart, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { users } from "@/lib/data";
import { ThemeToggle } from "../ThemeToggle";

const navLinks = [
  { href: "/saved", label: "Saved", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

export default function Header() {
  const pathname = usePathname();
  const currentUser = users[0];

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold font-headline text-primary">
              TradeZone
            </Link>
          </div>

          <div className="flex-1 flex justify-center px-4 lg:px-12">
            <div className="w-full max-w-lg relative">
              <Input
                type="search"
                placeholder="Search for anything..."
                className="pl-10 w-full rounded-full bg-secondary border-none focus-visible:ring-primary"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <nav className="flex items-center space-x-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Button
                  key={href}
                  variant="ghost"
                  asChild
                  className={cn(
                    "text-muted-foreground hover:text-primary rounded-full w-10 h-10 p-0",
                    pathname.startsWith(href) && "text-primary bg-primary/10"
                  )}
                >
                  <Link href={href}>
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </Button>
              ))}
            </nav>
            <div className="h-8 border-l"></div>
             <Button asChild>
              <Link href="/create">
                <PlusCircle className="mr-2 h-5 w-5" />
                Post Listing
              </Link>
            </Button>
            
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                     <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile?tab=settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
    </header>
  );
}
