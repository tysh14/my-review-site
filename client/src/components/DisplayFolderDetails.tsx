import { useContext } from "react";

// components/context
import SettingsBtn from "./SettingsBtn";
import { FolderContext } from "../pages/DisplayFolder";

interface Props {
  reviewList: Array<{
    r_id: number;
    review_name: string;
    review_rating: string;
    review_description: string;
    review_img_url: string;
  }>;
}

const DisplayFolderDetails = ({ reviewList }: Props) => {
  const folderContext = useContext(FolderContext);

  return (
    <section className="folder-details">
      <img
        src={folderContext.img}
        alt="Folder Image"
        className="folder-image"
      ></img>
      <div className="folder-details-text">
        <div className="folder-title-ctn">
          <h1 className="fw-bold">{folderContext.title}</h1>
          <SettingsBtn />
        </div>
        <p className="fs-5">{folderContext.desc}</p>
        <p>{`${reviewList.length} reviews`}</p>
      </div>
    </section>
  );
};

export default DisplayFolderDetails;
