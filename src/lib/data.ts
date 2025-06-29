import type { User, Listing, Conversation, Category, Banner } from './types';
import {
  MapPin,
  Car,
  Building2,
  Bike,
  Briefcase,
  MonitorSmartphone,
  Guitar,
  Sofa,
  Shirt,
  Smartphone,
  Laptop,
  Headphones,
  Component,
  Tv,
  Camera,
  BookOpen,
  Baby,
  ToyBrick,
  Bed,
  Lamp,
  Wrench,
  Gamepad2,
  Dumbbell,
  PaintBucket,
  Utensils,
  Gem,
  Watch,
  Glasses,
  Footprints
} from 'lucide-react';

export const users: User[] = [
  { id: 'user-1', name: 'Ahmad Hudzaifah', avatarUrl: 'https://placehold.co/100x100.png', phoneNumber: '081234567890', showPhoneNumber: true },
  { id: 'user-2', name: 'Budi Santoso', avatarUrl: 'https://placehold.co/100x100.png', phoneNumber: '089876543210', showPhoneNumber: true },
  { id: 'user-3', name: 'Charlie', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'user-4', name: 'Diana Prince', avatarUrl: 'https://placehold.co/100x100.png', phoneNumber: '087654321098', showPhoneNumber: true },
  { id: 'user-5', name: 'Elena Rodriguez', avatarUrl: 'https://placehold.co/100x100.png', phoneNumber: '085432109876', showPhoneNumber: false },
];

export const listings: Listing[] = [
  {
    id: 'listing-piaggio',
    title: 'PIAGGIO VESPA MATIC SPRINT 150',
    description: "PIAGGIO VESPA MATIC SPRINT 150 3VIE 2014 BISA KREDIT.\n\nKondisi Like New\nWarna Putih Glossy\nMesin Halus Terawat\nBody Mulus\nPlat Letter BODO LOW\nSurat-Surat LENGKAP & TERJAMIN\nKunci Biru & Coklat (Master)\nCVT Halus Tidak Getar\nSemua Kelistrikan Berfungsi Normal\n\nSPECIAL PRICE......",
    price: 38000000,
    priceTo: 38500000,
    category: 'Motor',
    subCategory: 'Scooter',
    location: 'Keboran Baru, Jakarta Selatan',
    lat: -6.244,
    lng: 106.8009,
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    seller: users[1],
    createdAt: '2024-07-22T14:00:00Z',
    isHighlighted: true,
    tags: ['Gratis ganti oli', 'Servis Rutin'],
    year: 2014,
    rating: 4.8,
    condition: 'used',
  },
  {
    id: 'listing-z-fold',
    title: 'Samsung Galaxy Z Fold 5 512GB',
    description: 'A slightly used Samsung Galaxy Z Fold. Comes with original box and accessories. No scratches on screen. Perfect condition, used for 3 months.',
    price: 18500000,
    priceTo: 19000000,
    category: 'Elektronik',
    subCategory: 'Smartphone',
    location: 'Cilandak, Jakarta Selatan',
    lat: -6.2922,
    lng: 106.7909,
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    seller: users[0],
    createdAt: '2024-07-21T10:00:00Z',
    isHighlighted: true,
    tags: ['Fullset', 'Garansi'],
    year: 2023,
    rating: 5.0,
    condition: 'used',
  },
  {
    id: 'listing-bmw-x1',
    title: 'BMW X1 sDrive18i xLine (2014)',
    description: 'A stunning red BMW SUV. Great condition, very low mileage. A real head-turner. Service record available.',
    price: 260000000,
    category: 'Mobil',
    subCategory: 'SUV',
    location: 'Kebayoran Baru, Jakarta Selatan',
    lat: -6.244,
    lng: 106.8009,
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    seller: users[1],
    createdAt: '2024-07-21T11:30:00Z',
    isHighlighted: true,
    tags: ['Pajak Panjang'],
    year: 2014,
    rating: 4.5,
    condition: 'used',
  },
  {
    id: 'listing-jaguar',
    title: 'Jaguar F Type 2.0 Coupe',
    description: 'A sleek silver Jaguar F Type. Pure performance and luxury. Comes with all optional extras. Full paper.',
    price: 900000000,
    category: 'Mobil',
    subCategory: 'Coupe',
    location: 'Slipi, Jakarta Barat',
    lat: -6.1934,
    lng: 106.8021,
    images: ['https://placehold.co/800x600.png'],
    seller: users[0],
    createdAt: '2024-07-19T09:00:00Z',
    tags: ['Rare Item'],
    year: 2018,
    rating: 4.9,
    condition: 'used',
  },
  {
    id: 'listing-mustang',
    title: 'Ford Mustang 2.3L Ecoboost',
    description: 'Classic American muscle. This Ford Mustang is in excellent condition and sounds amazing. Very well maintained, not a daily driver.',
    price: 850000000,
    category: 'Mobil',
    subCategory: 'Coupe',
    location: 'Slipi, Jakarta Barat',
    lat: -6.1934,
    lng: 106.8021,
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    seller: users[1],
    createdAt: '2024-07-18T16:45:00Z',
    tags: [],
    year: 2019,
    rating: 4.7,
    condition: 'used',
  },
  {
    id: 'listing-laptop',
    title: 'MacBook Pro M1 13-inch 2021',
    description: '13-inch laptop, great for students or professionals. Wiped and ready for a new owner. Comes with charger. Cycle count low.',
    price: 16000000,
    category: 'Elektronik',
    subCategory: 'Laptop',
    location: 'Menteng, Jakarta Pusat',
    lat: -6.1944,
    lng: 106.8294,
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    seller: users[2],
    createdAt: '2024-05-23T08:20:00Z',
    tags: ['Like New'],
    year: 2021,
    rating: 4.2,
    condition: 'used',
  },
  {
    id: 'listing-gaming-chair',
    title: 'Gaming Chair RGB LED',
    description: 'Professional gaming chair with RGB lighting. Ergonomic design, lumbar support, adjustable height. Perfect for long gaming sessions.',
    price: 2500000,
    category: 'Rumah Tangga',
    subCategory: 'Furniture',
    location: 'Tangerang, Banten',
    lat: -6.1783,
    lng: 106.6319,
    images: ['https://placehold.co/800x600.png'],
    seller: users[3],
    createdAt: '2024-07-20T12:00:00Z',
    tags: ['RGB', 'Ergonomic'],
    year: 2023,
    rating: 4.6,
    condition: 'new',
  },
  {
    id: 'listing-iphone-15',
    title: 'iPhone 15 Pro Max 256GB',
    description: 'Brand new iPhone 15 Pro Max in Titanium Blue. Still sealed in box. International warranty included.',
    price: 22000000,
    category: 'Elektronik',
    subCategory: 'Smartphone',
    location: 'Senayan, Jakarta Selatan',
    lat: -6.2297,
    lng: 106.8075,
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    seller: users[4],
    createdAt: '2024-07-19T15:30:00Z',
    tags: ['Brand New', 'Warranty'],
    year: 2024,
    rating: 5.0,
    condition: 'new',
  }
];

