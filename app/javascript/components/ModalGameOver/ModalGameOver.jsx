import React, { useState, useEffect, useRef } from "react";

export default function ModalForm({ isOpen, onClose, scoreId }) {
  const [name, setName] = useState("Anonymous");
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
    <dialog ref={modalRef} onKeyDown={handleKeyDown}>
      Test
      <button onClick={handleCloseModal}>Cancel</button>
    </dialog>
  );
}
