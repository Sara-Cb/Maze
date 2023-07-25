import { Col, Row } from "react-bootstrap";
import { Creative } from "../../types/creativeType";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, store } from "../../redux/store/store";
import { toggleFollowCreative } from "../../redux/actions/followAction";
import { useState } from "react";

interface FollowItemProps {
  creative: Creative;
}

const FollowListItem = ({ creative }: FollowItemProps) => {
  const dispatch = store.dispatch;

  const session = useSelector((state: RootState) => state.login.session);

  const [follow, setFollow] = useState(true);

  const toggleFollow = async () => {
    await dispatch(
      toggleFollowCreative(session!.accessToken, creative.username)
    );
    setFollow(!follow);
  };

  return (
    <Row className="followListItem py-2 border-bottom border-secondary">
      <Col xs={2} className="d-flex justify-content-end align-items-center">
        <Link to={`/portfolio/${creative.username}`}>
          <img src={creative.image} alt="Profile pic" width={50} height={50} />
        </Link>
      </Col>
      <Col xs={7}>
        <Link
          to={`/portfolio/${creative.username}`}
          className="mazelink fw-bold"
        >
          {creative.stageName}
        </Link>
        <br />
        <Link to={`/portfolio/${creative.username}`} className="mazelink small">
          @{creative.username}
        </Link>
      </Col>
      <Col className="d-flex justify-content-end align-items-center">
        <span className="emptyDarkBtn followBtn" onClick={toggleFollow}>
          <i
            className={follow ? "bi bi-person-check-fill" : "bi bi-person-plus"}
          ></i>
        </span>
      </Col>
    </Row>
  );
};

export default FollowListItem;
