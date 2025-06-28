import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const getCurrentTimeString = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const CheckInPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(getTodayString());
    const [time, setTime] = useState(getCurrentTimeString());
    const [description, setDescription] = useState('');
    const [notificationStatus, setNotificationStatus] = useState('');

    const handleSetReminder = () => {
        if (!('Notification' in window)) {
            setNotificationStatus('This browser does not support desktop notifications.');
            return;
        }

        if (!title || !date || !time) {
            setNotificationStatus('Please fill in the title, date, and time.');
            return;
        }
        
        const scheduleNotification = () => {
            const reminderDateTime = new Date(`${date}T${time}`);
            const now = new Date();
            const delay = reminderDateTime.getTime() - now.getTime();

            if (delay < 0) {
                setNotificationStatus('Cannot set a reminder for a past date/time.');
                return;
            }

            setTimeout(() => {
                new Notification(title, {
                    body: description,
                });
            }, delay);

            setNotificationStatus(`Reminder set for "${title}" on ${reminderDateTime.toLocaleString()}.`);
            setTitle('');
            setDescription('');
        };

        if (Notification.permission === 'granted') {
            scheduleNotification();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    scheduleNotification();
                } else {
                    setNotificationStatus('Notification permission was denied.');
                }
            });
        } else {
            setNotificationStatus('Notification permission is denied. Please enable it in your browser settings.');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Set a Reminder</h1>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Reminder Title (Day)</label>
                    <input 
                        type="text" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        placeholder="e.g., Team Stand-up"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select Exact Date</label>
                        <input 
                            type="date" 
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={getTodayString()}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input 
                            type="time" 
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                    <textarea 
                        id="description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        placeholder="Add more details..."
                    />
                </div>
            </div>

            {notificationStatus && (
                <div className={`mt-6 p-3 rounded-lg text-sm text-center ${notificationStatus.includes('set for') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {notificationStatus}
                </div>
            )}

            <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
                <button
                    onClick={handleSetReminder}
                    className="w-full md:w-auto flex-grow bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105"
                >
                    Set Reminder Alarm
                </button>
                <Link
                    to="/"
                    className="w-full md:w-auto text-center bg-gray-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Go Back Home
                </Link>
            </div>
            
            <div className="mt-6 text-xs text-gray-500 text-center p-2 bg-gray-50 rounded-md">
                <p><strong>Note:</strong> This sets a browser notification, not a system alarm. The reminder will only appear if your browser is running. For critical alarms, please use your phone's native Clock app.</p>
            </div>
        </div>
    );
};

export default CheckInPage;
