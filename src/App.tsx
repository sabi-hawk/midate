import UnderProgress from "./components/UnderProgress";
import Navbar from "./components/LeftNavbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Row, Col } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "scss/index.scss";
import Home from "pages/home";
import LandingPage from "pages/landing";
import LoginPage from "pages/auth/Login";
import SignUpPage from "pages/auth/Signup";
import { useAppState } from "hooks";
import Stories from "pages/stories";
import Notifications from "pages/notifications";
import Messages from "pages/messages";
import Settings from "pages/settings";
import Profile from "pages/profile";
import RightSideBar from "components/RightSideBar";

const App = () => {
  const {
    auth: { user },
  } = useAppState();

  if (user) {
    return (
      <>
        <Row className="row-container" gutter={[16, 16]}>
          <Col className="col-navbar" span={4}>
            <Navbar />
          </Col>
          <Col className="middle-col" span={14}>
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="home" /> : <Navigate to="login" />
                }
              />
              {/* <Route path="/" element={<LandingPage />} /> */}
              <Route
                path="/home"
                element={user ? <Home /> : <Navigate to="../auth" />}
              />
              <Route
                path="/login"
                element={user ? <Navigate to="../home" /> : <LoginPage />}
              />
              <Route
                path="/stories"
                element={user ? <Stories /> : <Navigate to="../login" />}
              />
              <Route
                path="/messages"
                element={user ? <Messages /> : <Navigate to="../login" />}
              />
              <Route
                path="/notifications"
                element={user ? <Notifications /> : <Navigate to="../login" />}
              />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="../login" />}
              />
              <Route
                path="/settings"
                element={user ? <Settings /> : <Navigate to="../login" />}
              />
              <Route
                path="*"
                element={
                  user ? <Navigate to="../home" /> : <Navigate to="../login" />
                }
              />
            </Routes>
          </Col>
          <Col className="ads-col" span={6}>
            <RightSideBar />
          </Col>
        </Row>
        <ToastContainer position="top-center" />
      </>
    );
  }

  return (
    <>
      <Row className="un-auth-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="../" />} />
        </Routes>
      </Row>
      <ToastContainer position="top-center" />
    </>
  );
};
export default App;
