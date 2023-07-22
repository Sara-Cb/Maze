import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { convertProfessions } from "../../helpers/helpers";
import { useEffect, useState } from "react";
import { createFeedItem } from "../../redux/actions/feedAction";
import { FeedItem } from "../../types/feedType";

const MeSection = () => {
  const navigate = useNavigate();
  const dispatch = store.dispatch;
  const me = useSelector((state: RootState) => state.creative.me!.c!);
  const collections = useSelector(
    (state: RootState) => state.collection.myCollections
  );
  const token = useSelector(
    (state: RootState) => state.login.session!.accessToken
  );

  const maxCaptionLength = 2000;
  const [showPost, setShowPost] = useState(false);
  const [newFeedItem, setNewFeedItem] = useState<FeedItem>({
    author: me,
    caption: "",
    collection: null,
    id: 0,
    createdAt: "",
    type: undefined,
  });

  const handleShowPost = () => setShowPost(true);
  const handleClosePost = () => {
    setShowPost(false);
  };

  const handleChoice = (e: { target: { value: string } }) => {
    const selectedCollection = collections.find(
      (collection) => collection.id === parseInt(e.target.value)
    );
    setNewFeedItem({
      ...newFeedItem,
      collection: selectedCollection || null,
    });
  };

  const handleClick = () => {
    navigate("/portfolio/me");
  };

  const handleSave = () => {
    dispatch(createFeedItem(token, newFeedItem));
    setNewFeedItem({ ...newFeedItem, caption: "", collection: null });
    handleClosePost();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="mirror sectionContainer">
      <Col xs={12} className="justify-content-center">
        <Link to={"/portfolio/me"}>
          <Image src={me!.image} alt="profile pic" />
        </Link>
      </Col>
      <Col xs={12}>
        <Link to={"/portfolio/me"}>
          <p className="myLink">@{me!.username}</p>
        </Link>
      </Col>
      <div className="separator mb-2" />
      <Col xs={12}>
        <Link to={"/portfolio/me"}>
          <h2>{me!.stageName}</h2>
        </Link>
        <p>{convertProfessions(me!.professions)}</p>
        <cite className="testCutter">"{me!.bio}"</cite>
      </Col>
      <div className="separator my-3" />
      <Col xs={12}>
        <Row>
          <Button
            type="button"
            onClick={handleClick}
            className="btnGreenDark w-50 mx-auto"
          >
            Portfolio
          </Button>
        </Row>
        <Row>
          <Button
            type="button"
            onClick={handleShowPost}
            className="btnWhiteM w-50 mx-auto"
          >
            New Post
          </Button>
        </Row>
      </Col>
      <Modal show={showPost} onHide={handleClosePost}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Write something</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={maxCaptionLength}
              value={newFeedItem.caption}
              onChange={(e) =>
                setNewFeedItem({
                  ...newFeedItem,
                  caption: e.target.value,
                })
              }
              placeholder="Your caption here..."
            />
            <p className="small secondary text-end w-100">
              {newFeedItem.caption.length + "/" + maxCaptionLength}
            </p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Choose a collection</Form.Label>
            <Form.Select
              value={newFeedItem.collection ? newFeedItem.collection.id : ""}
              onChange={handleChoice}
            >
              <option value="">Select a collection</option>
              {collections && collections.length > 0 ? (
                collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.title}
                  </option>
                ))
              ) : (
                <option disabled>You still have no collections!</option>
              )}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePost}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={
              newFeedItem.caption !== "" || newFeedItem.collection != null
                ? false
                : true
            }
            onClick={handleSave}
          >
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default MeSection;
