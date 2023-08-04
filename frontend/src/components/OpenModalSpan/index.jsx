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

  const icon = () => {
    if (className == "channel-menu-option channel-menu-option__edit") {
      return <i className="fa-solid fa-circle-plus"></i>
    } else if (className == "channel-menu-option-delete" ){
      return <i className="fa-solid fa-trash-can"></i>
    } else if ( className == "channel-menu-option channel-menu-option__create" ) {
      return <i className="fa-solid fa-pencil"></i>
    }
  }

  return (
    <span className={className} onClick={onClick}>{buttonText} {icon()}</span>
  );
}

export default OpenModalSpan;
