import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useAppState } from "hooks";
import moment from "moment";
import "./index.scss";

function Profile() {
  const {
    auth: { user },
  } = useAppState();
  const [formProfile] = Form.useForm();
  const [formLookingFor] = Form.useForm();
  const [formInterests] = Form.useForm();
  const [enableLookingFor, setEnableLookingFor] = useState(false);
  const [enableInterests, setEnableInterests] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [tags, setTags] = useState([
    "Girl",
    "from 21 to 30",
    "Friendship",
    "Go to the chess club",
  ]);
  const [interests, setInterests] = useState([
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
  ]);
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

  const onFinishLookingFor = (values: any) => {
    setTags([...tags, values.lookingForTags]);
    setEnableLookingFor(false);
    // handleSignup(values); // You can pass the form values to your handleSignup function
  };

  const onFinishInterests = (values: any) => {
    setInterests([...interests, values.interest]);
    setEnableInterests(false);
  };

  const onFinishProfile = (values: any) => {
    console.log("Profile values", values);
    setEnableEdit(!enableEdit)
    // dob: moment(values.dob).format("DD/MM/YYYY")
  };
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
                {tags.map((tag: string) => (
                  <p className="tag">{tag}</p>
                ))}
                {enableLookingFor ? (
                  <Form
                    form={formLookingFor}
                    onFinish={onFinishLookingFor}
                    className="auth-form px-4 py-5 px-md-5 bg-glass"
                    style={{
                      borderRadius: "0.35rem",
                    }}
                  >
                    <Form.Item
                      name="lookingForTags"
                      rules={[
                        {
                          message: "Please enter your Preferred requirements",
                        },
                      ]}
                    >
                      <Input
                        className="bg-transparent form-control py-2"
                        placeholder="hangouts"
                      />
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn btn-primary py-2 w-50 mx-auto"
                    >
                      S
                    </Button>
                  </Form>
                ) : (
                  <Button
                    onClick={() => {
                      setEnableLookingFor(true);
                    }}
                  >
                    A
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          <Row className="row-personal-details">
            <Form
              form={formProfile}
              onFinish={onFinishProfile}
              className="auth-form px-4 py-5 px-md-5 bg-glass profile-form"
              style={{
                borderRadius: "0.35rem",
              }}
            >
              <div className="row-first">
                <div className="details">
                  <h3>{`${user.name.first} ${user.name.last}`}</h3>
                  {/* @ts-ignore */}
                  <p>{user.about?.tagLine || "- So be careful, Grumpy Lina"}</p>
                </div>
                {enableEdit ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn btn-primary py-2 w-50 mx-auto"
                  >
                    Save
                  </Button>
                ) : (
                  <Button type="link" onClick={() => setEnableEdit(!enableEdit)}> Edit</Button>
                )}
              </div>
              <div className="divider"></div>
              <div className="row-second">
                <div className="wrapper-fields">
                  <div className="tags">
                    <p>Birthday:</p>
                    {/* <p>City:</p> */}
                  </div>
                  <div className="values">
                    {enableEdit ? (
                      // @ts-ignore
                      <Form.Item name="dob" initialValue={moment(user.dob)}>
                        <DatePicker
                          className="bg-transparent form-control py-2"
                        />
                      </Form.Item>
                    ) : (
                      <p>{user.dob || "23.10.2000"}</p>
                    )}
                    {/* <p>{user.about.city || "New York"}</p> */}
                  </div>
                </div>
              </div>
            </Form>
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
              {interests.map((interest) => (
                <p>{interest}</p>
              ))}
              {enableInterests ? (
                <Form
                  form={formInterests}
                  onFinish={onFinishInterests}
                  className="auth-form px-4 py-5 px-md-5 bg-glass"
                  style={{
                    borderRadius: "0.35rem",
                  }}
                >
                  <Form.Item
                    name="interest"
                    rules={[
                      {
                        message: "Please enter your interest",
                      },
                    ]}
                  >
                    <Input
                      className="bg-transparent form-control py-2"
                      placeholder="video games"
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn btn-primary py-2 w-50 mx-auto"
                  >
                    S
                  </Button>
                </Form>
              ) : (
                <Button
                  onClick={() => {
                    setEnableInterests(true);
                  }}
                >
                  A
                </Button>
              )}
            </div>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Profile;
