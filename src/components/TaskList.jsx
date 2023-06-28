import React, { useState, useRef, useEffect, useContext } from 'react';
import './todoBoard.styles.css';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import UpdateForm from './UpdateForm';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Context } from '../context/userContext/Context';

const TodoBoard = () => {
    const item = useRef(null);

    const [dragging, setDragging] = useState(false);
    const [dragEnter, setDragEnter] = useState(false);
    const { user } = useContext(Context);
    const [tasks, setTasks] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [tempTask, setTempTask] = useState('');

    const getTasks = async () => {
        try {
            const res = await Axios.get(`${apiDomain}/tasks`, {
                headers: { Authorization: user.token },
            });
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await Axios.delete(`${apiDomain}/task/${id}`, {
                headers: { Authorization: user.token },
            });
            getTasks();
            alert('Task deleted successfully.');
        } catch (error) {
            console.error(error);
            alert('Failed to delete task.');
        }
    };

    const handleToggle = (task) => {
        setTempTask(task);
        setShowEditForm(!showEditForm);
    };

    const handleDragStart = (e, params) => {
        item.current = params;
        console.log('refs in dragStart', item);
        setTimeout(() => {
            setDragging(true);
        }, 0);

        e.target.addEventListener('dragend', handleDragEnd);
    };

    const handleDragEnter = (params) => {
        console.log('dragEnter in: ', params);
        const dragged = item.current;
        const newList = [...tasks];

        newList.splice(params.taskId, 0, newList.splice(dragged.taskId, 1)[0]);

        item.current = params;
        setDragEnter(true);
        setTasks(newList);
        console.log('dragEnter new List: ', newList);
    };

    const handleDragEnd = () => {
        item.current = null;
        setDragging(false);
        setDragEnter(false);
        console.log('drag has been ended...');
    };

    const handleStyle = (params) => {
        const dragged = item.current;
        if (dragged && dragged.taskId === params.taskId) {
            return 'drag-bg tasks';
        } else {
            return 'tasks';
        }
    };

    return (
        <div>
            {tasks.map((task, taskId) => (
                <div
                    key={taskId}
                    draggable
                    className={dragging && dragEnter ? handleStyle({ taskId }) : 'tasks'}
                    onDragStart={(e) => handleDragStart(e, { taskId })}
                    onDragEnter={() => handleDragEnter({ taskId })}
                >
                    <div className="card">
                        <p>{task.description}</p>
                        <AiFillDelete className="delIcon" onClick={() => handleDelete(task.task_id)} />
                        <AiFillEdit className="Icon" onClick={() => handleToggle(task)} />
                        {showEditForm && <UpdateForm setShowEditForm={setShowEditForm} taskData={tempTask} getTasks={getTasks} />}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoBoard;





