import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Package, Settings, LogOut, Shield } from 'lucide-react';
import { users } from "@/lib/data";
import Link from 'next/link';

const menuItems = [
    { icon: Package, text: "My Listings", href: "/listings" },
    { icon: Heart, text: "Saved Listings", href: "/saved" },
    { icon: Shield, text: "Verification", href: "#" },
    { icon: Settings, text: "Settings", href: "#" },
    { icon: LogOut, text: "Log Out", href: "#" },
]

export default function ProfilePage() {
  const currentUser = users[0];
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-card min-h-screen md:min-h-0 md:rounded-xl">
        <CardHeader className="text-center pt-8">
          <Avatar className="mx-auto h-24 w-24 mb-2 border-2 border-primary">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person face" />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold font-headline">{currentUser.name}</h1>
          <p className="text-muted-foreground">Member since May 2024</p>
          <Button size="sm" className="mx-auto mt-2 rounded-full">Edit Profile</Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
              {menuItems.map(item => (
                 <Link href={item.href} key={item.text}>
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <item.icon className="w-5 h-5 text-primary"/>
                            <span className="font-semibold">{item.text}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
