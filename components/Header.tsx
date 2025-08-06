import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { UserRole, AppContextType } from '../types';
import { Logo } from '../constants';

const Header: React.FC = () => {
    const { currentUser, logout, cart } = useContext(AppContext) as AppContextType;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClass = "px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all";
    const activeNavLinkClass = "bg-rose-100 text-rose-600";

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <NavLink to="/"><Logo /></NavLink>
                    </div>
                    <nav className="hidden md:flex items-center space-x-4">
                        <NavLink to="/" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`} end>Home</NavLink>
                        <NavLink to="/menu" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}>Menu</NavLink>
                        <NavLink to="/book" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}>Book a Table</NavLink>
                        <NavLink to="/order-status" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}>Order Status</NavLink>
                        {currentUser?.role === UserRole.ADMIN && (
                            <NavLink to="/admin" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}>Admin Dashboard</NavLink>
                        )}
                        {currentUser?.role === UserRole.CHEF && (
                            <NavLink to="/kitchen" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}>Kitchen View</NavLink>
                        )}
                         <div className="relative">
                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </nav>
                    <div className="flex items-center">
                        {!currentUser ? (
                             <NavLink to="/login" className="bg-rose-500 text-white font-bold py-2 px-4 rounded-full shadow-sm hover:bg-rose-600 transition-transform transform hover:scale-105 text-sm">
                                Login
                            </NavLink>
                        ) : (
                            <div className="flex items-center space-x-4">
                               <span className="text-sm font-medium text-gray-700">
                                   Welcome, <strong>{currentUser.username}</strong>
                               </span>
                                <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-gray-900">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
