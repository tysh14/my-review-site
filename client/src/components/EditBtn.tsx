import { useState } from "react";

// components
import ReviewForm from "./ReviewForm";
import Modal from "react-bootstrap/Modal";

interface Props {
  closeOtherModal: () => void;
}

const EditBtn = ({ closeOtherModal }: Props) => {
  //handles closing and opening of the Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // closes this and the previous Modal after form is submitted
  const closeAllModals = () => {
    handleClose();
    closeOtherModal();
  };

  return (
    <>
      <button type="button" className="btn btn-light" onClick={handleShow}>
        Edit
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
          <ReviewForm closeModal={closeAllModals} userActionNo={1} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditBtn;
