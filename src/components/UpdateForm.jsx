import { useEffect, useState, useContext } from 'react';
import { Context } from '../context/userContext/Context';
import { apiDomain } from '../utils/utils';
import Axios from 'axios';
import './updateform.css';

export default function UpdateForm({ setShowEditForm, taskData, updateTask }) {
    const { user } = useContext(Context);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setDescription(taskData.description);
    }, [taskData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await Axios.put(
                `${apiDomain}/task/${taskData.task_id}`,
                { description: description },
                {
                    headers: { Authorization: user.token },
                }
            );

            alert('Task updated successfully');

            // Update the description in the taskData object
            const updatedTaskData = { ...taskData, description: description };

            // Call the updateTask function passed from the Board component to update the task in state and localStorage
            updateTask(updatedTaskData);

            // Close the edit form
            setShowEditForm(false);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className='updateform'>
            <form className='form'>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div className='btn-wrapper'>
                    <button onClick={() => setShowEditForm(false)}>Exit</button>
                    <button type='submit' onClick={handleSubmit}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
