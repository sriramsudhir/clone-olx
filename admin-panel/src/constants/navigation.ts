import {
  LayoutDashboard,
  Package,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Tag,
  MapPin,
  Shield,
  FileText,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Bell,
  Database,
  UserCog,
  type LucideIcon,
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    title: 'Listings',
    href: '/listings',
    icon: Package,
  },
  {
    title: 'Categories',
    href: '/categories',
    icon: Tag,
  },
  {
    title: 'Staff',
    href: '/staff',
    icon: UserCog,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: AlertTriangle,
    badge: '5',
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Messages',
    href: '/messages',
    icon: MessageSquare,
  },
  {
    title: 'Payments',
    href: '/payments',
    icon: CreditCard,
  },
  {
    title: 'Locations',
    href: '/locations',
    icon: MapPin,
  },
  {
    title: 'Moderation',
    href: '/moderation',
    icon: Shield,
  },
  {
    title: 'Content',
    href: '/content',
    icon: FileText,
  },
  {
    title: 'Promotions',
    href: '/promotions',
    icon: TrendingUp,
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },
  {
    title: 'System',
    href: '/system',
    icon: Database,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];