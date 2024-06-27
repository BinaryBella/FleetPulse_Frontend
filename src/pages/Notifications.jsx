import { Box, List, ListItem, Heading, Text, Icon, Button, IconButton } from '@chakra-ui/react';
import { MdNotifications, MdDelete, MdNotificationsNone } from 'react-icons/md';
import PageHeader from "../components/PageHeader.jsx";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import './Notification.css';

import { useNotifications } from '../context/NotificationContext';

const Notifications = () => {
    const { notifications, markAsRead, deleteNotification } = useNotifications();
    const navigate = useNavigate();

    const handleMarkAsRead = async (index, id) => {
        try {
            await axios.post(`https://localhost:7265/api/Notification/mark-as-read/${id}`);
            markAsRead(index);
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const handleDeleteNotification = async (index, id) => {
        try {
            await axios.delete(`https://localhost:7265/api/Notification/delete/${id}`);
            deleteNotification(index);
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await axios.post(`https://localhost:7265/api/Notification/markAllAsRead`);
            notifications.forEach((_, index) => markAsRead(index));
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
        }
    };

    const handleDeleteAllNotifications = async () => {
        try {
            await axios.delete(`https://localhost:7265/api/Notification/deleteAll`);
            notifications.forEach((_, index) => deleteNotification(index));
        } catch (error) {
            console.error("Error deleting all notifications:", error);
        }
    };

    const handleNavigate = (username, emailAddress, notification) => {
        console.log(notification);
        navigate(`/app/ResetPasswordDriverHelper?username=${username}&emailAddress=${emailAddress}`);
    };

    return (
        <Box className="notification-container">
            <PageHeader title="Notifications" className="mb-14"/>
            {notifications.length > 0 && (
                <Box className="notification-controls">
                    <Button
                        className="mark-all-read-btn"
                        onClick={handleMarkAllAsRead}
                    >
                        Mark All as Read
                    </Button>
                    <Button
                        className="delete-all-btn"
                        onClick={handleDeleteAllNotifications}
                    >
                        Delete All
                    </Button>
                </Box>
            )}
            {notifications.length === 0 && (
                <Box className="no-notifications">
                    <Icon as={MdNotificationsNone} w={9} h={9} color="ash" mb={2} />
                    <Text>No Notification Here</Text>
                </Box>
            )}
            <List spacing={4}>
                {notifications.map((notification, index) => (
                    <ListItem
                        key={index}
                        className={`notification-item ${notification.read ? "read" : "unread"}`}
                    >
                        <Box className="notification-header">
                            <Box className="notification-info">
                                <Icon as={MdNotifications} w={6} h={6} color="#393970" />
                                <Heading as="h2" size="sm">{notification.title}</Heading>
                            </Box>
                            <Box className="notification-actions">
                                {!notification.read && (
                                    <Button className="mark-read-btn" onClick={() => handleMarkAsRead(index, notification.notificationId)}>
                                        Mark as Read
                                    </Button>
                                )}
                                {notification.title === "Password Reset Request" && (
                                    <Button
                                        className="reset-password-btn"
                                        onClick={() => handleNavigate(notification.username, notification.emailAddress, notification)}
                                    >
                                        Reset Password
                                    </Button>
                                )}
                                <IconButton
                                    className="delete-btn"
                                    aria-label="Delete notification"
                                    icon={<MdDelete size={20} />}
                                    onClick={() => handleDeleteNotification(index, notification.notificationId)}
                                />
                            </Box>
                        </Box>
                        <Text className="notification-body">{notification.body}</Text>
                        <Text className="notification-timestamp">{format(new Date(notification.timestamp), 'PPpp')}</Text>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Notifications;
