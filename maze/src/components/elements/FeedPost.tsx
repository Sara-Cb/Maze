import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { store } from "../../redux/store/store";
import {
  editFeedItem,
  deleteFeedItem,
} from "../../redux/actions/feedItemAction";
import { FeedItem } from "../../types/feedItemType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Profession } from "../../types/creativeType";

const FeedPost = ({
  id,
  collection,
  caption,
  type,
  author,
  createdAt,
}: FeedItem) => {
  const dispatch = store.dispatch;

  const session = useSelector((state: RootState) => state.login.session);

  const [editable, setEditable] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [profs, setProfs] = useState("");

  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const [editFeedItemState, setEditFeedItemState] = useState({
    id,
    author,
    createdAt,
    caption,
    type,
    collection,
  });

  const handleSave = () => {
    dispatch(
      editFeedItem(
        session!.accessToken,
        editFeedItemState.id,
        editFeedItemState
      )
    );
    handleCloseEdit();
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const convertProfessions = () => {
    const professions = author.professions;
    const profArray: string[] = [];
    professions.map((profession: Profession) =>
      profArray.push(Profession[profession as keyof typeof Profession])
    );
    const professionString = profArray.join(", ");
    setProfs(professionString);
  };

  useEffect(() => {
    if (session!.username === author.username) {
      setEditable(true);
    }

    if (caption.length < 200) {
      setExpanded(true);
    }
    convertProfessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="postContainer">
      <Col xs={12}>
        <Row>
          <Col className="postProfile">
            <Link to={`/portfolio/${editable ? "me" : author.username}`}>
              <img
                src={
                  author.image !== null
                    ? author.image
                    : "http://placekitten.com/300"
                }
                alt="Foto profilo"
                className="postProfileImage"
              />
            </Link>
            <div className="postProfileDetails">
              <Link to={`/portfolio/${editable ? "me" : author.username}`}>
                <p className="stagename mazeLink">{author.stageName}</p>
              </Link>
              <p>{profs}</p>
              <p>
                {createdAt?.slice(0, 10)} • {type}
              </p>
            </div>
          </Col>
          <Col xs={2} className="ms-0">
            {editable && (
              <Dropdown>
                <Dropdown.Toggle className="btnDarkM">
                  <i className="bi bi-three-dots"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className="postEditMenu">
                  <Dropdown.Item onClick={handleShowEdit}>
                    <span>Edit </span>
                    <i className="bi bi-pencil"></i>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleShowDelete}>
                    <span>Delete </span>
                    <i className="bi bi-trash"></i>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Modal show={showDelete} onHide={handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title>Sei sicuro di eliminare questo Post?</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowDelete(false)}
                >
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleCloseDelete();
                    dispatch(deleteFeedItem(id!, session!.accessToken));
                  }}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={editFeedItemState.caption}
                    onChange={(e) =>
                      setEditFeedItemState({
                        ...editFeedItemState,
                        caption: e.target.value,
                      })
                    }
                    placeholder="Your caption here..."
                  />
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  disabled={editFeedItemState ? false : true}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row className="postCollection">
          <Col xs={12} sm={7}>
            <p className={expanded ? "expanded" : "collapsed"}>{caption}</p>
            {!expanded && (
              <p className="mazeLink text-center w-100" onClick={toggleExpand}>
                see more
              </p>
            )}
            <Button className="btnDarkM d-none d-sm-block">
              <i className="bi bi-send-fill"></i>
              <span> Share</span>
            </Button>
          </Col>
          <Col
            xs={12}
            sm={4}
            className={
              collection.coverImage === undefined
                ? "d-none"
                : "postCollectionImg mx-auto"
            }
          >
            <Link to={`/collection/${collection.id}`}>
              <img
                className=""
                src={collection.coverImage}
                alt="Collection cover"
              />
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FeedPost;
