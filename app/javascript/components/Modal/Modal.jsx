import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  image,
  foundElementIds,
  handleChooseElement,
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
      {image?.elements?.map((element) => {
        return (
          <button
            className={
              foundElementIds.includes(element.id)
                ? styles.btnFound
                : styles.btnNotFound
            }
            key={element.id}
            onClick={() => handleChooseElement(element.id)}
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
