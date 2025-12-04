import React from 'react'
import { Link, Outlet } from "react-router-dom";
function Dashboard() {
  return (
     <>
   <div className='p-2 border-4 border-red-500'>
    <div className='flex items-center justify-between border-4 border-yellow-500'>
        <div><h2 className='font-bold text-2xl'>Trips</h2></div>
        <div>
            <input type="text" className='p-2 w-[450px] border-2 border-black rounded-lg' placeholder='Search by Id, guest, phone numbers' />
            <button className='font-semibold  p-2 bg-blue-600 text-white rounded-lg ml-3'>Add New Query</button>
        </div>
    </div>



    <div className='flex border-4 border-pink-700  gap-2 justify-between'>
 
{/* [&>li]:p-2 */}
  {/* <ul className="[&>li]:p-2  text-[grey] font-semibold [&>li>a:hover]:text-black  border-2 border-green-500">
  <li ><Link to="/new-query" className='w-[100%]'>New Query</Link></li>
  <li><Link to="/in-progress">In Progress</Link></li>
  <li><Link to="/converted">Converted</Link></li>
  <li><Link to="/on-trip">On Trip</Link></li>
  <li><Link to="/past-trips">Past Trips</Link></li>
  <li><Link to="/cancelled">Cancelled</Link></li>
  <li><Link to="/dropped">Dropped</Link></li>
  <li><Link to="/all">All</Link></li>
</ul> */}


<ul className="[&>li]:p-2  text-[grey] font-semibold [&>li>a:hover]:text-black  border-2 border-green-500">
  <li><Link to="new-query" className='w-[100%]'>New Query</Link></li>
  <li><Link to="in-progress">In Progress</Link></li>
  <li><Link to="converted">Converted</Link></li>
  <li><Link to="on-trip">On Trip</Link></li>
  <li><Link to="past-trips">Past Trips</Link></li>
  <li><Link to="cancelled">Cancelled</Link></li>
  <li><Link to="dropped">Dropped</Link></li>
  <li><Link to="all">All</Link></li>
</ul>


<div className='py-5 px-3 border-2 border-purple-600 font-bold text-2xl w-full'>
  <Outlet/>
</div>

    </div>

   </div>
     </>
  )
}

export default Dashboard