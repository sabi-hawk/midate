import { register } from "api/auth";
import { Button, DatePicker, Select, Form, Input, Col, Row } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MaskedInput } from "antd-mask-input";

function Signup() {
  const [form] = Form.useForm();

  const handleSignup = async (values: any) => {
    try {
      const { data } = await register({
        dob: moment(values.dob).format("DD/MM/YYYY"),
        ...values,
      });
      toast.success(data.message, {
        autoClose: 3000,
      });
    } catch (error) {
      console.log("Error | Sign-Up", error);
    }
  };

  const onFinish = (values: any) => {
    handleSignup(values); // You can pass the form values to your handleSignup function
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        className="auth-form px-4 py-5 px-md-5 bg-glass"
        style={{
          borderRadius: "0.35rem",
        }}
      >
        <div className="wrapper-logo">
          <i className="app-logo"></i>
          <h2> MiDate</h2>
        </div>
        <Row className="wrapper-fields">
          <Col className="inner-first-col" span={12}>
            <div>
              <label className="bold">First Name</label>
              <Form.Item
                name={["name", "first"]}
                rules={[
                  { required: true, message: "Please enter your First Name" },
                ]}
              >
                <Input
                  className="bg-transparent form-control py-2"
                  placeholder="First Name"
                />
              </Form.Item>
            </div>
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
            <div>
              <label className="bold">I am a</label>
              <Form.Item name="gender" initialValue="Male">
                <Select
                  defaultValue="Male"
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Custom", label: "Custom" },
                  ]}
                />
              </Form.Item>
            </div>
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
          <Col className="inner-second-col" span={12}>
            <div>
              <label className="bold">Last Name</label>
              <Form.Item
                name={["name", "last"]}
                rules={[
                  { required: true, message: "Please enter your Last Name" },
                ]}
              >
                <Input
                  className="bg-transparent form-control py-2"
                  placeholder="Last Name"
                />
              </Form.Item>
            </div>

            <div>
              <label className="bold">Your Birthday</label>
              <Form.Item name="dob">
                <DatePicker className="bg-transparent form-control py-2" />
              </Form.Item>
            </div>

            {/* <div>
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
            </div> */}

            <div>
              <label className="bold">Looking For</label>
              <Form.Item name="preferredGender" initialValue="Female">
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
            <div>
              <label className="bold">Confirm Password</label>
              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password" },
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
        <div className="btn-signUp-wrapper">
          <Button
            type="primary"
            htmlType="submit"
            className="btn btn-primary py-2 w-50 mx-auto"
          >
            Sign Up
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Signup;
