import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { getCreative } from "../../redux/actions/creativeAction";
import { getPortfolio } from "../../redux/actions/portfolioAction";
import { convertProfessions } from "../../helpers/helpers";
import CollectionDisplayer from "../elements/CollectionDisplayer";
import { Collection } from "../../types/collectionType";
import { ThreeDotsVertical } from "react-bootstrap-icons";

const PortfolioPage = () => {
  const dispatch = store.dispatch;
  const usernameUrl = useParams().username;

  const portfolio = useSelector((state: RootState) => state.portfolio);
  const me = useSelector((state: RootState) => state.creative.me);
  const myCollections = useSelector(
    (state: RootState) => state.collection!.myCollections
  );
  const selectedCreative = useSelector(
    (state: RootState) => state.creative.selected
  );

  const [loading, setLoading] = useState(true);
  const [creative, setCreative] = useState(me.c);
  const [collections, setCollections] = useState(myCollections);
  const [itsMe, setItsMe] = useState(false);

  const loadData = async () => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await dispatch(getCreative(usernameUrl!));
    await dispatch(getPortfolio(usernameUrl!));
  };

  const verifyIdentity = () => {
    if (usernameUrl === "me") {
      setItsMe(true);
      setCreative(me.c);
      setCollections(myCollections);
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
    if (
      !selectedCreative.loading &&
      !portfolio.loading &&
      usernameUrl !== "me"
    ) {
      setCreative(selectedCreative.c!);
      setCollections(portfolio.portfolio.collections);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCreative, portfolio]);

  return (
    <Container className="pageContainer profileContainer">
      {!loading && creative ? (
        <Row>
          <Col xs={12} className="sectionContainer profileHero">
            <div className="profileImgs">
              <img
                src={creative.image}
                alt="profile"
                className="profilePic"
              ></img>
            </div>

            <Row className="mt-5 mb-3 mx-3 row">
              <div className="col-8">
                <h2 className="stagename">{creative.stageName}</h2>
                <p className="username">{creative.username}</p>
                <p className="professions">
                  {convertProfessions(creative.professions)}
                </p>
                <p className="skills">{creative.skills}</p>
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
              <></>
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
