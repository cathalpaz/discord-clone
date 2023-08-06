import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { thunkCreateChannel } from "../../store/singleServer";
import { useDispatch } from "react-redux";
import "../../styles/components/CreateChannelModal.css";

function CreateChannelModal({ serverId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [type, setType] = useState("text");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const channel = {
      server_id: serverId,
      type: "text",
      name,
    };
    const data = await dispatch(thunkCreateChannel(serverId, channel));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      closeModal();
      history.push(`/${serverId}/${data.id}`);
    }
  };

  return (
    <div className="create-channel_modal">
      <form onSubmit={handleSubmit}>
        <div className="create-channel_modal-title">
          <div className="create-channel-modal-title-top">
            <span>Create Channel</span>
            <i className="fa-solid fa-xmark" onClick={closeModal}></i>
          </div>
          <p>in Text Channels</p>
        </div>
        <div className="create-channel_modal-type">
          <h4 className="create-channel_names">CHANNEL TYPE</h4>
          <div className="create-channel_types">
            <label>
              <i className="fa-solid fa-hashtag create-channel_icon"></i>
              <div className="create-channel_types-text">
                <span>Text</span>
                <p>Send messages, images, GIFs, emojis, opinions, and puns</p>
              </div>
            </label>
            <input
              name="type"
              type="radio"
              value="text"
              checked={type === "text"}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="create-channel_types">
            <label>
              <i className="fa-solid fa-volume-high create-channel_icon"></i>
              <div className="create-channel_types-text">
                <span>Voice</span>
                <p>Hang out together with voice, video, and screen share</p>
              </div>
            </label>
            <input
              name="type"
              type="radio"
              value="voice"
              checked={type === "voice"}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
        </div>
        <div className="create-channel_modal-name">
          <label className="create-channel_names" htmlFor="name-input">
            CHANNEL NAME
          </label>
          <input
            id="name-input"
            type="text"
            placeholder="new-channel"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={1}
            maxLength={18}
          />
          <div className="create-channel_hashtag">#</div>
        </div>
        <div className="create-channel_modal-footer">
          <div className="create-channel_footer-btns">
            <button onClick={closeModal} className="create-cancel_btn">
              Cancel
            </button>
            <button disabled={name.length < 1} className="create-channel_btn">
              Create Channel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateChannelModal;
