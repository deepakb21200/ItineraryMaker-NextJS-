import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { supabase } from '../../supabase-client'
function NewQuote() {


let [userData, setUserData] = useState(null)

      useEffect(()=>{
          async function userData(){
             const { data, error } = await supabase.from("form_1").select("*").single();
             console.log(data)    

             setUserData(data)
             
    
            }
            
            userData()
    
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
          <div className="flex flex-col sm:flex-row sm:items-center xl:items-start sm:justify-between xl:justify-start gap-4">
            
            {/* TABLE */}
            <div className="overflow-x-auto w-full sm:w-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="uppercase text-gray-500 text-sm sm:text-base border-b">
                    <th className="px-3 py-2">Destination</th>
                    <th className="px-3 py-2">Start Date</th>
                    <th className="px-3 py-2">Duration</th>
                    <th className="px-3 py-2">Pax</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-semibold bg-gray-50 transition">
                    <td className="px-3 py-2">{userData.destination}</td>
                    <td className="px-3 py-2">{userData.startDate}</td>
                    <td className="px-3 py-2">{`${userData.noOfNights} nights, ${userData.noOfDays} Days`}</td>
                    <td className="px-3 py-2">{userData.noOfAdults} Adults</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* EDIT BUTTON */}
            <div className="flex-shrink-0">
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
                Edit Basic Details
              </button>
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