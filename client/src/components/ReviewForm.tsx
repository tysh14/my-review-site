import { useState, useContext, FormEvent } from "react";

// contexts
import { ReviewEditContext } from "../pages/DisplayFolder";
import { ReviewAddContext } from "../pages/DisplayFolder";

interface Props {
  userActionNo: number; // 0 = Add, 1 = Edit
  closeModal: () => void;
}

const ReviewForm = ({ userActionNo, closeModal }: Props) => {
  let currentContext = useContext(ReviewAddContext);

  // changes context if the user is trying to edit a review, instead of add
  if (userActionNo === 1) {
    currentContext = useContext(ReviewEditContext);
  }

  const { id, title, rating, desc, img, folderID } = currentContext;
  const [value, changeValue] = useState(rating);

  // when form is submitted
  const onSubmitClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // accesses data from submitted form
    const form = event.currentTarget;
    const formData = new FormData(form);

    const newReviewTitle = String(formData.get("reviewTitle"));
    const newReviewDesc = String(formData.get("reviewDesc"));
    let newReviewURL = String(formData.get("reviewImg"));
    const newReviewRating = String(formData.get("rating"));

    userActionNo === 0
      ? addReview(newReviewTitle, newReviewDesc, newReviewURL, newReviewRating)
      : editReview(
          newReviewTitle,
          newReviewDesc,
          newReviewURL,
          newReviewRating
        );

    window.location.href = "/displayfolder";
    closeModal();
  };

  // adds the new review to the database
  const addReview = async (
    newReviewTitle: string,
    newReviewDesc: string,
    newReviewURL: string,
    newReviewRating: string
  ) => {
    try {
      const body = {
        newReviewTitle,
        newReviewRating,
        newReviewDesc,
        newReviewURL,
        folderID,
      };
      const response = await fetch("http://localhost:5000/myreviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // updates review record in the database
  const editReview = async (
    newReviewTitle: string,
    newReviewDesc: string,
    newReviewURL: string,
    newReviewRating: string
  ) => {
    try {
      const body = {
        id,
        newReviewTitle,
        newReviewRating,
        newReviewDesc,
        newReviewURL,
      };
      const response = await fetch(`http://localhost:5000/myreviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  return (
    <form method="post" onSubmit={onSubmitClick}>
      <div className=" mb-3">
        <label htmlFor="inputTitle" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTitle"
          name="reviewTitle"
          defaultValue={title}
          required
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label htmlFor="customRange4" className="form-label">
          Rating out of 10 ★
        </label>
        <label htmlFor="customRange4" className="form-label">
          {value + " ★"}
        </label>
      </div>

      <input
        type="range"
        className="form-range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => changeValue(Number(e.target.value))}
        id="customRange4"
        name="rating"
      />

      <div className="mb-3">
        <label htmlFor="inputDescription" className="form-label">
          Review
        </label>
        <textarea
          className="form-control"
          aria-label="With textarea"
          name="reviewDesc"
          id="inputDescription"
          defaultValue={desc}
        />
        <div className="form-text" id="basic-addon4">
          Optional
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="inputImg" className="form-label">
          Image URL
        </label>
        <input
          type="url"
          className="form-control"
          id="inputImg"
          name="reviewImg"
          defaultValue={img === "/src/assets/Image-not-found.jpg" ? "" : img}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );
};

export default ReviewForm;
