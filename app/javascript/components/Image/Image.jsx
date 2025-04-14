import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Image.module.css";
import Modal from "../Modal/Modal.jsx";
import ModalGameOver from "../ModalGameOver/ModalGameOver.jsx";
import Timer from "../Timer/Timer.jsx";

export default function Image() {
  const params = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState({ image: "" });
  const [score, setScore] = useState(null);
  const [foundElementIds, setFoundElementIds] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalGameOverOpen, setModalGameOverOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const coordinatesRef = useRef(null);

  // Get the image data from the database
  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "Network response was not ok. Failed to get image data."
        );
      })
      .then((response) => setImage(response))
      .catch(() => navigate("/images"));
  }, [params.id]);

  // Add a new (blank) score to the database and store its id, then start the timer
  useEffect(() => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url = `/api/v1/scores`;
    const header = {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: params.id }),
    };

    fetch(url, header)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok. Failed to create score.");
      })
      .then((response) => {
        console.log(response);
        setScore(response);
        setTimerRunning(true);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  // When the user clicks the image, update the latest clicked coordinates and
  // open the modal to select an element.
  function handleClickImage(event) {
    coordinatesRef.current = getNormalizedCoordinates(event);
    setModalOpen(true);
  }

  function getNormalizedCoordinates(event) {
    // Get the location of the image on the page
    const rect = event.target.getBoundingClientRect();
    // Normalize the click coordinates relative to the original image size,
    // compensating for any margin on the image.
    return {
      x: (event.clientX * image.width) / rect.width - rect.x,
      y: (event.clientY * image.height) / rect.height - rect.y,
    };
  }

  // When the user has chosen an element, close the modal, and check the
  // coordinates with the database
  function handleChooseElement(id) {
    setModalOpen(false);
    checkCoordinates(id, coordinatesRef.current.x, coordinatesRef.current.y);
  }

  // Check if the normalized click coordinates are within the bounding box of
  // the element in the database. Add its id to foundElementIds if it is
  // correct, and the id is not already found.
  function checkCoordinates(id, x, y) {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const body = JSON.stringify({ id, x, y });

    const url = "/api/v1/elements/check";
    const header = {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: body,
    };

    fetch(url, header)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "Network response was not ok. Failed to check element's location."
        );
      })
      .then((response) => {
        if (!foundElementIds.includes(id) && response.found) {
          const nextFoundElementIds = [...foundElementIds, id];
          setFoundElementIds(nextFoundElementIds);
          if (nextFoundElementIds.length >= image.elements.length)
            handleGameOver();
        }
      })
      .catch((error) => console.log(error));
  }

  function handleGameOver() {
    setTimerRunning(false);

    // Update the score in the database and component.
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const id = score.id;
    const url = `/api/v1/scores/${id}`;
    const body = JSON.stringify({ id: score.id });
    const header = {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: body,
    };

    fetch(url, header)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok. Failed to update score.");
      })
      .then((response) => {
        setScore(response);
        setModalGameOverOpen(true);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.image}
          src={image.src}
          alt={image.name}
          onClick={(event) => {
            handleClickImage(event);
          }}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        image={image}
        foundElementIds={foundElementIds}
        handleChooseElement={handleChooseElement}
      />
      <ModalGameOver
        isOpen={isModalGameOverOpen}
        onClose={() => setModalGameOverOpen(false)}
        score={score}
      />
      <Timer timerRunning={timerRunning} />
      <div>Score ID: {score ? score.id : "Loading..."}</div>
      <div>Elements found: {foundElementIds.length}</div>
      <div>Total Elements: {image?.elements?.length}</div>
    </>
  );
}
