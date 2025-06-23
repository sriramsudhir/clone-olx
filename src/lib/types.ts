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
  location: string;
  images: string[];
  seller: User;
  createdAt: string; // ISO string
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
