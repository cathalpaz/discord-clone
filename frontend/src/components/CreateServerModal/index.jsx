import { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../styles/components/CreateServerModal.css'
import { useModal } from '../../context/Modal'

function CreateServerModal() {
    const user = useSelector(state => state.session.user)

    const [name, setName] = useState(`${user.username}'s server`)
    const { closeModal } = useModal
    

    const handleSubmit = async(e) => {
        e.preventDefault();
    }

    // console.log('hello')
    return (
        <div className='create-server_form_container'>
            <form onSubmit={handleSubmit} className='server_form'>
                <div className='server_form-title'>
                    <h2>Customize your server</h2>
                    <p>Give your new server a personality with a name and an icon. You can always change it later.</p>
                    <span>Temp image upload</span>
                </div>
                <label>
                    SERVER NAME
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <div className='server_form-btns'>
                    <p>Back</p>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateServerModal
