import React from 'react'
import FillDetails from './components/FillDetails'
import Trips from './components/Trips'
import { Routes, Route, } from 'react-router-dom';
import InProgress from './components/InProgress';

function App() {
  return (
    <div className='main'>
 
    

      <Routes>
        <Route path="/" element={<Trips/>} />

        <Route path="/trips" element={<FillDetails/>} />
        <Route path ="inprogress" element={<InProgress/>}/>

      </Routes>
    </div>
  )
}

export default App