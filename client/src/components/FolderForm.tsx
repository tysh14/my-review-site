import { FormEvent, useContext } from "react";

// components
import { FolderContext } from "../pages/Home";

interface Props {
  userActionNo: number; // 0 = Add, 1 = Edit
  closeModal: () => void;
}

const FolderForm = ({ closeModal, userActionNo }: Props) => {
  // folder details from context
  const { id, title, desc, img } = useContext(FolderContext);

  // when form is submitted
  const onSubmitClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // accesses data from submitted form
    const form = event.currentTarget;
    const formData = new FormData(form);

    const newFolderTitle = String(formData.get("folderTitle"));
    const newFolderDesc = String(formData.get("folderDesc"));
    let newImageURL = String(formData.get("folderImg"));

    userActionNo === 0
      ? addFolder(newFolderTitle, newFolderDesc, newImageURL)
      : editFolder(newFolderTitle, newFolderDesc, newImageURL);

    window.location.href = "/";
    closeModal();
  };

  // adds the new folder to the database
  const addFolder = async (
    newFolderTitle: string,
    newFolderDesc: string,
    newImageURL: string
  ) => {
    try {
      const body = { id, newFolderTitle, newFolderDesc, newImageURL };
      const response = await fetch("http://localhost:5000/myfolders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  // updates folder record in the database
  const editFolder = async (
    newFolderTitle: string,
    newFolderDesc: string,
    newImageURL: string
  ) => {
    try {
      const body = { id, newFolderTitle, newFolderDesc, newImageURL };
      const response = await fetch(`http://localhost:5000/folders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
    } catch (error) {
      console.error("Error editing folder:", error);
    }
  };

  return (
    <form onSubmit={onSubmitClick}>
      <div className="mb-3">
        <label htmlFor="inputTitle" className="form-label">
          Folder Title
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTitle"
          name="folderTitle"
          defaultValue={title}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputDescription" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          aria-label="With textarea"
          name="folderDesc"
          id="inputDescription"
          defaultValue={desc}
        ></textarea>
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
          name="folderImg"
          defaultValue={img === "/src/assets/Image-not-found.jpg" ? "" : img}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );
};

export default FolderForm;
