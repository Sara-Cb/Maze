import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { convertProfessions } from "../../helpers/helpers";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { Creative } from "../../types/creativeType";

const ProfileSection = (creative: Creative) => {
  const me = useSelector((state: RootState) => state.creative.me.c);

  const [itsMe, setItsMe] = useState(false);

  useEffect(() => {
    if (creative.username === me!.username) {
      setItsMe(true);
    } else {
      setItsMe(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (creative.username === me!.username) {
      setItsMe(true);
    } else {
      setItsMe(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creative]);

  return (
    <Row>
      <Col xs={12} className="sectionContainer profileHero">
        <div className="profileImgs">
          <img src={creative.image} alt="profile" className="profilePic"></img>
        </div>

        <Row className="mt-5 mb-3 mx-3 row">
          <div className="col-8">
            <h2 className="stagename">{creative.stageName}</h2>
            <p className="username">{creative.username}</p>
            <p className="professions">
              {convertProfessions(creative.professions)}
            </p>
            <p className="skills">{creative.skills}a</p>
            <p>
              {creative.firstname} {creative.lastname}
            </p>
            <p>
              {creative.city}, {creative.state}
            </p>
            <div className={itsMe ? "d-block" : "d-none"}>
              <Link to={"/my-details"}>
                <p className="mazelink">
                  <ThreeDotsVertical />
                </p>
              </Link>
            </div>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileSection;
