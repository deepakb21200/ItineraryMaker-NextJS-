import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase-client'

function TripDetails() {
   const [userDetails, setUserDetails] = useState(null)
  useEffect(()=>{
      async function userData(){
         const { data, error } = await supabase.from("form_1").select("*").single();
         console.log(data)    
         setUserDetails(data)

        }
        
        userData()

  },[])


  return (
    userDetails ? 
     <>
    <div className='px-3 py-2 '>
      <div>
        <ul className='flex gap-3 [&>li]:font-bold [&>li]:text-xl'>
          <li>#{userDetails.formNo}</li>
          <li>{userDetails.userName}</li>
          <li>{userDetails.destination}</li>
          <li>{userDetails.querysource}</li>
          <li>{userDetails.referenceid}</li>
          <li>Initiated</li>
        </ul>

        <div>
          <div></div>
          <div></div>
        </div>
      </div>


    </div>
    </>
    : <h1 className='text-4xl font-bold'>deepak</h1>
  )
}

export default TripDetails