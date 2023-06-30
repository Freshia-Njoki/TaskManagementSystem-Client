import './sidenav.css'
import { useContext } from 'react'
import { Context } from '../context/taskContext/Context';
import { FaUserTie } from 'react-icons/fa'
import { AiFillFileAdd } from 'react-icons/ai'
import { TfiViewListAlt } from 'react-icons/tfi'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'


export default function Sidenav() {
  const { dispatch } = useContext(Context);
  const handleProfile = () => {
    dispatch({ type: 'PROFILE', payload: 'profile' })

  }
  const handleAdd = () => {
    dispatch({ type: 'ADD', payload: 'add' })

  }
  const handleView = () => {
    dispatch({ type: 'VIEW', payload: 'view' })

  }
  return (

    <div className="sidenav">

      <Sidebar  >
        <Menu className="sidenav_wrapper" menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                color: disabled ? '#f5d9ff' : '#d359ff',
                backgroundColor: active ? '#eecef9' : undefined,
              };
          },
        }}>
          <MenuItem onClick={handleProfile}><FaUserTie className='icon' />Profile </MenuItem>

          <MenuItem onClick={handleAdd}><AiFillFileAdd className='icon2' />Add Task</MenuItem>

          <MenuItem onClick={handleView}><TfiViewListAlt className='icon2' />Task board</MenuItem>
        </Menu>

      </Sidebar>
    </div>



  )
}
