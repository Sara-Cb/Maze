import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { resetStoreAction, store } from "../../redux/store/store";
import logoutFetch from "../../redux/actions/logoutAction";

const LogoutButton = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = store.dispatch;

  const handleLogout = () => {
    dispatch(logoutFetch());
    dispatch(resetStoreAction);
    console.log("Logout completed!");
    window.location.href = "/";
    setShowModal(false); // Chiude il modale dopo aver effettuato il logout
  };

  const handleCloseModal = () => {
    setShowModal(false); // Chiude il modale se l'utente clicca "No" o fa clic fuori dal modale
  };

  const handleShowModal = () => {
    setShowModal(true); // Apre il modale quando l'utente clicca sul bottone "Logout"
  };

  return (
    <>
      <p className="btnGreenDark" onClick={handleShowModal}>
        Logout
      </p>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutButton;
