import React, { useState } from "react";
import styles from "./Image.module.css";

export default function Image() {
  const initialData = {
    index: 1,
    width: 2040,
    height: 1260,
    elements: [
      {
        name: "Waldo",
        x1: 858,
        y1: 925,
        x2: 922,
        y2: 1029,
        found: false,
      },
    ],
  };
  const [imageData, setImageData] = useState(initialData);

  const imageSrc = "/images/ww-1-1.jpeg";

  function logClickCoordinates(event) {
    // Get the location of the image on the page
    const rect = event.target.getBoundingClientRect();
    // Normalize the click coordinates relative to the original image size, and compensate for any margin on the image.
    const normalized = {
      x: (event.clientX * imageData.width) / rect.width - rect.x,
      y: (event.clientY * imageData.height) / rect.height - rect.y,
    };
    if (
      normalized.x > imageData.elements[0].x1 &&
      normalized.y > imageData.elements[0].y1 &&
      normalized.x < imageData.elements[0].x2 &&
      normalized.y < imageData.elements[0].y2
    ) {
      console.log("Wally");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.image}
          src={imageSrc}
          alt="Where's Waldo Book 1 Scene 1"
          onClick={(e) => {
            logClickCoordinates(e);
          }}
        />
      </div>
    </>
  );
}
