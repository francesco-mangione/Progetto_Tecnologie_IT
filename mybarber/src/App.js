import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login/Login"
import HomePage from './Homepage/Homepage'
import Barbermain from "./Barberpage/barberpage"
import Gome from "./Homepage/guestPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
					<Route path="/gome" element={<Gome />} />
          <Route path="/barberhome" element={<Barbermain />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App

