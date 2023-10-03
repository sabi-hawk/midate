import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Form, Row } from "antd";
import { Select } from "antd";
import type { SelectProps } from "antd";
import "./index.scss";
import { socket } from "index";

function Home() {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();
  const [form] = Form.useForm();
  const users = [
    {
      name: "Jessica J.",
      age: 28,
      city: "New York, USA",
      lookingFor: "Male",
      profilePic:
        "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png",
    },
    {
      name: "Kelly M.",
      age: 28,
      city: "New York, USA",
      lookingFor: "Male",
      profilePic:
        "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f9.png",
    },
    {
      name: "Kelly M.",
      age: 28,
      city: "New York, USA",
      lookingFor: "Male",
      profilePic:
        "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f9.png",
    },
    {
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
                  <div className="image-wrapper">
                    <img src={user.profilePic} alt="" />
                  </div>
                  <div className="details-wrapper">
                    <h3>{user.name}</h3>
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
        <Col className="col-2-home" span={7}>
          <Row>
            <div className="heading">
              <h2>Online Friends</h2>
            </div>
            <div className="user-card">
              <div className="wrapper-user-details">
                <Avatar
                  src={
                    <img
                      src={
                        "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f7.png"
                      }
                      alt="avatar"
                    />
                  }
                />
                <div>
                  <h4> Monroe Parker</h4>
                  <p>SuperModel</p>
                </div>
              </div>
              <Button>Chat</Button>
            </div>
            <div className="user-card">
              <div className="wrapper-user-details">
                <Avatar
                  src={
                    <img
                      src={
                        "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f7.png"
                      }
                      alt="avatar"
                    />
                  }
                />
                <div>
                  <h4> Monroe Parker</h4>
                  <p>SuperModel</p>
                </div>
              </div>
              <Button>Chat</Button>
            </div>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Home;
