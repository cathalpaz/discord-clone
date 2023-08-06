import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateSingleServer } from "../../store/singleServer";
import { thunkGetAllServers } from "../../store/server";
import "../../styles/components/UpdateServerModal.css";

function UpdateServerModal() {
  const { closeModal } = useModal();
  const singleServerStore = useSelector((state) => state.singleServer);
  //short circ if no singleServer
  if (!singleServerStore.id) return false;
  const dispatch = useDispatch();
  const [privacy, setPrivacy] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverName, setServerName] = useState(singleServerStore.name);
  const fileRef = useRef();

  const handleSubmit = async () => {
    const errors = {};
    setLoading(true);
    setAvatar("");
    setPrivacy("");
    if (serverName.length > 50) {
      errors.serverName = "Server name cannot be more than 50 characters.";
    }
    if (Object.values(errors).length === 0) {
      const newServerForm = new FormData();
      newServerForm.append("name", serverName);
      newServerForm.append("public", privacy);
      if (avatar) {
        newServerForm.append("file", avatar);
      }

      await dispatch(
        thunkUpdateSingleServer(singleServerStore.id, newServerForm)
      );
      await dispatch(thunkGetAllServers());
      setLoading(false);
      closeModal();
    }
    setErrors(errors);
  };

  const handleReset = () => {
    setAvatar("");
    setErrors({});
    setPrivacy("");
    setServerName("");
  };

  const changeImage = (e) => {
    e.preventDefault();
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

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
            {singleServerStore.name.toUpperCase()}
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
                  <div
                    style={{ border: "0px" }}
                    className="update-modal-avatar-picture"
                  >
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
          {loading ? (
            <button className="update-modal-submit-button" disabled={true}>
              <i
                className="fa-solid fa-spinner fa-spin-pulse"
                style={{ color: "var(--white", fontSize: "22px" }}
              />
            </button>
          ) : (
            <button
              className="update-modal-submit-button"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          )}
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

export default UpdateServerModal;
