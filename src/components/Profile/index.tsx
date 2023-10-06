import { Avatar, Button, Col, Row } from "antd";
import OnlineFiends from "components/OnlineFriends";

function Profile() {
  const images = [
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f1.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f2.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f1.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f2.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f1.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f2.png",
  ];
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
  ];
  return (
    <Row>
      <Col className="col-1-home user-profile" span={17}>
        <Row gutter={[16, 18]} className="user-header">
          <div className="details-wrap">
            <h2> Jeccica J. Profile</h2>
            <p className="tag-line">- So be careful, Grumpy Lina</p>
            <div className="wrap-btn-match">
              <div className="inner-wrap">
                <Button className="btn-cross">
                  <i className="close-fill"></i> No
                </Button>
                <Button className="btn-heart">
                  <i className="heart-fill"></i> Yes
                </Button>
              </div>
            </div>
            <div className="age-wrapper">
              <p>28</p>
              <i className="female-age-icon"></i>
            </div>
            <p className="city-p">New York, USA</p>
            <div className="gender-preference-wrap">
              <p className="text-looking">LookingFor </p>
              <p className="gender-p">Male</p>
            </div>
          </div>
          <div className="profile-pic-wrap">
            <img
              src="http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f8.png"
              alt=""
            />
          </div>
        </Row>
        <Row className="wrapper-pics">
          {images.map((image) => (
            <Col className="wrap-pic" span={8}>
              <img src={image} alt="" />
            </Col>
          ))}
        </Row>
        <Row gutter={[16, 18]} className="wrapper-stories">
          {stories.map((story) => (
            <div className="wrapper-story">
              <div className="row-header">
                <div className="wrapper-details">
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
                  <div className="details">
                    <p className="user-name">Jessica J.</p>
                    <p className="time-posted"> 20 minutes ago</p>
                  </div>
                </div>
                <Button className="btn-three-dot">
                  <i className="icon-three-dots"></i>
                </Button>
              </div>
              <div className="row-story-content">
                <p>{story.content}</p>
              </div>
              <div className="row-footer">
                <div className="wrap-btn">
                  <Button>
                    <i className="icon-thumb-up"></i>
                    <p>230</p>
                  </Button>
                  <Button>
                    <i className="icon-comment"></i>
                    <p>50</p>
                  </Button>
                </div>
                <Button>
                  <i className="icon-share"></i>
                </Button>
              </div>
            </div>
          ))}
        </Row>
      </Col>
      <Col className="col-2-home user-profile" span={7}>
        <OnlineFiends />
      </Col>
    </Row>
  );
}

export default Profile;
