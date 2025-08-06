
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType, Order, OrderStatus } from '../types';

const OrderCard: React.FC<{ order: Order; onUpdateStatus: (id: string, status: OrderStatus) => void; }> = ({ order, onUpdateStatus }) => {
    const isCompleted = order.status === OrderStatus.COMPLETED || order.status === OrderStatus.CANCELLED;

    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${order.status === OrderStatus.PENDING ? 'border-yellow-400' : 'border-blue-500'} ${isCompleted ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold">Order #{order.id.substring(0, 6)}</h3>
                    <p className="text-sm text-gray-500">{order.customerName} - {order.orderType}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${order.status === OrderStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {order.status}
                </span>
            </div>
            <div className="mt-4 border-t pt-4">
                <ul className="space-y-2">
                    {order.items.map(item => (
                        <li key={item.menuItem.id} className="flex justify-between">
                            <span>{item.menuItem.name}</span>
                            <span className="font-semibold">x{item.quantity}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {!isCompleted && (
                <div className="mt-6 flex gap-2">
                    {order.status === OrderStatus.PENDING && (
                        <button onClick={() => onUpdateStatus(order.id, OrderStatus.PREPARING)} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                            Start Preparing
                        </button>
                    )}
                    {order.status === OrderStatus.PREPARING && (
                         <button onClick={() => onUpdateStatus(order.id, OrderStatus.READY)} className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
                            Mark as Ready
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};


const KitchenView: React.FC = () => {
    const { orders, updateOrderStatus } = useContext(AppContext) as AppContextType;

    const activeOrders = orders.filter(o => o.status === OrderStatus.PENDING || o.status === OrderStatus.PREPARING);
    
    return (
        <div className="bg-gray-800 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white">Kitchen View</h1>
                    <div className="text-lg text-white font-semibold bg-rose-600 px-4 py-2 rounded-lg">
                        {activeOrders.length} Active Orders
                    </div>
                </div>

                {activeOrders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeOrders.sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime()).map(order => (
                            <OrderCard key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-700 rounded-lg">
                        <p className="text-2xl text-white">No active orders right now.</p>
                        <p className="text-gray-400 mt-2">Time for a coffee break! ☕</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KitchenView;
