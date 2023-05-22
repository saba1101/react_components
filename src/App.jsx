import { useState } from 'react'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import Home from './views/home/Home.jsx'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            index
            element={<Home/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
