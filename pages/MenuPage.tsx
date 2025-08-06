
import React, { useContext, useState, useMemo, useCallback } from 'react';
import { AppContext } from '../App';
import { AppContextType, MenuItem, CartItem, OrderType } from '../types';
import Modal from '../components/Modal';
import { getMealSuggestion } from '../services/geminiService';

const MenuItemCard: React.FC<{ item: MenuItem; onAddToCart: (item: MenuItem) => void; }> = ({ item, onAddToCart }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
        <img className="w-full h-48 object-cover" src={item.imageUrl} alt={item.name} />
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mt-2 flex-grow">{item.description}</p>
            <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-rose-500">₹{item.price.toFixed(2)}</span>
                <button onClick={() => onAddToCart(item)} className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-colors text-sm font-semibold">
                    Add to Order
                </button>
            </div>
        </div>
    </div>
);

const CartSidebar: React.FC = () => {
    const { cart, removeFromCart, clearCart, addOrder } = useContext(AppContext) as AppContextType;
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [customerName, setCustomerName] = useState("");

    const total = useMemo(() => cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0), [cart]);

    const handlePlaceOrder = () => {
        if (!customerName.trim()) {
            alert("Please enter your name.");
            return;
        }
        setIsPlacingOrder(true);
        // Simulate order placement
        setTimeout(() => {
            addOrder({ customerName, orderType: OrderType.TAKEAWAY });
            setIsPlacingOrder(false);
            setCustomerName("");
            alert("Order placed successfully!");
        }, 1000);
    };

    return (
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-xl sticky top-24">
            <h2 className="text-2xl font-bold border-b pb-4 mb-4">Your Order</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                        {cart.map((cartItem) => (
                            <div key={cartItem.menuItem.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{cartItem.menuItem.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {cartItem.quantity}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <p className="font-semibold">₹{(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(cartItem.menuItem.id)} className="text-red-500 hover:text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <button onClick={clearCart} className="text-sm text-gray-500 hover:text-red-500 w-full text-center mt-2">Clear Cart</button>
                        <div className="mt-4">
                            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Your Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"/>
                        </div>
                        <button onClick={handlePlaceOrder} disabled={isPlacingOrder} className="w-full bg-rose-500 text-white font-bold py-3 mt-4 rounded-lg shadow-lg hover:bg-rose-600 transition-all disabled:bg-gray-400">
                            {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const MenuPage: React.FC = () => {
    const { menu, addToCart } = useContext(AppContext) as AppContextType;
    const [isModalOpen, setModalOpen] = useState(false);
    const [suggestion, setSuggestion] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preference, setPreference] = useState('');

    const categories = useMemo(() => [...new Set(menu.map(item => item.category))], [menu]);

    const handleGetSuggestion = useCallback(async () => {
        if (!preference) {
            setError("Please enter a preference (e.g., 'light and healthy').");
            setModalOpen(true);
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuggestion(null);
        setModalOpen(true);
        try {
            const result = await getMealSuggestion(menu, preference);
            setSuggestion(result);
        } catch (e: any) {
            setError(e.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [menu, preference]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900">Our Menu</h1>
                <p className="mt-2 text-lg text-gray-600">Discover flavors that delight.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <p className="text-lg font-semibold text-gray-700">Feeling adventurous?</p>
                <div className="flex gap-2 w-full sm:w-auto">
                   <input 
                      type="text" 
                      value={preference}
                      onChange={(e) => setPreference(e.target.value)}
                      placeholder="e.g., 'a hearty meal'"
                      className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 flex-grow"
                    />
                    <button onClick={handleGetSuggestion} disabled={!process.env.API_KEY || isLoading} className="bg-teal-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-teal-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
                        ✨ Get AI Suggestion
                    </button>
                </div>
                 {!process.env.API_KEY && <p className="text-xs text-red-500 text-center sm:text-left mt-2 sm:mt-0">API Key not found. AI features are disabled.</p>}
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-2/3">
                    {categories.map(category => (
                        <div key={category} className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-rose-200 pb-2 mb-6">{category}</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {menu.filter(item => item.category === category).map(item => (
                                    <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <CartSidebar />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="AI Meal Suggestion">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center p-8">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 animate-spin" style={{borderTopColor: '#f43f5e'}}></div>
                        <p className="text-gray-600">Our AI chef is thinking...</p>
                    </div>
                )}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {suggestion && (
                    <div className="space-y-4">
                        <p className="text-lg text-gray-700 italic">"{suggestion.suggestionRationale}"</p>
                        <div className="border-t pt-4 space-y-3">
                            <div><strong className="text-rose-600">Appetizer:</strong> {suggestion.appetizer.name} - <span className="text-sm text-gray-600">{suggestion.appetizer.description}</span></div>
                            <div><strong className="text-rose-600">Main Course:</strong> {suggestion.mainCourse.name} - <span className="text-sm text-gray-600">{suggestion.mainCourse.description}</span></div>
                            <div><strong className="text-rose-600">Dessert:</strong> {suggestion.dessert.name} - <span className="text-sm text-gray-600">{suggestion.dessert.description}</span></div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MenuPage;