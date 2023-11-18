import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Row, Empty } from "antd";
import SideBarFiends from "components/OnlineFriends";
import {
  createNotification,
  delNotification,
  getNotifications,
} from "api/notification";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { createConversation } from "api/conversation";
import { useNavigate } from "react-router-dom";
import { getTimePassed } from "utils";
import { socket } from "index";
import { useAppState } from "hooks";

function Notifications() {
  const {
    auth: {
      user,
    },
  } = useAppState();
  const navigate = useNavigate();
  const [notifications2, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const { data, status } = await getNotifications();
      setNotifications(data?.notifications || []);
      console.log("Notifications", data);
    } catch (err: any) {
      toast.error(err?.request?.data?.msg || "Error Fetching Notifications!", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // receive message from socket server
  useEffect(() => {
    socket.emit("new-user-add", user._id);
    socket.on("receive-notification", (data: any) => {
      fetchNotifications();
      console.log("Notification Received");
    });
  }, []);

  const handleChatNotification = async (notification: any) => {
    try {
      if (notification.type !== "chat") {
        await createNotification({
          receiverId: notification.sender._id,
          type: "chat",
          notificationId: notification._id,
        });

        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (not: any) => not.sender._id !== notification.sender._id
          )
        );
        const { data } = await createConversation({
          receiverId: notification.sender._id,
        });
        console.log("Conversation Created", data);
        toast.success("Matched Successfully, You Can Chat Now!", {
          autoClose: 3000,
        });
        navigate("/messages");
        socket.emit("send-notification", { userId: notification.sender._id });
      } else {
        const { data } = await delNotification(notification._id);
        toast.success("Chat Initiated Successfully!", {
          autoClose: 3000,
        });
        navigate("/messages");
      }
    } catch (err: any) {
      toast.error(err?.request?.data?.msg || "Unable to Match this User!", {
        autoClose: 3000,
      });
    }
  };
  return (
    <Row className="wrapper-home-page" gutter={[16, 16]}>
      <Row>
        <div className="title-home">Notifications</div>
      </Row>
      <Row>
        <Col className="col-1-notifications notifications" span={17}>
          <Row className="wrapper-notifications">
            {notifications2.length > 0 ? (
              notifications2.map((notification: any) => (
                <Row className="user-card">
                  <div className="wrapper-user-details">
                    <i className="notification-icon"></i>
                    <Avatar
                      src={
                        <img
                          src={notification?.sender?.about?.profilePic}
                          alt="avatar"
                        />
                      }
                    />
                    <div className="wrapper-content">
                      <h4>
                        {" "}
                        {notification.type === "confirmation"
                          ? `${notification.sender.name.first} ${notification.sender.name.last} liked you, you can Like Back & chat now.`
                          : `${notification.sender.name.first} ${notification.sender.name.last} liked you back, you can now chat.`}
                      </h4>
                      <p> {getTimePassed(notification.createdAt)}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleChatNotification(notification)}>
                    Chat
                  </Button>
                </Row>
              ))
            ) : (
              <div className="no-notification-main">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No Notifications found"
                />
              </div>
            )}
          </Row>
        </Col>

        <SideBarFiends />
      </Row>
    </Row>
  );
}

export default Notifications;
