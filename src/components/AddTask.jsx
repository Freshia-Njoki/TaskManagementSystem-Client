import './AddTask.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from 'axios';
import { useContext } from 'react';
import { Context } from '../context/userContext/Context';
import { apiDomain } from '../utils/utils';

export default function AddTask() {
    const { user } = useContext(Context)//authenticate the form
    const schema = yup.object().shape({
        description: yup.string().required("description is required")

    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    //make api req(post), get res
    const onSubmit = async (data) => {
        Axios.post(`${apiDomain}/tasks`, data, {
            headers: {
                'Authorization': `${user.token}`,//user from context
            }
        }).then((response) => {
            console.log(response.data)

            reset();
            response.data.message && alert(response.data.message)


        }).catch((response) => {
            alert(response.data.error)
        })

    }



    return (
        < div className='formWrapper' >
            <form onSubmit={handleSubmit(onSubmit)} className='Form'>
                <textarea placeholder="Add a task" {...register("description")}>
                </textarea>
                <p>{errors.description?.message}</p>

                <input className='submitBtn animatedButton' type="submit" value="save" />
            </form>

        </div >


    )
}
