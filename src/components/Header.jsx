import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { FaHome, FaBook, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa'
import './header.css'
import { useContext } from "react";
import { Context } from "../context/userContext/Context";
// import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // navigate("/")

  };
  return (
    <div className='header'>

      <div className="header-wrapper">
        <img src={logo} alt="my logo" />

        <span>Features</span>
        <span>Plans</span>
        <Link to="/" style={{ color: "brown" }}><FaHome id="icons" /> Home</Link>
        <Link to="/signup" style={{ color: "purple" }}><FaInfoCircle id="icons" /> Signup</Link>
        {
          user && (
            <>
              <Link to="/tasks" style={{ color: "green" }}><FaBook id="icons" /> Tasks</Link>
              <Link onClick={handleLogout} style={{ color: "red" }}><FaSignOutAlt id="icons" /> Logout</Link>
            </>
          )
        }

      </div>

    </div>
  )
}

export default Header