import { useEffect, useState } from "react";
import { Button, Col, Empty, Form, Row } from "antd";
import type { SelectProps } from "antd";
import SideBarFiends from "components/OnlineFriends";
import Story from "components/Story";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { createStory, getLatestFeed } from "api/story";

function Stories() {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { data } = await createStory(values.storyContent);
    toast.success(data.message, {
      autoClose: 3000,
    });
    form.resetFields();
  };

  const getLatestStoriesFeed = async () => {
    try {
      const { data } = await getLatestFeed(page, pageSize);
      setStories(data.stories || []);
    } catch (error) {
      toast.error("Error Fetching Latest Feed", {
        autoClose: 3000,
      });
    }
  };
  useEffect(() => {
    getLatestStoriesFeed();
  }, []);
  return (
    <Row className="wrapper-home-page" gutter={[16, 16]}>
      <Row>
        <div className="title-home">Stories</div>
      </Row>
      <Row>
        <Col className="col-1-stories stories" span={24}>
          <Row gutter={[16, 16]} className="row-wrapper-stories">
            <Row>
              <Form form={form} onFinish={onFinish} className="story-form-main">
                <Form.Item name="storyContent">
                  <TextArea
                    placeholder="Write what's in your mind?"
                    // autoSize={{ minRows: 2, maxRows: 3 }}
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
              {stories.length > 0 ? (
                stories.map((story) => <Story story={story} />)
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No stories found"
                />
              )}
            </Row>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Stories;
