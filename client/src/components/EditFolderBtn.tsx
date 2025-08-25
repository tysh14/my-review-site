import { useState } from "react";

// COMPONENTS
import FolderForm from "./FolderForm";
import Modal from "react-bootstrap/Modal";

const EditFolderBtn = () => {
  // handles the opening and closing of the Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button" className="btn btn-light" onClick={handleShow}>
        ✎
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FolderForm userActionNo={1} closeModal={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditFolderBtn;
