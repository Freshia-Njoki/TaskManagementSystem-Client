import './mainnav.css'
import { useContext } from 'react'
import Profile from './Profile';
import AddTask from './AddTask'
import { Context } from '../context/taskContext/Context'
import TaskList from './TaskList';

export default function Mainnav() {
  const { ui } = useContext(Context);
  // console.log(ui)
  return (
    <div className='mainnav'>
      {
        ui == 'add' ? (
          <div className="mainnav_wrapper">
            <h2>Add Tasks</h2>
            <AddTask />
          </div>

        ) : ui == 'profile' ? (
          <div className="mainnav_wrapper">
            <h2>User Profile</h2>
            <Profile />
          </div>

        ) : ui == 'view' ? (<div className="mainnav_wrapper">
          <h2>view all Tasks</h2>
          <TaskList />
        </div>
        ) : null
      }




    </div>
  )
}