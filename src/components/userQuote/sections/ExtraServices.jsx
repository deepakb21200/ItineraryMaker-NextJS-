import React, { useState } from 'react'
import {supabase} from  "../../../supabase-client"
 

 

function ExtraServices({ services, setServices }) {
  
    
      const addService = () => {
        setServices(prev => [
          ...prev,
          { service: "", price: "", day: "", comment: "" }
        ]);
      };
    
      const handleChange = (index, field, value) => {
        const updated = [...services];
        updated[index][field] = value;
        setServices(updated);
      };
    
      const totalPrice = services.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      );
    
    
    
    const removeService = (index) => {
      const updated = services.filter((_, i) => i !== index);
      setServices(updated);
    
      // agar sab remove ho gaye to total hide
      if (updated.length === 0) {
        setShowTotal(false);
      }
    };
    
    
    
    let [getService, setGetService] = useState([])
    let [openServiceIndex, setOpenServiceIndex] = useState(null)
          async function extraService(){
              const { data, error } = await supabase.from("extra_services").select("services").single();
                 console.log(data.services)    
                 setGetService(data.services)
               
          }
    
    const [showTotal, setShowTotal] = useState(false);
    
    
  return (
 
    <div className='any_extra'>
      <div>
        <h3 className='font-bold text-xl'>Any extra or sightseeing in Transportation</h3>
        <p>Add any extra services like any side destination trip that is provided only per customer request</p>
      </div>
       <div className="g ">

      {/* SERVICE ROWS */}

      {services.map((item, index) => (
        <div  key={index}   className="flex  flex-wrap gap-4 items-end border p-4 rounded" >

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Service</label>
      <div className='relative'>
              <input  type="text"  className="border px-3 py-2 rounded"   value={item.service}
          onFocus={() => {
            extraService()     
          setOpenServiceIndex(index)
        }}
        onBlur={() => setOpenServiceIndex(null)}
        onChange={(e) =>
          handleChange(index, "service", e.target.value)
        } />

           {/* DROPDOWN */}
      {openServiceIndex === index && (
        <div
          className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]"
          onMouseDown={(e) => e.preventDefault()}  >
          {getService.map((val, i) => (
  <label  key={i}  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100" >
    <input
      type="radio"
      name={`service-${index}`}   // 👈 same row ke radios ek group
      checked={item.service === val}
      onChange={() => {
        handleChange(index, "service", val); // 👈 input me value set
        setOpenServiceIndex(null);           // 👈 dropdown close
      }}
    />
    <span>{val}</span>
  </label>
))}

        </div>
      )}
      </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Total Price (INR)</label>
          <input   type="number" className="border px-3 py-2 rounded"
           value={item.price}
            onChange={(e) =>
       handleChange(index, "price", e.target.value)
       }
          onBlur={() => {
       setShowTotal(true); // 👈 focus hatne ke baad
      }}/>

          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Day</label>
            <input
              type="text"
              className="border px-3 py-2 rounded"
              value={item.day}
              onChange={(e) =>
                handleChange(index, "day", e.target.value)
              }
            />
          </div>

          <div className="flex flex-col ">
        
              <label className="font-semibold mb-1">Comments</label>
            <input   type="text"  className="border px-3 py-2 rounded"  value={item.comment}
              onChange={(e) =>
                handleChange(index, "comment", e.target.value)
              } />
     
 


          </div>



            <button  type="button" onClick={() => removeService(index)}
    className="mb-2 text-red-500 hover:text-red-700 text-xl font-bold"  title="Remove" >
    × </button> 
        </div>
      ))}

      {/* TOTAL */}
    {showTotal && totalPrice > 0 && (
  <div className="text-lg font-semibold ml-auto text-right">
    Others INR: <span className="text-green-600">{totalPrice}</span>
  </div>
)}
    {/* ADD SERVICE BUTTON */}
      <button
        onClick={addService}
        className="text-blue-600 border border-gray-300 px-4 py-2 rounded-xl"
      >
        Add Service
      </button>


    </div>


    </div>
  )
}

export default ExtraServices