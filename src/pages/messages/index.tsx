import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Form, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMessages, getUserConversations, sendUserMessage } from "api/conversation";
import { useAppState } from "hooks";
import { getTimePassed } from "utils";
import { socket } from "index";
import "./index.scss";
import ChatBox from "components/ChatBox";

function Messages() {
  const {
    auth: { user },
  } = useAppState();
  const [conversations, setConversations] = useState([]);
  const [leftSideBarUsers, setLeftSideBarUsers] = useState([]);
  const [activeChat, setActiveChat] = useState<any>(undefined);
  const [onlineUsers, setOnlineUsers] = useState([]);
  
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  // initializing socket
  useEffect(() => {
    socket.emit("new-user-add", user._id);
    socket.on("get-users", (users: any) => {
      setOnlineUsers(users);
    });
  }, [user]); // [user]

  useEffect(() => {
    // adding event listener for window unload
    console.log("Started listening for event beforeunload");
    window.addEventListener("beforeunload", handleWindowUnload);

    // remove event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleWindowUnload);
    };
  }, []);

  const handleWindowUnload = () => {
    socket.emit("disconnected");
  };

  // send message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // receive message from socket server
  useEffect(() => {
    socket.on("receive-message", (data: any) => {
      setReceiveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members.find((member: any) => member !== user._id);
    const online = onlineUsers.find((user: any) => user.userId === chatMember);
    return online ? true : false;
  };

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

  const handleActiveChat = (user: any) => {
    const relevantConversation = conversations.find((conversation: any) => {
      // Check if the members array includes the specified userId
      return conversation.members.some(
        (member: any) => member._id === user._id
      );
    });
    console.log("Relevant", relevantConversation);
    // @ts-ignore
    setActiveChat({ conversation: relevantConversation, receiver: user });
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
                <div
                  className="user-card"
                  onClick={() => handleActiveChat(user)}
                >
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
        <ChatBox
            chat={activeChat}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        </Col>
      </Row>
    </Row>
  );
}

export default Messages;
