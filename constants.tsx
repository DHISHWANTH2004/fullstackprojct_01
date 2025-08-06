import React from 'react';
import { MenuItem } from './types';

export const INITIAL_MENU: MenuItem[] = [
  { id: 1, name: 'Margherita Pizza', description: 'Classic pizza with tomatoes, mozzarella, and basil.', price: 1050, category: 'Main Courses', imageUrl: 'https://picsum.photos/seed/pizza/400/300' },
  { id: 2, name: 'Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.', price: 700, category: 'Appetizers', imageUrl: 'https://picsum.photos/seed/salad/400/300' },
  { id: 3, name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, pancetta, and black pepper.', price: 1250, category: 'Main Courses', imageUrl: 'https://picsum.photos/seed/pasta/400/300' },
  { id: 4, name: 'Tiramisu', description: 'Coffee-flavoured Italian dessert.', price: 600, category: 'Desserts', imageUrl: 'https://picsum.photos/seed/tiramisu/400/300' },
  { id: 5, name: 'Bruschetta', description: 'Grilled bread with garlic, tomatoes, and olive oil.', price: 550, category: 'Appetizers', imageUrl: 'https://picsum.photos/seed/bruschetta/400/300' },
  { id: 6, name: 'Grilled Salmon', description: 'Salmon fillet grilled to perfection, served with asparagus.', price: 1500, category: 'Main Courses', imageUrl: 'https://picsum.photos/seed/salmon/400/300' },
  { id: 7, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center.', price: 650, category: 'Desserts', imageUrl: 'https://picsum.photos/seed/cake/400/300' },
  { id: 8, name: 'Iced Tea', description: 'Freshly brewed and chilled.', price: 250, category: 'Drinks', imageUrl: 'https://picsum.photos/seed/tea/400/300' },
];

export const RestaurantIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8M10 3h4M17 21l-1.3-4.5M7 21l1.3-4.5M12 3V2m0 19v-1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12h-1M4 12H3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.071 4.929l-.707.707M5.636 18.364l-.707.707M18.364 5.636l.707-.707M4.929 19.071l.707-.707" />
    </svg>
);

export const Logo = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454l-2.768-2.768a2.982 2.982 0 000-2.464l2.768-2.768a2.982 2.982 0 002.464 0l2.768 2.768a2.982 2.982 0 000 2.464l-2.768 2.768a2.982 2.982 0 001.5.454c.523 0 1.046-.151 1.5-.454m-12 0c-.523 0-1.046.151-1.5.454l-2.768-2.768a2.982 2.982 0 000-2.464l2.768-2.768a2.982 2.982 0 002.464 0l2.768 2.768a2.982 2.982 0 000 2.464l-2.768 2.768a2.982 2.982 0 001.5.454c.523 0 1.046-.151 1.5-.454m-12 0a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-2xl font-bold text-gray-800">DAS Foods</span>
    </div>
);