import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useAppState } from "hooks";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pictureUpload, picturesUpload } from "api/media";
import { setInterestsTags, setLookingFor, updateUserDetails } from "api/user";
import "./index.scss";
import { useDispatch } from "react-redux";
import { setUser } from "flux/reducers/auth";

function Profile() {
  const {
    auth: { user },
  } = useAppState();
  const { auth } = useAppState();
  const dispatch = useDispatch();
  const [formProfile] = Form.useForm();
  const [formLookingFor] = Form.useForm();
  const [formInterests] = Form.useForm();
  const [enableLookingFor, setEnableLookingFor] = useState(false);
  const [enableInterests, setEnableInterests] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<any>({
    file: null,
    url: null,
  });

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

  const onFinishLookingFor = async (values: any) => {
    setEnableLookingFor(false);
    try {
      const { status, data } = await setLookingFor({
        lookingForTags: [...user.about.lookingForTags, values.lookingForTags],
      });
      if (status === 200) {
        dispatch(setUser({ ...auth, user: { ...user, about: data.about } }));
        toast.success(data?.message || "Looking For Tags Updated!", {
          autoClose: 3000,
        });
      } else {
        toast.error("Error Updating Looking For Tags", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("Error Updating Tags Picture", error);
      toast.error("Error Updating Tags Picture", {
        autoClose: 3000,
      });
    }
  };

  const onFinishInterests = async (values: any) => {
    setEnableInterests(false);
    try {
      const { status, data } = await setInterestsTags({
        interestsTags: [...user.about.interestsTags, values.interest],
      });
      if (status === 200) {
        dispatch(setUser({ ...auth, user: { ...user, about: data.about } }));
        toast.success(data?.message || "Interests Tags Updated!", {
          autoClose: 3000,
        });
      } else {
        toast.error("Error Updating Interests Tags", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("Error Interests Tags Picture", error);
      toast.error("Error Interests Tags Picture", {
        autoClose: 3000,
      });
    }
  };

  const onFinishProfile = async (values: any) => {
    console.log("Profile values", values);
    setEnableEdit(!enableEdit);

    try {
      const { status, data } = await updateUserDetails({
        dob: moment(values.dob).format("DD/MM/YYYY"),
        ...values,
      });
      if (status === 200) {
        dispatch(
          setUser({ ...auth, user: { ...data.user, about: user.about } })
        );
        toast.success(data?.message || "Data Updated Successfully !", {
          autoClose: 3000,
        });
      } else {
        toast.error("Error | Updating User Details", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("Error | Updating User Details", error);
      toast.error("Error | Updating User Details", {
        autoClose: 3000,
      });
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedProfilePicture({ file, url: URL.createObjectURL(file) });
  };

  const handleUpload = async () => {
    if (selectedProfilePicture.file) {
      const formData = new FormData();
      formData.append("files", selectedProfilePicture.file);

      try {
        const { status, data } = await pictureUpload(formData);

        if (status === 200) {
          dispatch(setUser({ ...auth, user: { ...user, about: data.about } }));
          toast.success(data?.message || "Picture Uploaded Successfully !", {
            autoClose: 3000,
          });
        } else {
          toast.error("Error Uploading Picture", {
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.log("Error Uploading Picture", error);
        toast.error("Error Uploading Picture", {
          autoClose: 3000,
        });
      }
    }
  };

  const handleFilesChange = async (event: any) => {
    const files = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const { status, data } = await picturesUpload(formData);

      if (status === 200) {
        dispatch(setUser({ ...auth, user: { ...user, about: data.about } }));
        toast.success(data?.message || "Pictures Uploaded Successfully !", {
          autoClose: 3000,
        });
      } else {
        toast.error("Error Uploading Picture", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("Error Uploading Picture", error);
      toast.error("Error Uploading Picture", {
        autoClose: 3000,
      });
    }
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
                    src={
                      selectedProfilePicture.url ||
                      user?.about?.profilePic ||
                      "http://localhost:8000/images/user-profile.png"
                    }
                    alt=""
                  />
                </div>
                <div className="profile-pic-controls">
                  <h3>Change Profile Picture</h3>
                  <div className="wrap-btn">
                    <input
                      id="image-upload"
                      name="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {/* @ts-ignore */}
                    <label for="image_upload">
                      <Button>Choose File</Button>
                    </label>
                    {/* <Button>Choose</Button> */}
                    <Button onClick={handleUpload}>Upload</Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={7} className="looking-for-card">
              <h3> I'm Looking for</h3>
              <div className="wrapper-tags">
                {user.about?.lookingForTags?.map((tag: string) => (
                  <p className="tag">{tag}</p>
                ))}
                {enableLookingFor ? (
                  <Form
                    form={formLookingFor}
                    onFinish={onFinishLookingFor}
                    className="form-looking-for-tags"
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
                      className="btn-plus-tick"
                    >
                      <i className="tick-icon" />
                    </Button>
                  </Form>
                ) : (
                  <Button
                  className="btn-plus-tick"
                    onClick={() => {
                      setEnableLookingFor(true);
                    }}
                  >
                    <i className="plus-icon" />
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
                  {enableEdit ? (
                    <div className="wrapper-details-fields">
                      <div className="name-fields-wrap">
                        <div className="name-wrap">
                          <label className="bold">First Name</label>
                          <Form.Item
                            name={["name", "first"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter your First Name",
                              },
                            ]}
                            initialValue={user.name.first}
                          >
                            <Input
                              className="bg-transparent form-control py-2"
                              placeholder="First Name"
                            />
                          </Form.Item>
                        </div>
                        <div className="name-wrap">
                          <label className="bold">Last Name</label>
                          <Form.Item
                            name={["name", "last"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter your Last Name",
                              },
                            ]}
                            initialValue={user.name.last}
                          >
                            <Input
                              className="bg-transparent form-control py-2"
                              placeholder="Last Name"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="tag-line-field-wrap">
                        <label className="bold">Tag Line</label>
                        <Form.Item
                          name="tagLine"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your Tag Line",
                            },
                          ]}
                          initialValue="- So be careful, Grumpy Lina"
                        >
                          <Input
                            className="bg-transparent form-control py-2"
                            placeholder="Tag Line"
                          />
                        </Form.Item>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3>{`${user.name.first} ${user.name.last}`}</h3>
                      <p>
                        {/* @ts-ignore */}
                        {user?.tagLine || "- So be careful, Grumpy Lina"}
                      </p>
                    </>
                  )}
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
                  <Button
                    type="link"
                    onClick={() => setEnableEdit(!enableEdit)}
                  >
                    {" "}
                    Edit
                  </Button>
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
                        <DatePicker className="bg-transparent form-control py-2" />
                      </Form.Item>
                    ) : (
                      <p>
                        {/* @ts-ignore */}
                        {moment(user.dob).format("DD-MM-YYYY") || "23.10.2000"}
                      </p>
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
              <div className="wrap-btn">
                <label>
                  <Button>Choose Files</Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFilesChange}
                  multiple
                />
              </div>
              {/* <Button>Add More</Button> */}
            </div>
            <div className="wrapper-photos">
              {user.about.photos.map((url) => (
                <img src={url} alt="" />
              ))}
            </div>
          </Row>
          <Row className="row-interests">
            <h3>Interests</h3>
            <div className="wrapper-tags">
              {user.about?.interestsTags?.map((interest) => (
                <p>{interest}</p>
              ))}
              {enableInterests ? (
                <Form
                  form={formInterests}
                  onFinish={onFinishInterests}
                  className="form-looking-for-tags"
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
                    className="btn-plus-tick"
                  >
                    <i className="tick-icon" />
                  </Button>
                </Form>
              ) : (
                <Button
                className="btn-plus-tick"
                  onClick={() => {
                    setEnableInterests(true);
                  }}
                >
                  <i className="plus-icon" />
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
