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
                username: notificationData.username || 'Unknown',
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
