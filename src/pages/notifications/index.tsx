import React from "react";
import { Avatar, Button, Col, Form, Row } from "antd";
import SideBarFiends from "components/OnlineFriends";
import "./index.scss";

function Notifications() {
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

  return (
    <Row className="wrapper-home-page" gutter={[16, 16]}>
      <Row>
        <div className="title-home">Notifications</div>
      </Row>
      <Row>
        <Col className="col-1-notifications notifications" span={17}>
          <Row className="wrapper-notifications">
            {notifications.map((notification) => (
              <Row className="user-card">
                <div className="wrapper-user-details">
                  <i className="notification-icon"></i>
                  <Avatar src={<img src={notification.url} alt="avatar" />} />
                  <div className="wrapper-content">
                    <h4> {notification.content}</h4>
                    <p> {notification.time}</p>
                  </div>
                </div>
                <Button>Chat</Button>
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
