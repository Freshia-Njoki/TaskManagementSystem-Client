import './mainnav.css';
import { useContext } from 'react';
import Profile from './Profile';
import AddTask from './AddTask';
import { Context } from '../context/taskContext/Context';
import TaskList from './TaskList';
import { DragDropContext } from 'react-beautiful-dnd';

export default function MainNav() {
  const { ui } = useContext(Context);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Return if dropped outside a Droppable

    const newTasks = Array.from(tasks);
    const [removed] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, removed);

    setTasks(newTasks);
  };

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
          <div className="todos">
            <span className="todos_heading">Active tasks</span>
            <DragDropContext onDragEnd={handleDragEnd}>
              <TaskList status="active" />
            </DragDropContext>

          </div>

        </div>
      ) : null}
    </div>
  );
}
