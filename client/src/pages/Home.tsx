import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTS/ASSETS
import AddFolderBtn from "../components/AddFolderBtn";
import FolderCard from "../components/FolderCard";
import defaultImg from "../assets/Image-not-found.jpg";

// context to pass on folder details
export const FolderContext = createContext({
  id: Number(""),
  title: "",
  desc: "",
  img: "",
});

function Home() {
  let myArr: Array<{
    f_id: number;
    folder_name: string;
    folder_description: string;
    folder_img_url: string;
  }> = [];
  const [folderList, setFolderList] = useState(myArr);

  // gets folders from database
  const getFolders = async () => {
    try {
      const response = await fetch("http://localhost:5000/folders");
      const jsonData = await response.json();

      setFolderList(jsonData);
    } catch (error) {
      console.log("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    getFolders();
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/displayfolder`;
    navigate(path);
  };

  // route change to open a folder
  const handleFolderOpen = (f_id: number) => {
    localStorage.setItem("currFolderID", `${f_id}`);
    routeChange();
  };

  return (
    <>
      <h1 className="text-center">My Reviews</h1>
      <div
        className="row row-cols-1 row-cols-md-2 g-4"
        style={{
          maxWidth: "1150px",
          margin: "auto",
        }}
      >
        {folderList.map((folder) => (
          <FolderContext.Provider
            key={folder.f_id}
            value={{
              id: folder.f_id,
              title: folder.folder_name,
              desc: folder.folder_description,
              img: `${
                folder.folder_img_url ? folder.folder_img_url : defaultImg
              }`,
            }}
          >
            <FolderCard openFolder={handleFolderOpen} />
          </FolderContext.Provider>
        ))}
        <div className="col">
          <AddFolderBtn />
        </div>
      </div>
    </>
  );
}

export default Home;
