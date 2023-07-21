import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState, store } from "../../redux/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MeSection from "../sections/MeSection";
import { getFeed } from "../../redux/actions/feedItemAction";
import FeedPost from "../elements/FeedPost";
import { FeedItem } from "../../types/feedItemType";

function FeedPage() {
  const navigate = useNavigate();
  const dispatch = store.dispatch;
  const login = useSelector((state: RootState) => state.login);
  const feed = useSelector((state: RootState) => state.feedItem.feed);

  useEffect(() => {
    if (!login.loggedIn) {
      navigate("/");
    } else {
      dispatch(getFeed(login.session!.accessToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="pageContainer">
      <Row className="d-flex justify-content-between w-100">
        <Col xs={12} md={2} lg={3} className="mb-5">
          <Row>
            <Col>
              <MeSection />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={8} lg={6} className="feedCol">
          <Row className="feedRow">
            {feed === undefined ? (
              <Spinner className="mx-auto mt-5" />
            ) : feed?.length === 0 ? (
              <h3>
                Seems like you haven't any updates. Follow more creatives or
                come back later!
              </h3>
            ) : (
              <div className="sectionContainer">
                {feed.map((feedItem: FeedItem) => {
                  return (
                    <FeedPost
                      key={feedItem.id}
                      id={feedItem.id}
                      author={feedItem.author}
                      caption={feedItem.caption}
                      type={feedItem.type}
                      collection={feedItem.collection}
                      createdAt={feedItem.createdAt}
                    />
                  );
                })}
              </div>
            )}
          </Row>
        </Col>
        <Col xs={12} md={2} lg={3}></Col>
      </Row>
    </Container>
  );
}

export default FeedPage;
