import { User, UserRole } from '../types';

// In a real application, this data would come from a secure backend API.
// Passwords should always be hashed, never stored in plaintext.
export const USERS: User[] = [
    {
        id: 1,
        username: 'admin',
        password: 'password123', 
        role: UserRole.ADMIN,
    },
    {
        id: 2,
        username: 'chef',
        password: 'password123',
        role: UserRole.CHEF,
    },
    {
        id: 3,
        username: 'customer',
        password: 'password123',
        role: UserRole.CUSTOMER,
    }
];
