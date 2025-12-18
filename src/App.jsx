import React, { useEffect, useState } from 'react'
import FillDetails from './components/FillDetails'
// import Trips from './components/Trips'
 
import { Routes, Route, } from 'react-router-dom';
import InProgress from './components/InProgress';
 
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import All from './components/dashboard/All';
import Cancelled from './components/dashboard/Cancelled';
import Dropped from './components/dashboard/Dropped';
import NewQuery from './components/dashboard/NewQuery';
import Converted from './components/dashboard/Converted';
import OnTrip from './components/dashboard/OnTrip';
import PastTrips from './components/dashboard/PastTrips';
import SignIn from './components/SignIn';
import Header from './components/Header';
import Mypage from './components/Mypage';



import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer"
import Example from './components/Example';
import DownlaodPDF from './components/dashboard/DownlaodPDF';
import CustomerDetails from './components/dashboard/CustomerDetails';
import TripDetails from './components/userQuote/TripDetails';
import NewQuote from './components/userQuote/NewQuote';
import Try from './components/userQuote/Try';
import Edit from './components/userQuote/Edit';
 

function App() {
const [showPreview, setShowPreview] = useState(false)

 const myDoc =   <Mypage/>;
  return (
    <div className='main  '>
<Header  />
{/* <PDFViewer style={{width:"100%", height:"100vh"}}>
  <Mypage/>
  <Example/>
</PDFViewer> */}
      {/* <button onClick={()=>{
        setShowPreview(true)
      }}>Click to Preview PDF</button>

 {showPreview && (
        <div style={{ marginTop: 20 }}>
          <PDFViewer width="100%" height="500">
            {myDoc}
          </PDFViewer>
          </div>)} */}


{/* {showPreview ? 
<PDFViewer width="100%" height="1000px">{myDoc}</PDFViewer>
 : <button onClick={()=>{setShowPreview(true)}}>Click to Preview PDF</button>} */}







     <div>


     </div>






      <Routes>
        <Route path="/" element={<Home/>} />

           {/* <Route path="/" element={<Try/>} /> */}

  {/* <Route path="new-query" element={<NewQuery />} /> */}

        <Route  />
        <Route path="/logins" element={<SignIn/>} />
        <Route path="/trips" element={<Dashboard/>}>
        
         <Route index element={<NewQuery />} />  
         <Route path="in-progress" element={<InProgress />} />
         <Route path="converted" element={<Converted />} />
         <Route path="on-trip" element={<OnTrip />} />
         <Route path="past-trips" element={<PastTrips />} />
         <Route path="cancelled" element={<Cancelled/>} />
         <Route path="dropped" element={<Dropped />} />
         <Route path="all" element={<All/>} />
          <Route path="new-query" element={<NewQuery />} />
</Route>
 <Route path="/trips/new" element={<FillDetails />} />


 

   <Route path ="/inprogress" element={<InProgress/>}/>
  <Route path="/trips/:id" element={<TripDetails />} />

    <Route path ="/trips/:id/newQuote" element={<NewQuote/>}/>


     {/* Edit Itinerary – NEW PAGE */}
        {/* <Route  path="/trips/:id/newQuote/edit-iternary"   element={<Edit/>}/> */}
         <Route
          path="/trips/:tripId/quotes/:formNo/edit-iternary"  element={<Edit />} />
        
      </Routes>
    </div>
  )
}

export default App