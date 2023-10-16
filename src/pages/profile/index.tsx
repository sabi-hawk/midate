import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { MaskedInput } from "antd-mask-input";
import "./index.scss";

function Profile() {
  const Tags = ["Girl", "from 21 to 30", "Friendship", "Go to the chess club"];
  const Photos = [
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E4.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E5.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E6.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E7.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E8.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E4.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E5.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E6.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E7.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09E8.png",
  ];
  const Interests = [
    "Journeys",
    "Snowboarding",
    "Design",
    "Video games",
    "Cross stitc",
    "Foreign languages",
    "Dances",
    "Watching horror movies",
    "Detectives",
    "Game of thrones",
    "Evening walks",
  ];
  return (
    <Row className="wrapper-home-page" gutter={[16, 16]}>
      <Row>
        <div className="title-home">Profile</div>
      </Row>
      <Row>
        <Col className="col-profile" span={24}>
          <Row className="row-profile-card">
            <Col span={17} className="profile-card">
              <div className="inner-wrap-profile-card">
                <div className="profile-pic-wrap">
                  <img
                    src="http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f7.png"
                    alt=""
                  />
                </div>
                <div className="profile-pic-controls">
                  <h3>Change Profile Picture</h3>
                  <div className="wrap-btn">
                    <Button>Choose</Button>
                    <Button>Upload</Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={7} className="looking-for-card">
              <h3> I'm Looking for</h3>
              <div className="wrapper-tags">
                {Tags.map((tag: string) => (
                  <p className="tag">{tag}</p>
                ))}
              </div>
            </Col>
          </Row>
          <Row className="row-personal-details">
            <div className="row-first">
              <div className="details">
                <h3>John Doe</h3>
                <p>- So be careful, Grumpy Lina</p>
              </div>
              <Button>Edit</Button>
            </div>
            <div className="divider"></div>
            <div className="row-second">
              <div className="wrapper-fields">
                <div className="tags">
                  <p>Birthday:</p>
                  <p>City:</p>
                </div>
                <div className="values">
                  <p>23.10.2000</p>
                  <p>New York</p>
                </div>
              </div>
            </div>
          </Row>
          <Row className="row-photos">
            <div className="row-header">
              <h3>Photos</h3>
              <Button>Add More</Button>
            </div>
            <div className="wrapper-photos">
              {Photos.map((url) => (
                <img src={url} alt="" />
              ))}
            </div>
          </Row>
          <Row className="row-interests">
            <h3>Interests</h3>
            <div className="wrapper-tags">
              {Interests.map((tag) => (
                <p>{tag}</p>
              ))}
            </div>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Profile;
