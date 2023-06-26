import './profile.css'
import { useContext } from 'react'
import avatar from '../assets/avatar.png'
import { Context } from '../context/userContext/Context'

export default function Profile() {
    const { user }= useContext(Context);
  return (
    <div className='profile'>
        <div className="userAvatar">
            <img className="userAvatar-img" src={avatar} alt="user-profile-pic"/>

        </div>
        <div className="user-Details">
            <h2>Username</h2>
            <p>{user.username}</p>
            <h2>Email</h2>
            <p>{user.email}</p>
            <h2>User-Id</h2>
            <p>{user.id}</p>

        </div>
        
      
    </div>
  )
}
