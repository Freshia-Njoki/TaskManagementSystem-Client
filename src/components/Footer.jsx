import './footer.css'
import { AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai'
import { Link } from 'react-router-dom'
function Footer() {
  const year = new Date().getFullYear()
  return (

    <>
      <div className="footer">
        <div className="social-media">
          <p> © {year} The WorkflowPro</p>
          <a href="https://twitter.com/FreshiaNjoki2">< AiFillTwitterCircle className='icons' /></a>
          <a href="https://www.linkedin.com/in/freshia-njoki"><AiFillLinkedin className='icons' /></a>
        </div>
        <Link to="/TermsAndPrivacy" style={{ color: "purple" }}> Terms And Privacy</Link>
      </div>

    </>

  )
}

export default Footer