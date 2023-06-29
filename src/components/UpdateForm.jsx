import { useEffect, useState, useContext } from 'react';
import { Context } from '../context/userContext/Context';
import { apiDomain } from '../utils/utils';
import Axios from 'axios';
import './updateform.css';

export default function UpdateForm({ setShowEditForm, taskData, getTasks }) {
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

            // Call the getTasks function to fetch and update the tasks in the Board component
            getTasks();

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
