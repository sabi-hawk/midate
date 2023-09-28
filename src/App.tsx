import { useSelector } from "react-redux";
import UnderProgress from "./components/UnderProgress";
import Navbar from "./components/LeftNavbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/auth";
import { AtomState } from "./flux/store";
import { Row, Col } from "antd";
import { ToastContainer } from "react-toastify";
import adsImage from "assets/ads.png";
import "react-toastify/dist/ReactToastify.css";
import "scss/index.scss";
import Home from "pages/home";

const App = () => {
  const user = useSelector((state: AtomState) => state?.auth?.user);

  if (user) {
    return (
      <>
        <Row className="row-container" gutter={[16, 16]}>
          <Col className="col-navbar" span={4}>
            <Navbar />
          </Col>
          <Col span={16}>
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
              />
              <Route
                path="/home"
                element={user ? <Home /> : <Navigate to="../auth" />}
              />
              <Route
                path="/auth"
                element={user ? <Navigate to="../home" /> : <Authentication />}
              />
              <Route
                path="/stories"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="/messages"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="/notifications"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="/profile"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="/settings"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="*"
                element={
                  user ? <Navigate to="../home" /> : <Navigate to="../auth" />
                }
              />
            </Routes>
          </Col>
          <Col className="ads-col" span={4}>
            <img src={adsImage} alt="" />
          </Col>
        </Row>
        <ToastContainer position="top-center" />
      </>
    );
  }

  return (
    <>
      <div className="main d-flex">
        <div className="right-panel w-100">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="*" element={<Navigate to="../auth" />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};
export default App;
