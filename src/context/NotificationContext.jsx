import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('https://localhost:7265/api/Notification');
                setNotifications(response.data.map(notification => {
                    let timestamp = '';
                    try {
                        // Logging the time value to debug
                        console.log("Original TimeSpan value:", notification.time);

                        // Use the date and time values directly as strings
                        const formattedDate = notification.date;
                        const formattedTime = notification.time.split('.')[0];
                        timestamp = `${formattedDate}T${formattedTime}`;

                        console.log(timestamp);
                    } catch (error) {
                        console.error("Error creating timestamp:", error, notification);
                    }
                    return {
                        ...notification,
                        timestamp,
                        read: notification.status
                    };
                }));
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    const addNotification = (notification) => {
        setNotifications((prevNotifications) => [
            { ...notification, timestamp: new Date().toISOString(), read: false },
            ...prevNotifications
        ]);
    };

    const markAsRead = (index) => {
        setNotifications((prevNotifications) => {
            const updatedNotifications = [...prevNotifications];
            if (updatedNotifications[index]) {
                updatedNotifications[index].read = true;
            }
            return updatedNotifications;
        });
    };

    const deleteNotification = (index) => {
        setNotifications((prevNotifications) => {
            const updatedNotifications = [...prevNotifications];
            updatedNotifications.splice(index, 1);
            return updatedNotifications;
        });
    };

    const markAllAsRead = () => {
        setNotifications((prevNotifications) => {
            return prevNotifications.map(notification => ({
                ...notification,
                read: true
            }));
        });
    };

    const deleteAllNotifications = () => setNotifications([]);

    const getUnreadCount = () => notifications.filter(notification => !notification.read).length;

    return (
        <NotificationContext.Provider value={{
            notifications, addNotification, getUnreadCount, deleteAllNotifications,
            markAsRead, markAllAsRead, deleteNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NotificationProvider;
