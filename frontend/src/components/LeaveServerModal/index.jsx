import React from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { thunkGetAllServers } from '../../store/server';
import { useHistory } from 'react-router-dom';

function LeaveServerModal({ server }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal()

  if (!server) return null;

  const handleLeave = async() => {
    const res = await fetch(`/api/servers/${server.id}/leave`)
    const data = await res.json()
    dispatch(thunkGetAllServers(data))
    history.push('/@')
    closeModal()
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
