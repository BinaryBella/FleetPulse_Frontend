import { useEffect, useState } from 'react';
import axios from 'axios';
import { onMessage } from 'firebase/messaging';
import { messaging } from '../firebase/firebaseConfig';
import { useNotifications } from '../context/NotificationContext';

const NotificationHandler = () => {
    const { notifications } = useNotifications();
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const handleIncomingMessage = async (payload) => {
            console.log('Incoming message');
            console.log(payload);

            // Prepare notifications data to send to backend
            const notificationsToSend = notifications.map(notification => ({
                ...notification,
                Date: new Date().toISOString(),
                Time: new Date().toISOString(),
                Status: false
            }));

            // Send notifications to backend
            if (!isSending && notificationsToSend.length > 0) {
                setIsSending(true);
                try {
                    const response = await axios.post('https://localhost:7265/api/Notifications/save-all', notificationsToSend);
                    console.log('Notifications sent to backend:', response.data);
                    // Optionally, handle successful response (e.g., clear notifications state)
                } catch (error) {
                    console.error('Error sending notifications to backend:', error);
                    // Optionally, handle error (e.g., retry logic)
                } finally {
                    setIsSending(false);
                }
            }
        };

        const unsubscribe = onMessage(messaging, handleIncomingMessage);

        return () => {
            unsubscribe();
        };
    }, [notifications, isSending]);

    return null;
};

export default NotificationHandler;
