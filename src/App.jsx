import { Router, Routes, Route, Navigate } from "react-router-dom"
import Authentication from "./pages/Authentication"
import Home from "./pages/Home"
import { ToastContainer } from 'react-toastify'
import Profile from "./pages/profile"
import { auth } from "./service/firebase.service"
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer"

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  
  return (
    <>

      <Routes>
        <Route path="/create" element={user ? <Navigate to="/profile" /> : <Authentication />} />
        <Route path="/" element={user ? <Navigate to="/profile" /> : <Home />} />
        <Route path="/profile" element={user? <Profile /> : <Navigate to="/create" />} />
      </Routes>
        <Footer />
      <ToastContainer />

    </>
  )
}

export default App
