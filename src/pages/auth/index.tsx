import { useState } from "react";
import { Button } from "antd";
import Login from "./LoginForm";
import Signup from "./SignUpForm";

function Authentication() {
  const [loginForm, setLoginForm] = useState(true);
  return (
    <div className="form-container background-radial-gradient ">
      {loginForm ? (
        <>
          <Login />
          <p className="form-footer-text">
            Don't have an account{" "}
            <Button
              className="btn btn-primary"
              onClick={() => setLoginForm(false)}
            >
              {" "}
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <Signup />
          <p className="form-footer-text">
            Already have an account{" "}
            <button
              className="btn btn-primary"
              onClick={() => setLoginForm(true)}
            >
              Login
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default Authentication;
