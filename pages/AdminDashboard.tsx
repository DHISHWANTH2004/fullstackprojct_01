
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType, Order, OrderStatus, Reservation, MenuItem } from '../types';

const AdminDashboard: React.FC = () => {
    const { orders, reservations, menu, updateOrderStatus, updateReservationStatus, addMenuItem, updateMenuItem, deleteMenuItem } = useContext(AppContext) as AppContextType;
    const [activeTab, setActiveTab] = useState('orders');
    
    const [newMenuItem, setNewMenuItem] = useState<Omit<MenuItem, 'id'>>({ name: '', description: '', price: 0, category: '', imageUrl: '' });
    const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);

    const handleAddMenuItem = (e: React.FormEvent) => {
        e.preventDefault();
        addMenuItem(newMenuItem);
        setNewMenuItem({ name: '', description: '', price: 0, category: '', imageUrl: '' });
    };

    const handleUpdateMenuItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingMenuItem) {
            updateMenuItem(editingMenuItem);
            setEditingMenuItem(null);
        }
    };
    
    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <p className="font-bold">Order #{order.id.substring(0, 6)} ({order.customerName})</p>
                                    <p className="text-sm text-gray-600">{order.items.length} items - ₹{order.total.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">Status: <span className="font-semibold">{order.status}</span></p>
                                </div>
                                <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)} className="p-2 border rounded-md">
                                    {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        ))}
                    </div>
                );
            case 'reservations':
                return (
                    <div className="space-y-4">
                        {reservations.map(res => (
                            <div key={res.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{res.name} ({res.guests} guests)</p>
                                    <p className="text-sm text-gray-600">{res.date} @ {res.time}</p>
                                    <p className="text-sm text-gray-500">Status: <span className="font-semibold">{res.status}</span></p>
                                </div>
                                <div className="space-x-2">
                                     <button onClick={() => updateReservationStatus(res.id, 'Confirmed')} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 disabled:bg-gray-400" disabled={res.status === 'Confirmed'}>Confirm</button>
                                     <button onClick={() => updateReservationStatus(res.id, 'Cancelled')} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 disabled:bg-gray-400" disabled={res.status === 'Cancelled'}>Cancel</button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'menu':
                return (
                    <div>
                        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">{editingMenuItem ? "Edit Menu Item" : "Add New Menu Item"}</h3>
                            <form onSubmit={editingMenuItem ? handleUpdateMenuItem : handleAddMenuItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Name" value={editingMenuItem ? editingMenuItem.name : newMenuItem.name} onChange={e => editingMenuItem ? setEditingMenuItem({...editingMenuItem, name: e.target.value}) : setNewMenuItem({...newMenuItem, name: e.target.value})} className="p-2 border rounded-md" required />
                                <input type="text" placeholder="Category" value={editingMenuItem ? editingMenuItem.category : newMenuItem.category} onChange={e => editingMenuItem ? setEditingMenuItem({...editingMenuItem, category: e.target.value}) : setNewMenuItem({...newMenuItem, category: e.target.value})} className="p-2 border rounded-md" required />
                                <input type="number" step="0.01" placeholder="Price" value={editingMenuItem ? editingMenuItem.price : newMenuItem.price} onChange={e => editingMenuItem ? setEditingMenuItem({...editingMenuItem, price: parseFloat(e.target.value)}) : setNewMenuItem({...newMenuItem, price: parseFloat(e.target.value)})} className="p-2 border rounded-md" required />
                                <input type="text" placeholder="Image URL" value={editingMenuItem ? editingMenuItem.imageUrl : newMenuItem.imageUrl} onChange={e => editingMenuItem ? setEditingMenuItem({...editingMenuItem, imageUrl: e.target.value}) : setNewMenuItem({...newMenuItem, imageUrl: e.target.value})} className="p-2 border rounded-md" required />
                                <textarea placeholder="Description" value={editingMenuItem ? editingMenuItem.description : newMenuItem.description} onChange={e => editingMenuItem ? setEditingMenuItem({...editingMenuItem, description: e.target.value}) : setNewMenuItem({...newMenuItem, description: e.target.value})} className="p-2 border rounded-md md:col-span-2" required />
                                <div className="md:col-span-2 flex justify-end gap-4">
                                    {editingMenuItem && <button type="button" onClick={() => setEditingMenuItem(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>}
                                    <button type="submit" className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600">{editingMenuItem ? 'Update Item' : 'Add Item'}</button>
                                </div>
                            </form>
                        </div>
                        <div className="space-y-4">
                            {menu.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="space-x-2">
                                        <button onClick={() => setEditingMenuItem(item)} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">Edit</button>
                                        <button onClick={() => deleteMenuItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Dashboard</h1>
            <div className="flex border-b border-gray-200 mb-8">
                <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 font-semibold ${activeTab === 'orders' ? 'border-b-2 border-rose-500 text-rose-600' : 'text-gray-500'}`}>Manage Orders</button>
                <button onClick={() => setActiveTab('reservations')} className={`px-4 py-2 font-semibold ${activeTab === 'reservations' ? 'border-b-2 border-rose-500 text-rose-600' : 'text-gray-500'}`}>Manage Reservations</button>
                <button onClick={() => setActiveTab('menu')} className={`px-4 py-2 font-semibold ${activeTab === 'menu' ? 'border-b-2 border-rose-500 text-rose-600' : 'text-gray-500'}`}>Manage Menu</button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;