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
    const { status, data } = await login(values);
    const { message, ...payload } = data;

    if (status !== 200) {
      toast.error(message, {
        autoClose: 3000,
      });
    } else {
      dispatch(setUser(payload));

      navigate("/dashboard");
      toast.success(message, {
        autoClose: 3000,
      });
    }
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
        <div>
          <label className="bold">Username or email</label>
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
        </div>
        <div>
          <label className="bold">Password</label>
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
        </div>
        <Form.Item>
          <Button className="login-btn" type="primary" htmlType="submit">
            Login In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
