import { useState, useContext } from "react";

// components/assets
import defaultImg from "../assets/Image-not-found.jpg";
import ViewReviewBtn from "./ViewReviewBtn";
import { ReviewEditContext } from "../pages/DisplayFolder";

const ReviewCard = () => {
  const { id, title, rating, desc, img, folderID } =
    useContext(ReviewEditContext);

  const [currImgURL, setImgURL] = useState(img);

  // handles error with <img>, if URL provided by user isn't an image address URL
  const handleImgError = async () => {
    setImgURL(defaultImg);
    const newImageURL = "";

    //updates database so review card uses the default image
    try {
      const body = { id, newImageURL };
      const response = await fetch(`http://localhost:5000/reviewsimg/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div className="col">
      <div className="card" style={{ width: "20rem", height: "23rem" }}>
        <img
          src={currImgURL}
          className="card-img-top"
          alt="beach"
          style={{ objectFit: "cover", height: "220px" }}
          onError={handleImgError}
        />
        <div className="card-body">
          <h5
            className="card-title"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {title}
          </h5>
          <p style={{ width: "100%" }} className="card-text fs-5">
            {rating + " ★"}
          </p>
          <ViewReviewBtn />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
