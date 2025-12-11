import React, { useEffect, useState } from 'react'
import { supabase } from '../src/supabase-client'
import Try from './components/userQuote/Try';

function App2() {
    let [allCars, setAllcars] = useState([])
      const [inputs, setInputs] = useState([""]); // start with 1 input
// const [arr, setarr] = useState([])




// useEffect(()=>{
// console.log("call", allCars);
// }, [allCars])



let [NoOfCars, setNoOfCars] = useState([])




        async function CarsData(){
              const { data, error } = await supabase.from("cars").select("*");
                 console.log(data)    
                setAllcars(data)   
           
                // setarr(data)           
          }

          useEffect(()=>{
            CarsData()
          },[])



            const handleAdd = () => {
    setInputs([...inputs, ""]);
  };

 
    // Optional: remove an input
const handleRemove = (index) => {
  const newInputs = inputs.filter((_, i) => i !== index);
  setInputs(newInputs);
};

  return (
   <>
   
   {

    inputs.length > 0 &&
        inputs.map((a, i)=>(
        <Try value={allCars} 
        key={i} 
        onRemove={() => handleRemove(i)} 
      setNoOfCars={setNoOfCars}
      NoOfCars={NoOfCars}/>
    ))}


    <button className='p-3 border-2 border-black text-black' onClick={handleAdd}>Add more</button>

        <button className='p-3 border-2 border-blue-600 text-black bg-gray-500'
        onClick={()=>{
            
        }}>save</button>

   </>
  )
}

export default App2