export const conversations: Conversation[] = [
  {
    id: 'convo-1',
    listing: listings[0],
    participants: [users[1], users[0]],
    messages: [
      { id: 'msg-1-1', text: 'Hi, is this scooter still available?', senderId: 'user-1', timestamp: '2024-07-22T14:00:00Z' },
      { id: 'msg-1-2', text: 'Yes, it is! Would you like to see it?', senderId: 'user-2', timestamp: '2024-07-22T14:05:00Z' },
      { id: 'msg-1-3', text: 'Sure! When can we meet?', senderId: 'user-1', timestamp: '2024-07-22T14:10:00Z' },
    ],
  },
  {
    id: 'convo-2',
    listing: listings[1],
    participants: [users[2], users[1]],
    messages: [
      { id: 'msg-2-1', text: 'Hey, I\'m interested in the phone. Can we negotiate the price?', senderId: 'user-3', timestamp: '2024-07-22T10:00:00Z' },
      { id: 'msg-2-2', text: 'The price is quite firm, but we can discuss it.', senderId: 'user-1', timestamp: '2024-07-22T10:15:00Z' },
    ],
  },
  {
    id: 'convo-3',
    listing: listings[2],
    participants: [users[3], users[1]],
    messages: [
      { id: 'msg-3-1', text: 'Is the BMW still available? I\'m very interested.', senderId: 'user-4', timestamp: '2024-07-21T16:00:00Z' },
    ],
  },
];

export const getListingById = (id: string) => listings.find(l => l.id === id);
export const getConversationById = (id: string) => conversations.find(c => c.id === id);

