import './profile.css'
import { useContext } from 'react'
// import avatar from '../assets/avatar.png'
import R from '../assets/R.jpeg'
import { Context } from '../context/userContext/Context'

export default function Profile() {
  const { user } = useContext(Context);
  return (
    <div className='profile'>
      <div className="userAvatar">
        <img className="userAvatar-img" src={R} alt="user-profile-pic" />

      </div>
      <div className="user-Details">

        <h2>Username</h2>
        <p>{user.username}</p>
        <h2>Email</h2>
        <p>{user.email}</p>
        <h2>UserID</h2>
        <p>{user.id}</p>

      </div>


    </div >
  )
}
