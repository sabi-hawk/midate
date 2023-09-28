import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row } from "antd";
import { Select } from "antd";
import type { SelectProps } from "antd";
import "./index.scss";

function Home() {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();
  const [form] = Form.useForm();

  
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

  return (
    <Row className="wrapper-home-page" gutter={[16, 16]}>
      <Col className="col-1-home" span={16}>
        <Row>
          <div className="title-home">Discover People</div>
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
      </Col>
      <Col className="col-2-home" span={8}></Col>
    </Row>
  );
}

export default Home;
