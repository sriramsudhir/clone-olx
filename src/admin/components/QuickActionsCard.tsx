import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Shield, BarChart3, Settings, Users, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function QuickActionsCard() {
  const quickActions = [
    {
      title: "Add New User",
      description: "Create a new user account",
      icon: Users,
      href: "/admin/users/new",
      variant: "default" as const
    },
    {
      title: "Review Reports",
      description: "Check pending reports",
      icon: AlertTriangle,
      href: "/admin/reports",
      variant: "destructive" as const
    },
    {
      title: "Moderate Content",
      description: "Review flagged listings",
      icon: Shield,
      href: "/admin/moderation",
      variant: "secondary" as const
    },
    {
      title: "View Analytics",
      description: "Check platform metrics",
      icon: BarChart3,
      href: "/admin/analytics",
      variant: "outline" as const
    },
    {
      title: "Platform Settings",
      description: "Configure system settings",
      icon: Settings,
      href: "/admin/settings",
      variant: "ghost" as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="w-full justify-start h-auto p-4"
            asChild
          >
            <Link href={action.href}>
              <div className="flex items-start space-x-3">
                <action.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-70">{action.description}</div>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}