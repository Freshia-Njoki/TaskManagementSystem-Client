import './sidenav.css'
import { useContext } from 'react'
import { Context } from '../context/taskContext/Context';
import { FaUserTie } from 'react-icons/fa'
import { AiFillFileAdd } from 'react-icons/ai'
import { TfiViewListAlt } from 'react-icons/tfi'


export default function Sidenav() {
  const { dispatch } = useContext(Context);
  const handleProfile = () => {
    dispatch({ type: 'PROFILE', payload: 'profile' })

  }
  const handleAdd = () => {
    dispatch({ type: 'ADD', payload: 'add' })

  }
  const handleView = () => {
    dispatch({ type: 'VIEW', payload: 'view' })

  }
  return (

    <div className="sidenav">
      <div className="sidenav_wrapper">
        <div className="sidenav_title" onClick={handleProfile}><FaUserTie className='icon' />Profile</div>
      </div>

      <div className="sidenav_wrapper">
        <div className="sidenav_item" onClick={handleAdd}><AiFillFileAdd className='icon2' />Add Task</div>
        <div className="sidenav_item" onClick={handleView}><TfiViewListAlt className='icon2' />View Task</div>
      </div>


    </div>
  )
}
