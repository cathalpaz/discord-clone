import React from 'react'
import { useModal } from '../../context/Modal'

function LeaveServerModal({ server }) {
  const { closeModal } = useModal()

  const handleLeave = () => {
    console.log('left')
  }


  return (
    <div className='delete-modal-container'>
        <span>Leave '{server?.name}'</span>
        <p>Are you sure you want to leave <span>{server?.name}</span>? You won't be able to rejoin this server unless you are re-invited.</p>
        <div className='delete-modal-footer'>
            <button onClick={closeModal} className='delete-modal-button-no'>Cancel</button>
            <button onClick={handleLeave} className='delete-modal-button-yes'>Leave Server</button>
        </div>
    </div>
  )
}

export default LeaveServerModal
