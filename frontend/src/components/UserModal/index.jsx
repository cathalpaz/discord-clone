import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout, thunkUpdateUser } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "../../styles/components/UserProfile.css";

function UserModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [color, setColor] = useState(user?.banner_color);
  const [username, setUsername] = useState(user?.username);
  const [birthday, setBirthday] = useState(user?.birthday);
  const [editUsername, setEditUsername] = useState(false);
  const { closeModal } = useModal();

  const handleLogout = () => {
    dispatch(logout());
    closeModal();
    history.push("/");
  };

  useEffect(() => {
    user.banner_color = color;
  }, [color]);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("banner_color", color);
    if (Array.from(formData.entries()).length) {
      const result = await dispatch(thunkUpdateUser(formData, user.id));
      closeModal();
    }
  };

  return (
    <div className="user-modal">
      <div style={{ backgroundColor: color }} className="user-modal_banner" />
      <div className="user-modal_top">
        <div className="user-modal_title">
          <img className="user-modal_avatar" src={user.avatar} />{" "}
          {user.username}
        </div>
        <form>
          <input
            className="user-modal_color"
            type="color"
            name="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </form>
      </div>
      <div className="user-modal_info">
        <div className="user-modal__form__group">
          <div className="user-modal_info-name">DISPLAY NAME</div>
          <div className="form__group">
            {!editUsername ? (
              <div>{username}</div>
            ) : (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <button
              className="user-modal-edit_btn"
              onClick={(e) => {
                e.preventDefault();
                setEditUsername(!editUsername);
              }}
            >
              {editUsername ? "Confirm" : "Edit"}
            </button>
          </div>
        </div>
        <div className="user-modal__form__group">
          <div className="user-modal_info-name">EMAIL</div>
          <div className="form__group">
            <div>{user?.email}</div>
          </div>
        </div>
        <div>
          <div className="user-modal_info-name">BIRTHDAY</div>
          <div className="form__group">
            <div>{birthday}</div>
          </div>
        </div>
      </div>
      <div className="user-modal__btns">
        <button onClick={handleLogout} className="user-modal_logout">
          Logout
        </button>
        <button
          disabled={editUsername}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="user-modal_logout primary"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default UserModal;
