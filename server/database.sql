CREATE DATABASE myReviewSite;

CREATE TABLE folders(
    f_id SERIAL PRIMARY KEY,
    folder_name VARCHAR(255),
    folder_description VARCHAR(255),
    folder_img_url VARCHAR(255)
);

CREATE TABLE reviews(
    r_id SERIAL PRIMARY KEY,
    review_name VARCHAR(255),
    review_rating INT,
    review_description VARCHAR(255),
    review_img_url VARCHAR(255),
    folder_id INT REFERENCES folders (f_id)
);