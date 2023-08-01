import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalSpan({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <span className={className} onClick={onClick}>{buttonText} <i class="fa-solid fa-trash-can"></i></span>
  );
}

export default OpenModalSpan;
