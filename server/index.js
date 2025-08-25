const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//FOLDER ROUTES

//create a folder

app.post("/myfolders", async (req, res) => {
  try {
    const { newFolderTitle, newFolderDesc, newImageURL } = req.body;
    const newFolder = await pool.query(
      "INSERT INTO folders (folder_name, folder_description, folder_img_url) VALUES($1, $2, $3) RETURNING *",
      [newFolderTitle, newFolderDesc, newImageURL]
    );

    res.json(newFolder.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all folders

app.get("/folders", async (req, res) => {
  try {
    const allFolders = await pool.query("SELECT * FROM folders");
    res.json(allFolders.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//update a folder

app.put("/folders/:id", async (req, res) => {
  try {
    const { id, newFolderTitle, newFolderDesc, newImageURL } = req.body;
    const updateFolder = await pool.query(
      "UPDATE folders SET folder_name = $1, folder_description = $2, folder_img_url = $3 WHERE f_id = $4",
      [newFolderTitle, newFolderDesc, newImageURL, id]
    );
    res.json("Folder was updated");
  } catch (error) {
    console.error(error.message);
  }
});

//update folder image

app.put("/foldersimg/:id", async (req, res) => {
  try {
    const { id, newImageURL } = req.body;
    const updateFolder = await pool.query(
      "UPDATE folders SET folder_img_url = $1 WHERE f_id = $2",
      [newImageURL, id]
    );
    res.json("Folder was updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a folder

app.delete("/folders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFolder = await pool.query(
      "DELETE FROM folders WHERE f_id = $1",
      [id]
    );

    res.json("Folder was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

// REVIEW ROUTES

//create a review

app.post("/myreviews", async (req, res) => {
  try {
    const {
      newReviewTitle,
      newReviewRating,
      newReviewDesc,
      newReviewURL,
      folderID,
    } = req.body;
    const newReview = await pool.query(
      "INSERT INTO reviews (review_name, review_rating, review_description, review_img_url, folder_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [newReviewTitle, newReviewRating, newReviewDesc, newReviewURL, folderID]
    );

    res.json(newReview.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get the reviews

app.get("/getreviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allReviews = await pool.query(
      "SELECT * FROM reviews WHERE folder_id = $1",
      [id]
    );

    res.json(allReviews.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//update a review

app.put("/myreviews/:id", async (req, res) => {
  try {
    const { id, newReviewTitle, newReviewRating, newReviewDesc, newReviewURL } =
      req.body;
    const updateReview = await pool.query(
      "UPDATE reviews SET review_name = $1, review_rating = $2, review_description = $3, review_img_url = $4 WHERE r_id = $5",
      [newReviewTitle, newReviewRating, newReviewDesc, newReviewURL, id]
    );
    res.json("Review was updated");
  } catch (error) {
    console.error(error.message);
  }
});

//update review image
app.put("/reviewsimg/:id", async (req, res) => {
  try {
    const { id, newImageURL } = req.body;
    const updateFolder = await pool.query(
      "UPDATE reviews SET review_img_url = $1 WHERE r_id = $2",
      [newImageURL, id]
    );
    res.json("Review was updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a review

app.delete("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReview = await pool.query(
      "DELETE FROM reviews WHERE r_id = $1",
      [id]
    );

    res.json("Folder was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
