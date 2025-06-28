
import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, CheckmarkDoneIcon, CreateIcon, NotificationsIcon } from './Icons';

interface SectionCardProps {
    icon: React.ReactNode;
    title: string;
    buttonText: string;
    buttonColor: string;
    linkTo: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ icon, title, buttonText, buttonColor, linkTo }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        </div>
        <Link to={linkTo} className="block">
            <button className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${buttonColor}`}>
                {buttonText}
            </button>
        </Link>
    </div>
);


const HomePage: React.FC = () => {
    return (
        <div className="relative z-10">
            <header className="flex items-center justify-between gap-4 mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Office Reminder</h1>
                <button className="p-2 rounded-full hover:bg-gray-200/80 transition-colors" aria-label="Notifications">
                    <BellIcon />
                </button>
            </header>

            <div className="space-y-5">
                <SectionCard
                    icon={<CreateIcon className="text-blue-500" />}
                    title="Daily Check-In"
                    buttonText="Start Check-In"
                    buttonColor="bg-blue-500 hover:bg-blue-600"
                    linkTo="/checkin"
                />
                <SectionCard
                    icon={<CheckmarkDoneIcon className="text-green-500" />}
                    title="Today's Tasks"
                    buttonText="View Tasks"
                    buttonColor="bg-green-500 hover:bg-green-600"
                    linkTo="/tasks"
                />
                <SectionCard
                    icon={<NotificationsIcon className="text-orange-500" />}
                    title="Reminders"
                    buttonText="View Reminders"
                    buttonColor="bg-orange-500 hover:bg-orange-600"
                    linkTo="/reminders"
                />
            </div>
        </div>
    );
};

export default HomePage;
