import { useEffect, useState, useContext } from 'react'
import { Context } from '../context/userContext/Context'
import Axios from 'axios'
import { apiDomain } from '../utils/utils'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
// import { set } from 'react-hook-form'
import './TaskList.css'
import UpdateForm from './UpdateForm'


export default function TaskList() {
    const { user } = useContext(Context)
    const [tasks, setTasks] = useState([])
    const [showEditForm, setShowEditForm] = useState(false)//edit button
    const [tempTask, setTempTask] = useState('')

    const getTasks = async () => {
        const res = await Axios.get(`${apiDomain}/tasks`, {
            headers: { 'Authorization': `${user.token}` }

        })
        setTasks(res.data)

    }
    useEffect(() => {
        getTasks()

    }, [])
    // console.log(tasks)

    const handleDelete = async (id) => {

        await Axios.delete(`${apiDomain}/task/${id}`,
            {
                headers: { 'Authorization': `${user.token}` }
            })
            .then((res) => {
                // getTasks()
                alert(res.data.message)
            }).catch(({ response }) => {
                alert(response.response.data.error)
            })
    }

    const handleToggle = async (task) => {
        setTempTask(task)
        setShowEditForm(!showEditForm)

    }

    return (
        <div className='task_wrapper'>
            {
                tasks && tasks.map((task, index) => {
                    return (
                        <div className="card" key={index}>
                            <p>{task.description}</p>
                            <AiFillDelete className='delIcon' onClick={() => handleDelete(task.task_id)} />
                            <AiFillEdit className='Icon' onClick={() => handleToggle(task)} />
                            {
                                showEditForm && (<UpdateForm setShowEditForm={setShowEditForm} taskData={tempTask} getTasks={{ getTasks }} />)
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
