import { Avatar, Button, Row } from "antd";
import React from "react";

function OnlineFiends() {
  return (
    <Row>
      <div className="heading">
        <h2>Online Friends</h2>
      </div>
      <div className="user-card">
        <div className="wrapper-user-details">
          <Avatar
            src={
              <img
                src={
                  "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f7.png"
                }
                alt="avatar"
              />
            }
          />
          <div>
            <h4> Monroe Parker</h4>
            <p>SuperModel</p>
          </div>
        </div>
        <Button>Chat</Button>
      </div>
      <div className="user-card">
        <div className="wrapper-user-details">
          <Avatar
            src={
              <img
                src={
                  "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f7.png"
                }
                alt="avatar"
              />
            }
          />
          <div>
            <h4> Monroe Parker</h4>
            <p>SuperModel</p>
          </div>
        </div>
        <Button>Chat</Button>
      </div>
    </Row>
  );
}

export default OnlineFiends;
