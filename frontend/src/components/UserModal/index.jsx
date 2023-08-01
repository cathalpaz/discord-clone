import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/session"
import { useModal } from "../../context/Modal"
import { useHistory } from 'react-router-dom'
import '../../styles/components/UserProfile.css'

function UserModal() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    const handleLogout = () => {
        dispatch(logout())
        closeModal()
        history.push('/')
    }

    return (
        <div className='user-modal'>
            <div className="user-modal_banner" />
            <div className="user-modal_top">
                <div className="user-modal_title">
                    <img className="user-modal_avatar" src={user.avatar} /> {user.username}
                </div>
                <button onClick={handleLogout} className="user-modal_logout">Logout</button>
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
        </div>
    )
}

export default UserModal
