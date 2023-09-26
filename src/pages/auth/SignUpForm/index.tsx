import { register } from "api/auth";
import { Button, DatePicker, Select, Form, Input } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
    console.log("Received values:", values);
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
        <h3 className="mb-4 display-5 fw-bold ls-tight">
          Signup <br /> Information
        </h3>
        <div className="d-grid signup-inner">
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
          <Form.Item
            name={["name", "last"]}
            rules={[{ required: true, message: "Please enter your Last Name" }]}
          >
            <Input
              className="bg-transparent form-control py-2"
              placeholder="Last Name"
            />
          </Form.Item>
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
          <Form.Item name="dob">
            <DatePicker className="bg-transparent form-control py-2" />
          </Form.Item>
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
          <Form.Item name="gender" initialValue="male">
            <Select
              defaultValue="male"
              style={{ width: 120 }}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "custom", label: "Custom" },
              ]}
            />
          </Form.Item>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="btn btn-primary py-2 w-50 mx-auto"
        >
          Sign Up
        </Button>
      </Form>
    </>
  );
}

export default Signup;
