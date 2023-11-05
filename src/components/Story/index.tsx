import { Avatar, Button } from "antd";
import React from "react";
import "./index.scss";
import { useAppState } from "hooks";
import { getTimePassed } from "utils";

function Story({ story }: any) {
  const {
    auth: { user },
  } = useAppState();

  return (
    <div className="wrapper-story">
      <div className="row-header">
        <div className="wrapper-details">
          <Avatar
            src={<img src={story?.about?.profilePic || ""} alt="avatar" />}
          />
          <div className="details">
            <p className="user-name">{`${story.user?.name.first} ${story.user?.name.last}`}</p>
            <p className="time-posted"> {getTimePassed(story.createdAt)}</p>
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
