import { useEffect } from 'react';
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase/firebaseConfig";
import { useNotifications } from '../context/NotificationContext';
import axios from 'axios';

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

            const notification = {
                UserId: parseInt(sessionStorage.getItem("userId"), 10), // Convert userId to integer
                title: payload.notification?.title || 'No title',
                body: payload.notification?.body || 'No body',
                emailAddress: payload.data?.emailAddress || 'No email',
                username: payload.data?.username || 'Unknown',
                isPasswordReset: payload.notification?.title === "Password Reset Request",
                Date: new Date().toISOString().split('T')[0],
                Time: new Date().toISOString().split('T')[1],
                Status: false,
            };

            try {
                await axios.post('https://localhost:7265/api/Notification/save-notification', notification);
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
