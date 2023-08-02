import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { thunkDeleteSingleServer } from "../../store/singleServer";
import "../../styles/components/DeleteModal.css";

function DeleteModal({ type, event }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory()
  const state= useSelector((state) => state);
  let word = "";

  function handleSubmit() {
    if (type === "server") {
      dispatch(thunkDeleteSingleServer(state.singleServer.id));
      closeModal();
      history.push("/@")
    } else if (type === "channel") {
      // dispatch(thunkDeleteGroup(Object.values(groupStore)[0].id));
      closeModal();
      // window.location.href = "/groups";
    }
  }

  if (type === "server") {
    word = "Server";
  } else if (type === "channel") {
    word = "Channel";
  }

  return (
    <div className="delete-modal-container">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this {word.toLowerCase()}?</p>
      <button
        className="delete-modal-button-yes"
        onClick={() => handleSubmit()}
      >
        Yes (Delete {word})
      </button>
      <button className="delete-modal-button-no" onClick={closeModal}>
        No (Keep {word})
      </button>
    </div>
  );
}

export default DeleteModal;
