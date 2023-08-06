import { useSelector } from "react-redux";

export function ServerUser({ user, server }) {
  const currentUser = useSelector((state) => state.session.user);
  return (
    <div className="server-user__container">
      <div className="server-user__img">
        <img src={user.avatar} alt="" />
        <div className="server-user__status">
          {user.status === "online" ? (
            <div className="server-user__status--online"></div>
          ) : (
            <div className="server-user__status--offline"></div>
          )}
        </div>
      </div>
      <div className="server-user__username">
        <p>{user.username}</p>
        {user?.id === server?.owner_id ? (
          <i className="fa-solid fa-crown"></i>
        ) : null}
      </div>
    </div>
  );
}
