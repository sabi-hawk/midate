import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "antd";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { socket } from "index";
import Profile from "components/Profile";
import SideBarFiends from "components/OnlineFriends";
import "./index.scss";

function Home() {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();
  const [activeProfile, setActiveProfile] = useState<undefined | string>(
    undefined
  );
  const [form] = Form.useForm();
  const users = [
    {
      _id: "328765238745287346",
      name: "Jessica J.",
      age: 28,
      city: "New York, USA",
      lookingFor: "Male",
      profilePic:
        "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
    },
    {
      _id: "328765238745287346",
      name: "Kelly M.",
      age: 28,
      city: "New York, USA",
      lookingFor: "Male",
      profilePic:
        "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f9.png",
    },
    {
      _id: "328765238745287346",
      name: "Kelly M.",
      age: 28,
      city: "New York, USA",
      lookingFor: "Male",
      profilePic:
        "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f9.png",
    },
    {
      _id: "328765238745287346",
      name: "Jessica J.",
      age: 28,
      city: "New York, USA",
      lookingFor: "Male",
      profilePic:
        "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
    },
  ];
  const fetchSuggestions = async (value: string) => {
    try {
      if (!value) {
        setData([]);
        return;
      }

      //   const response = await axios.get(
      //     `https://suggest.taobao.com/sug?code=utf-8&q=${value}`
      //   );

      //   const { result } = response.data;
      //   const suggestions = result.map((item: any) => ({
      //     value: item[0],
      //     text: item[0],
      //   }));

      //   setData(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const onFinish = (values: any) => {
    fetchSuggestions(values.searchString);
  };

  const handleSearch = (newValue: string) => {
    fetchSuggestions(newValue);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("CHECK ENV", process.env.REACT_APP_SOCKET_URL);
    socket.emit("test");
  });
  return (
    <Row className="wrapper-home-page" gutter={[16, 16]}>
      {!activeProfile ? (
        <>
          <Row>
            <div className="title-home">Discover People</div>
          </Row>
          <Row>
            <Col className="col-1-home" span={17}>
              <Row>
                <Form form={form} onFinish={onFinish}>
                  <Form.Item name="searchString">
                    <Select
                      className="input-search"
                      showSearch
                      value={value}
                      placeholder="Search People"
                      defaultActiveFirstOption={false}
                      suffixIcon={null}
                      filterOption={false}
                      onSearch={handleSearch}
                      onChange={handleChange}
                      notFoundContent={null}
                      options={(data || []).map((d) => ({
                        value: d.value,
                        label: d.text,
                      }))}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn btn-primary py-2 w-50 mx-auto"
                  >
                    <i className="search-icon"></i>
                  </Button>
                </Form>
              </Row>
              <Row className="row-user-cards" gutter={[16, 16]}>
                {users.map((user, index) => (
                  <Col span={12} key={index}>
                    <div className="user-card">
                      <Button
                        className="image-wrapper"
                        onClick={() => setActiveProfile(user._id)}
                      >
                        <img src={user.profilePic} alt="" />
                      </Button>
                      <div className="details-wrapper">
                        <Button
                          className="name-btn"
                          onClick={() => setActiveProfile(user._id)}
                        >
                          <h3>{user.name}</h3>
                        </Button>
                        <div className="age-wrapper">
                          <p>{user.age}</p>
                          <i className="female-age-icon"></i>
                        </div>
                        <p className="city-p">{user.city}</p>
                        <div className="gender-preference-wrap">
                          <p className="text-looking">LookingFor </p>
                          <p className="gender-p">{user.lookingFor}</p>
                        </div>
                        <div className="btn-wrapper">
                          <Button>
                            <i className="close-fill"></i>
                            No
                          </Button>
                          <Button>
                            <i className="heart-fill"></i>YES
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            <SideBarFiends />
          </Row>
        </>
      ) : (
        <Profile />
      )}
    </Row>
  );
}

export default Home;
