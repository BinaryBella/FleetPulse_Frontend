// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { onMessage } from 'firebase/messaging';
// import { messaging } from '../firebase/firebaseConfig';
// import { useNotifications } from '../context/NotificationContext';
//
// const NotificationHandler = () => {
//     const { notifications, addNotification } = useNotifications();
//     const [isSending, setIsSending] = useState(false);
//
//     useEffect(() => {
//         const handleIncomingMessage = async (payload) => {
//             console.log('Incoming message:', payload);
//
//             const notification = {
//                 title: payload.notification.title,
//                 body: payload.notification.body,
//                 timestamp: new Date().toISOString(),
//                 read: false,
//             };
//
//             addNotification(notification);
//
//             const notificationsToSend = [...notifications, notification].map(notification => ({
//                 ...notification,
//                 Date: new Date().toISOString(),
//                 Time: new Date().toISOString(),
//                 Status: false
//             }));
//
//             if (!isSending && notificationsToSend.length > 0) {
//                 setIsSending(true);
//                 try {
//                     const response = await axios.post('https://localhost:7265/api/Notifications/save-all', notificationsToSend);
//                     console.log('Notifications sent to backend:', response.data);
//                 } catch (error) {
//                     console.error('Error sending notifications to backend:', error);
//                 } finally {
//                     setIsSending(false);
//                 }
//             }
//         };
//
//         const unsubscribe = onMessage(messaging, handleIncomingMessage);
//
//         return () => unsubscribe();
//     }, [notifications, isSending, addNotification]);
//
//     return null;
// };
//
// export default NotificationHandler;
import { useEffect } from 'react';
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase/firebaseConfig";
import { useNotifications } from '../context/NotificationContext';

const NotificationHandler = () => {
    const { VITE_APP_VAPID_KEY } = import.meta.env;
    const { addNotification } = useNotifications();

    useEffect(() => {
        const requestPermission = async () => {
            try {
                const permission = await Notification.requestPermission();

                if (permission === "granted") {
                    const token = await getToken(messaging, {
                        vapidKey: VITE_APP_VAPID_KEY,
                    });
                    console.log("Token generated: ", token);
                    sessionStorage.setItem("deviceToken", token);
                } else if (permission === "denied") {
                    alert("You denied the notification");
                }
            } catch (error) {
                console.error("Error requesting permission or getting token: ", error);
            }
        };

        requestPermission();

        const unsubscribe = onMessage(messaging, async (payload) => {
            console.log("Incoming message");
            console.log(payload);
            const token = sessionStorage.getItem("deviceToken");

            const notificationData = payload.data || {};
            const notification = {
                UserId: token,
                title: payload.notification?.title || 'No title',
                body: payload.notification?.body || 'No body',
                emailAddress: payload.data?.emailAddress || 'No email',
                username: payload.data?.username || 'Unknown',
                isPasswordReset: payload.notification?.title === "Password Reset Request",
                Date: new Date().toISOString(),
                Time: new Date().toISOString(),
                Status: false,
            };

            try {
                addNotification({ ...notification, timestamp: new Date().toISOString() });
            } catch (error) {
                console.error("Error sending notification to backend: ", error);
            }
        });

        return () => unsubscribe();
    }, [VITE_APP_VAPID_KEY, addNotification]);

    return null;
};

export default NotificationHandler;
