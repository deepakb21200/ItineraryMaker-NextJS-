import React, { useEffect } from 'react'

function TripDetails() {

  useEffect(()=>{
      async function userData(){
         const { data, error } = await supabase.from("TourDestination").select("*");
         console.log(data);
         
    }


    userData()

  },[])


  return (
    <div>TripDetails</div>
  )
}

export default TripDetails