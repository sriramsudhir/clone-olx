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
  Wrench
} from 'lucide-react';


export const users: User[] = [
  { id: 'user-1', name: 'Ahmad Hudzaifah', avatarUrl: 'https://placehold.co/100x100.png', phoneNumber: '081234567890', showPhoneNumber: true, status: 'active' },
  { id: 'user-2', name: 'Budi Santoso', avatarUrl: 'https://placehold.co/100x100.png', phoneNumber: '089876543210', showPhoneNumber: true, status: 'active' },
  { id: 'user-3', name: 'Charlie', avatarUrl: 'https://placehold.co/100x100.png', status: 'suspended' },
];

export const listings: Listing[] = [
    {
    id: 'listing-piaggio',
    title: 'PIAGGIO VESPA MATIC SPRINT 150',
    description: "PIAGGIO VESPA MATIC SPRINT 150 3VIE 2014 BISA KREDIT.\n\nKondisi Like New\nWarna Putih Glossy\nMesin Halus Terawat\nBody Mulus\nPlat Letter BODO LOW\nSurat-Surat LENGKAP & TERJAMIN\nKunci Biru & Coklat (Master)\nCVT Halus Tidak Getar\nSemua Kelistrikan Berfungsi Normal\n\nSPECIAL PRICE......",
    price: 38000000,
    priceTo: 38500000,
    category: 'Motor',
    subCategory: 'scooter',
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
    subCategory: 'smartphone',
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
    title: 'Bmw X1 sDrive18i xLine (2014)',
    description: 'A stunning red Lexus sports car. Great condition, very low mileage. A real head-turner. Service record available.',
    price: 260000000,
    category: 'Mobil',
    subCategory: 'suv',
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
    subCategory: 'coupe',
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
    subCategory: 'coupe',
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
    title: 'Macbook Pro M1 13-inch 2021',
    description: '13-inch laptop, great for students or professionals. Wiped and ready for a new owner. Comes with charger. Cycle count low.',
    price: 16000000,
    category: 'Elektronik',
    subCategory: 'laptop',
    location: 'Palo Alto, CA',
    lat: 37.4419,
    lng: -122.1430,
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    seller: users[2],
    createdAt: '2024-05-23T08:20:00Z',
    tags: ['Like New'],
    year: 2021,
    rating: 4.2,
    condition: 'used',
  },
];

export const conversations: Conversation[] = [
  {
    id: 'convo-1',
    listing: listings[0],
    participants: [users[1], users[0]],
    messages: [
      { id: 'msg-1-1', text: 'Hi, is this scooter still available?', senderId: 'user-1', timestamp: '2024-07-22T14:00:00Z' },
      { id: 'msg-1-2', text: 'Yes, it is!', senderId: 'user-2', timestamp: '2024-07-22T14:05:00Z' },
    ],
  },
  {
    id: 'convo-2',
    listing: listings[1],
    participants: [users[2], users[1]],
    messages: [
      { id: 'msg-2-1', text: 'Hey, I\'m interested in the car. Can we negotiate the price?', senderId: 'user-2', timestamp: '2024-07-22T10:00:00Z' },
    ],
  },
];

export const getListingById = (id: string) => listings.find(l => l.id === id);
export const getConversationById = (id:string) => conversations.find(c => c.id === id);

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
        { name: 'Aksesoris', slug: 'aksesoris', icon: Headphones },
        { name: 'TV & Audio', slug: 'tv-audio', icon: Tv },
        { name: 'Kamera', slug: 'kamera', icon: Camera },
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
            { name: 'Aksesoris Fashion', slug: 'aksesoris-fashion', icon: Component },
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
      ]
    },
    { 
      name: 'Jasa & Loker', 
      slug: 'jasa-loker', 
      icon: Briefcase,
       subCategories: [
          { name: 'All Services', slug: 'all', icon: Briefcase },
          { name: 'Lowongan Kerja', slug: 'lowongan-kerja', icon: Briefcase },
          { name: 'Jasa', slug: 'jasa', icon: Wrench },
      ]
    },
];

export const banners: Banner[] = [
    'https://placehold.co/1200x400.png',
    'https://placehold.co/1200x400.png',
    'https://placehold.co/1200x400.png'
];
