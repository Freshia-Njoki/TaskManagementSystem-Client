import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import './app.css'
import Signup from './pages/Signup'
import Tasks from './pages/Tasks'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Logout from './pages/Logout'
import Footer from './components/Footer'
import { useContext } from "react";
import { Context } from "./context/userContext/Context";

function App() {
  const { user } = useContext(Context)
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={ <Home />}/>
      <Route path='/signup' element={ <Signup /> } />
      <Route path='/tasks' element={ user ? <Tasks /> : <Home />} />
      <Route path='/logout' element={ <Logout /> } />
      <Route path='*' element={ <NotFound />}/>
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
} 

export default App