import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

function NotFound() {
  return (
    <div style={{height: '85vh', textAlign: 'center', paddingTop: '30px'}}>
      <h1> Oops!</h1>
      <p>
        404 - Page not found
      </p>
      <Link to="/" style={{display:'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px'}} ><FaHome style={{margin: '5px'}}/> Back To Homepage</Link>

    </div>
  )
}

export default NotFound