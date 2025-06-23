import type { ComponentType } from "react";

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subCategory?: string;
  location:string;
  images: string[];
  seller: User;
  createdAt: string; // ISO string
  isHighlighted?: boolean;
  tags?: string[];
  year?: number;
  rating?: number;
};

export type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: string; // ISO string
};

export type Conversation = {
  id: string;
  listing: Pick<Listing, 'id' | 'title' | 'images'>;
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
