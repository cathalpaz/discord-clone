import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { logout } from "../../store/session"
import { useModal } from "../../context/Modal"
import { useHistory } from 'react-router-dom'
import '../../styles/components/UserProfile.css'

function UserModal() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [color, setColor] = useState(user ? user.banner_color : '')
    const { closeModal } = useModal()

    console.log(user)

    const handleLogout = () => {
        dispatch(logout())
        closeModal()
        history.push('/')
    }

    useEffect(() => {
        user.banner_color = color
    }, [color])


    return (
        <div className='user-modal'>
            <div style={{backgroundColor: user.banner_color}} className="user-modal_banner" />
            <div className="user-modal_top">
                <div className="user-modal_title">
                    <img className="user-modal_avatar" src={user.avatar} /> {user.username}
                </div>
                <form>
                    <input className='user-modal_color'
                        type="color"
                        name="color"
                        id="color"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        />
                </form>
            </div>
            <div className="user-modal_info">
                <div>
                    <div className="user-modal_info-name">DISPLAY NAME</div>
                    <div>{user.username}</div>
                </div>
                <div>
                    <div className="user-modal_info-name">EMAIL</div>
                    <div>{user.email}</div>
                </div>
                <div>
                    <div className="user-modal_info-name">BIRTHDAY</div>
                    <div>{user.birthday}</div>
                </div>
            </div>
            <button onClick={handleLogout} className="user-modal_logout">Logout</button>
        </div>
    )
}

export default UserModal
