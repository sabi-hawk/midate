import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { MaskedInput } from "antd-mask-input";
import "./index.scss";

function Settings() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
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
            <Row className="row-general">
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Location</label>
                  <Form.Item
                    name={["name", "first"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your First Name",
                      },
                    ]}
                  >
                    <Input
                      className="bg-transparent form-control py-2"
                      placeholder="First Name"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Matches</label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                      { required: true, message: "Please enter your email" },
                    ]}
                  >
                    <Select
                      defaultValue="male"
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "custom", label: "Custom" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Col>

              <Col className="col-field" span={12}>
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
              </Col>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Notifications</label>
                  <Form.Item name="notifications" initialValue="male">
                    <Select
                      defaultValue="male"
                      options={[
                        { value: "male", label: "On" },
                        { value: "female", label: "Off" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row className="row-account-settings">
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
                  >
                    <Input
                      className="bg-transparent form-control py-2"
                      placeholder="Enter Email"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Phone</label>
                  <Form.Item
                    validateTrigger="onSubmit"
                    rules={[
                      {
                        required: true,
                        message: "Phone number is required",
                      },
                      {
                        pattern:
                          /^(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?)|[0-9]?)\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s.]?[0-9]{3})([-\s.]?[0-9]{3,4})$/,
                        message: "Phone number format is not valid",
                      },
                    ]}
                  >
                    <MaskedInput
                      id="phone_num_input"
                      mask="+{1} (000)-000-0000"
                      placeholder="+1 (XXX)-XXX-XXXX"
                      autoFocus
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col className="col-field" span={12}>
                <div>
                  <label className="bold">Password</label>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                      {
                        min: 3,
                        message: "Password must be at least 6 characters",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      className="bg-transparent form-control py-2"
                      placeholder="Enter Password"
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
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match")
                          );
                        },
                      }),
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
              <div>
                <Button className="btn btn-primary py-2 w-50 mx-auto">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-primary py-2 w-50 mx-auto"
                >
                  Save
                </Button>
              </div>
            </div>
          </Form>
          <Row className="general-row"></Row>
          <Row className="account-settings-row"></Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Settings;
