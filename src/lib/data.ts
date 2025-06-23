import type { User, Listing, Conversation } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Alice', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-2', name: 'Bob', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-3', name: 'Charlie', avatarUrl: 'https://placehold.co/100x100' },
];

export const listings: Listing[] = [
  {
    id: 'listing-1',
    title: 'Jaguar X Type',
    description: 'A beautiful blue Jaguar, perfect for cruising. Minor wear and tear consistent with age.',
    price: 1100000000,
    category: 'Mobil',
    location: 'Slipi, Jakarta Barat',
    images: ['https://placehold.co/400x300'],
    seller: users[0],
    createdAt: '2024-05-20T10:00:00Z',
  },
  {
    id: 'listing-2',
    title: 'Lexus Sport Car',
    description: 'A stunning red Lexus sports car. Great condition, very low mileage. A real head-turner.',
    price: 2550000000,
    category: 'Mobil',
    location: 'Slipi, Jakarta Barat',
    images: ['https://placehold.co/400x300'],
    seller: users[1],
    createdAt: '2024-05-21T11:30:00Z',
    isHighlighted: true,
  },
  {
    id: 'listing-3',
    title: 'Jaguar F Type',
    description: 'A sleek silver Jaguar F Type. Pure performance and luxury. Comes with all optional extras.',
    price: 900000000,
    category: 'Mobil',
    location: 'Slipi, Jakarta Barat',
    images: ['https://placehold.co/400x300'],
    seller: users[0],
    createdAt: '2024-05-19T09:00:00Z',
  },
  {
    id: 'listing-4',
    title: 'Jaguar F Type',
    description: 'Another beautiful Jaguar F Type, in a darker grey. Well-maintained with full service history.',
    price: 2900000000,
    category: 'Mobil',
    location: 'Slipi, Jakarta Barat',
    images: ['https://placehold.co/400x300'],
    seller: users[2],
    createdAt: '2024-05-22T14:00:00Z',
  },
  {
    id: 'listing-5',
    title: 'Ford Mustang',
    description: 'Classic American muscle. This Ford Mustang is in excellent condition and sounds amazing.',
    price: 850000000,
    category: 'Mobil',
    location: 'Slipi, Jakarta Barat',
    images: ['https://placehold.co/400x300'],
    seller: users[1],
    createdAt: '2024-05-18T16:45:00Z',
  },
  {
    id: 'listing-6',
    title: 'Acoustic Guitar with Case',
    description: 'Yamaha acoustic guitar. Warm sound. Comes with a hard case and some extra strings.',
    price: 1500000,
    category: 'Musical Instruments',
    location: 'San Francisco, CA',
    images: ['https://placehold.co/400x300', 'https://placehold.co/400x300'],
    seller: users[0],
    createdAt: '2024-05-19T09:00:00Z',
  },
    {
    id: 'listing-7',
    title: 'Set of 4 Dining Chairs',
    description: 'Sturdy wooden dining chairs. Scandinavian design. Some light scratches but otherwise in great shape.',
    price: 2000000,
    category: 'Rumah Tangga',
    location: 'San Francisco, CA',
    images: ['https://placehold.co/400x300'],
    seller: users[1],
    createdAt: '2024-05-18T16:45:00Z',
  },
  {
    id: 'listing-8',
    title: 'Laptop - 2021 Model',
    description: '13-inch laptop, great for students or professionals. Wiped and ready for a new owner. Comes with charger.',
    price: 6000000,
    category: 'Gadget',
    location: 'Palo Alto, CA',
    images: ['https://placehold.co/400x300', 'https://placehold.co/400x300'],
    seller: users[2],
    createdAt: '2024-05-23T08:20:00Z',
  },
];

export const conversations: Conversation[] = [
  {
    id: 'convo-1',
    listing: { id: 'listing-1', title: 'Jaguar X Type', images: listings[0].images },
    participants: [users[1], users[0]],
    messages: [
      { id: 'msg-1-1', text: 'Hi, is this car still available?', senderId: 'user-1', timestamp: '2024-05-21T14:00:00Z' },
      { id: 'msg-1-2', text: 'Yes, it is!', senderId: 'user-0', timestamp: '2024-05-21T14:05:00Z' },
    ],
  },
  {
    id: 'convo-2',
    listing: { id: 'listing-2', title: 'Lexus Sport Car', images: listings[1].images },
    participants: [users[2], users[1]],
    messages: [
      { id: 'msg-2-1', text: 'Hey, I\'m interested in the car. Can we negotiate the price?', senderId: 'user-2', timestamp: '2024-05-22T10:00:00Z' },
    ],
  },
];

export const getListingById = (id: string) => listings.find(l => l.id === id);
export const getConversationById = (id: string) => conversations.find(c => c.id === id);

export const categories = [...new Set(listings.map(l => l.category))].sort();
