import { useState, useContext } from "react";

// COMPONENTS/ ASSETS
import defaultImg from "../assets/Image-not-found.jpg";
import { FolderContext } from "../pages/Home";

interface Props {
  openFolder: (arg0: number) => void;
}

const FolderCard = ({ openFolder }: Props) => {
  const { id, title, desc, img } = useContext(FolderContext);

  const [currImgURL, setImgURL] = useState(img);

  // handles error with <img>, if URL provided by user isn't an image address URL
  const handleImgError = async () => {
    setImgURL(defaultImg);
    const newImageURL = "";

    //updates database so folder card uses the default image
    try {
      const body = { id, newImageURL };
      const response = await fetch(`http://localhost:5000/foldersimg/${id}`, {
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
      <div className="card mb-3" style={{ maxWidth: "540px", height: "176px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={currImgURL}
              className="img-fluid rounded-start"
              alt="Folder Image"
              style={{ objectFit: "cover", height: "174px", width: "180px" }}
              onError={handleImgError}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title" onClick={() => openFolder(id)}>
                {title}
              </h5>
              <p className="card-text">{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
