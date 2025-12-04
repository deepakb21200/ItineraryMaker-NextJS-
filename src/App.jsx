import React from 'react'
import FillDetails from './components/FillDetails'
// import Trips from './components/Trips'

import { Routes, Route, } from 'react-router-dom';
import InProgress from './components/InProgress';
import Header from './components/Trips';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import All from './components/dashboard/All';
import Cancelled from './components/dashboard/Cancelled';
import Dropped from './components/dashboard/Dropped';
import NewQuery from './components/dashboard/NewQuery';
import Converted from './components/dashboard/Converted';
import OnTrip from './components/dashboard/OnTrip';
import PastTrips from './components/dashboard/PastTrips';

function App() {
  return (
    <div className='main'>

    <Header/>

      <Routes>
        <Route path="/" element={<Home/>} />

        <Route  />

 
 



        <Route path="/trips" element={<Dashboard/>}>
  <Route index element={<NewQuery />} />   
  <Route path="new-query" element={<NewQuery />} />
  <Route path="in-progress" element={<InProgress />} />
  <Route path="converted" element={<Converted />} />
  <Route path="on-trip" element={<OnTrip />} />
  <Route path="past-trips" element={<PastTrips />} />
  <Route path="cancelled" element={<Cancelled/>} />
  <Route path="dropped" element={<Dropped />} />
  <Route path="all" element={<All/>} />
 
   
</Route>

  <Route path="/trips/new" element={<FillDetails />} />
















   
        <Route path ="/inprogress" element={<InProgress/>}/>

      </Routes>
    </div>
  )
}

export default App