import { Avatar, Button } from "antd";
import React from "react";
import "./index.scss";

function Story({ story }: any) {
  return (
    <div className="wrapper-story">
      <div className="row-header">
        <div className="wrapper-details">
          <Avatar
            src={
              <img
                src={
                  "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png"
                }
                alt="avatar"
              />
            }
          />
          <div className="details">
            <p className="user-name">Jessica J.</p>
            <p className="time-posted"> 20 minutes ago</p>
          </div>
        </div>
        <Button className="btn-three-dot">
          <i className="icon-three-dots"></i>
        </Button>
      </div>
      <div className="row-story-content">
        <p>{story.content}</p>
      </div>
      <div className="row-footer">
        <div className="wrap-btn">
          <Button>
            <i className="icon-thumb-up"></i>
            <p>230</p>
          </Button>
          <Button>
            <i className="icon-comment"></i>
            <p>50</p>
          </Button>
        </div>
        <Button>
          <i className="icon-share"></i>
        </Button>
      </div>
    </div>
  );
}

export default Story;
