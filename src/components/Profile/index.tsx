import { Button, Col, Row } from "antd";
import SideBarFiends from "components/OnlineFriends";
import Story from "components/Story";

function Profile() {
  const images = [
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f1.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f2.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f3.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f4.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f5.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f6.png",
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
            <Story story={story} />
          ))}
        </Row>
      </Col>

      <SideBarFiends />
    </Row>
  );
}

export default Profile;
