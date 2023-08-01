import React from 'react'
import '../../styles/components/CreateChannelModal.css'

function CreateChannelModal({ serverId }) {
  console.log(serverId)
  return (
    <div className='create-channel_modal'>
      <form>
        <div className='create-channel_modal-title'>
          <h2>Create Channel</h2>
          <p>in Text Channels</p>
        </div>
      

      </form>
    </div>
  )
}


export default CreateChannelModal
