import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { updateCreativeImage } from "../../helpers/fetches";

interface ImageChangerProps {
  show: boolean;
  onHide: () => void;
}

const ImageChanger: React.FC<ImageChangerProps> = ({ show, onHide }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const me = useSelector((state: RootState) => state.creative.me.c);
  const token = useSelector(
    (state: RootState) => state.login.session!.accessToken
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedImage(file);
  };

  const handleSave = () => {
    if (selectedImage) {
      updateCreativeImage(token, me!.username, selectedImage);
    }
    onHide();
  };
  const handleRemove = () => {
    updateCreativeImage(token, me!.username, null);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Profile Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="centeringDiv mb-2">
          <p>Current Picture</p>
          <img src={me?.image} alt="current pic" width={180} />
        </div>
        <Form>
          <Form.Group controlId="profileImage">
            <Form.Label>Choose an image:</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btnLight" onClick={onHide}>
          Close
        </Button>
        <Button className="btnDark" onClick={handleRemove}>
          Remove
        </Button>
        <Button
          className="btnGreen"
          onClick={handleSave}
          disabled={selectedImage === null}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageChanger;