export const categories: Category[] = [
  { name: 'Iklan Terdekat', slug: 'nearby', icon: MapPin },
  { 
    name: 'Mobil', 
    slug: 'mobil', 
    icon: Car,
    subCategories: [
      { name: 'All Cars', slug: 'all', icon: Car },
      { name: 'SUV', slug: 'suv', icon: Car },
      { name: 'Sedan', slug: 'sedan', icon: Car },
      { name: 'Coupe', slug: 'coupe', icon: Car },
      { name: 'Hatchback', slug: 'hatchback', icon: Car },
      { name: 'Convertible', slug: 'convertible', icon: Car },
      { name: 'Pickup Truck', slug: 'pickup', icon: Car },
      { name: 'Van', slug: 'van', icon: Car },
    ]
  },
  { 
    name: 'Motor', 
    slug: 'motor', 
    icon: Bike,
    subCategories: [
      { name: 'All Motors', slug: 'all', icon: Bike },
      { name: 'Scooter', slug: 'scooter', icon: Bike },
      { name: 'Sport', slug: 'sport', icon: Bike },
      { name: 'Moped', slug: 'moped', icon: Bike },
      { name: 'Cruiser', slug: 'cruiser', icon: Bike },
      { name: 'Touring', slug: 'touring', icon: Bike },
      { name: 'Off-road', slug: 'offroad', icon: Bike },
    ]
  },
  { 
    name: 'Properti', 
    slug: 'properti', 
    icon: Building2,
    subCategories: [
      { name: 'All Properties', slug: 'all', icon: Building2 },
      { name: 'Apartment', slug: 'apartment', icon: Building2 },
      { name: 'House', slug: 'house', icon: Building2 },
      { name: 'Land', slug: 'land', icon: Building2 },
      { name: 'Commercial', slug: 'commercial', icon: Building2 },
      { name: 'Villa', slug: 'villa', icon: Building2 },
      { name: 'Townhouse', slug: 'townhouse', icon: Building2 },
    ]
  },
  { 
    name: 'Elektronik', 
    slug: 'elektronik', 
    icon: MonitorSmartphone,
    subCategories: [
      { name: 'All Electronics', slug: 'all', icon: MonitorSmartphone },
      { name: 'Smartphone', slug: 'smartphone', icon: Smartphone },
      { name: 'Laptop', slug: 'laptop', icon: Laptop },
      { name: 'Tablet', slug: 'tablet', icon: MonitorSmartphone },
      { name: 'Aksesoris', slug: 'aksesoris', icon: Headphones },
      { name: 'TV & Audio', slug: 'tv-audio', icon: Tv },
      { name: 'Kamera', slug: 'kamera', icon: Camera },
      { name: 'Gaming', slug: 'gaming', icon: Gamepad2 },
      { name: 'Smart Watch', slug: 'smartwatch', icon: Watch },
    ]
  },
  { 
    name: 'Fashion', 
    slug: 'fashion', 
    icon: Shirt,
    subCategories: [
      { name: 'All Fashion', slug: 'all', icon: Shirt },
      { name: 'Pakaian Pria', slug: 'pakaian-pria', icon: Shirt },
      { name: 'Pakaian Wanita', slug: 'pakaian-wanita', icon: Shirt },
      { name: 'Sepatu', slug: 'sepatu', icon: Footprints },
      { name: 'Tas', slug: 'tas', icon: Component },
      { name: 'Aksesoris Fashion', slug: 'aksesoris-fashion', icon: Gem },
      { name: 'Jam Tangan', slug: 'jam-tangan', icon: Watch },
      { name: 'Kacamata', slug: 'kacamata', icon: Glasses },
    ]
  },
  { 
    name: 'Rumah Tangga', 
    slug: 'rumah-tangga', 
    icon: Sofa,
    subCategories: [
      { name: 'All Home Goods', slug: 'all', icon: Sofa },
      { name: 'Furniture', slug: 'furniture', icon: Bed },
      { name: 'Dekorasi', slug: 'dekorasi', icon: Lamp },
      { name: 'Peralatan Dapur', slug: 'dapur', icon: Utensils },
      { name: 'Elektronik Rumah', slug: 'elektronik-rumah', icon: Tv },
      { name: 'Kebun & Taman', slug: 'kebun', icon: PaintBucket },
    ]
  },
  { 
    name: 'Hobi & Hiburan', 
    slug: 'hobi', 
    icon: Guitar,
    subCategories: [
      { name: 'All Hobbies', slug: 'all', icon: Guitar },
      { name: 'Buku & Majalah', slug: 'buku', icon: BookOpen },
      { name: 'Musik & Film', slug: 'musik-film', icon: Guitar },
      { name: 'Olahraga', slug: 'olahraga', icon: Dumbbell },
      { name: 'Gaming', slug: 'gaming', icon: Gamepad2 },
      { name: 'Koleksi', slug: 'koleksi', icon: Gem },
    ]
  },
  { 
    name: 'Anak & Bayi', 
    slug: 'anak-bayi', 
    icon: Baby,
    subCategories: [
      { name: 'All Kids', slug: 'all', icon: Baby },
      { name: 'Mainan', slug: 'mainan', icon: ToyBrick },
      { name: 'Fashion Anak', slug: 'fashion-anak', icon: Shirt },
      { name: 'Perlengkapan Bayi', slug: 'perlengkapan-bayi', icon: Baby },
      { name: 'Stroller & Car Seat', slug: 'stroller', icon: Baby },
    ]
  },
  { 
    name: 'Jasa & Loker', 
    slug: 'jasa-loker', 
    icon: Briefcase,
    subCategories: [
      { name: 'All Services', slug: 'all', icon: Briefcase },
      { name: 'Lowongan Kerja', slug: 'lowongan-kerja', icon: Briefcase },
      { name: 'Jasa Perbaikan', slug: 'jasa-perbaikan', icon: Wrench },
      { name: 'Jasa Kebersihan', slug: 'jasa-kebersihan', icon: PaintBucket },
      { name: 'Jasa Desain', slug: 'jasa-desain', icon: PaintBucket },
      { name: 'Jasa IT', slug: 'jasa-it', icon: MonitorSmartphone },
    ]
  },
];

