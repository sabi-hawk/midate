import { Avatar, Button, Input, Empty } from "antd";
import { getMessages, sendUserMessage } from "api/conversation";
import { useAppState } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { getTimePassed } from "utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatBox({ chat, setSendMessage, receiveMessage }: any) {
  const {
    auth: { user },
  } = useAppState();
  const [messages, setMessages] = useState<any>([]);
  const [currMessage, setCurMessage] = useState("");
  const scroll = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    try {
      const { data } = await sendUserMessage(chat.conversation._id, {
        senderId: user._id,
        text: currMessage,
      });
      setMessages([...messages, data]);
      setCurMessage("");
    } catch (err: any) {
      toast.error(err?.request?.data?.msg || "Error Sending Message!", {
        autoClose: 3000,
      });
    }
    // send message to socket server
    const receiverId = chat.conversation?.members.find(
      (member: any) => member._id !== user._id
    );
    // @ts-ignore
    setSendMessage({ senderId: user._id, text: currMessage, receiverId });
  };
  
  //   fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat.conversation._id);
        setMessages(data);
      } catch (error) {
        console.log("Error | Chat | ChatBox | getMessages", error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  
  //
  useEffect(() => {
    // also added && receiveMessage.chatId === chat._id
    if (receiveMessage !== null) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
  
  // always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <>
      {chat ? (
        <>
          <div className="header">
            <div className="details">
              <Avatar
                src={<img src={chat.receiver.about.profilePic} alt="avatar" />}
              />
              <h3>{`${chat.receiver.name.first} ${chat.receiver.name.last}`}</h3>
            </div>

            <Button>
              <i className="icon-favorite"></i>
            </Button>
          </div>
          <div className="messages-body scroll-hide">
            <p className="pass-time-text"> Today | 06:32 PM</p>

            {messages.map((message: any) => (
              <div
                ref={scroll}
                className={`message-wrap ${
                  message.senderId !== user._id ? "message-in" : "message-out"
                }`}
              >
                <p className="message">{message.text}</p>
                <p className="p-tag-time">{getTimePassed(message.createdAt)}</p>
              </div>
            ))}
          </div>

          <div className="footer">
            <Button>
              <i className="icon-emoji"></i>
            </Button>
            <Input
              placeholder="Type your message here ..."
              value={currMessage}
              onChange={(e) => setCurMessage(e.target.value)}
            />
            <Button onClick={handleSend}>
              <i className="icon-send"></i>
            </Button>
          </div>
        </>
      ) : (
        <div className="empty-messages">
          <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No Chat Selected"
            />
        </div>
      )}
    </>
  );
}

export default ChatBox;
