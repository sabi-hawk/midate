import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { MaskedInput } from "antd-mask-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSettings } from "api/user";
import "./index.scss";
import { useAppState } from "hooks";
import { useDispatch } from "react-redux";
import { setUser } from "flux/reducers/auth";

function Settings() {
  const {
    auth: {
      user: { about, phone, email },
    },
  } = useAppState();
  const { auth } = useAppState();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const { confirmPassword, ...remainingData } = values;
    try {
      const { data } = await userSettings(remainingData);
      dispatch(setUser({ ...auth, user: { ...auth.user, about: data.about } }));
      toast.success(data?.message, {
        autoClose: 3000,
      });
    } catch (error) {
      console.log("Error Setting Data", error);
      toast.error("Error Setting Data", {
        autoClose: 3000,
      });
    }
    console.log("Received values:", values);
  };

  return (
    <Row className="wrapper-home-page" gutter={[16, 16]}>
      <Row>
        <div className="title-home">Settings</div>
      </Row>
      <Row>
        <Col className="col-settings" span={24}>
          <Form
            form={form}
            onFinish={onFinish}
            className="auth-form px-4 py-5 px-md-5 bg-glass"
            style={{
              borderRadius: "0.35rem",
            }}
          >
            <Row gutter={16} className="row-general">
              <div className="heading-general">General</div>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Country</label>
                  <Form.Item
                    name={"country"}
                    initialValue={about.country || ""}
                  >
                    <Input
                      className="bg-transparent form-control py-2"
                      placeholder="Country"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">City</label>
                  <Form.Item name={"city"} initialValue={about.city || ""}>
                    <Input
                      className="bg-transparent form-control py-2"
                      placeholder="City"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Matches</label>
                  <Form.Item
                    name="preferredGender"
                    initialValue={about.preferredGender || "Female"}
                  >
                    <Select
                      defaultValue="Female"
                      options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                        { value: "Custom", label: "Custom" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Col>

              {/* <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Filter Radius</label>
                  <Form.Item name="gender" initialValue="male">
                    <Select
                      defaultValue="male"
                      options={[
                        { value: "male", label: "10 Miles" },
                        { value: "female", label: "20 Miles" },
                        { value: "custom", label: "30 Miles" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Col> */}
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Notifications</label>
                  <Form.Item
                    name="notifications"
                    initialValue={about.notifications || "On"}
                  >
                    <Select
                      defaultValue="On"
                      options={[
                        { value: "On", label: "On" },
                        { value: "Off", label: "Off" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={16} className="row-account-settings">
              <div className="heading-account-settings">Account Settings</div>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Email Address</label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                      { required: true, message: "Please enter your email" },
                    ]}
                    initialValue={email}
                  >
                    <Input
                      className="bg-transparent form-control py-2"
                      placeholder="Enter Email"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col className="col-field" span={12}>
                {/* <div>
                  <label className="bold">Phone</label>
                  <Form.Item
                    name={"phone"}
                    validateTrigger="onSubmit"
                    rules={[
                      {
                        pattern:
                          /^(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?)|[0-9]?)\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s.]?[0-9]{3})([-\s.]?[0-9]{3,4})$/,
                        message: "Phone number format is not valid",
                      },
                    ]}
                    initialValue={phone}
                  >
                    <MaskedInput
                      id="phone_num_input"
                      mask="+{1}(000)-000-0000"
                      placeholder="+1(XXX)-XXX-XXXX"
                      autoFocus
                    />
                  </Form.Item>
                </div> */}
              </Col>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Password</label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        min: 3,
                        message: "Password must be at least 3 characters",
                      },
                    ]}
                    initialValue={""}
                  >
                    <Input
                      type="password"
                      className="bg-transparent form-control py-2"
                      placeholder="Enter Password"
                      defaultValue={""}
                      autoComplete="new-password"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Confirm Password</label>
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value || getFieldValue("password")) {
                            // If either field has a value, the other becomes required
                            if (!value) {
                              return Promise.reject(
                                new Error("Please confirm your password")
                              );
                            }
                            return Promise.resolve();
                          }
                          return Promise.resolve();
                        },
                      }),
                      {
                        min: 3,
                        message: "Password must be at least 3 characters",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      className="bg-transparent form-control py-2"
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <div className="wrapper-form-footer">
              <div className="wrapper-btn">
                <Button className="cancel">Cancel</Button>
                <Button type="primary" htmlType="submit" className="save">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Row>
  );
}

export default Settings;
