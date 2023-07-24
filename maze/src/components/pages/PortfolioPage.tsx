import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { getPortfolio } from "../../redux/actions/portfolioAction";
import CollectionDisplayer from "../elements/CollectionDisplayer";
import { Collection } from "../../types/collectionType";
import ProfileSection from "../sections/ProfileSection";

const PortfolioPage = () => {
  const dispatch = store.dispatch;
  const usernameUrl = useParams().username;

  const portfolio = useSelector((state: RootState) => state.portfolio);
  const myCollections = useSelector(
    (state: RootState) => state.collection!.myCollections
  );

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState(myCollections);

  const loadData = async (username: string) => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await dispatch(getPortfolio(username));
  };

  const verifyIdentity = () => {
    if (usernameUrl === "me") {
      setCollections(myCollections);
      setLoading(false);
    } else {
      loadData(usernameUrl!);
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
    if (!portfolio.loading && usernameUrl !== "me") {
      setCollections(portfolio.portfolio.collections);
      setLoading(false);
    } else if (myCollections && usernameUrl === "me") {
      setCollections(myCollections);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio, myCollections]);

  return (
    <Container className="pageContainer profileContainer">
      {!loading ? (
        <Row>
          <Col xs={12} className="profileHero">
            <ProfileSection />
          </Col>
          <Col xs={12} className="sectionContainer mt-3">
            {collections.length > 0 ? (
              <>
                <Row className="d-flex justify-content-center">
                  <h3 className="w-100 text-center">Collections:</h3>
                </Row>
                <Row
                  xs={1}
                  sm={2}
                  md={3}
                  lg={4}
                  className="d-flex justify-content-around"
                >
                  {collections.map((collection: Collection) => {
                    return (
                      <CollectionDisplayer
                        key={collection.id}
                        collection={collection}
                        location="portfolio"
                      />
                    );
                  })}
                </Row>
              </>
            ) : (
              <div className="w-100 text-center">
                <h3>Seems like you still have no collections!</h3>
                <p className="mazelink">Add a collection</p>
              </div>
            )}
          </Col>
        </Row>
      ) : (
        <div className="centeringDiv">
          <Spinner className="w-50 h-50" />
        </div>
      )}
    </Container>
  );
};

export default PortfolioPage;
