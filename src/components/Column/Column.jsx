import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Container, Title, TaskList } from './styles';
import Card from '../Card/Card';

export default function Column({ data, index, onDelete, onEdit }) {

    return (
        <Draggable draggableId={data.task_id} index={index}>
            {(provided) => (
                <Container
                    ref={provided.innerRef}
                    innerRef={provided.innerRef}
                    {...provided.draggableProps}
                    done={data.done}
                >
                    <Title {...provided.dragHandleProps}>{data.title}</Title>
                    <Droppable droppableId={data.id}>
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                innerRef={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {data.cards.map((card, index) => (
                                    <Card
                                        key={card.id}
                                        data={card}
                                        index={index}
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                    />
                                ))}
                                {provided.placeholder}
                            </TaskList>

                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
}