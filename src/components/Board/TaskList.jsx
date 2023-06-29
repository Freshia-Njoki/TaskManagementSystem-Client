import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';
import UpdateForm from '../UpdateForm';

import { Container } from './styles';
import Column from '../Column/Column';

export default function Board() {
    const { user } = useContext(Context);

    const [data, setData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [tempTask, setTempTask] = useState(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        setTasks(JSON.parse(storedTasks));
        fetchAndSetTasks();
    }, []);

    const fetchAndSetTasks = async () => {
        try {
            const res = await Axios.get(`${apiDomain}/tasks`, {
                headers: { Authorization: user.token },
            });

            const fetchedTasks = res.data.map((task) => ({
                ...task,
                status: 'ToDo',
            }));

            // Update the tasks in local storage
            localStorage.setItem('tasks', JSON.stringify(fetchedTasks));

            setTasks(fetchedTasks);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTask = async (id) => {
        const regex = /card-(\d+)/;
        const match = id.match(regex);
        const temp = match ? match[1] : null;

        try {
            await Axios.delete(`${apiDomain}/task/${temp}`, {
                headers: { Authorization: `${user.token}` },
            });

            const updatedTasks = tasks.filter((task) => task.task_id != temp);
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                alert('Error occurred while deleting the task');
            }
        }
    };

    const handleEditTask = (taskId) => {
        const task = tasks.find((task) => task.task_id === parseInt(taskId.split('-')[1]));
        setTempTask(task);
        setShowEditForm(true);
    };

    useEffect(() => {
        const columnOrder = ['ToDo', 'Doing', 'Done'];
        const content = {};

        columnOrder.forEach((columnId) => {
            const cards = tasks
                .filter((task) => task.status === columnId)
                .map((task) => ({
                    id: `card-${task.task_id}`,
                    content: task.description,
                    headerColor: getColumnColor(columnId),
                    userAvatar: 'https://avatars.dicebear.com/api/big-smile/522313213.svg',
                }));

            content[`column-${columnId}`] = {
                title: columnId,
                id: `column-${columnId}`,
                cards,
            };
        });

        setData({ columnOrder, content });
    }, [tasks]);

    const getColumnColor = (columnId) => {
        if (columnId === 'ToDo') {
            return '#54e1f7';
        } else if (columnId === 'Doing') {
            return '#7159c1';
        } else if (columnId === 'Done') {
            return '#F52929';
        }
    };

    const updateTask = (updatedTask) => {
        const updatedTasks = tasks.map((task) => {
            if (task.task_id === updatedTask.task_id) {
                return updatedTask;
            }
            return task;
        });

        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };
    function onDragEnd(result) {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = [...data.columnOrder];
            const [removed] = newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, removed);

            setData((prevState) => ({
                ...prevState,
                columnOrder: newColumnOrder,
            }));
            return;
        }

        const start = data.content[source.droppableId];
        const finish = data.content[destination.droppableId];

        if (start === finish) {
            if (newItems.some((item) => item.id === taskToMove.id)) {
                return;
            }
            const newItems = [...start.cards];
            const [removed] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, removed);
            setData((prevState) => ({
                ...prevState,
                content: {
                    ...prevState.content,
                    [source.droppableId]: {
                        ...prevState.content[source.droppableId],
                        cards: newItems,
                    },
                },
            }));
            return;
        }

        const startCards = [...start.cards];
        const finishCards = [...finish.cards];

        const taskToMove = { ...startCards[source.index] }; // Create a new object

        // Update the task status based on the column name
        taskToMove.status = finish.title;

        finishCards.splice(destination.index, 0, taskToMove);
        startCards.splice(source.index, 1);

        const updatedTasks = tasks.map((task) => {
            if (task.task_id === parseInt(taskToMove.id.split('-')[1])) {
                return {
                    ...task,
                    status: taskToMove.status,
                };
            }
            return task;
        });



        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setData((prevState) => ({
            ...prevState,
            content: {
                ...prevState.content,
                [source.droppableId]: {
                    ...prevState.content[source.droppableId],
                    cards: startCards,
                },
                [destination.droppableId]: {
                    ...prevState.content[destination.droppableId],
                    cards: finishCards,
                },
            },
        }));
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                    <Container ref={provided.innerRef} {...provided.droppableProps}>
                        {data.columnOrder.map((columnId, index) => {
                            const column = data.content[`column-${columnId}`];
                            return (
                                <Column
                                    key={index}
                                    data={column}
                                    index={index}
                                    onDelete={handleDeleteTask}
                                    onEdit={handleEditTask}
                                />
                            );
                        })}
                        {provided.placeholder}
                        /

                        {showEditForm && (
                            <UpdateForm
                                setShowEditForm={setShowEditForm}
                                taskData={tempTask}
                                updateTask={updateTask}
                                getTasks={fetchAndSetTasks}
                            />
                        )}

                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
}
