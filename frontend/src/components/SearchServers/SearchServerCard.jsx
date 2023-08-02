import React from 'react'

function SearchServerCard({ server }) {
  
//   console.log(server)
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
            <span>Join Server</span>
        </div>
    </div>
  )
}

export default SearchServerCard
