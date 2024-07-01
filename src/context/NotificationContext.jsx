import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { ...notification, timestamp: new Date().toISOString(), read: false }
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
