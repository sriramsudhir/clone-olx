import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user']),
  status: z.enum(['active', 'suspended', 'pending']),
});

export const listingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(2, 'Location is required'),
  status: z.enum(['active', 'pending', 'rejected', 'sold']),
  featured: z.boolean(),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean(),
});

export const reportSchema = z.object({
  status: z.enum(['pending', 'investigating', 'resolved', 'dismissed']),
  priority: z.enum(['low', 'medium', 'high']),
  notes: z.string().optional(),
});

export const settingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().min(1, 'Site description is required'),
  maintenanceMode: z.boolean(),
  userRegistration: z.boolean(),
  emailVerification: z.boolean(),
  autoApproveListings: z.boolean(),
  maxImagesPerListing: z.number().min(1).max(20),
  commissionRate: z.number().min(0).max(100),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});