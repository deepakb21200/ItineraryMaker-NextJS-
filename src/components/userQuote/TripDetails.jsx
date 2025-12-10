import React, { useEffect, useState } from 'react'
import { FaCalendar, FaMoon, FaUsers, FaUser, FaPhone } from "react-icons/fa";
import { supabase } from "../../supabase-client"
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';


function TripDetails() {
   const [userDetails, setUserDetails] = useState(null)
   let {id} = useParams()
 
   
   
  useEffect(()=>{
      async function userData(){
        //  const { data, error } = await supabase.from("form_1").select("*").single();
     
        
           const { data, error } = await supabase.from("form_1").select("*").eq("formNo", id).single()
           console.log(data);
           
         console.log(data)    
         setUserDetails(data)
        }
        
        userData()

  },[])


  return (
    userDetails ? 
     <>
    {/* <div className='px-3 py-2 '>
      <div>
        <ul className='flex gap-3 [&>li]:font-bold [&>li]:text-xl'>
          <li>#{userDetails.formNo}</li>
          <li>{userDetails.userName}</li>
          <li>{userDetails.destination}</li>
          <li>{userDetails.querysource}</li>
          <li>{userDetails.referenceid}</li>
          <li>Initiated</li>
        </ul>

       <div className='de'>
         <div className='flex gap-3'>
          <div>{userDetails.startDate}</div>
          <div>{userDetails.noOfNights}N,{userDetails.noOfDays}D</div>
          <div>{userDetails.noOFAdults}Adults</div>
        </div>


    <div className='flex gap-3'>
          <div> {userDetails.userName}</div>
          <div>{userDetails.userNumber}</div>
        </div>

         
         


       </div> 

   


      </div>


    </div> */}


     <div className="px-3 py-4  mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        
        {/* TOP HEADER */}
        <ul className="flex flex-wrap gap-3 font-bold text-lg md:text-xl mb-4">
          <li>#{userDetails.formNo}</li>
          <li>{userDetails.userName}</li>
          <li>{userDetails.destination}</li>
          <li>{userDetails.querysource}</li>
          <li>{userDetails.referenceid}</li>
          <li className="text-green-700">Initiated</li>
        </ul>

        <div className="space-y-4">

          {/* START DATE + NIGHTS–DAYS + ADULTS */}
          <div className="flex flex-wrap gap-5 text-gray-800">

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              <FaCalendar className="text-blue-600" />
              <p>{userDetails.startDate}</p>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              <FaMoon className="text-purple-600" />
              <p>{userDetails.noOfNights}N, {userDetails.noOfDays}D</p>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              <FaUsers className="text-orange-600" />
              <p>{userDetails.noOFAdults} Adults</p>
            </div>
          </div>

          {/* USER NAME + NUMBER */}
          <div className="flex flex-wrap gap-5 text-gray-800">

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg min-w-[150px]">
              <FaUser className="text-blue-600" />
              <p>{userDetails.userName}</p>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg min-w-[150px]">
              <FaPhone className="text-green-600" />
              <p>{userDetails.userNumber}</p>
            </div>

          </div>
        </div>

      </div>

    {/* BUTTON  */}
          <div className="mt-2">
            <Link className='p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition'
            to={`/trips/${id}/newQuote`}>
              Create Custom Quotation</Link>
          
          </div>

    </div>
    </>
    : <h1 className='text-4xl font-bold'>deepak</h1>
  )
}

export default TripDetails