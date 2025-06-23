"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, LogOut, Moon, Shield, User } from "lucide-react";
import Link from 'next/link';

export default function ProfileSettings() {
  return (
    <div className="max-w-md mx-auto space-y-4">
        <div className="p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold mb-4">Account</h3>
            <div className="space-y-2">
                <Link href="#">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <User className="w-5 h-5 text-primary"/>
                            <span className="font-medium">Edit Profile</span>
                        </div>
                    </div>
                </Link>
                <Link href="#">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Shield className="w-5 h-5 text-primary"/>
                            <span className="font-medium">Verification</span>
                        </div>
                    </div>
                </Link>
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
                    <Switch id="notifications-switch" />
                </div>
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
