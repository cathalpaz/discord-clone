import { useState } from 'react'
import { useModal } from '../../context/Modal'
import '../../styles/components/UpdateMessageModal.css'

function UpdateMessageModal({ message }) {
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
    console.log('SUBMITTED')
    closeModal()
  }

  return (
    <div className='update-message__container'>
      <div>Update message</div>
      <label>
        Message:
        <textarea
          onKeyDown={handleEnter}
          value={newMessage}
          onChange={(e) => e.target.value}
          >
        </textarea>
      </label>
      <div className='update-message__btns'>
        <button onClick={closeModal}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  )
}

export default UpdateMessageModal
