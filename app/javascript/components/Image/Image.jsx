import React, { useState, useRef } from "react";
import styles from "./Image.module.css";
import Modal from "../Modal/Modal.jsx";

export default function Image() {
  const initialData = {
    id: 0,
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
      {
        name: "Woof",
        x1: 1160,
        y1: 388,
        x2: 1182,
        y2: 402,
        found: false,
      },
      {
        name: "Wenda",
        x1: 878,
        y1: 746,
        x2: 906,
        y2: 793,
        found: false,
      },
      {
        name: "Wizard Whitebeard",
        x1: 1327,
        y1: 955,
        x2: 1376,
        y2: 999,
        found: false,
      },
      {
        name: "Odlaw",
        x1: 1174,
        y1: 1190,
        x2: 1217,
        y2: 1236,
        found: false,
      },
    ],
  };
  const [imageData, setImageData] = useState(initialData);
  const [isModalOpen, setModalOpen] = useState(false);
  const coordinatesRef = useRef(null);

  const imageSrc = "/images/ww-1-1.jpeg";

  function targetWasClicked(index) {
    // Check if the coordinates are inside the image's bounding coordinates.
    if (
      coordinatesRef.current.x > imageData.elements[index].x1 &&
      coordinatesRef.current.y > imageData.elements[index].y1 &&
      coordinatesRef.current.x < imageData.elements[index].x2 &&
      coordinatesRef.current.y < imageData.elements[index].y2
    ) {
      console.log(imageData.elements[index].name);
      return true;
    } else return false;
  }

  function handleClickImage(event) {
    coordinatesRef.current = getNormalizedCoordinates(event);
    setModalOpen(true);
    // wasTargetClicked(event, 0); - move this to a handler passed to the modal.
  }

  function handleClickModal(index) {
    setModalOpen(false);
    if (targetWasClicked(index)) {
      const nextImageData = { ...imageData };
      imageData.elements[index].found = true;
      setImageData(nextImageData);
    }
  }

  function getNormalizedCoordinates(event) {
    // Get the location of the image on the page
    const rect = event.target.getBoundingClientRect();
    // Normalize the click coordinates relative to the original image size, and compensate for any margin on the image.
    return {
      x: (event.clientX * imageData.width) / rect.width - rect.x,
      y: (event.clientY * imageData.height) / rect.height - rect.y,
    };
  }

  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.image}
          src={imageSrc}
          alt="Where's Waldo Book 1 Scene 1"
          onClick={(event) => {
            handleClickImage(event);
          }}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        imageData={imageData}
        handleClickModal={handleClickModal}
      />
    </>
  );
}
