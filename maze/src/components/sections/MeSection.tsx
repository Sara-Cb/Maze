import { Col, Image, Row } from "react-bootstrap";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";

const MeSection = () => {
  const me = useSelector((state: RootState) => state.creative.me.c);

  return (
    <Row className="mirror sectionContainer">
      <Col>
        <Row>
          <Image src={me!.image} alt="profile pic" />
        </Row>
        <Row>
          <h3>{me!.stageName}</h3>
          <p className="myLink">@{me!.username}</p>
        </Row>
        <Row>
          <cite className="testCutter">{me!.bio}</cite>
        </Row>
      </Col>
    </Row>
  );
};

export default MeSection;
