import { Button, Col, Row } from "antd";
import Signup from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import singUpImage from "assets/Illustration.png";

function SignUpPage() {
  const navigate = useNavigate();
  return (
    <Row className="singUp-wrapper">
      <Col span={12} className="first-col">
        <img src={singUpImage} alt="" />
      </Col>
      <Col span={12} className="second-col">
        <Signup />
        <p className="singUp-footer-text">
          Already have an account?{" "}
          <Button className="btn btn-primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </p>
      </Col>
    </Row>
  );
}

export default SignUpPage;
