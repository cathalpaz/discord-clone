import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { thunkCreateServer } from '../../store/server'
import '../../styles/components/CreateServerModal.css'

function CreateServerModal() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [name, setName] = useState(`${user.username}'s server`)
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newServer = {
            name,
            avatar,
            owner_id: user.id
        }
        const data = await dispatch(thunkCreateServer(newServer))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            // push to new server
            return
        }
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
