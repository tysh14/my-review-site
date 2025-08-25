import { useState, useContext } from "react";

// components
import EditBtn from "./EditBtn";
import Modal from "react-bootstrap/Modal";
import { ReviewEditContext } from "../pages/DisplayFolder";

const ViewReviewBtn = () => {
  const { id, title, rating, desc, img, folderID } =
    useContext(ReviewEditContext);

  // handles openign and closing of the Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteReview = async () => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }

    handleClose();
    window.location.href = "/displayfolder";
  };

  return (
    <>
      <button type="button" className="btn btn-light" onClick={handleShow}>
        View Review
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {title} <span className="fs-5">{rating} ★</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {desc ? <p>{desc}</p> : <p className="fst-italic">No description.</p>}
          <EditBtn closeOtherModal={handleClose} />
          <button
            type="button"
            className="btn btn-light"
            onClick={handleDeleteReview}
          >
            🗑
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewReviewBtn;
