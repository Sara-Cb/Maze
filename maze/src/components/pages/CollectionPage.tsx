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
  const session = useSelector((state: RootState) => state.login.session);

  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);

  const loadCollection = async (id: number) => {
    await dispatch(getCollection(id));
    if (visitedCollection.collection.author === session?.username) {
      setEditable(true);
    } else {
      setEditable(false);
    }
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
            <Col xs={12}>
              <Row className="mx-0">
                <Col xs={12} className=" mb-2">
                  <Row className="mx-0">
                    <Col xs={9}>
                      <h2 className="fw-bold fs-1 green">{collection.title}</h2>
                      <h5 className="fw-normal green">
                        by:{" "}
                        <Link
                          to={`/portfolio/${collection.author}`}
                          className="mazelink"
                        >
                          {collection.author}
                        </Link>
                      </h5>
                      <p className="green">
                        category:
                        <span className="mazelink green">
                          {" "}
                          {collection.category}
                        </span>
                      </p>
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
                <Col xs={9} className="mt-0">
                  <blockquote className="ms-3">
                    <cite className="mb-0">"{collection.description}"</cite>
                  </blockquote>
                </Col>
                <Col xs={3} className="text-end ">
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
              </Row>
            </Col>
            <Col xs={12} className="d-flex flex-column align-items-center">
              {collection.elaborates.length > 0 ? (
                <ElaborateDisplayer elaborates={collection.elaborates} />
              ) : (
                <p className="text-center fw-bold mt-3">
                  Still no elaborates in this collection.
                </p>
              )}{" "}
              {editable && (
                <span className="emptyBtn green">Add Elaborates</span>
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
