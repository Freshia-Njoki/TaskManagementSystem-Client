import './loginform.css'
import { useForm } from 'react-hook-form'
import Axios from 'axios';
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { apiDomain } from '../utils/utils'
import { Context } from "../context/userContext/Context";

function LoginForm() {
  const { dispatch } = useContext(Context);

  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required("full name is required"),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/, "should contain special characters, letters, numbers and 4 charcacters long").required("password is required"),

  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const sendDataToServer = (data) => {
    Axios.post(`${apiDomain}/auth/login`, data)
      .then((response) => {
        const { data } = response;
        if (data.token) {
          dispatch({ type: "LOGIN_SUCCESS", payload: data });
          navigate("/Tasks");
        } else {
          alert("Invalid response from the server");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          console.log(error)
          alert("An error occurred while logging in");
        }
      });
  };

  // console.log(user)
  return (
    <>
      <form onSubmit={handleSubmit(sendDataToServer)} style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>

        <p className='loginBanner'> Login Page </p>
        {/* <img className='image' src={image} alt="" srcset="" /> */}
        <label htmlFor="text"></label>
        <input type="text" id="text" placeholder='for test username is: faith' {...register("username")} />
        <p>{errors.fullName?.message}</p>
        <label htmlFor="password"></label>
        <input type="password" id='password' placeholder='psw: faith@123'  {...register("password")} />
        <p>{errors.password?.message}</p>
        <input className='submitBtn' type="submit" value="Submit" style={{ width: "50%" }} />

      </form>


    </>
  )
}

export default LoginForm