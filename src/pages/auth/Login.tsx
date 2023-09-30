import { Button, Col, Row } from "antd";
import Login from "./LoginForm";
import { useNavigate } from "react-router-dom";
import loginImage from "assets/Illustration.png";
import "./index.scss";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <Row className="login-wrapper">
      <Col span={12} className="first-col">
        <img src={loginImage} alt="" />
      </Col>
      <Col span={12} className="second-col">
        <Login />
        <p className="login-footer-text">
          Don't have an account ?{" "}
          <Button
            className="btn btn-primary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </p>
      </Col>
    </Row>
  );
}

export default LoginPage;
