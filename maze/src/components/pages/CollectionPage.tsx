import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Collection } from "../../types/collectionType";
import { Link, useParams } from "react-router-dom";
import { RootState, store } from "../../redux/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCollection } from "../../redux/actions/collectionAction";
import ElaborateDisplayer from "../elements/ElaborateDisplayer";
import { formatDate, formatTime } from "../../helpers/helpers";

const CollectionPage = () => {
  const dispatch = store.dispatch;
  const param = useParams().id;

  const id: number | undefined = parseInt(param!);

  const visitedCollection = useSelector((state: RootState) => state.collection);

  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCollection = async (id: number) => {
    await dispatch(getCollection(id));
  };

  useEffect(() => {
    setLoading(true);
    loadCollection(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (visitedCollection.loading) {
      setLoading(true);
    } else {
      setCollection(visitedCollection.collection);
      setLoading(false);
    }
  }, [visitedCollection.loading, visitedCollection.collection]);

  return (
    <Container fluid className="pageContainer">
      {!loading && collection ? (
        <Container className="p-0 collectionHero">
          <Row className="mx-4">
            <Col xs={12} className="order-1 mb-4">
              <Row className="mx-0">
                <Col xs={9}>
                  <h2 className="fw-bold fs-1 mint">{collection.title}</h2>
                  <h5 className="fw-normal mint">
                    by:{" "}
                    <Link
                      to={`/portfolio/${collection.author}`}
                      className="mazelink"
                    >
                      {collection.author}
                    </Link>
                  </h5>
                </Col>
                <Col xs={3} className="ms-auto text-end ms-md-0 pe-0">
                  <img
                    src={collection.coverImage}
                    alt={collection.title}
                    width={100}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={3} className="text-end order-2 order-md-3">
              <p className="small">
                <p className="mb-0">{formatDate(collection.createdAt)}</p>
                <span className="small">
                  Last update:{" "}
                  {collection.updatedAt
                    ? formatTime(collection.updatedAt)
                    : formatTime(collection.createdAt)}{" "}
                  ago
                </span>
              </p>
            </Col>
            <Col xs={12} md={9} className="order-3 order-md-2">
              <blockquote className="text-center text-md-start ms-md-3">
                <cite className="mb-0">"{collection.description}"</cite>
              </blockquote>
            </Col>
            <Col xs={12} className="order-last">
              {collection.elaborates.length > 0 ? (
                <ElaborateDisplayer elaborates={collection.elaborates} />
              ) : (
                <>
                  <p className="mazelink green">Add Elaborates</p>
                  <p className="mazelink green">Add Elaborates</p>
                </>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default CollectionPage;
