// import React, { useEffect, useState } from 'react'
// import { supabase } from '../../supabase-client'
// function Try({value}) {
//     let [allCars, setAllcars] = useState(value)
//     console.log(value, "props");
//     console.log("ok");
    

//     let [dropdown, setShowDropdown] = useState(false)


// let [carSearch, setCarSearch] = useState("")



//   // ✅ Sync prop changes to local state
//   useEffect(() => {
//     setAllcars(value);
//   }, [value]);

    
//   return (

//     <>
// <div className='relative'>
//         <input type="text" placeholder="Enter type" className="border border-gray-400 rounded px-2 py-1 w-full"  
//      value={carSearch}
//                      onFocus={async() => {
//                     //  await CarsData()
//                      setShowDropdown(true)
//                     }} 
                    
//                     onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // small delay

//                      onChange={(e)=>setCarSearch(e.target.value)}
//                     />


                    
//     {
//         dropdown && 
//                              <div className='absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'
//       onMouseDown={(e) => e.preventDefault()}  >

//       {/* {inputValue === "" && <div className="px-3 py-2 text-gray-500">Type to search</div>} */}

//       {allCars.length > 0 &&
//         allCars.map((val, index) => (
//           <label
//             key={index}
//             className='flex items-center px-[12px] py-[8px] border-b border-gray-200 cursor-pointer' >
//             <input
//               type="radio"
//               name={`selectedHotel${index}`}
//               className='mr-2 checked:bg-transparent appearance-none w-4 h-4 border border-gray-400 rounded-full focus:outline-none'
//               onClick={() => {
//                 setCarSearch(val.car_name)
//                 setShowDropdown(false)
//               }}/>
//             {val.car_name}
//           </label>
//         ))
//       } 


//     </div>
//     }





// </div>



  



     
//     </>
                
                   
//   )
// }

// export default Try


















 import { supabase } from '../../supabase-client'

import React, { useEffect, useState } from 'react';

function Try({value, onRemove, NoOfCars, setNoOfCars}) {

  const [dropdown, setShowDropdown] = useState(false);
  const [carSearch, setCarSearch] = useState("");


useEffect(()=>{
console.log(value,"of");

},[value])

  return (
    <div className='relative'>
      <input
        type="text"
        placeholder="Enter type"
        className="border border-gray-400 rounded px-2 py-1 w-[50%]"
        value={carSearch}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        onChange={(e) => {setCarSearch(e.target.value)                     
        }}/>

        <input type="number"  className="border border-gray-400 rounded px-2 py-1 w-[50%]" />


      {dropdown && (
        <div
          className='absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'
          onMouseDown={(e) => e.preventDefault()} >
          {value.length >0 &&(
            value.map((val, index) => (
              <label
                key={index}
                className='flex items-center px-[12px] py-[8px] border-b border-gray-200 cursor-pointer'
              >
                <input
                  type="radio"
                  name={`selectedCar${index}`}
                  className='mr-2 appearance-none w-4 h-4 border border-gray-400 rounded-full focus:outline-none'
                   value={val.car_name}   // ← YEH ADD KAREIN
                  onClick={(e) => {
                    setCarSearch(val.car_name);
                    setShowDropdown(false);
                    // console.log("vallllllllll", val);

                      console.log("vallllllllll", val.car_name);

              
                  

                         
                  }}
                
                />
                {val.car_name}
              </label>
            ))
          )}
        </div>
      )}


      <button className='border-2 border-black text-black' onClick={onRemove}>remove</button>
    </div>
  );
}

export default Try;
