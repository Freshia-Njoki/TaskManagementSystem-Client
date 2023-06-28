import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Container } from './styles';

import { Column } from '../Column';

import API from './api.json';

export function Board() {
    const [data, setData] = useState(API);

    function onDragEnd(result) {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = [...data.columnOrder];
            const [removed] = newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, removed);

            setData(data, (data.columnOrder = newColumnOrder));
            return;
        }

        const start = data.content[source.droppableId];
        const finish = data.content[destination.droppableId];

        if (start === finish) {
            const newItems = [...start.cards];
            const [removed] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, removed);
            setData(data, (finish.cards = newItems));
            return;
        }

        const startCards = [...start.cards];
        const finishCards = [...finish.cards];

        finishCards.splice(destination.index, 0, startCards[source.index]);
        startCards.splice(source.index, 1);

        setData(
            data,
            (data.content[source.droppableId].cards = startCards),
            (data.content[destination.droppableId].cards = finishCards)
        );
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="direction" type="column">
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {data.columnOrder.map((columnId, index) => {
                            const column = data.content[columnId];
                            return <Column key={column.id} data={column} index={index} />;
                        })}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
}


{/* <div className="card">
<p>{task.description}</p>
<AiFillDelete className="delIcon" onClick={() => handleDelete(task.task_id)} />
<AiFillEdit className="Icon" onClick={() => handleToggle(task)} />
{showEditForm && <UpdateForm setShowEditForm={setShowEditForm} taskData={tempTask} getTasks={getTasks} />}
</div> */}

// const item = useRef(null);

// const [dragging, setDragging] = useState(false);
// const [dragEnter, setDragEnter] = useState(false);
// const { user } = useContext(Context);
// const [tasks, setTasks] = useState([]);
// const [showEditForm, setShowEditForm] = useState(false);
// const [tempTask, setTempTask] = useState('');

// const getTasks = async () => {
//     try {
//         const res = await Axios.get(`${apiDomain}/tasks`, {
//             headers: { Authorization: user.token },
//         });
//         setTasks(res.data);
//     } catch (error) {
//         console.error(error);
//     }
// };

// useEffect(() => {
//     getTasks();
// }, []);

// const handleDelete = async (id) => {
//     try {
//         await Axios.delete(`${apiDomain}/task/${id}`, {
//             headers: { Authorization: user.token },
//         });
//         getTasks();
//         alert('Task deleted successfully.');
//     } catch (error) {
//         console.error(error);
//         alert('Failed to delete task.');
//     }
// };

