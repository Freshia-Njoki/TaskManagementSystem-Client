import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container, Title, Label, Avatar, } from './styles';
import { FaEdit, FaTrash } from 'react-icons/fa';


export default function Card({ data, index, onDelete, onEdit }) {
    const handleDelete = () => {
        onDelete(data.id);
    };

    const handleEdit = () => {
        onEdit(data.id);
    };
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (

                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div>
                        <Label color={data.headerColor}>
                            <Avatar src={data.userAvatar} alt="User Avatar" />
                        </Label>
                        <Title>{data.content}</Title>
                    </div>

                    <div>
                        <FaEdit onClick={handleEdit} /> <br />
                        <FaTrash onClick={handleDelete} />
                    </div>



                </Container>


            )}
        </Draggable>
    );

}
