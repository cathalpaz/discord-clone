import React, { useState } from 'react'
import { useModal } from '../../context/Modal'
import '../../styles/components/CreateChannelModal.css'

function CreateChannelModal({ serverId }) {
  console.log(serverId)
  const { closeModal } = useModal()

  const [type, setType] = useState('text')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async(e) => {
    e.preventDefault()
  }

  return (
    <div className='create-channel_modal'>
      <form onSubmit={handleSubmit}>
        <div className='create-channel_modal-title'>
          <div className='create-channel-modal-title-top'>
            <h2>Create Channel</h2>
            <i className="fa-solid fa-xmark" onClick={closeModal} ></i>
          </div>
          <p>in Text Channels</p>
        </div>
        <div className='create-channel_modal-type'>
          <h4>CHANNEL TYPE</h4>
          <div>
            <label>Text</label>
            <input
              name='type'
              type='radio'
              value='text'
              checked={type === 'text'}
              onChange={e => setType(e.target.value)}
              />
          </div>
          <div>
            <label>Voice</label>
            <input
              name='type'
              type='radio'
              value='voice'
              checked={type === 'voice'}
              onChange={e => setType(e.target.value)}
              />
          </div>
        </div>
        <div className='create-channel_modal-name'>
          <label>CHANNEL NAME</label>
          <input
            type='text'
            placeholder='new-channel'
            value={name}
            onChange={e => setName(e.target.value)}
            />
        </div>
        <div className='create-channel_modal-footer'>
          <button onClick={closeModal}>Cancel</button>
          <button disabled={(name.length < 1)}>Create Channel</button>
        </div>

      </form>
    </div>
  )
}


export default CreateChannelModal
