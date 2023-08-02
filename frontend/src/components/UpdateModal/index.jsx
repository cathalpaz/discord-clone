import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import "../../styles/components/UpdateModal.css";
import { thunkUpdateSingleServer } from "../../store/singleServer";
import { UploadIcon } from "../Icons/UploadIcon";

function UpdateModal({ type }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const [privacy, setPrivacy] = useState("");
  const [serverName, setServerName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const singleServerStore = useSelector((state) => state.singleServer);
  const fileRef = useRef();
  console.log("the store", singleServerStore);

  function handleSubmit() {
    const errors = {};
    if (serverName.length > 50) {
      errors.serverName = "Server name cannot be more than 50 characters.";
    }
    if (Object.values(errors).length === 0) {
      const serverForm = {
        serverName,
        privacy,
        avatar
      };
      dispatch(thunkUpdateSingleServer(singleServerStore.id, serverForm))
    }
    setErrors(errors);
  }

  const handleReset = () => {
    setAvatar("")
    setErrors({});
    setPrivacy("");
    setServerName("");
  };

  const changeImage = (e) => {
    console.log("asd");
    e.preventDefault();
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  console.log(avatar);
  return (
    <div className="update-modal-container">
      <div className="update-modal-menu-options-container">
        <div className="update-modal-menu-options">
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-color-accent)",
              fontWeight: "600",
              paddingLeft: ".8rem",
            }}
          >
            {singleServerStore.name.toUpperCase()}'S SERVER
          </p>
          <p className="update-modal-menu-options-choice">Overview</p>
        </div>
      </div>
      <div className="update-modal-display">
        <div className="update-modal-server-information">
          <p style={{ fontWeight: "500", fontSize: "20px" }}>Server Overview</p>
          <div className="update-modal-display-info">
            <div className="update-modal-avatar-container">
              <div className="update-modal-avatar-picture">
                {!avatar ? (
                  <img src={singleServerStore.avatar}></img>
                ) : (
                  <div style={{ border: "0px" }} className="update-modal-avatar-picture">
                    <img src={URL.createObjectURL(avatar)} alt="" />
                  </div>
                )}
                <input
                  className="server_form__file-input"
                  ref={fileRef}
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const file = e.target.files[0];
                      if (file.type.substring("image/")) {
                        setAvatar(file);
                      }
                    }
                  }}
                />
                <p
                  style={{
                    fontSize: "10px",
                    color: "var(--text-color-accent)",
                    marginTop: ".6rem",
                  }}
                >
                  Minimum Size: 128x128
                </p>
              </div>
              <div className="update-modal-avatar-button">
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-color-accent)",
                    lineHeight: "1.25rem",
                  }}
                >
                  We recommend an image of at least 512x512 for the server.
                </p>
                <button onClick={changeImage}>Upload Image</button>
              </div>
            </div>
            <div className="update-modal-name">
              <p className="update-modal-headers">SERVER NAME</p>
              <input
                onChange={(e) => {
                  setServerName(e.target.value);
                }}
                value={serverName}
                placeholder={singleServerStore.name}
              ></input>
              <p className="update-modal-servername-error">
                {errors && errors.serverName}
              </p>
            </div>
          </div>
        </div>
        <div className="update-modal-border"></div>
        <div className="update-modal-privacy-container">
          <p className="update-modal-headers">
            CHANGE THE PRIVACY OF YOUR CHANNEL
          </p>
          <select
            name="privacy-selector"
            className="update-modal-privacy-select"
            onChange={(e) => setPrivacy(e.target.value)}
            value={privacy}
            required
          >
            <option value="" disabled>
              {singleServerStore.public ? "Public" : "Private"}
            </option>
            <option>Private</option>
            <option>Public</option>
          </select>
        </div>
        <div className="update-modal-submit-button-container">
          <button className="update-modal-reset-button" onClick={handleReset}>
            Reset
          </button>
          <button className="update-modal-submit-button" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
      <div className="update-modal-esc-container">
        <div className="update-modal-esc-button">
          <i className="fa-regular fa-circle-xmark" onClick={closeModal}></i>
          <p
            style={{
              paddingLeft: ".41rem",
              fontWeight: "600",
              fontSize: "13px",
              paddingTop: ".1rem",
            }}
          >
            ESC
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
