import React from "react";

interface Props {
  reviewList: Array<{
    r_id: number;
    review_name: string;
    review_rating: string;
    review_description: string;
    review_img_url: string;
  }>;
  folderList: Array<{
    f_id: number;
    folder_name: string;
    folder_description: string;
    folder_img_url: string;
  }>;
}

const DisplayFolderDetails = ({ reviewList, folderList }: Props) => {
  const currFolderID = Number(localStorage.getItem("currFolderID"));
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
    <section className="folder-details">
      <img src={folderImg} alt="Folder Image" className="folder-image"></img>
      <div className="folder-details-text">
        <div className="folder-title-ctn">
          <h1 className="fw-bold">{folderTitle}</h1>
          <button type="button" className="settings-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
          </button>
        </div>
        <p className="fs-5">{folderDesc}</p>
        <p>{`${reviewList.length} reviews`}</p>
      </div>
    </section>
  );
};

export default DisplayFolderDetails;
