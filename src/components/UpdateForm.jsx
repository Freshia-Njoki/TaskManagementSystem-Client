import { useEffect, useState, useContext } from 'react'
import { Context } from '../context/userContext/Context'
import { apiDomain } from '../utils/utils'
import Axios from 'axios'
import './updateform.css'

export default function UpdateForm({ setShowEditForm, taskData, getTasks }) {
    const { user } = useContext(Context)
    const [description, setDescription] = useState('')

    useEffect(() => {
        setDescription(taskData.description)

    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        await Axios.put(`${apiDomain}/task/${taskData.task_id}`, { description: description },
            {
                headers: { 'Authorization': `${user.token}` }
            })
            .then((res) => {
                alert(res.data.message)
            })
            .catch(({ response }) => {
                alert(response.response.data.error)
            })
    }
    return (
        <div className='updateform'>
            <form className='form'>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div className="btn-wrapper">
                    <button onClick={() => setShowEditForm(false)}>exit</button>
                    <button type="submit" onClick={handleSubmit}>Add</button>

                </div>

            </form>


        </div>
    )
}
