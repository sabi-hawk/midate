import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { addUpload, getLatestAddsFeed } from "api/media";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLatestFeed } from "api/story";
import "./index.scss";

function RightSideBar() {
  const [advertisements, setAdvertisements] = useState<any>([]);
  const [activeAdd, setActiveAdd] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeAddModal, setActiveAddModal] = useState(false);
  const [form] = Form.useForm();
  const [attachedUrl, setAttachedUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedProfilePicture, setSelectedProfilePicture] = useState<any>({
    file: null,
    url: null,
  });

  const getLatestAdds = async () => {
    try {
      const { data } = await getLatestAddsFeed(page, pageSize);
      setAdvertisements(data.adds || []);
    } catch (error) {
      toast.error("Error Fetching Latest Adds", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getLatestAdds();
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleActiveAddOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveAddModal(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleActiveAddCancel = () => {
    setActiveAddModal(false);
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedProfilePicture({ file, url: URL.createObjectURL(file) });
  };

  const onFinishForm = async (values: any) => {
    if (selectedProfilePicture.file) {
      const formData = new FormData();
      formData.append("files", selectedProfilePicture.file);
      formData.append("attachedUrl", attachedUrl);
      formData.append("title", title);
      formData.append("description", description);
      try {
        const { status, data } = await addUpload(formData);

        if (status === 200) {
          toast.success(data?.message || "Add created successfully!", {
            autoClose: 3000,
          });
          setOpen(false);
          setSelectedProfilePicture({ file: null, url: null });
          setAttachedUrl("");
          setDescription("");
          setTitle("");
          getLatestAdds();
        } else {
          toast.error("Error creating Add!", {
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.error("Error creating Add!", {
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="right-side-bar-container">
      <div className="right-side-bar-inner">
        <div className="header">
          <Button type="primary" onClick={showModal}>
            Create New Add
          </Button>
          <Modal
            open={open}
            title="Advertisement Builder"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={onFinishForm}
              >
                Build Add
              </Button>,
            ]}
          >
            <Form
              form={form}
              onFinish={onFinishForm}
              style={{
                borderRadius: "0.35rem",
                padding: "10px 0px",
              }}
            >
              <div className="upload-add-main">
                <label htmlFor="">Title</label>
                <Form.Item name="title">
                  <Input
                    className="bg-transparent form-control py-2"
                    placeholder="enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="upload-add-main">
                <label htmlFor="">Description</label>
                <Form.Item name="description">
                  <Input
                    className="bg-transparent form-control py-2"
                    placeholder="enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="upload-add-main">
                <label htmlFor="">Upload add banner</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {selectedProfilePicture.url !== null && (
                <div className="add-preview-container">
                  <h3> Add Banner Preview </h3>
                  <img src={selectedProfilePicture.url} alt="" />
                </div>
              )}
              <div className="upload-add-main">
                <label htmlFor="">Attachment URL</label>
                <Form.Item name="attachedUrl">
                  <Input
                    className="bg-transparent form-control py-2"
                    placeholder="enter url"
                    value={attachedUrl}
                    onChange={(e) => setAttachedUrl(e.target.value)}
                  />
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>
        <div className="adds-body">
          <div className="title-add">Adds Section</div>
          <div className="adds-body-inner">
            {advertisements.map((add: any) => (
              <div
                className="custom-add"
                onClick={() => {
                  setActiveAdd(add);
                  setActiveAddModal(true);
                }}
              >
                {/* <a href={add.attachedUrl} /> */}
                {/* <img src={add.banner} alt="" /> */}
                <h2>{add?.title}</h2>
                <p>{add?.description}</p>
              </div>
            ))}
            <Modal
              title="Add Preview"
              open={activeAddModal}
              onOk={handleActiveAddOk}
              onCancel={handleActiveAddCancel}
            >
              <div className="add-preview-container">
                <h2>{activeAdd?.title}</h2>
                <p>{activeAdd?.description}</p>
                <img src={activeAdd?.banner} alt="" />
                <Button
                  onClick={() => window.open(activeAdd?.attachedUrl, "_blank")}
                >
                  Go to Attached Url
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
