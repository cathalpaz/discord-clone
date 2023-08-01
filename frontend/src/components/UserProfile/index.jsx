import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import '../../styles/components/UserProfile.css'


function UserProfile() {
    const user = useSelector(state => state.session.user)
    return (
        <div className='user_profile-container'>
            <div className='user_profile-info'>
                <img src={user.avatar} alt='y' />
                <div>{user.username}</div>
            </div>
            <div className='user_profile-settings'>
                <i className="fa-solid fa-gear" />
            </div>
        </div>
    )
}

export default UserProfile
