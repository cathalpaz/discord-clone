import { useState } from 'react'
import { useModal } from '../../context/Modal'
import '../../styles/components/UpdateMessageModal.css'

function UpdateMessageModal({ message, type }) {
  const { closeModal } = useModal()
  let [newMessage, setNewMessage] = useState(message.content)

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      updateMessage()
    }
  }

  const updateMessage = (e) => {
    e.preventDefault()

    // handle socket stuff here
    message.updated = True

    closeModal()
  }

  return (
    <div className='update-message__container'>
      <span className='update-message__title'>Update message</span>
      <label className='update-message__content'>
        Message:
        <input
          onKeyDown={handleEnter}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          >
        </input>
      </label>
      <div className='update-message__btns'>
        <button onClick={closeModal} className='delete-modal-button-no'>Cancel</button>
        <button className='save-btn'>Save</button>
      </div>
    </div>
  )
}

export default UpdateMessageModal
