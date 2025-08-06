import React, { useState, useCallback, createContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole, MenuItem, Order, Reservation, Feedback, OrderStatus, AppContextType, CartItem } from './types';
import { INITIAL_MENU } from './constants';
import { USERS } from './data/userData';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BookingPage from './pages/BookingPage';
import OrderStatusPage from './pages/OrderStatusPage';
import AdminDashboard from './pages/AdminDashboard';
import KitchenView from './pages/KitchenView';
import LoginPage from './pages/LoginPage';

export const AppContext = createContext<AppContextType | null>(null);

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
    const [orders, setOrders] = useState<Order[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);

    const login = useCallback((username: string, password: string): User | null => {
        const user = USERS.find(u => u.username === username && u.password === password);
        if (user) {
            setCurrentUser(user);
            return user;
        }
        return null;
    }, []);

    const logout = useCallback(() => {
        setCurrentUser(null);
    }, []);

    const addToCart = useCallback((itemToAdd: MenuItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.menuItem.id === itemToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.menuItem.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { menuItem: itemToAdd, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((itemId: number) => {
        setCart(prevCart => prevCart.filter(item => item.menuItem.id !== itemId));
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const addOrder = useCallback((orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'total' | 'items'>) => {
        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            ...orderData,
            items: cart,
            total: cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
            status: OrderStatus.PENDING,
            createdAt: new Date(),
        };
        setOrders(prev => [...prev, newOrder]);
        clearCart();
    }, [cart, clearCart]);

    const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    }, []);

    const addReservation = useCallback((resData: Omit<Reservation, 'id' | 'status'>) => {
        const newReservation: Reservation = {
            id: `RES-${Date.now()}`,
            ...resData,
            status: 'Pending',
        };
        setReservations(prev => [...prev, newReservation]);
    }, []);
    
    const updateReservationStatus = useCallback((resId: string, status: Reservation['status']) => {
        setReservations(prev => prev.map(r => r.id === resId ? { ...r, status } : r));
    }, []);

    const addMenuItem = useCallback((itemData: Omit<MenuItem, 'id'>) => {
        const newItem: MenuItem = {
            id: Date.now(),
            ...itemData,
        };
        setMenu(prev => [...prev, newItem]);
    }, []);

    const updateMenuItem = useCallback((updatedItem: MenuItem) => {
        setMenu(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    }, []);

    const deleteMenuItem = useCallback((itemId: number) => {
        setMenu(prev => prev.filter(item => item.id !== itemId));
    }, []);
    
    const addFeedback = useCallback((feedbackData: Omit<Feedback, 'id' | 'createdAt'>) => {
        const newFeedback: Feedback = {
            id: `FDBK-${Date.now()}`,
            ...feedbackData,
            createdAt: new Date(),
        };
        setFeedback(prev => [...prev, newFeedback]);
    }, []);

    const contextValue: AppContextType = {
        currentUser, login, logout,
        menu, orders, reservations, feedback, cart,
        addOrder, updateOrderStatus, addReservation, updateReservationStatus,
        addMenuItem, updateMenuItem, deleteMenuItem, addFeedback,
        addToCart, removeFromCart, clearCart
    };

    return (
        <AppContext.Provider value={contextValue}>
            <HashRouter>
                <div className="flex flex-col min-h-screen bg-slate-50">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/menu" element={<MenuPage />} />
                            <Route path="/book" element={<BookingPage />} />
                            <Route path="/order-status" element={<OrderStatusPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/admin" element={currentUser?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" replace />} />
                            <Route path="/kitchen" element={currentUser?.role === UserRole.CHEF ? <KitchenView /> : <Navigate to="/login" replace />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                </div>
            </HashRouter>
        </AppContext.Provider>
    );
};

export default App;
