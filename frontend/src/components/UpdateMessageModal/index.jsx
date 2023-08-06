import { useState } from "react";
import { useModal } from "../../context/Modal";
import "../../styles/components/UpdateMessageModal.css";
import { useSelector } from "react-redux";

function UpdateMessageModal({ message, type, socket }) {
  const { closeModal } = useModal();
  if (!socket) return false;
  const [newMessage, setNewMessage] = useState(message.content);
  const user = useSelector((state) => state.session.user);
  const serverId = useSelector((state) => state.singleServer.id);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      updateMessage();
    }
  };

  const updateMessage = () => {
    // handle socket stuff here

    socket.emit("channel_message", {
      new_message: {
        ...message,
        content: newMessage,
      },
      channel_id: message.channel_id,
      user: {
        id: user.id,
        username: user.username,
      },
      server_id: serverId,
    });

    closeModal();
  };

  return (
    <div className="update-message__container">
      <span className="update-message__title">Update message</span>
      <label className="update-message__content">
        Message:
        <input
          onKeyDown={handleEnter}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </label>
      <div className="update-message__btns">
        <button onClick={closeModal} className="delete-modal-button-no">
          Cancel
        </button>
        <button onClick={updateMessage} className="save-btn">
          Save
        </button>
      </div>
    </div>
  );
}

export default UpdateMessageModal;
