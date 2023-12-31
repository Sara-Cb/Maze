import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState, store } from "../../redux/store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MeSection from "../sections/MeSection";
import { getFeed } from "../../redux/actions/feedAction";
import FeedPost from "../elements/FeedPost";
import { FeedItem } from "../../types/feedType";
import MazeFooter from "../sections/MazeFooter";

function FeedPage() {
  const navigate = useNavigate();
  const dispatch = store.dispatch;
  const login = useSelector((state: RootState) => state.login);
  const me = useSelector((state: RootState) => state.creative.me);
  const feed = useSelector((state: RootState) => state.feed);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!me.loading && !feed.loading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [me.loading, feed.loading]);

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
      {!loading ? (
        <Row className="d-flex justify-content-between feedContainer">
          <Col xs={12} md={4} lg={3} className="mb-5 sxColumn">
            <Row>
              <Col className="d-flex justify-content-center">
                <MeSection />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={8} lg={6} className="feedCol">
            <Row className="feedRow">
              {feed.feed === undefined ? (
                <Spinner className="mx-auto mt-5" />
              ) : feed.feed.length === 0 ? (
                <h3>
                  Seems like you haven't any updates. Follow more creatives or
                  come back later!
                </h3>
              ) : (
                <div className="sectionContainer">
                  {feed.feed.map((feedItem: FeedItem) => {
                    return (
                      <FeedPost
                        key={feedItem.id}
                        id={feedItem.id}
                        author={feedItem.author}
                        caption={feedItem.caption}
                        type={feedItem.type}
                        collection={feedItem.collection}
                        createdAt={feedItem.createdAt}
                        updatedAt={feedItem.updatedAt}
                      />
                    );
                  })}
                </div>
              )}
            </Row>
          </Col>
          <Col
            xs={12}
            md={8}
            lg={3}
            className="offset-md-4 offset-lg-0 dxColumn"
          >
            <MazeFooter />
          </Col>
        </Row>
      ) : (
        <div className="centeringDiv">
          <Spinner />
        </div>
      )}
    </Container>
  );
}

export default FeedPage;
