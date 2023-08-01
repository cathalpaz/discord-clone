import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import UserModal from '../UserModal'
import '../../styles/components/UserProfile.css'



function UserProfile() {
    const user = useSelector((state) => state.session.user);
    console.log(user)

    return (
        <div className='user_prof-container'>
            <div className='user_prof-info'>
                <img src={user.avatar} alt={user.username.toUpperCase().charAt(0)} />
                {user.username}
            </div>
            <div className='user_prof-settings'>
                <OpenModalButton modalComponent={<UserModal />} buttonText={<i className="fa-solid fa-gear" />} />
            </div>
        </div>
    )
}

export default UserProfile
