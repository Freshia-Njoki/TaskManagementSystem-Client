import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Axios from 'axios';
import '../components/loginform.css';
import './signup.css';

function SignUp() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    user_id: yup.string().required('RegNo: is required'),
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
      .required('Email is required'),
    role: yup.string().required('Role is required'),
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Invalid password format')
      .required('Password is required'),
    date: yup.date().required('Please enter your date of birth'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const sendDataToServer = (data) => {
    Axios.post('http://localhost:8081/auth/register', data)
      .then((response) => {
        response.data.message && alert(response.data.message);//passing message from the backend to frontend
        reset();
        console.log(response);
      })
      .catch(({ response }) => {
        alert(response.data.error);
        // console.log(error);
      });
  };

  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit(sendDataToServer)} className="Form">
        <p className="loginBanner">Signup Page</p>
        <div className="inputGroup">
          <label htmlFor="user_id">RegNo:</label>
          <input type="text" id="user_id" placeholder="RegNo:" {...register('user_id')} />
          <p className="errorMessage">{errors.user_id?.message}</p>
        </div>
        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Username" {...register('username')} />
          <p className="errorMessage">{errors.username?.message}</p>
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Email" {...register('email')} />
          <p className="errorMessage">{errors.email?.message}</p>
        </div>
        <div className="inputGroup">
          <label htmlFor="role">Role:</label>
          <input type="text" id="role" placeholder="Role" {...register('role')} />
          <p className="errorMessage">{errors.role?.message}</p>
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Password" {...register('password')} />
          <p className="errorMessage">{errors.password?.message}</p>
        </div>
        <div className="inputGroup">
          <label htmlFor="assigned_to">DOB:</label>
          <input type="date" id="assigned_to" placeholder="DOB" {...register('date')} />
          <p className="errorMessage">{errors.date?.message}</p>
        </div>
        <input type="submit" value="Submit" className="submitBtn" />
      </form>

      {/* <p>Already a member? <a href="/src/pages/Login.jsx">Login</a></p> */}
    </div>
  );
}

export default SignUp;
