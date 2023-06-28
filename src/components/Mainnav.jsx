import './mainnav.css';
import { useContext } from 'react';
import Profile from './Profile';
import AddTask from './AddTask';
import { Context } from '../context/taskContext/Context';
import Board from './Board/TaskList';
import { DragDropContext } from 'react-beautiful-dnd';

export default function MainNav() {
  const { ui } = useContext(Context);



  return (
    <div className="mainnav">
      {ui === 'add' ? (
        <div className="mainnav_wrapper">
          <h2>Add Tasks</h2>
          <AddTask />
        </div>
      ) : ui === 'profile' ? (
        <div className="mainnav_wrapper">
          <h2>User Profile</h2>
          <Profile />
        </div>
      ) : ui === 'view' ? (
        <div className="container">

          <Board />

        </div>
      ) : null}
    </div>
  );
}
