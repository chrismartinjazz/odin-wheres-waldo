import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  imageData,
  handleClickModal,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isOpen]);

  function handleCloseModal() {
    if (onClose) {
      onClose();
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className={`${styles.modal}`}
    >
      {imageData.elements.map((element, id) => {
        return (
          <button
            className={element.found ? styles.btnFound : styles.btnNotFound}
            key={element.name}
            onClick={() => handleClickModal(id)}
          >
            {element.name}
          </button>
        );
      })}
      <button className={styles.modalCloseBtn} onClick={handleCloseModal}>
        Cancel
      </button>
    </dialog>
  );
}
