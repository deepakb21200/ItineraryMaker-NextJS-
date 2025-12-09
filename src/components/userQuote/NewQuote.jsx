import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { supabase } from '../../supabase-client'
function NewQuote() {


let [userData, setUserData] = useState(null)
let [stayNights,setStayNights] = useState([])
let [stayHotel, setStayHotel] = useState([])

      useEffect(()=>{
          async function userData(){
             const { data, error } = await supabase.from("form_1").select("*").single();
             console.log(data)    

             setUserData(data)
             setStayNights(data.nightDates)
             setStayHotel()
             
    
            }
            
            userData()
    
      },[])


      useEffect(()=>{
         function getData()
      },[])



//   return (
//      userData ? 
//      <div className='px-4 border-2 py-3'>
//         <div className='flex items-center gap-2'>
//             <button><FaArrowLeft /></button>
//             <span className='font-bold text'>New Quote</span>
//         </div>

//         <div>
//             <h3>Basic Details</h3>
//             <p>Please review basic details for this quote. You can edit these details to provide a quote with different configuration, without changing
//                 the trip details. </p>
//         </div>

//         <div>
//             <table>
//                 <thead>
//                     <tr className='uppercase text-left'>
//                         <th>destination</th>
//                         <th>start date</th>
//                         <th>duration</th>
//                         <th>pax</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr className='font-bold'>
//                         <td>{userData.destination}</td>
//                         <td>{userData.startDate}</td>
//                         <td>{`${userData.noOfNights} nights, ${userData.noOfDays} Days`}</td>
//                         <td>{userData.noOfAdults} Adults</td>
//                     </tr>
//                 </tbody>
//             </table>

//             <div>
//                 Edit Basic Details
//             </div>
//         </div>

//      </div> : <h1></h1>
//   )


      async function getData(){
          const { data, error } = await supabase.from("Hotels").select("*");
             console.log(data)    

      }

 return (
    <>
      {userData ? (
        <div className="px-4 py-4 border-2 rounded-lg  mx-auto space-y-6 bg-blue-100">
          
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-4">
            <button className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition">
              <FaArrowLeft />
            </button>
            <span className="font-bold text-xl">New Quote</span>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Basic Details</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Please review basic details for this quote. You can edit these details to provide a quote with different configuration, without changing the trip details.
            </p>
          </div>

          {/* TABLE + BUTTON ROW */}
          <div className="flex flex-col  sm:flex-row sm:items-center xl:items-start sm:justify-between xl:justify-start gap-4">
            
            {/* TABLE */}
            <div className="overflow-x-auto   sm:w-auto flex justify-start">
              <table className=" border-collapse text-left border-2 border-black">
                <thead>
                  <tr className="uppercase text-gray-500 text-sm sm:text-base border-b">
                    <th className="px-3 py-2">Destination</th>
                    <th className="px-3 py-2">Start Date</th>
                    <th className="px-3 py-2">Duration</th>
                    <th className="px-3 py-2">Pax</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-semibold  transition rounded-lg">
                    <td className="px-3 py-2">{userData.destination}</td>
                    <td className="px-3 py-2">{userData.nightDates[0]}</td>
                    <td className="px-3 py-2">{`${userData.noOfNights} nights, ${userData.noOfDays} Days`}</td>
                    <td className="px-3 py-2">{userData.noOFAdults} Adults</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* EDIT BUTTON */}
            <div className="">
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
                Edit Basic Details
              </button>
            </div>

          </div>


          <div className='bg-white p-2 text-black font-semibold'>Package Types / Categories: 1 Option</div>

          <div>
            <h2>Hotels</h2>
            <p>Please add hotels details</p>

 
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300">
  Add Hotel
</button>

<div>
  <h2 className='font-bold'>Any special inclusions in hotels</h2>
  <p>Add any extra services for hotels e.g, special dinner, honeymoon cake etc.</p>
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300">
  Add services
</button>

<div className="flex space-x-6 items-end">
  {/* <!-- Stay Nights --> */}
  <div className="flex flex-col relative">
    <label htmlFor="stay-nights" className="text-gray-700 font-medium">Stay Nights</label>
    <input type="text" id="stay-nights" placeholder="Enter nights" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={()=>{
console.log(stayNights);

    }}/>


    <div className='absolute  top-full left-0 w-full max-h-[15vh] overflow-y-auto  text-black  border      z-1000 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'>
{stayNights.length > 0 &&
  stayNights.map((date, index) => (
    <div key={index} className="flex items-center px-3 py-2 cursor-pointer border-b-2 border-grey">
      <input
        type="checkbox"
        id={`night-${index}`}
        name="selectedNights"
        value={date}
        className="mr-2"
      />
      <label htmlFor={`night-${index}`}>{date}</label>
    </div>
  ))
}


    </div>
  </div>

  {/* <!-- Hotel --> */}
  <div className="flex flex-col">
    <label htmlFor="hotel" className="text-gray-700 font-medium">Hotel</label>
    <input type="text" id="hotel" placeholder="Hotel name" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={()=>{

      getData()
    }}/>
  </div>

  {/* <!-- Meal Plan --> */}
  <div className="flex flex-col">
    <label htmlFor="meal-plan" className="text-gray-700 font-medium">Meal Plan</label>
    <input type="text" id="meal-plan" placeholder="Meal plan" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>

  {/* <!-- Room Type --> */}
  <div className="flex flex-col">
    <label htmlFor="room-type" className="text-gray-700 font-medium">Room Type</label>
    <input type="text" id="room-type" placeholder="Room type" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>
</div>

<div className="flex space-x-6 items-end">
  {/* <!-- Pax/Room --> */}
  <div className="flex flex-col">
    <label htmlFor="pax-room" className="text-gray-700 font-medium">Pax/Room</label>
    <input type="number" id="pax-room" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

 


  </div>
 
  {/* <!-- No. of Rooms --> */}
  <div className="flex flex-col">
    <label htmlFor="no-of-rooms" className="text-gray-700 font-medium">No. of Rooms</label>
  

    <input type="number" id="no-of-rooms" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>

  {/* <!-- AWEB --> */}
  <div className="flex flex-col">
    <label htmlFor="aweb" className="text-gray-700 font-medium">AWEB</label>
    <input type="number" id="aweb" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>

  {/* <!-- CWEB --> */}
  <div className="flex flex-col">
    <label htmlFor="cweb" className="text-gray-700 font-medium">CWEB</label>
    <input type="number" id="cweb" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>

  {/* <!-- CNB --> */}
  <div className="flex flex-col">
    <label htmlFor="cnb" className="text-gray-700 font-medium">CNB</label>
    <input type="number" id="cnb" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>
</div>




</div>

          </div>

        </div>
      ) : (
        <h1 className="text-center text-gray-400 py-10">Loading...</h1>
      )}
    </>
  );
}

export default NewQuote