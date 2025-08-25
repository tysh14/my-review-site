import { useState } from "react";

// components
import Modal from "react-bootstrap/Modal";
import ReviewForm from "./ReviewForm";

//context for adding a review

function AddReviewBtn() {
  //handles opening and closing of Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary"
        style={{
          width: "18rem",
          height: "325px",
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
          <Modal.Title>New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReviewForm closeModal={handleClose} userActionNo={0} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddReviewBtn;
