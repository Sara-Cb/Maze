import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "react-bootstrap";
import { store } from "../../redux/store/store";
import { editFeedItem, deleteFeedItem } from "../../redux/actions/feedAction";
import { FeedItem } from "../../types/feedType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { convertProfessions } from "../../helpers/helpers";
import CollectionDisplayer from "./CollectionDisplayer";

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

  const maxCaptionLength = 2000;
  const [editFeedItemState, setEditFeedItemState] = useState({
    id: id,
    author: author,
    createdAt: createdAt,
    caption: caption,
    type: type,
    collection: collection,
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

  useEffect(() => {
    if (session!.username === author.username) {
      setEditable(true);
    }

    if (caption && caption.length < 200) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
    setProfs(convertProfessions(author.professions));
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
                <Modal.Title>Sure?</Modal.Title>
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
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    maxLength={maxCaptionLength}
                    value={
                      editFeedItemState.caption ? editFeedItemState.caption : ""
                    }
                    onChange={(e) =>
                      setEditFeedItemState({
                        ...editFeedItemState,
                        caption: e.target.value,
                      })
                    }
                    placeholder="Your caption here..."
                  />
                  <p className="small secondary text-end w-100">
                    {editFeedItemState.caption.length + "/" + maxCaptionLength}
                  </p>
                </Form.Group>
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
        <Row className="my-2">
          <Col xs={12} className="postCaption">
            <p className={expanded ? "expanded" : "collapsed"}>{caption}</p>
            {!expanded && (
              <span
                className="mazelink d-block w-100 text-end pe-1"
                onClick={toggleExpand}
              >
                ...read more
              </span>
            )}
          </Col>
        </Row>
        {collection != null && (
          <Row className="postCollection">
            <CollectionDisplayer collection={collection} location={"post"} />
          </Row>
        )}
        <Row>
          <Col xs={12}>
            <Button className="btnDarkM w-25">
              <i className="bi bi-send-fill"></i>
              <span> Share</span>
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FeedPost;
