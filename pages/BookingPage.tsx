
import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType } from '../types';

const BookingPage: React.FC = () => {
    const { addReservation } = useContext(AppContext) as AppContextType;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [guests, setGuests] = useState(2);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addReservation({ name, phone, guests, date, time });
        setIsSubmitted(true);
        // Reset form
        setName('');
        setPhone('');
        setGuests(2);
        setDate('');
        setTime('');
    };

    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900">Book Your Table</h1>
                        <p className="mt-2 text-lg text-gray-600">We can't wait to host you.</p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
                            <h2 className="text-2xl font-bold text-green-800">Reservation Request Sent!</h2>
                            <p className="text-green-700 mt-2">Thank you! Your reservation request has been received. You will receive a confirmation shortly.</p>
                             <button onClick={() => setIsSubmitted(false)} className="mt-6 bg-rose-500 text-white font-bold py-2 px-6 rounded-full hover:bg-rose-600 transition-colors">
                                Make Another Reservation
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Number of Guests</label>
                                    <input type="number" id="guests" value={guests} onChange={e => setGuests(parseInt(e.target.value, 10))} min="1" max="12" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500" />
                                </div>
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                    <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                                <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500" />
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-transform transform hover:scale-105">
                                    Request Reservation
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
