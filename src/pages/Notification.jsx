import PageHeader from "../components/PageHeader.jsx";
import NotificationContent from "../components/NotificationContent.jsx";

export default function Notification() {
    return (
        <>
            <PageHeader title="Notification"/>
            <div className="mt-4 h-3/4 mr-10 bg-[#F3F5FA] rounded-lg">
                <NotificationContent NotificationType="Vehicle Maintenace"
                                     NotificationTitle="Notification Title : Notification Title Show Here"
                                     NotificationBody="Notification Body: Notification Message Will Appear Here"/>
                <NotificationContent NotificationType="Vehicle Maintenace"
                                     NotificationTitle="Notification Title : Notification Title Show Here"
                                     NotificationBody="Notification Body: Notification Message Will Appear Here"/>
                <NotificationContent NotificationType="Vehicle Maintenace"
                                     NotificationTitle="Notification Title : Notification Title Show Here"
                                     NotificationBody="Notification Body: Notification Message Will Appear Here"/>
            </div>
        </>

    );
}
