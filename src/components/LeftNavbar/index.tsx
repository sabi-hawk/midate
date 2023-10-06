import { Menu, MenuProps } from "antd";
import { setUser } from "flux/reducers/auth";
import { setChatsData } from "flux/reducers/chat";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useAppState } from "hooks";
import { useLocation } from "react-router-dom";

function LeftNavbar() {
  const {
    auth: { user },
  } = useAppState();
  const location = useLocation();
  const [selected, setSelected] = useState("Home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // socket.emit("disconnected");
    dispatch(setUser({}));
    dispatch(setChatsData({}));
    navigate("/");
  };
  const onMenuClick: MenuProps["onClick"] = (e) => {
    setSelected(e.key);
  };
  useEffect(() => {
    // Get the pathname from the URL
    const pathname = location.pathname;

    // Capitalize the first letter and assign it to selected
    setSelected(pathname.charAt(1).toUpperCase() + pathname.slice(2));
  }, [location.pathname]);

  const MenuItems: MenuProps["items"] = [
    {
      label: (
        <NavLink className="home-menu-item" to="dashboard">
          <i className="menu-icon icon-home" />
          Home
        </NavLink>
      ),
      key: "Home",
    },
    {
      label: (
        <NavLink className="home-menu-item" to="stories">
          <i className="menu-icon icon-stories" />
          Stories
        </NavLink>
      ),
      key: "Stories",
    },
    {
      label: (
        <NavLink className="home-menu-item" to="messages">
          <i className="menu-icon icon-messages" />
          Messages
        </NavLink>
      ),
      key: "Messages",
    },
    {
      label: (
        <NavLink className="home-menu-item" to="notifications">
          <i className="menu-icon icon-notifications" />
          Notifications
        </NavLink>
      ),
      key: "Notifications",
    },
    {
      label: (
        <NavLink className="home-menu-item" to="profile">
          <i className="menu-icon icon-profile" />
          Profile
        </NavLink>
      ),
      key: "Profile",
    },
    {
      label: (
        <NavLink className="home-menu-item" to="settings">
          <i className="menu-icon icon-settings" />
          Settings
        </NavLink>
      ),
      key: "Settings",
    },
    {
      label: (
        <NavLink className="home-menu-item" onClick={handleLogout} to="/">
          <i className="menu-icon icon-logout" />
          Logout
        </NavLink>
      ),
      key: "Logout",
    },
  ];
  return (
    <div className="left-nav-wrapper">
      <div className="top-container">
        <div className="app-logo-wrapper">
          <i className="app-logo"></i>
        </div>
        <Menu
          selectedKeys={[selected]}
          onClick={onMenuClick}
          mode="vertical"
          items={MenuItems}
        />
      </div>
      <div className="bottom-container">
        <img
          src="http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f7.png"
          alt=""
        />
        <p>{`${user.name.first} ${user.name.last}`}</p>
      </div>
    </div>
  );
}

export default LeftNavbar;