export const banners: Banner[] = [
  'https://placehold.co/1200x400/63B5FF/FFFFFF?text=TradeZone+Special+Offers',
  'https://placehold.co/1200x400/B563FF/FFFFFF?text=Sell+Your+Items+Fast',
  'https://placehold.co/1200x400/10B981/FFFFFF?text=Find+Great+Deals+Today'
];

// Policy and Terms data
export const policies = {
  privacyPolicy: {
    title: "Privacy Policy",
    lastUpdated: "2024-07-22",
    content: `
# Privacy Policy

## Information We Collect
We collect information you provide directly to us, such as when you create an account, post a listing, or contact us.

## How We Use Your Information
We use the information we collect to provide, maintain, and improve our services.

## Information Sharing
We do not sell, trade, or otherwise transfer your personal information to third parties.

## Data Security
We implement appropriate security measures to protect your personal information.

## Contact Us
If you have questions about this Privacy Policy, please contact us at privacy@tradezone.com.
    `
  },
  termsOfService: {
    title: "Terms of Service",
    lastUpdated: "2024-07-22",
    content: `
# Terms of Service

## Acceptance of Terms
By using TradeZone, you agree to these terms and conditions.

## User Accounts
You are responsible for maintaining the confidentiality of your account.

## Prohibited Uses
You may not use our service for any illegal or unauthorized purpose.

## Listing Guidelines
All listings must be accurate and comply with our community guidelines.

## Limitation of Liability
TradeZone shall not be liable for any indirect, incidental, or consequential damages.

## Contact Us
For questions about these Terms, contact us at legal@tradezone.com.
    `
  },
  communityGuidelines: {
    title: "Community Guidelines",
    lastUpdated: "2024-07-22",
    content: `
# Community Guidelines

## Be Respectful
Treat all users with respect and courtesy.

## Accurate Listings
Provide accurate descriptions and photos of your items.

## Safe Transactions
Meet in public places and use secure payment methods.

## Prohibited Items
Do not list illegal items or items that violate our policies.

## Report Issues
Report any suspicious activity or policy violations.
    `
  }
};

// Staff roles and permissions
export const staffRoles = [
  {
    id: 'admin',
    name: 'Administrator',
    permissions: ['all'],
    description: 'Full access to all features and settings'
  },
  {
    id: 'moderator',
    name: 'Moderator',
    permissions: ['listings.moderate', 'users.view', 'reports.manage'],
    description: 'Can moderate content and manage reports'
  },
  {
    id: 'support',
    name: 'Support Agent',
    permissions: ['users.view', 'messages.view', 'reports.view'],
    description: 'Can view user information and provide support'
  },
  {
    id: 'analyst',
    name: 'Data Analyst',
    permissions: ['analytics.view', 'reports.view'],
    description: 'Can view analytics and generate reports'
  }
];

export const staffMembers = [
  {
    id: 'staff-1',
    name: 'John Admin',
    email: 'john@tradezone.com',
    role: 'admin',
    avatar: 'https://placehold.co/100x100.png',
    status: 'active',
    lastLogin: '2024-07-22T10:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'staff-2',
    name: 'Sarah Moderator',
    email: 'sarah@tradezone.com',
    role: 'moderator',
    avatar: 'https://placehold.co/100x100.png',
    status: 'active',
    lastLogin: '2024-07-22T09:30:00Z',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 'staff-3',
    name: 'Mike Support',
    email: 'mike@tradezone.com',
    role: 'support',
    avatar: 'https://placehold.co/100x100.png',
    status: 'active',
    lastLogin: '2024-07-22T08:45:00Z',
    createdAt: '2024-03-01T00:00:00Z'
  }
];