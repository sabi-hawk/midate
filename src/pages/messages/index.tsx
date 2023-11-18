import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Form, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { getUserConversations } from "api/conversation";
import { useAppState } from "hooks";
import { getTimePassed } from "utils";

function Messages() {
  const {
    auth: { user },
  } = useAppState();
  const [conversations, setConversations] = useState([]);
  const [leftSideBarUsers, setLeftSideBarUsers] = useState([]);
  const users = [
    {
      _id: "123",
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      name: "Ammi Watts",
      lastMessage: "Yes, we can meet. What Time?",
      time: "Today | 05:30 PM",
    },
    {
      _id: "124",
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      name: "Ammi Watts",
      lastMessage: "Yes, we can meet. What Time?",
      time: "Today | 05:30 PM",
    },
    {
      _id: "125",
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      name: "Ammi Watts",
      lastMessage: "Yes, we can meet. What Time?",
      time: "Today | 05:30 PM",
    },
    {
      _id: "126",
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      name: "Ammi Watts",
      lastMessage: "Yes, we can meet. What Time?",
      time: "Today | 05:30 PM",
    },
    {
      _id: "127",
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      name: "Ammi Watts",
      lastMessage: "Yes, we can meet. What Time?",
      time: "Today | 05:30 PM",
    },
    {
      _id: "128",
      url: "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
      name: "Ammi Watts",
      lastMessage: "Yes, we can meet. What Time?",
      time: "Today | 05:30 PM",
    },
  ];

  const getConversations = async () => {
    try {
      const { data } = await getUserConversations(user._id);
      console.log("Conversations", data.conversations);
      setConversations(data?.conversations || []);
    } catch (err: any) {
      toast.error(err?.request?.data?.msg || "Error Fetching Conversation!", {
        autoClose: 3000,
      });
    }
  };
  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      const otherMembers =
        conversations.map((conversation: any) => {
          const otherMember = conversation.members.find(
            (member: any) => member._id !== user._id
          );

          return otherMember;
        }) || [];

      console.log("LEFT SIDE BAR", otherMembers);
      // @ts-ignore
      setLeftSideBarUsers(otherMembers);
    }
  }, [conversations]);

  const getCreatedAt = (userId: any) => {
    const relevantConversation = conversations.find((conversation: any) => {
      // Check if the members array includes the specified userId
      return conversation.members.some((member: any) => member._id === userId);
    });

    if (relevantConversation) {
      // You can now access the createdAt property of the relevant conversation
      // @ts-ignore
      return relevantConversation.createdAt;
    } else {
      // Handle the case when no relevant conversation is found
      return null;
    }
  };
  return (
    <Row className="wrapper-home-page" gutter={[16, 16]}>
      <Row>
        <div className="title-home">Messages</div>
      </Row>
      <Row>
        <Col className="col-1-messages left-sidebar" span={8}>
          <div className="left-header">
            <div className="header">
              <h3> All Messages</h3>

              <Button>
                <i className="icon-dots"></i>
              </Button>
            </div>

            <div className="search-wrap">
              <Input
                addonBefore={<SearchOutlined />}
                placeholder="Search or start a new chat"
              />
            </div>
          </div>

          <div className="user-cards-wrapper scroll-hide">
            {leftSideBarUsers.map((user: any) => (
              <>
                <div className="user-card">
                  <div className="details">
                    <Avatar
                      src={<img src={user?.about?.profilePic} alt="avatar" />}
                    />
                    <div className="content">
                      <h3>{`${user.name.first} ${user.name.last}`}</h3>
                      {/* <p className="p-tag-message">{user.lastMessage}</p> */}
                      <p className="p-tag-time">{`matched ${getTimePassed(
                        getCreatedAt(user?._id)
                      )}`}</p>
                    </div>
                  </div>
                  <Button>
                    <i className="icon-favorite"></i>
                  </Button>
                </div>
                <div className="horizontal-line"></div>
              </>
            ))}
          </div>
        </Col>
        <Col className="col-2-messages right-sidebar" span={16}>
          <div className="header">
            <div className="details">
              <Avatar
                src={
                  <img
                    src="http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png"
                    alt="avatar"
                  />
                }
              />
              <h3>Ammi Watts</h3>
            </div>

            <Button>
              <i className="icon-favorite"></i>
            </Button>
          </div>
          <div className="messages-body scroll-hide">
            <p className="pass-time-text"> Today | 06:32 PM</p>
            <div className="message-wrap message-in">
              <p className="message">
                Oh, hello! All perfectly. I will check it and get back to you
                soon
              </p>
              <p className="p-tag-time">04:45 PM</p>
            </div>
            <div className="message-wrap message-out">
              <p className="message">Yes, Thank You</p>
              <p className="p-tag-time">04:45 PM</p>
            </div>
            <div className="message-wrap message-in">
              <p className="message">
                Oh, hello! All perfectly. I will check it and get back to you
                soon
              </p>
              <p className="p-tag-time">04:45 PM</p>
            </div>
            <div className="message-wrap message-out">
              <p className="message">Yes, Thank You</p>
              <p className="p-tag-time">04:45 PM</p>
            </div>
          </div>

          <div className="footer">
            <Button>
              <i className="icon-emoji"></i>
            </Button>
            <Input placeholder="Type your message here ..." />
            <Button>
              <i className="icon-send"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Row>
  );
}

export default Messages;
