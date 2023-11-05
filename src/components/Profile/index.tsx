import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Row } from "antd";
import { getStories } from "api/story";
import SideBarFiends from "components/OnlineFriends";
import Story from "components/Story";
import { useEffect, useState } from "react";
import { calculateAge } from "utils";

function Profile({ match, setActiveProfile }: any) {
  const [stories, setStories] = useState([]);

  const images = [
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f1.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f2.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f3.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f4.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f5.png",
    "http://localhost:8000/images/profile_pic_6512b3430da1dea3c4ad09f6.png",
  ];
  const stories2 = [
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

  const getUserStories = async () => {
    const { data } = await getStories(match.user._id);
    setStories(data.stories);
    console.log("Stories", data.stories);
  };
  useEffect(() => {
    getUserStories();
  }, []);
  return (
    <Row>
      <Col className="col-1-home user-profile" span={17}>
        <Row gutter={[16, 18]} className="user-header">
          <div className="details-wrap">
            <Button
              className="arrow-back-wrap"
              onClick={() => {
                setActiveProfile(undefined);
              }}
            >
              <ArrowLeftOutlined /> <h4>Back</h4>
            </Button>
            <h2> {`${match.user.name.first} ${match.user.name.last}`}</h2>
            <p className="tag-line">{match.user.tagLine}</p>
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
              <p>{calculateAge(match.user.dob)}</p>
              <i className="female-age-icon"></i>
            </div>
            <p className="city-p">{`${match.city}, ${match.country}`}</p>
            <div className="gender-preference-wrap">
              <p className="text-looking">LookingFor </p>
              <p className="gender-p">{match.preferredGender}</p>
            </div>
          </div>
          <div className="profile-pic-wrap">
            <img src={match.profilePic} alt="" />
          </div>
        </Row>
        <Row className="wrapper-pics">
          {match.photos.map((image: string) => (
            <Col className="wrap-pic" span={8}>
              <img src={image} alt="" />
            </Col>
          ))}
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
      </Col>

      <SideBarFiends />
    </Row>
  );
}

export default Profile;
