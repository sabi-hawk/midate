import { useSelector } from "react-redux";
import UnderProgress from "./components/UnderProgress";
import Navbar from "./components/LeftNavbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/auth";
import { AtomState } from "./flux/store";
import { Row, Col } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "scss/index.scss";

const App = () => {
  const user = useSelector((state: AtomState) => state?.auth?.user);

  if (user) {
    return (
      <>
        <Row className="row-container" gutter={[16, 16]}>
          <Col span={5}>
            <Navbar />
          </Col>
          <Col span={15}>
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="dashboard" /> : <Navigate to="auth" />
                }
              />
              <Route
                path="/dashboard"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="/auth"
                element={
                  user ? <Navigate to="../dashboard" /> : <Authentication />
                }
              />
              <Route
                path="/mail-templates"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="/about"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="/demo"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="/chat"
                element={user ? <UnderProgress /> : <Navigate to="../auth" />}
              />
              <Route
                path="/logs"
                element={user ? <UnderProgress /> : <Navigate to="../logs" />}
              />
              <Route
                path="*"
                element={
                  user ? (
                    <Navigate to="../dashboard" />
                  ) : (
                    <Navigate to="../auth" />
                  )
                }
              />
            </Routes>
          </Col>
          <Col span={4}>Ads</Col>
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
