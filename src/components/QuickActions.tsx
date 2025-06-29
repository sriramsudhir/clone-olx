"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Heart, 
  MessageSquare, 
  MapPin, 
  Camera,
  Zap,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function QuickActions() {
  const quickActions = [
    {
      title: 'Sell Now',
      description: 'Post your item',
      icon: Plus,
      href: '/create',
      color: 'bg-primary text-primary-foreground',
      badge: 'Hot'
    },
    {
      title: 'Browse',
      description: 'Find items',
      icon: Search,
      href: '/listings',
      color: 'bg-blue-500 text-white'
    },
    {
      title: 'Saved',
      description: 'Your favorites',
      icon: Heart,
      href: '/saved',
      color: 'bg-red-500 text-white'
    },
    {
      title: 'Messages',
      description: 'Chat now',
      icon: MessageSquare,
      href: '/messages',
      color: 'bg-green-500 text-white',
      badge: '3'
    },
    {
      title: 'Nearby',
      description: 'Local deals',
      icon: MapPin,
      href: '/listings?category=nearby',
      color: 'bg-purple-500 text-white'
    },
    {
      title: 'Scan',
      description: 'Quick search',
      icon: Camera,
      href: '#',
      color: 'bg-orange-500 text-white',
      badge: 'New'
    }
  ];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="font-semibold text-base md:text-lg">Quick Actions</h3>
          <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant="ghost"
                className="h-auto p-2 md:p-3 flex flex-col items-center space-y-1 md:space-y-2 relative group hover:scale-105 transition-all duration-200 w-full"
              >
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl ${action.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <action.icon className="h-4 w-4 md:h-6 md:w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-[10px] md:text-xs">{action.title}</p>
                  <p className="text-[9px] md:text-xs text-muted-foreground hidden sm:block">{action.description}</p>
                </div>
                {action.badge && (
                  <Badge 
                    variant={action.badge === 'Hot' ? 'destructive' : 'default'} 
                    className="absolute -top-1 -right-1 text-[8px] md:text-xs px-1 py-0 h-4 md:h-5"
                  >
                    {action.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}