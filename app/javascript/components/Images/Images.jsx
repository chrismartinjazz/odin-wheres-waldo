import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Images.module.css";

export default function Images() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const url = "/api/v1/images/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setImages(response))
      .catch(() => navigate("/"));
  }, []);

  return (
    <>
      <h1 className={styles.header}>Where's Waldo TM?</h1>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.src}
            alt={`${image.title}`}
            className={styles.image}
          />
          <Link to={`/image/${image.id}`}>Play</Link>
        </div>
      ))}
    </>
  );
}
