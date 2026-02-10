
import React from 'react';
import { UserRole, EventStatus, Event, Category, User, Booking } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Music', icon: '🎵', color: 'bg-pink-100 text-pink-600' },
  { id: '2', name: 'Tech', icon: '💻', color: 'bg-blue-100 text-blue-600' },
  { id: '3', name: 'Workshops', icon: '🎨', color: 'bg-orange-100 text-orange-600' },
  { id: '4', name: 'Business', icon: '💼', color: 'bg-indigo-100 text-indigo-600' },
  { id: '5', name: 'Food', icon: '🍕', color: 'bg-red-100 text-red-600' },
  { id: '6', name: 'Sports', icon: '⚽', color: 'bg-green-100 text-green-600' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Thompson', email: 'alex@example.com', role: UserRole.ATTENDEE, avatar: 'https://picsum.photos/seed/u1/200' },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@events.com', role: UserRole.ORGANIZER, avatar: 'https://picsum.photos/seed/u2/200', isVerified: true },
  { id: 'u3', name: 'Admin Master', email: 'admin@eventhive.com', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/u3/200' },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Global Tech Summit 2024',
    description: 'The premier conference for software developers and tech visionaries.',
    longDescription: 'Join thousands of developers for three days of intensive learning, networking, and innovation. We will cover the latest in AI, Cloud Computing, and Web Development.',
    date: '2024-11-15',
    time: '09:00 AM',
    location: 'San Francisco, CA',
    category: 'Tech',
    price: 499,
    capacity: 2000,
    bookedCount: 1240,
    imageUrl: 'https://picsum.photos/seed/tech1/800/400',
    organizerId: 'u2',
    status: EventStatus.LIVE,
    isFeatured: true
  },
  {
    id: 'e2',
    title: 'Summer Jazz Festival',
    description: 'A magical weekend of world-class jazz music in the heart of the city.',
    date: '2024-08-20',
    time: '04:00 PM',
    location: 'Central Park, NY',
    category: 'Music',
    price: 45,
    capacity: 5000,
    bookedCount: 3200,
    imageUrl: 'https://picsum.photos/seed/jazz/800/400',
    organizerId: 'u2',
    status: EventStatus.LIVE,
    isFeatured: true
  },
  {
    id: 'e3',
    title: 'Mindfulness Workshop',
    description: 'Learn practical techniques for stress reduction and mental clarity.',
    date: '2024-10-05',
    time: '10:00 AM',
    location: 'Virtual Event',
    category: 'Workshops',
    price: 0,
    capacity: 100,
    bookedCount: 85,
    imageUrl: 'https://picsum.photos/seed/meditation/800/400',
    organizerId: 'u2',
    status: EventStatus.LIVE
  },
  {
    id: 'e4',
    title: 'Culinary Arts Expo',
    description: 'Discover the world of fine dining and artisanal craft.',
    date: '2024-12-01',
    time: '11:00 AM',
    location: 'Chicago, IL',
    category: 'Food',
    price: 75,
    capacity: 500,
    bookedCount: 210,
    imageUrl: 'https://picsum.photos/seed/food1/800/400',
    organizerId: 'u2',
    status: EventStatus.LIVE
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', eventId: 'e1', userId: 'u1', ticketCount: 1, totalPrice: 499, status: 'CONFIRMED', bookedAt: '2024-05-01' },
];
