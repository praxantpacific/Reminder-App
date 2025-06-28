
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AddIcon, LogoIcon } from './Icons';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            {isHomePage && (
                <header className="relative h-60 bg-sky-200 flex items-center justify-center overflow-hidden">
                    <div className="w-56 text-sky-800 opacity-40">
                        <LogoIcon />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-100/60 to-transparent"></div>
                </header>
            )}

            <main className={`p-4 md:p-6 ${isHomePage ? 'relative -mt-24' : 'pt-10'}`}>
                <div className="max-w-2xl mx-auto">
                    {children}
                </div>
            </main>
            
            <Link 
                to="/add-task" 
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm border-2 border-blue-500 flex items-center justify-center text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-110"
                aria-label="Add new task"
            >
                <AddIcon />
            </Link>
        </div>
    );
};

export default Layout;
