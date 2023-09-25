import React, { useState } from "react";
import { register } from "api/auth";
import { Button, DatePicker, Space, Select } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: {
      first: "",
      last: "",
    },
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
  });
  const handleSignup = async (event: any) => {
    event.preventDefault();
    try {
      const { confirmPassword, ...registrationData } = signupData;
      const { data } = await register(registrationData);
      toast.success(data.message, {
        autoClose: 3000,
      });
    } catch (error) {
      console.log("Error | Sign-Up", error);
    }
  };
  return (
    <div className="position-relative">
      <div
        id="radius-shape-1"
        className="position-absolute rounded-circle shadow-5-strong"
      ></div>
      <div
        id="radius-shape-2"
        className="position-absolute shadow-5-strong"
      ></div>
      <form
        className="auth-form  px-4 py-5 px-md-5  bg-glass"
        onSubmit={handleSignup}
        style={{
          borderRadius: "0.35rem",
        }}
      >
        <h3 className="mb-4 display-5 fw-bold ls-tight">
          {" "}
          Signup <br /> Information
        </h3>
        <div className="d-grid signup-inner">
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="text"
                placeholder="First Name"
                value={signupData.name.first}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    name: { ...signupData.name, first: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="text"
                placeholder="Last Name"
                value={signupData.name.last}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    name: { ...signupData.name, last: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="email"
                placeholder="Enter Email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <DatePicker
                onChange={(date, dateString) =>
                  setSignupData({ ...signupData, dob: dateString })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="password"
                placeholder="Enter Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="password"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                onChange={(value: any) =>
                  setSignupData({ ...signupData, gender: value })
                }
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "custom", label: "Custom" },
                ]}
              />
            </div>
          </div>
        </div>
        <Button
          onSubmit={handleSignup}
          className="btn btn-primary py-2 w-50 mx-auto"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
