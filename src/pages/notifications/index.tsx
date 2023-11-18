import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Row } from "antd";
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

function Notifications() {
  const navigate = useNavigate();
  const [notifications2, setNotifications] = useState([]);
  const notifications = [
    {
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      content: "Monroe Parker liked you back, you can now chat with her.",
      time: "2 mintues ago",
    },

    {
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      content: "Monroe Parker liked you back, you can now chat with her.",
      time: "2 mintues ago",
    },
    {
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      content: "Monroe Parker liked you back, you can now chat with her.",
      time: "2 mintues ago",
    },

    {
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      content: "Monroe Parker liked you back, you can now chat with her.",
      time: "2 mintues ago",
    },
    {
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      content: "Monroe Parker liked you back, you can now chat with her.",
      time: "2 mintues ago",
    },

    {
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      content: "Monroe Parker liked you back, you can now chat with her.",
      time: "2 mintues ago",
    },
  ];

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
            {notifications2.map((notification: any) => (
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
            ))}
          </Row>
        </Col>

        <SideBarFiends />
      </Row>
    </Row>
  );
}

export default Notifications;
