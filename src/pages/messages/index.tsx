import React from "react";
import { Avatar, Button, Col, Form, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";

function Messages() {
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
        <div className="title-home">Messages</div>
      </Row>
      <Row>
        <Col className="col-1-messages left-sidebar" span={8}>
          <div className="header">
            <h3> All Messages</h3>

            <Button>
              {" "}
              <i className="icon-dots"></i>
            </Button>
          </div>

          <div>
            <Input addonBefore={<SearchOutlined />} placeholder="large size" />
          </div>
        </Col>
        <Col className="col-2-messages right-sidebar" span={16}>
          <Row className="wrapper-messages"></Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Messages;
