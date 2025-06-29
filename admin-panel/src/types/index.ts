export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  lastLogin?: string;
  listingsCount: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  location: string;
  images: string[];
  status: 'active' | 'pending' | 'rejected' | 'sold';
  featured: boolean;
  seller: User;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
  subcategories?: Category[];
  listingsCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface Report {
  id: string;
  type: 'listing' | 'user' | 'message';
  reason: string;
  description: string;
  reportedBy: User;
  reportedItem: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: User;
}

export interface Analytics {
  totalUsers: number;
  totalListings: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersToday: number;
  newListingsToday: number;
  revenueToday: number;
  conversionRate: number;
  avgSessionDuration: string;
  bounceRate: number;
  topCategories: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  userRegistration: boolean;
  emailVerification: boolean;
  autoApproveListings: boolean;
  maxImagesPerListing: number;
  commissionRate: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}