 
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    let navigate = useNavigate()
  return (
     <>
   <div className='p-2 '>
    <div className='flex items-center justify-between '>
        <div><h2 className='font-bold text-2xl'>Trips</h2></div>
        <div>
            <input type="text" className='p-2 w-[450px]  rounded-lg' placeholder='Search by Id, guest, phone numbers' />
            <button className='font-semibold  p-2 bg-blue-600 text-white rounded-lg ml-3' onClick={()=>{
navigate("/trips/new")
            }}>Add New Query</button>
        </div>
    </div>



    <div className='flex  gap-2 justify-between'>
 
 


<ul className="[&>li]:p-2  text-[grey] font-semibold [&>li>a:hover]:text-black  ">
  <li><Link to="new-query" className='w-[100%]'>New Query</Link></li>
  <li><Link to="in-progress">In Progress</Link></li>
  <li><Link to="converted">Converted</Link></li>
  <li><Link to="on-trip">On Trip</Link></li>
  <li><Link to="past-trips">Past Trips</Link></li>
  <li><Link to="cancelled">Cancelled</Link></li>
  <li><Link to="dropped">Dropped</Link></li>
  <li><Link to="all">All</Link></li>
</ul>


<div className='py-5 px-3   font-bold text-2xl w-full'>
  <Outlet/>
</div>

    </div>

   </div>
     </>
  )
}

export default Dashboard