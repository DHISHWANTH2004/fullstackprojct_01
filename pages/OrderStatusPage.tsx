
import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType, Order, OrderStatus } from '../types';

const OrderStatusTimeline: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statuses = [OrderStatus.PENDING, OrderStatus.PREPARING, OrderStatus.READY, OrderStatus.COMPLETED];
    const currentIndex = statuses.indexOf(status);

    const getStatusClass = (index: number) => {
        if (index < currentIndex) return 'bg-green-500 text-white';
        if (index === currentIndex) return 'bg-rose-500 text-white animate-pulse';
        return 'bg-gray-300 text-gray-600';
    };

    return (
        <div className="w-full my-8">
            <div className="flex items-center">
                {statuses.map((s, index) => (
                    <React.Fragment key={s}>
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-500 ${getStatusClass(index)}`}>
                                {index < currentIndex ? '✓' : index + 1}
                            </div>
                            <p className="mt-2 text-xs text-center font-semibold">{s}</p>
                        </div>
                        {index < statuses.length - 1 && (
                            <div className={`flex-auto border-t-4 transition-colors duration-500 ${index < currentIndex ? 'border-green-500' : 'border-gray-300'}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};


const OrderStatusPage: React.FC = () => {
    const { orders } = useContext(AppContext) as AppContextType;
    const [orderId, setOrderId] = useState('');
    const [searchedOrder, setSearchedOrder] = useState<Order | null | undefined>(undefined);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const foundOrder = orders.find(o => o.id === orderId.trim());
        setSearchedOrder(foundOrder || null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Track Your Order</h1>
                    <p className="mt-2 text-lg text-gray-600">Enter your Order ID to see its status.</p>
                </div>
                <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter Order ID"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <button type="submit" className="bg-rose-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-rose-600 transition-colors">
                        Search
                    </button>
                </form>
                
                <div className="mt-12">
                    {searchedOrder === undefined && (
                        <p className="text-center text-gray-500">Waiting for you to search for an order.</p>
                    )}
                    {searchedOrder === null && (
                        <p className="text-center text-red-500 font-semibold">Order not found. Please check the ID and try again.</p>
                    )}
                    {searchedOrder && (
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                            <p><strong>ID:</strong> {searchedOrder.id}</p>
                            <p><strong>Customer:</strong> {searchedOrder.customerName}</p>
                            <p><strong>Status:</strong> <span className="font-bold text-rose-600">{searchedOrder.status}</span></p>
                            <OrderStatusTimeline status={searchedOrder.status} />
                            <h3 className="text-xl font-bold mt-6 mb-2">Items</h3>
                            <ul className="list-disc list-inside">
                                {searchedOrder.items.map(item => (
                                    <li key={item.menuItem.id}>{item.menuItem.name} (x{item.quantity})</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderStatusPage;
