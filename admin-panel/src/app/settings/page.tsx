"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, Shield, Bell, Mail } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Platform Settings</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Platform Name</label>
              <Input defaultValue="TradeZone" />
            </div>
            <div>
              <label className="text-sm font-medium">Support Email</label>
              <Input defaultValue="support@tradezone.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Max Upload Size (MB)</label>
              <Input defaultValue="10" type="number" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Maintenance Mode</label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Two-Factor Authentication</label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Auto-approve Listings</label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Email Verification Required</label>
              <Switch defaultChecked />
            </div>
            <div>
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input defaultValue="30" type="number" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Email Notifications</label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">SMS Notifications</label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Push Notifications</label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Admin Alerts</label>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Email Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Welcome Email</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Password Reset</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Listing Approved</span>
                <Badge variant="secondary">Inactive</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Confirmation</span>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Manage Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}