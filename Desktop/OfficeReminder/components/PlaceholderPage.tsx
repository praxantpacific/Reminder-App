
import React from 'react';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
    title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-8 text-center animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-gray-600 mb-8">This feature is currently under development. Please check back later!</p>
            <Link 
                to="/"
                className="inline-block bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors transform hover:scale-105"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default PlaceholderPage;
