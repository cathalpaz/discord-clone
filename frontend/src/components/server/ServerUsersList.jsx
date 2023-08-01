import { useSelector } from "react-redux";

import "../../styles/components/ServerUsers.css";

export function ServerUsersList() {
  const serverUsers = useSelector((state) => state.singleServer?.users);

  return (
    <>
      <div className='server-users-list-container'>
        <header className='server-users-list__header'>
          <h3>Users</h3>
        </header>
        <div className='server-users-list__users'>
          {serverUsers.map((user) => {
            return <div> {user.username}</div>;
          })}
        </div>
      </div>
    </>
  );
}
