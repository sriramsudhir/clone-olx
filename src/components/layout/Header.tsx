"use client";

import Link from "next/link";
import { PlusCircle, MessageSquare, Heart, User, LogOut, Settings, MapPin, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { users } from "@/lib/data";
import { ThemeToggle } from "../ThemeToggle";
import GlobalSearch from "../GlobalSearch";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "/saved", label: "Saved", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

export default function Header() {
  const pathname = usePathname();
  const currentUser = users[0];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-3 pb-6 border-b">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{currentUser.name}</p>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                    </div>
                  </div>
                  
                  <nav className="flex-1 py-6">
                    <div className="space-y-2">
                      {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors",
                            pathname.startsWith(href) 
                              ? "bg-primary/10 text-primary" 
                              : "text-muted-foreground hover:text-primary hover:bg-accent"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{label}</span>
                        </Link>
                      ))}
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">Profile</span>
                      </Link>
                      <Link
                        href="/profile?tab=settings"
                        className="flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Settings</span>
                      </Link>
                    </div>
                  </nav>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-sm font-medium">Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold font-headline text-primary">
            TradeZone
          </Link>

          {/* Desktop Location */}
          <div className="hidden lg:block border-l pl-6">
            <Link href="/location" className="flex items-center gap-2 text-sm group">
              <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <div className="flex items-center">
                  <span className="font-semibold text-sm">Banten, Tangerang</span>
                  <ChevronDown className="w-3 h-3 ml-1 text-muted-foreground" />
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8 max-w-2xl">
            <GlobalSearch className="w-full" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
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
            
            <div className="h-6 border-l mx-2"></div>
            
            <Button asChild size="sm" className="hidden lg:flex">
              <Link href="/create">
                <PlusCircle className="mr-2 h-4 w-4" />
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

          {/* Mobile Post Button */}
          <div className="md:hidden">
            <Button asChild size="sm">
              <Link href="/create">
                <PlusCircle className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <GlobalSearch className="w-full" />
        </div>
      </div>
    </header>
  );
}