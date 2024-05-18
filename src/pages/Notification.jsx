import { useEffect, useState } from 'react';
import PageHeader from "../components/PageHeader.jsx";
import NotificationContent from "../components/NotificationContent.jsx";

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const userId = sessionStorage.getItem('userId'); // Retrieve the userId from session storage

    useEffect(() => {
        if (userId) {
            fetchNotifications();
        }
    }, [userId]);

    const fetchNotifications = async () => {
        const response = await fetch(`/api/notifications/${userId}`);
        const data = await response.json();
        setNotifications(data);
    };

    const markAsRead = async (notificationId) => {
        await fetch(`/api/notifications/${notificationId}/read`, { method: 'PUT' });
        fetchNotifications(); // Refresh the notifications after marking as read
    };

    return (
        <>
            <PageHeader title="Notification" />
            <div className="mt-4 h-3/4 mr-10 bg-[#F3F5FA] rounded-lg">
                {notifications.map(notification => (
                    <NotificationContent
                        key={notification.notificationId}
                        NotificationType={notification.notificationType}
                        NotificationTitle={notification.title}
                        NotificationBody={notification.message}
                        CreatedAt={notification.time}
                        onMarkAsRead={() => markAsRead(notification.notificationId)}
                    />
                ))}
            </div>
        </>
    );
}
