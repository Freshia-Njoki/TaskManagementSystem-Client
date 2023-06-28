import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';

import { Container } from './styles';
import Column from '../Column/Column';

export default function Board() {
    const [data, setData] = useState(null);
    const { user } = useContext(Context);
    const [tasks, setTasks] = useState([]);

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

    useEffect(() => {
        if (tasks.length > 0) {
            const columnOrder = tasks
                .map((task) => task.status)
                .filter((status, index, self) => self.indexOf(status) === index);
            const content = {};

            columnOrder.forEach((columnId) => {
                const cards = tasks
                    .filter((task) => task.status === columnId)
                    .map((task) => ({
                        id: `card-${task.task_id}`,
                        content: task.description,
                        headerColor: getColumnColor(columnId),
                        userAvatar:
                            'https://avatars.dicebear.com/api/big-smile/522313213.svg',
                    }));

                content[`column-${columnId}`] = {
                    title: columnId,
                    id: `column-${columnId}`,
                    cards,
                };
            });

            setData({ columnOrder, content });
        }
    }, [tasks]);

    const getColumnColor = (columnId) => {
        if (columnId === 'ToDo') {
            return '#54e1f7';
        } else if (columnId === 'column-Completed') {
            return '#F52929';


        } else {
            return '#7159c1';
        }
    };

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


    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {data.columnOrder.map((columnId, index) => {
                            const column = data.content[`column-${columnId}`]

                            console.log(data.content)
                            return <Column key={index} data={column} index={index} />;
                        })}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
}
