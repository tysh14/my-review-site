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
  let newRArr: Array<{
    r_id: number;
    review_name: string;
    review_rating: string;
    review_description: string;
    review_img_url: string;
  }> = [];
  const [reviewList, setReviewList] = useState(newRArr);

  let newFArr: Array<{
    f_id: number;
    folder_name: string;
    folder_description: string;
    folder_img_url: string;
  }> = [];
  const [folderList, setFolderList] = useState(newFArr);

  // gets reviews for the current folder from database
  const getData = async () => {
    try {
      const id = currFolderID;
      const response = await fetch(`http://localhost:5000/getreviews/${id}`, {
        method: "GET",
      });
      const jsonData = await response.json();
      setReviewList(jsonData);

      const response2 = await fetch("http://localhost:5000/folders");
      const jsonData2 = await response2.json();

      setFolderList(jsonData2);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeFolder = (newFID: number) => {
    localStorage.setItem("currFolderID", `${newFID}`);
  };

  let folderImg = "";
  let folderTitle = "";
  let folderDesc = "";
  for (let i = 0; i < folderList.length; i++) {
    if (currFolderID === folderList[i].f_id) {
      folderImg = folderList[i].folder_img_url;
      folderTitle = folderList[i].folder_name;
      folderDesc = folderList[i].folder_description;
    }
  }

  return (
    <>
      <nav>
        <a className=" navbar-brand fw-bold fs-3" href="/">
          My Ultimate Review List
        </a>
      </nav>
      <div className="hero hero-df">
        <section className="folder-details">
          <img
            src={folderImg}
            alt="Folder Image"
            className="folder-image"
          ></img>
          <div className="folder-details-text">
            <h1 className="fw-bold">{folderTitle}</h1>
            <p className="fs-5">{folderDesc}</p>
            <p>{`${reviewList.length} reviews`}</p>
          </div>
        </section>
      </div>
      <main>
        <section className="folder-list">
          <ul>
            <li>
              <a href="/" className="fs-6">
                All folders
              </a>
            </li>
            <li>
              <hr />
            </li>
            {folderList.map((folder) => (
              <li className="folder-names fs-6" key={folder.f_id}>
                <a
                  href="/displayfolder"
                  onClick={() => handleChangeFolder(folder.f_id)}
                >
                  {folder.folder_name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <div
          className="row row-cols-1 row-cols-md-4 g-4"
          style={{
            width: "75%",
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
