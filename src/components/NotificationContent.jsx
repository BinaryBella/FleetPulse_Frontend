/* eslint-disable react/prop-types */
import {IoMdClose} from "react-icons/io";
import {Tag, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {BsClockFill} from "react-icons/bs";

export default function NotificationContent(props) {
    return (
        <div>
            <div className="flex flex-row items-start space-x-4 w-full">
                <div className="ml-36 flex items-start space-x-4 mt-14">
                    <button className="rounded-md p-2 bg-white">
                        <IoMdClose />
                    </button>
                </div>
                <div className="flex flex-col space-y-4 mt-14 w-3/5">
                    <Tag
                        display="inline-block"
                        bgColor="#393970"
                        color="white"
                        fontSize="lg"
                        fontWeight="bold"
                        width="fit-content"
                        textAlign="center"
                        px={5}
                        py={2}
                    >
                        {props.NotificationType}
                    </Tag>
                    <Text>{props.NotificationTitle}</Text>
                    <Text className="text-gray-400">{props.NotificationBody}</Text>
                </div>
                <div className="flex items-center justify-end space-x-4 mt-14">
                    <Icon as={BsClockFill} color="#393970" />
                    <Text>21 Dec 2023 at 6.50 PM</Text>
                </div>
            </div>
            <hr className="my-4 w-4/5 mx-auto border-black"/>
        </div>
    );
}
