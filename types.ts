
export enum UserRole {
  ATTENDEE = 'ATTENDEE',
  ORGANIZER = 'ORGANIZER',
  ADMIN = 'ADMIN'
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  LIVE = 'LIVE',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  isVerified?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  capacity: number;
  bookedCount: number;
  imageUrl: string;
  organizerId: string;
  status: EventStatus;
  isFeatured?: boolean;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  ticketCount: number;
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
  bookedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
