import { Avatar, Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useAppState } from "hooks";
import { getTimePassed } from "utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { addUpload } from "api/media";
import { postComment } from "api/story";

function Story({ story }: any) {
  const {
    auth: { user },
  } = useAppState();
  const [form] = Form.useForm();
  const [comment, setComment] = useState("");

  const onFinishForm = async (values: any) => {
    if (comment.length > 0) {
      try {
        const { status, data } = await postComment(
          story._id,
          comment,
          user._id,
          `${user.name.first} ${user.name.last}`,
          user.about.profilePic
        );

        if (status === 200) {
          toast.success("Comment posted successfully!", {
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.error("Error posting comment!", {
          autoClose: 3000,
        });
      }
    }
  };

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
        <Form
          form={form}
          onFinish={onFinishForm}
          style={{
            borderRadius: "0.35rem",
            padding: "10px 0px",
          }}
        >
          <div className="upload-add-main">
            {/* <label htmlFor="">Title</label> */}
            <Form.Item name="title">
              <div className="comment-main">
                <Input
                  className="bg-transparent form-control py-2 w-100"
                  placeholder="enter comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button key="submit" type="primary" onClick={onFinishForm}>
                  Post
                </Button>
              </div>
            </Form.Item>

            {
              story.comments.length > 0 &&
              <div className="user-comments-main">
                {
                  story.comments.map((comment:any) => 
                    <div className="comment-inner-main">
                      <Avatar
                        src={<img src={comment.userProfilePic || ""} alt="avatar" />}
                      />
                      <div>
                        <div className="comment-user-name">
                          <strong>{comment.userName}</strong>
                          <small>{getTimePassed(comment.createdAt)}</small>
                        </div>
                        <p><i>{comment.content}</i></p>
                      </div>
                    </div>
                  )
                }
              </div>
            }
          </div>
        </Form>
        {/* <div className="wrap-btn">
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
        </Button> */}
      </div>
    </div>
  );
}

export default Story;
