import { Col, Container, Row } from "react-bootstrap";
import { Collection } from "../../types/collectionType";
import { Link } from "react-router-dom";
import { formatCAPS, formatTime } from "../../helpers/helpers";

interface CollectionDisplayerProps {
  collection: Collection;
  location: string;
}

const CollectionDisplayer = ({
  collection,
  location,
}: CollectionDisplayerProps) => {
  let id = collection.id;
  let author = collection.author;
  let title = collection.title;
  let description = collection.description;
  let category = collection.category;
  let coverImage = collection.coverImage;
  //let elaborates = collection.elaborates;
  //let keywords = collection.keywords;
  //let singleElement = collection.singleElement;
  //let createdAt = collection.createdAt;
  //let updatedAt = collection.updatedAt;

  return (
    <>
      {location === "post" && (
        <Row className="collectionDisplayer px-1 my-2">
          <Col
            xs={8}
            className="text-end d-flex flex-column justify-content-between"
          >
            <div>
              <Link to={`/portfolio/${author}/collections/${id}`}>
                <h4>{title}</h4>
              </Link>
              <blockquote
                className={
                  description ? "d-block textCutter" : "d-none textCutter"
                }
              >
                <cite>"{description}"</cite>
              </blockquote>
            </div>
            <small>
              Category: <span className="emptyDarkBtn">{category}</span>
            </small>
          </Col>
          <Col
            xs={4}
            className={coverImage === null ? "d-none" : "postCollectionImg"}
          >
            <Link to={`/portfolio/${author}/collections/${id}`}>
              <img className="" src={coverImage} alt="Collection cover" />
            </Link>
          </Col>
        </Row>
      )}
      {location === "portfolio" && (
        <Col className="collectionDisplayer collectionCard">
          <Row>
            <Link to={`/portfolio/${author}/collections/${id}`}>
              <Container fluid className="cardImage">
                <img src={collection.coverImage} alt="cover " />
                <div className="cardText">
                  {!collection.updatedAt ? (
                    <p>created {formatTime(collection.createdAt)} ago</p>
                  ) : (
                    <p>last updated {formatTime(collection.updatedAt)} ago</p>
                  )}
                  <h4>{collection.title}</h4>
                  <span className="emptyBtn small">
                    {formatCAPS(collection.category)}
                  </span>
                </div>
              </Container>
            </Link>
          </Row>
        </Col>
      )}
    </>
  );
};

export default CollectionDisplayer;
