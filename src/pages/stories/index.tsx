import React, { useState } from "react";
import { Button, Col, Form, Row } from "antd";
import { Select } from "antd";
import type { SelectProps } from "antd";
import "./index.scss";
import SideBarFiends from "components/OnlineFriends";
import Story from "components/Story";

function Stories() {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();

  const [form] = Form.useForm();
  const stories = [
    {
      content:
        "In today’s fast-paced world, love is often viewed as a means of self-discovery and personal growth. he discovery of shared passions, interests, and personal goals, allowing individuals to forge connections that promote personal growth and mutual development.",
      likes: 230,
      comments: 50,
    },
    {
      content:
        "In today’s fast-paced world, love is often viewed as a means of self-discovery and personal growth. he discovery of shared passions, interests, and personal goals, allowing individuals to forge connections that promote personal growth and mutual development.",
      likes: 230,
      comments: 50,
    },
    {
      content:
        "In today’s fast-paced world, love is often viewed as a means of self-discovery and personal growth. he discovery of shared passions, interests, and personal goals, allowing individuals to forge connections that promote personal growth and mutual development.",
      likes: 230,
      comments: 50,
    },
    {
      content:
        "In today’s fast-paced world, love is often viewed as a means of self-discovery and personal growth. he discovery of shared passions, interests, and personal goals, allowing individuals to forge connections that promote personal growth and mutual development.",
      likes: 230,
      comments: 50,
    },
  ];

  const onFinish = (values: any) => {};

  const handleSearch = (newValue: string) => {};

  const handleChange = (newValue: string) => {};

  return (
    <Row className="wrapper-home-page" gutter={[16, 16]}>
      <Row>
        <div className="title-home">Stories</div>
      </Row>
      <Row>
        <Col className="col-1-stories stories" span={17}>
          <Row gutter={[16, 16]} className="row-wrapper-stories">
            <Row>
              <Form form={form} onFinish={onFinish}>
                <Form.Item name="searchString">
                  <Select
                    className="input-search"
                    showSearch
                    value={value}
                    placeholder="What's on your mind?"
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
                  <i className="send-icon"></i>
                </Button>
              </Form>
            </Row>
            <Row className="row-wrap-feed">
              <div className="title-feed">Latest Feed</div>
            </Row>
            <Row gutter={[16, 18]} className="wrapper-stories">
              {stories.map((story) => (
                <Story story={story} />
              ))}
            </Row>
          </Row>
        </Col>

        <SideBarFiends />
      </Row>
    </Row>
  );
}

export default Stories;
