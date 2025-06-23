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
} from 'lucide-react';


export const users: User[] = [
  { id: 'user-1', name: 'Ahmad Hudzaifah', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-2', name: 'Budi Santoso', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-3', name: 'Charlie', avatarUrl: 'https://placehold.co/100x100' },
];

export const listings: Listing[] = [
    {
    id: 'listing-piaggio',
    title: 'PIAGGIO VESPA MATIC SPRINT 150',
    description: "PIAGGIO VESPA MATIC SPRINT 150 3VIE 2014 BISA KREDIT.\nKondisi Like New\nWarna Putih Glossy\nMesin Halus Terawat\nBody Mulus\nPlat Letter BODO LOW\nSurat-Surat LENGKAP & TERJAMIN\nKunci Biru & Coklat (Master)\nCVT Halus Tidak Getar\nSemua Kelistrikan Berfungsi Normal\nSPECIAL PRICE......",
    price: 38500000,
    category: 'Motor',
    location: 'Keboran Baru, Jakarta Selatan',
    images: ['https://placehold.co/600x600', 'https://placehold.co/400x300', 'https://placehold.co/400x300'],
    seller: users[1],
    createdAt: '2024-07-22T14:00:00Z',
    isHighlighted: true,
    tags: ['Bekas', 'Gratis ganti oli'],
    year: 2014,
    rating: 4.8,
  },
  {
    id: 'listing-z-fold',
    title: 'Samsung Galaxy Z Fold',
    description: 'A slightly used Samsung Galaxy Z Fold. Comes with original box and accessories. No scratches on screen.',
    price: 19000000,
    category: 'Gadget',
    location: 'Cilandak, Jakarta Selatan',
    images: ['https://placehold.co/600x600'],
    seller: users[0],
    createdAt: '2024-07-21T10:00:00Z',
    isHighlighted: true,
    tags: ['Bekas', 'Fullset'],
    year: 2023,
    rating: 5.0,
  },
  {
    id: 'listing-bmw-x1',
    title: 'Bmw X1 (2014)',
    description: 'A stunning red Lexus sports car. Great condition, very low mileage. A real head-turner.',
    price: 260000000,
    category: 'Mobil',
    location: 'Kebayoran Baru, Jakarta Selatan',
    images: ['https://placehold.co/600x600'],
    seller: users[1],
    createdAt: '2024-07-21T11:30:00Z',
    isHighlighted: true,
    tags: ['Bekas'],
    year: 2014,
    rating: 4.5,
  },
  {
    id: 'listing-jaguar',
    title: 'Jaguar F Type',
    description: 'A sleek silver Jaguar F Type. Pure performance and luxury. Comes with all optional extras.',
    price: 900000000,
    category: 'Mobil',
    location: 'Slipi, Jakarta Barat',
    images: ['https://placehold.co/600x600'],
    seller: users[0],
    createdAt: '2024-07-19T09:00:00Z',
    tags: ['Bekas'],
    year: 2018,
    rating: 4.9,
  },
  {
    id: 'listing-mustang',
    title: 'Ford Mustang',
    description: 'Classic American muscle. This Ford Mustang is in excellent condition and sounds amazing.',
    price: 850000000,
    category: 'Mobil',
    location: 'Slipi, Jakarta Barat',
    images: ['https://placehold.co/600x600'],
    seller: users[1],
    createdAt: '2024-07-18T16:45:00Z',
    tags: ['Bekas'],
    year: 2019,
    rating: 4.7,
  },
  {
    id: 'listing-laptop',
    title: 'Laptop - 2021 Model',
    description: '13-inch laptop, great for students or professionals. Wiped and ready for a new owner. Comes with charger.',
    price: 6000000,
    category: 'Gadget',
    location: 'Palo Alto, CA',
    images: ['https://placehold.co/600x600', 'https://placehold.co/400x300'],
    seller: users[2],
    createdAt: '2024-05-23T08:20:00Z',
    tags: ['Bekas'],
    year: 2021,
    rating: 4.2,
  },
];

export const conversations: Conversation[] = [
  {
    id: 'convo-1',
    listing: { id: 'listing-piaggio', title: 'PIAGGIO VESPA MATIC SPRINT 150', images: listings[0].images },
    participants: [users[1], users[0]],
    messages: [
      { id: 'msg-1-1', text: 'Hi, is this scooter still available?', senderId: 'user-1', timestamp: '2024-07-22T14:00:00Z' },
      { id: 'msg-1-2', text: 'Yes, it is!', senderId: 'user-2', timestamp: '2024-07-22T14:05:00Z' },
    ],
  },
  {
    id: 'convo-2',
    listing: { id: 'listing-bmw-x1', title: 'Bmw X1 (2014)', images: listings[1].images },
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
    { name: 'Mobil', slug: 'mobil', icon: Car },
    { name: 'Properti', slug: 'properti', icon: Building2 },
    { name: 'Motor', slug: 'motor', icon: Bike },
    { name: 'Jasa & Loker', slug: 'jasa-loker', icon: Briefcase },
    { name: 'Gadget', slug: 'gadget', icon: MonitorSmartphone },
    { name: 'Olahraga', slug: 'olahraga', icon: Guitar },
    { name: 'Rumah Tangga', slug: 'rumah-tangga', icon: Sofa },
    { name: 'Pribadi', slug: 'pribadi', icon: Shirt },
];

export const banners: Banner[] = [
    'https://placehold.co/800x400'
];
