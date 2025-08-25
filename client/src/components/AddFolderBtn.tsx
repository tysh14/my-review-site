import { useState } from "react";

// COMPONENTS
import Modal from "react-bootstrap/Modal";
import FolderForm from "./FolderForm";

function AddFolderBtn() {
  // handles the opening and closing of the Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary"
        style={{
          width: "540px",
          height: "176px",
          fontSize: "80px",
        }}
        onClick={handleShow}
      >
        +
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Let's make a new folder!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FolderForm closeModal={handleClose} userActionNo={0} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddFolderBtn;
