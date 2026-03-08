import { Router, Routes, Route, Navigate } from "react-router-dom"
import Authentication from "./pages/Authentication.jsx"
import Home from "./pages/Home.jsx"
import { ToastContainer } from 'react-toastify'
import Profile from "./pages/Profile.jsx"
import { auth } from "./service/firebase.service.js"
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer.jsx"

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
