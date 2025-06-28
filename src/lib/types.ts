
import type { ComponentType } from "react";

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber?: string;
  showPhoneNumber?: boolean;
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  priceTo?: number;
  category: string;
  subCategory?: string;
  location:string;
  lat?: number;
  lng?: number;
  images: string[];
  seller: User;
  createdAt: string; // ISO string
  isHighlighted?: boolean;
  tags?: string[];
  year?: number;
  rating?: number;
  condition: 'new' | 'used';
};

export type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: string; // ISO string
};

export type Conversation = {
  id: string;
  listing: Listing;
  participants: User[];
  messages: Message[];
};

export type SubCategory = {
  name: string;
  slug: string;
  icon?: ComponentType<{ className?: string }>;
};

export type Category = {
    name: string;
    slug: string;
    icon?: ComponentType<{ className?: string }>;
    subCategories?: SubCategory[];
};

export type Banner = string;
