import { Button } from "antd";
import { setUser } from "flux/reducers/auth";
import { setChatsData } from "flux/reducers/chat";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LeftNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // socket.emit("disconnected");
    dispatch(setUser({}));
    dispatch(setChatsData({}));
    navigate("/");
  };

  return (
    <div>
      LeftNavbar
      <Button onClick={handleLogout}> Logout</Button>
    </div>
  );
}

export default LeftNavbar;
