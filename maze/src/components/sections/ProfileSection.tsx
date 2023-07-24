import { Row, Col, Spinner, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { convertProfessions, convertSkills } from "../../helpers/helpers";
import { getCreative } from "../../redux/actions/creativeAction";
import {
  isCreativeFollowed,
  toggleFollowCreative,
} from "../../redux/actions/followAction";
import EditProfileMenu from "./EditProfileMenu";

const ProfileSection = () => {
  const dispatch = store.dispatch;
  const usernameUrl = useParams().username;

  const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
  const token = useSelector(
    (state: RootState) => state.login.session?.accessToken
  );
  const isFollowed = useSelector(
    (state: RootState) => state.follow.isProfileFollowed
  );
  const me = useSelector((state: RootState) => state.creative.me);
  const selectedCreative = useSelector(
    (state: RootState) => state.creative.selected
  );

  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(false);
  const [creative, setCreative] = useState(me!.c);
  const [itsMe, setItsMe] = useState(false);

  const toggleFollow = async () => {
    await dispatch(toggleFollowCreative(token!, usernameUrl!));
    await dispatch(isCreativeFollowed(token!, usernameUrl!));
  };

  const loadData = async () => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await dispatch(getCreative(usernameUrl!));
    if (loggedIn) {
      await dispatch(isCreativeFollowed(token!, usernameUrl!));
    }
  };

  const verifyIdentity = () => {
    if (loggedIn && usernameUrl === "me") {
      setItsMe(true);
      setCreative(me!.c);
      setLoading(false);
    } else {
      setItsMe(false);
      loadData();
    }
  };

  useEffect(() => {
    verifyIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    verifyIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameUrl]);

  useEffect(() => {
    if (loggedIn) {
      setFollow(isFollowed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowed]);

  useEffect(() => {
    if (!selectedCreative.loading && usernameUrl !== "me") {
      setCreative(selectedCreative.c);
      setLoading(false);
    } else if (loggedIn && !me.loading && usernameUrl === "me") {
      setCreative(me.c);
      setItsMe(true);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCreative, me]);

  return (
    <>
      {!loading && creative ? (
        <Container className="sectionContainer">
          <Row className="firstRow">
            <Col xs={3} className="col-3 text-end pe-5 d-none d-md-block">
              <img
                src={creative.image}
                alt="profile"
                className="profilePic"
              ></img>
            </Col>

            <Col xs={10} md={7} className="head">
              <div className="d-flex flex-column justify-content-between h-100">
                <div>
                  <h2 className="stagename">{creative.stageName}</h2>
                  <p className="username mazelink">@{creative.username}</p>
                </div>
                <p className="professions mb-0">
                  {convertProfessions(creative.professions)}
                </p>
              </div>
            </Col>
            {loggedIn && itsMe ? (
              <Col xs={2} className="text-end">
                <EditProfileMenu
                  username={creative.username}
                  firstname={creative.firstname}
                  lastname={creative.lastname}
                  stageName={creative.stageName}
                  bio={creative.bio}
                  city={creative.city}
                  state={creative.state}
                  skills={creative.skills}
                  professions={creative.professions}
                />
              </Col>
            ) : loggedIn && !itsMe ? (
              <Col xs={2} className="text-end px-0">
                <p className="emptyBtn followBtn" onClick={toggleFollow}>
                  <i
                    className={
                      follow ? "bi bi-person-check-fill" : "bi bi-person-plus"
                    }
                  ></i>
                </p>
              </Col>
            ) : (
              <></>
            )}
          </Row>
          <Row>
            <Col
              xs={12}
              md={3}
              className="analogic text-center text-md-end pe-md-5"
            >
              <div>
                <span className="name d-md-block ms-md-auto">
                  {creative.firstname} {creative.lastname}
                </span>
                <span className="d-md-none"> | </span>
                <span className="locality d-md-block ms-md-auto">
                  {creative.city}, {creative.state}
                </span>
              </div>
              <p className="mail">
                <a
                  className="mazelink"
                  href={`mailto:${creative.email}`}
                  target="blank"
                >
                  {creative.email}
                </a>
              </p>
            </Col>
            <Col
              xs={12}
              md={9}
              className="d-md-flex flex-md-column justify-content-md-between  text-center text-md-start order-first order-md-last"
            >
              <blockquote className="bio">
                <cite>"{creative.bio}"</cite>
              </blockquote>
              {creative.skills.length > 0 && (
                <p className="skills">
                  <span>My skills: </span>
                  <span>{convertSkills(creative.skills)}</span>
                </p>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ProfileSection;
