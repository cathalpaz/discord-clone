export function ServerUser({ user }) {
  return (
    <div className='server-user__container'>
      <div className='server-user__img'>
        <img src={user.avatar} alt='' />
        <div className='server-user__status'>
          {user.status === "online" ? (
            <div className='server-user__status--online'></div>
          ) : (
            <div className='server-user__status--offline'></div>
          )}
        </div>
      </div>
      <div className='server-user__username'>
        <p>{user.username}</p>
      </div>
    </div>
  );
}
