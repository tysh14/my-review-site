import { useState, useEffect, createContext } from "react";

// components/assets
import AddReviewBtn from "../components/AddReviewBtn";
import defaultImg from "../assets/Image-not-found.jpg";
import ReviewCard from "../components/ReviewCard";

// context to use when editing a review
export const ReviewEditContext = createContext({
  id: Number(""),
  title: "",
  rating: Number(""),
  desc: "",
  img: "",
  folderID: Number(""),
});

// context to use when adding a review
export const ReviewAddContext = createContext({
  id: Number(""),
  title: "",
  rating: Number(""),
  desc: "",
  img: "",
  folderID: Number(""),
});

const DisplayFolder = () => {
  const currFolderID = Number(localStorage.getItem("currFolderID"));
  let myArr: Array<{
    r_id: number;
    review_name: string;
    review_rating: string;
    review_description: string;
    review_img_url: string;
  }> = [];
  const [reviewList, setReviewList] = useState(myArr);

  // gets reviews for the current folder from database
  const getReviews = async () => {
    try {
      const id = currFolderID;
      const response = await fetch(`http://localhost:5000/getreviews/${id}`, {
        method: "GET",
      });
      const jsonData = await response.json();
      setReviewList(jsonData);
    } catch (error) {
      console.log("Error fetching image:", error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <nav>
        <a className=" navbar-brand fw-bold fs-3" href="#">
          My Ultimate Review List
        </a>
      </nav>
      <div className="hero"></div>
      <main>
        <section>
          <ul>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
          </ul>
        </section>
        <div
          className="row row-cols-1 row-cols-md-5 g-4"
          style={{
            maxWidth: "1550px",
          }}
        >
          {reviewList.map((review) => (
            <ReviewEditContext.Provider
              key={review.r_id}
              value={{
                id: review.r_id,
                title: review.review_name,
                rating: Number(review.review_rating),
                desc: review.review_description,
                img: `${
                  review.review_img_url ? review.review_img_url : defaultImg
                }`,
                folderID: currFolderID,
              }}
            >
              <ReviewCard />
            </ReviewEditContext.Provider>
          ))}
          <div className="col">
            <ReviewAddContext.Provider
              value={{
                id: Number(""),
                title: "",
                rating: 5,
                desc: "",
                img: "",
                folderID: currFolderID,
              }}
            >
              <AddReviewBtn />
            </ReviewAddContext.Provider>
          </div>
        </div>
      </main>
    </>
  );
};

export default DisplayFolder;
