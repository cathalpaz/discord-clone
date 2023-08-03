import React from 'react'
import { useSelector } from 'react-redux';

function SearchServerCard({ server }) {
  const myServerIds = useSelector((state) => state.servers.orderedServers);

  if (!server) {
    return null
  }
  return (
    <div className='server-card_container'>
        <div className='card-image-banner'>
            <img src={server.avatar} />
        </div>
        <div className='card-name'>{server.name}</div>
        <div className='card-footer'>
            <div>{server.users.length} members</div>
            {myServerIds.includes(server.id) ? (
                <span className='joined-btn'>Joined</span>
            ) : (
                <span className='join-btn'>Join Server</span>
            )}

        </div>
    </div>
  )
}

export default SearchServerCard
