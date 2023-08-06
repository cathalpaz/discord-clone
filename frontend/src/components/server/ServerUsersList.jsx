import { useSelector } from "react-redux";

import "../../styles/components/ServerUsers.css";
import { ServerUser } from "./ServerUser";

export function ServerUsersList() {
  const serverUsers = useSelector((state) => state.singleServer?.users);
  const server = useSelector(state => state.singleServer)
  console.log('LOOK', server)

  return (
    <>
      <div className="server-users-list-container">
        <header className="server-users-list__header">
          <h3>Users</h3>
        </header>
        <div className="server-users-list__users">
          {serverUsers.map((user, i) => {
            return <ServerUser key={i} user={user} server={server} />;
          })}
        </div>
      </div>
    </>
  );
}
