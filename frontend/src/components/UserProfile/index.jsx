import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import UserModal from "../UserModal";
import "../../styles/components/UserProfile.css";

function UserProfile() {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="user_prof-container">
      <div className="user_prof-info">
        <div className="user_prof-img-container">
          <img src={user.avatar} alt={user.username.toUpperCase().charAt(0)} />
          <div className="online-status">
            <div className="green-circle"></div>
          </div>
        </div>
        <span>{user.username}</span>
      </div>
      <div className="user_prof-settings">
        <OpenModalButton
          modalComponent={<UserModal />}
          buttonText={<i className="fa-solid fa-gear" />}
        />
      </div>
    </div>
  );
}

export default UserProfile;
