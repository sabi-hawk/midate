import { useDispatch } from "react-redux";
import { login } from "api/auth";
import { setUser } from "flux/reducers/auth";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    handleLogin(values);
  };

  const handleLogin = async (values: any) => {
    const { data } = await login(values);
    const { message, ...payload } = data;

    dispatch(setUser(payload));

    navigate("/dashboard");
    toast.success(message, {
      autoClose: 3000,
    });
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
        <h3 className="mb-4 display-5 fw-bold ls-tight">Login Information</h3>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input
            type="email"
            placeholder="Enter Email"
            className="bg-transparent form-control py-2"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            className="bg-transparent form-control py-2"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-100">
            Login In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
