import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/Signup'
import Tasks from './pages/Tasks'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Logout from './pages/Logout'
import Footer from './components/Footer'
import TermsAndPrivacy from './pages/TermsAndPrivacy'
import { useContext } from "react";
import { Context } from "./context/userContext/Context";
import Board from './components/Board/TaskList'


function App() {
  const { user } = useContext(Context)
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/tasks' element={user ? <Tasks /> : <Home />} />
          <Route path='/Login' element={<Home />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/TermsAndPrivacy' element={<TermsAndPrivacy />} />
          <Route path='/test' element={<Board />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App