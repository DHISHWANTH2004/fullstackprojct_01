
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { AppContextType, Feedback } from '../types';

const FeedbackCard: React.FC<{feedback: Feedback}> = ({ feedback }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center mb-2">
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <p className="ml-2 text-sm text-gray-600 font-semibold">{feedback.name}</p>
        </div>
        <p className="text-gray-600 italic">"{feedback.comment}"</p>
    </div>
);

const HomePage: React.FC = () => {
    const { feedback } = useContext(AppContext) as AppContextType;

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="bg-rose-50 text-center py-20 px-4">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10" 
                    style={{backgroundImage: "url('https://picsum.photos/seed/restaurant-bg/1920/1080')"}}
                ></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight sm:text-6xl">Welcome to DAS Foods</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        Effortless dining, from reservation to review. Your table is waiting.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Link to="/menu" className="inline-block bg-rose-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-rose-600 transition-transform transform hover:scale-105">
                            Explore Menu
                        </Link>
                        <Link to="/book" className="inline-block bg-white text-rose-500 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-rose-100 transition-transform transform hover:scale-105">
                            Book a Table
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-rose-600 font-semibold tracking-wide uppercase">Our Features</h2>
                        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">A Better Dining Experience</p>
                    </div>
                    <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900">Online Booking</h3>
                            <p className="mt-2 text-base text-gray-500">Reserve your table in seconds. No calls, no waiting.</p>
                        </div>
                        <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900">Dynamic Menu</h3>
                            <p className="mt-2 text-base text-gray-500">Browse our delicious offerings with beautiful photos and descriptions.</p>
                        </div>
                        <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900">Real-time Order Tracking</h3>
                            <p className="mt-2 text-base text-gray-500">Know exactly when your food is ready, whether you dine-in or takeaway.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Feedback Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">What Our Customers Say</h2>
                    </div>
                    {feedback.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {feedback.slice(0, 3).map(f => <FeedbackCard key={f.id} feedback={f} />)}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No feedback yet. Be the first to leave a review!</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;