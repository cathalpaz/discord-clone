import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import "../../styles/components/UpdateModal.css"

function UpdateModal({ type }) {
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

    // if (type === "server") {
    //   word = "Server";
    // } else if (type === "channel") {
    //   word = "Channel";
    // }

    return (
      <div className="update-modal-container">
        {/* <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this {word.toLowerCase()}?</p>
        <button
          className="update-modal-button-yes"
          onClick={() => handleSubmit()}
        >
          Update
        </button>
        <button className="update-modal-button-cancel" onClick={closeModal}>
          Cancel
        </button> */}

        <div className="update-modal-menu-options">

        </div>
        <div className="update-modal-display">
            <div className="update-modal-server-information">
                <p style={{fontWeight:"500",fontSize:"22px"}}>Server Overview</p>
                <div className="update-modal-display-info">
                    <div className="update-modal-avatar">
                        <img src="https://i.imgur.com/k9f5hdF.png"></img>
                        <button>Upload Image</button>
                    </div>
                    <div className="update-modal-name">
                        <p>SERVER NAME</p>
                        <input></input>
                    </div>

                </div>
            </div>
        </div>
        <div className="update-modal-esc-container">
            <div className="update-modal-esc-button">
                <i className="fa-regular fa-circle-xmark" onClick={closeModal} ></i>
                <p style={{paddingLeft:".41rem", fontWeight:"600", fontSize:"13px", paddingTop:".1rem"}}>ESC</p>
            </div>
        </div>
      </div>
    );
  }

  export default UpdateModal;
