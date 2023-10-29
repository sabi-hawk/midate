import { Button, Col, Row } from "antd";
import landingImage from "assets/landing-image.png";
import { useNavigate } from "react-router-dom";
import "./index.scss";

function LandingPage() {
  const navigate = useNavigate();

  const handleRoute = (route: string) => {
    navigate(route);
  };
  return (
    <Row className="wrapper-landing-page">
      <Row className="header-landing">
        <Col className="col-logo">
          <i className="app-logo"></i>
        </Col>
        <Col className="col-header-btn">
          <Button> About App</Button>
          <Button> Features</Button>
          <Button> Contact Us</Button>
        </Col>
        <Col className="col-header-auth-btn">
          <Button
            className="create-account"
            onClick={() => handleRoute("signup")}
          >
            Create Account
          </Button>
          <Button className="login" onClick={() => handleRoute("login")}>
            <i className="icon-profile"></i>
            Login
          </Button>
        </Col>
      </Row>
      <Row className="body-landing">
        <Col span={12} className="first-col">
          <div className="wrapper-content">
            <p className="first-p">Too busy staying upto date to find love?</p>
            <p className="second-p">It’s Never too late to Find Match</p>
            <p className="third-p">
              Find your love by being yourself with the help of Powerful AI Tool
              and with 100% success rate.
            </p>
            <Button className="btn-find-love">Find Your Love</Button>
          </div>
          <div className="wrapper-items">
            <div className="highlighted-item">
              <i className="double-heart"></i>
              <div className="max-width">
                <h3> 10k+ </h3>
                <h3>Members</h3>
              </div>
            </div>
            <div className="highlighted-item">
              <i className="ai-matches"></i>
              <div className="max-width">
                <h3> Smart AI </h3>
                <h3>Matches</h3>
              </div>
            </div>
            <div className="highlighted-item">
              <i className="success-rate"></i>
              <div className="max-width">
                <h3> 100% Success </h3>
                <h3>Rate</h3>
              </div>
            </div>
          </div>
        </Col>
        <Col span={12} className="second-col">
          <img src={landingImage} alt="" />
        </Col>
      </Row>
    </Row>
  );
}

export default LandingPage;
