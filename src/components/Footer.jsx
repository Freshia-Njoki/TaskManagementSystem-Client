import './footer.css'
function Footer() {
  const year = new Date().getFullYear()
  return (
    <>
     <div className="footer"> © The TM {year}</div>
     <div>linked</div>
     <a href='https://www.linkedin.com/in/freshia-njoki'></a>
     <a href='https://www.instagram.com/in/freshia-njoki'></a>
     <a href='https://www.twitter.com/in/freshia-njoki'></a>
     
    </>
   
  )
}

export default Footer