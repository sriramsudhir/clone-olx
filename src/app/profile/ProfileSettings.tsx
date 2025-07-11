"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, LogOut, Moon, Shield, User, Phone, FileText, HelpCircle } from "lucide-react";
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ProfileSettings() {
  // Mock state for user data and settings
  const { toast } = useToast();
  const [name, setName] = React.useState("Ahmad Hudzaifah");
  const [username, setUsername] = React.useState("@ahmad");
  const [showPhone, setShowPhone] = React.useState(false);
  const [pushNotifications, setPushNotifications] = React.useState(true);

  const handleSaveChanges = () => {
    // In a real app, you'd call an API. For now, we simulate with a toast.
    toast({
      title: "Profile Updated!",
      description: "Your changes have been successfully saved.",
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
        <div className="p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold mb-4">Account</h3>
            <div className="space-y-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <User className="w-5 h-5 text-primary"/>
                                <span className="font-medium">Edit Profile</span>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Name
                                </Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Username
                                </Label>
                                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Link href="#">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Shield className="w-5 h-5 text-primary"/>
                            <span className="font-medium">Verification</span>
                        </div>
                    </div>
                </Link>
                 <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 text-primary"/>
                        <span className="font-medium">Show phone number</span>
                    </div>
                    <Switch id="phone-switch" checked={showPhone} onCheckedChange={setShowPhone} />
                </div>
            </div>
        </div>

        <div className="p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold mb-4">Appearance & Notifications</h3>
             <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-4">
                        <Moon className="w-5 h-5 text-primary"/>
                        <span className="font-medium">Dark Mode</span>
                    </div>
                    <ThemeToggle />
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-4">
                        <Bell className="w-5 h-5 text-primary"/>
                        <span className="font-medium">Push Notifications</span>
                    </div>
                    <Switch id="notifications-switch" checked={pushNotifications} onCheckedChange={setPushNotifications}/>
                </div>
             </div>
        </div>

        <div className="p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold mb-4">About & Support</h3>
            <div className="space-y-2">
                <Link href="#">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <FileText className="w-5 h-5 text-primary"/>
                            <span className="font-medium">Terms of Service</span>
                        </div>
                    </div>
                </Link>
                <Link href="#">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Shield className="w-5 h-5 text-primary"/>
                            <span className="font-medium">Privacy Policy</span>
                        </div>
                    </div>
                </Link>
                <Link href="#">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <HelpCircle className="w-5 h-5 text-primary"/>
                            <span className="font-medium">Help Center</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>

        <div className="p-4 bg-secondary/50 rounded-lg">
             <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-500/10">
                <LogOut className="w-5 h-5 mr-4"/>
                <span className="font-semibold">Log Out</span>
            </Button>
        </div>
    </div>
  );
}
