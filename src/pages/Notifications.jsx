import { useNotifications } from '../context/NotificationContext';
import { Box, List, ListItem, Heading, Text, Icon, Button, IconButton } from '@chakra-ui/react';
import { MdNotifications, MdDelete } from 'react-icons/md';
import PageHeader from "../components/PageHeader.jsx";
import { format } from 'date-fns';
import axios from 'axios';

const Notifications = () => {
    const { notifications, markAsRead, deleteNotification, markAllAsRead, deleteAllNotifications } = useNotifications();

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
            await axios.delete(`https://localhost:7265/api/Notification/delete${id}`);
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

    return (
        <Box p={4}>
            <PageHeader title="Notifications" className="mb-14"/>
            <Box mb={4} display="flex" justifyContent="flex-end">
                <Button
                    bg="#393970"
                    color="white"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    mr={2}
                    _hover={{ bg: "#2e2e6a" }}
                >
                    Mark All as Read
                </Button>
                <Button
                    colorScheme="red"
                    size="sm"
                    onClick={handleDeleteAllNotifications}
                >
                    Delete All
                </Button>
            </Box>
            <List spacing={4}>
                {notifications.map((notification, index) => (
                    <ListItem
                        key={index}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        bg={notification.read ? "gray.100" : "white"}
                        boxShadow="sm"
                        _hover={{ boxShadow: "md" }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <Box display="flex" alignItems="center">
                                <Icon as={MdNotifications} w={8} h={8} color="#393970" mr={2} />
                                <Heading as="h2" size="md">{notification.title}</Heading>
                            </Box>
                            <Box display="flex" alignItems="center">
                                {!notification.read && (
                                    <Button size="sm" color="#393970" onClick={() => handleMarkAsRead(index, notification.notificationId)} mr={2}>
                                        Mark as Read
                                    </Button>
                                )}
                                <IconButton
                                    size="sm"
                                    colorScheme="red"
                                    aria-label="Delete notification"
                                    icon={<MdDelete size={20} />}
                                    onClick={() => handleDeleteNotification(index, notification.notificationId)}
                                />
                            </Box>
                        </Box>
                        <Text ml={10} mb={2}>{notification.body}</Text>
                        <Text ml={10} color="gray.500" fontSize="sm">{format(new Date(notification.timestamp), 'PPpp')}</Text>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Notifications;
