import React, { use, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { supabase } from '../../supabase-client'
import { useParams } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import ExtraServices from './sections/ExtraServices';
import Hotels from './sections/Hotels';


function NewQuote() {
 
let [userData, setUserData] = useState(null)
 
let [mealSearch, setMealSearch]= useState("")
 
let [roomSearch, setRoomSearch] = useState("")
let [stayNights, setStayNights] = useState([])
 


let {id} = useParams()

let [showModal, setShowModal] = useState(false)
let [allCars, setAllcars] = useState([])

 

let [stayNights2, setStayNights2] = useState([])

 
 
 

let [transportDisplay, setTransportDisplay] = useState(false)

let[ maxRows, setMaxRows] = useState(null)
// let [showCars, setShowCars]= useState([])

      const fetchRows = async () => {
        
      const { data } = await supabase
      .from("car_entries")
      .select("*")
      .eq("form_no", id);
      // console.log(data,"hell");
      


       if (data) {
      let mappedRows = data.map(d => ({
        car_name: d.car_name,
        quantity: d.quantity,
        showDropdown: false,
        db_id: d.id
      }));

 
      console.log(data);
      
  
      
  
    
       if (mappedRows.length === 0) {
    mappedRows = [{ car_name: "", quantity: "", showDropdown: false, db_id: null }]}
   setRows(mappedRows);


    }
    }

 



 

useEffect(()=>{
  console.log(stayNights,"12");
  
},[stayNights])

 

const [activeDays, setActiveDays] = useState(1);
const [dayDropdown, setDayDropdown] = useState([]);
// example: [true, false, false]
const [serviceDropdown, setServiceDropdown] = useState([]);

const [serviceTypeDropdown, setServiceTypeDropdown] = useState([]);

const [selectedServiceType, setSelectedServiceType] = useState([]); 
const [selectedServiceLocation, setSelectedServiceLocation] = useState([]);



// 22
const [rows, setRows] = useState([
  { car_name: "", quantity: "", showDropdown: false, db_id: null , flag:false}
]);


// Row Add

const addRow = () => {
  if (rows.length < maxRows) {
    setRows([...rows, { car_name: "", quantity: "", showDropdown: false, db_id: null , flag:false}]);
  }
};


// Row Remove
const removeRow = (index) => {
  setRows(rows.filter((_, i) => i !== index));
};
 

 
 
const saveCars = async () => {
  try {
    // 1️⃣ Fetch existing rows from Supabase for this form_no
    const { data: dbRows } = await supabase
      .from("car_entries")
      .select("*")
      .eq("form_no", id);

    // 2️⃣ IDs for comparison
    const dbIds = dbRows.map(r => r.id); // DB me jo rows already hain
    const uiIds = rows.filter(r => r.db_id).map(r => r.db_id); // UI me jo rows hain with db_id

    // 3️⃣ DELETE → jo UI me nahi hain
    const toDelete = dbIds.filter(id => !uiIds.includes(id));

    if (toDelete.length) {
      await supabase.from("car_entries").delete().in("id", toDelete);
    }

    // 4️⃣ INSERT / UPDATE → UI me jo rows hain
    for (let row of rows) {
      if (!row.car_name || !row.quantity) continue; // blank skip

      if (row.db_id) {
        // UPDATE existing row
        await supabase
          .from("car_entries")
          .update({ car_name: row.car_name, quantity: Number(row.quantity) })
          .eq("id", row.db_id);
      } else {
        // INSERT new row
        const { data } = await supabase
          .from("car_entries")
          .insert({
            form_no: id,
            car_name: row.car_name,
            quantity: Number(row.quantity)
          })
          .select();
        row.db_id = data[0].id; // assign db_id for future updates
      }
    }

    alert("Saved successfully!");
  } catch (err) {
    console.error(err);
    alert("Error saving data");
  }
};





useEffect(() => {

     fetchRows();

    
 
    
 
}, [showModal]);





  const [services, setServices] = useState([]);
 





 




 

      useEffect(()=>{
          async function userData(){
             const { data, error } = await supabase.from("form_1").select("*").eq("formNo",id).single();
            //  console.log(data)    
             setUserData(data)
             setStayNights(data.nightDates)
             setMaxRows(data.nightDates.length)
              setStayNights2(data.nightDates)
            //  setSelectedNights(data.nightDates)
            }

            userData()
      },[])
 


      async function getData2(){
          const { data, error } = await supabase.from("Hotels").select("*");
             console.log(data)    
             setStayHotel(data)
           
      }

      let [serviceLocation, setServiceLocation]= useState([])
      let [serviceName, setserviceName]= useState([])

            async function getData3(){
          const { data, error } = await supabase.from("services_tour").select("*");
             console.log(data)    
             setServiceLocation(data)
           
      }



       async function CarsData(){
          const { data, error } = await supabase.from("cars").select("*");
             console.log(data)    
            setAllcars(data)
           
      }


const saveRoomDetails = async () => {
  console.log("done");

  const { data, error } = await supabase
    .from("hotel_pricing")
    .upsert(
      {
        form_no: roomDetails.form_no,
        pax_room: Number(roomDetails.paxRoom) || 0,
        no_of_rooms: Number(roomDetails.noOfRooms) || 0,
        adult_with_extra_bed: Number(roomDetails.adultWithExtraBed) || 0,
        child_with_extra_bed: Number(roomDetails.childWithExtraBed) || 0,
        child_no_bed: Number(roomDetails.childNoBed) || 0,
        room_price: Number(roomDetails.roomPrice) || 0,
        aweb_price: Number(roomDetails.awebPrice) || 0,
        cweb_price: Number(roomDetails.cwebPrice) || 0,
        cnb_price: Number(roomDetails.cnbPrice) || 0,


        hotel_name:inputValue,
        meal_plan:mealSearch,
        room_type:roomSearch
      },
      {
        onConflict: 'form_no'  // ← ye ensure kare ki same form_no update ho, insert na ho
      }
    )
    .select(); // inserted/updated row ka data return kare
    setShowPopup(false)

  if (error) {
    console.log("Save/Update Error:", error);
  } else {
    console.log("Saved/Updated Successfully:", data);
  }
};


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
                    <td className="px-3 py-2">{userData.nightDates[0].date}</td>
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



          <Hotels 
        formId={id}
        stayNights={stayNights}
        onSaveRoomDetails={saveRoomDetails}/>

    
    
    


    {/* Transport and Activities */}

      <div className="p-4">
      {/* Trigger Div */}
      <div
        className="cursor-pointer"
        onClick={() => {
          setShowModal(true)
        }}
      >
        <h2 className="font-bold text-2xl text-black">Transports and Activities</h2>
        <div className="p-2 bg-green-300 flex gap-2 items-center relative">
          <input type="checkbox" />
          <span>Same Cab Type for All</span>
           {/* 66 */}
          {/* <div>
           
            Innova Crysta
          </div> */}

  
{
  rows.length > 0 &&
    rows.map((value, index) => (
      <button key={index} className='text-black p-2 border bg-red-200'>
        {value.car_name}
      </button>
    ))
}

        </div>
      </div>





      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-1/2 p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h3 className="font-bold text-xl mb-4">Add Transport / Activity</h3>

            {/* Table */}
        <table className="w-full border border-gray-300">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 border-b border-gray-300 text-left">Type</th>
      <th className="px-4 py-2 border-b border-gray-300 text-left">Quantity</th>
    </tr>
  </thead>

  <tbody>
    {rows.map((row, index) => (
       <tr key={index}>

        {/* <tr key={row.db_id || index}> */}
 

 
        <td className="border-b border-gray-300 px-4 py-2 relative">

          {/* CAR INPUT */}

          <input    type="text" placeholder="Enter type" className="border border-gray-400 rounded px-2 py-1 w-full"
            value={row.car_name}
            onFocus={async () => {
              await CarsData();
              const updated = [...rows];
              updated[index].showDropdown = true;
              setRows(updated);
            }}
      
            onBlur={(e) => { 
              const updated = [...rows];
              updated[index].showDropdown = false;
              setRows(updated);
            }}

            onChange={(e) => {
              const updated = [...rows];
              updated[index].car_name = e.target.value;
              setRows(updated);
            }}
          />

          {/* DROPDOWN */}
          {row.showDropdown && (
            <div className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]"
              onMouseDown={(e) => {
                e.preventDefault()
                      e.stopPropagation()}}>

              {allCars.map((val, i) => (
                <label
                  key={i}
                  className="flex items-center px-3 py-2 border-b border-gray-200 cursor-pointer"
                  onChange={() => {
                    const updated = [...rows];
                    updated[index].car_name = val.car_name;
                    updated[index].showDropdown = false;
                    setRows(updated);
                  }}>

                  <input type="radio" className="mr-2" /> {val.car_name}
                </label>
              ))}
            </div>
          )}
        </td>

        {/* QUANTITY */}
        <td className="border-b border-gray-300 px-4 py-2 flex gap-3">

          <input type="number" placeholder="type here!" className="border border-gray-400 rounded px-2 py-1 w-full" value={row.quantity ?? ""}
         min={1}
          
          onChange={(e) => {
            const updated = [...rows];
            updated[index].quantity = Number(e.target.value) || 1;
            setRows(updated);}}/>


          {/* REMOVE BUTTON */}
          {rows.length > 1 && (
            <button  className="border-2 border-black text-black p-1"  onClick={() => removeRow(index)} >
              remove </button>
  )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

                                        {/* Last me button */}
<button className={`px-3 py-2 mt-1 border rounded 
    ${rows.length >= maxRows ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"}`}
  onClick={addRow}
  disabled={rows.length >= maxRows}>Add More</button>


            {/* Save / Close buttons */}
            <div className="mt-4 flex  gap-2">

              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
               onClick={saveCars}> Select Cab Types</button>


             <button   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}



{
  !transportDisplay ? (
    <button
      className="bg-blue-600 mt-4 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded shadow-lg transition duration-300"
      onClick={() => {
        setTransportDisplay(true)
        setActiveDays(1)
      }}
    >
      Add services
    </button>
  ) : (
    <>
      {stayNights2.slice(0, activeDays).map((day, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-8 p-4 border   rounded">
          
          {/* LEFT */}
          <div className="flex-1 flex gap-4">
            <label className="flex flex-col">
              <span className="font-semibold mb-1">
                Days
              </span>
              <div className='relative'>
                <input type="text"  className="border rounded px-3 py-2"
                  onFocus={() => {
        const arr = [...dayDropdown];
        arr[index] = true;
        setDayDropdown(arr);
      }}
      onBlur={() => {
        const arr = [...dayDropdown];
        arr[index] = false;
        setDayDropdown(arr);
      }} />
      

                 {/* DROPDOWN */}
    {dayDropdown[index] && (
      <div className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto bg-white border z-50 shadow"
        onMouseDown={(e) => e.preventDefault()}   >
        {stayNights2.map((date, i) => (
          <div  key={i} className="flex items-center px-3 py-2 cursor-pointer border-b">
            <input    type="checkbox" className="mr-2"
              onClick={() => {
                const updatedRows = [...rows];
              // Toggle flag
             updatedRows[index].flag = !updatedRows[index].flag;
             setRows(updatedRows);  }}  />
            <label>{date}</label>
          </div>
        ))}
      </div>
    )}


  

              </div>
                 {
              rows[index].flag == true && (
                    <div  className="  items-center px-3 py-1 border-b border-gray-200">
                         <input   type="checkbox"   checked={true}  className="mr-2"
                      onChange={()=>{}}  />

        <span>{stayNights2[index]}</span>
      </div>
              )
            }
            </label>


           
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Service Location</span>
          <div className='relative'> 
            
   <input className="border px-3 py-2 rounded"  type="text" value={selectedServiceLocation[index] || ""} 
          onChange={(e) => {
             const selected = [...selectedServiceLocation];
              selected[index] = e.target.value; // user input se update
             setSelectedServiceLocation(selected);
              }}

          onFocus={() => {
              const arr = [...serviceDropdown];
              arr[index] = true;
               setServiceDropdown(arr);
              getData3();
            }}

            onBlur={() => {
              const arr = [...serviceDropdown];
              arr[index] = false;
             setServiceDropdown(arr);
            }}/>

      {/*  service DROPDOWN */}
  {serviceDropdown[index] && (
    <div  className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 bg-white shadow" onMouseDown={(e) => e.preventDefault()}>
      {serviceLocation.map((val, i) => (
        <label  key={i} className="flex items-center px-3 py-2 border-b cursor-pointer">
          <input type="radio"name={`serviceLocation-${index}`}   className="mr-2"
               onClick={() => {
            // Dropdown close
             const arr = [...serviceDropdown];
            arr[index] = false;
             setServiceDropdown(arr);

           // Input me value set karo
             const selected = [...selectedServiceLocation];
            selected[index] = val.service_locations; // jo value select hui
            setSelectedServiceLocation(selected);

             // Service Type array bhi set karo
           setserviceName(val.service_type);

          // Service Type input ke liye pehla value
            const selectedType = [...selectedServiceType];
            selectedType[index] = val.service_type[0];
           setSelectedServiceType(selectedType);
             }}  />
          {val.service_locations}
        </label>
      ))}
    </div>
  )}
     
     
     </div>   



            </label>

            <label className="flex flex-col">
              <span className="font-semibold mb-1">Service Type</span>
        <div className='relative'>
            <input  className="border px-3 py-2 rounded" 
             type="text"
  value={selectedServiceType[index] || ""} // ✅ controlled input
  onChange={(e) => {
    const updated = [...selectedServiceType];
    updated[index] = e.target.value; // user ke input se update
    setSelectedServiceType(updated);
  }}
 
        onFocus={() => {
        const arr = [...serviceTypeDropdown];
         arr[index] = true;   
           setServiceTypeDropdown(arr)}}
           
           
             onBlur={() => {
    
      const arr = [...serviceTypeDropdown];
      arr[index] = false; // hide dropdown
      setServiceTypeDropdown(arr);
    // timeout lagaya taaki dropdown pe click karne ka chance rahe
  }}/>




                 {/*SERVICE TYPE DROPDOWN */}
  {/* {serviceTypeDropdown[index] && (
    <div
      className="absolute mt-1 top-full left-0 w-full max-h-[15vh]
                 overflow-y-auto text-black border z-50 bg-white shadow"
      onMouseDown={(e) => e.preventDefault()}  >
      {serviceName.map((val, i) => (
        <label
          key={i}
          className="flex items-center px-3 py-2 border-b cursor-pointer"
        >
          <input
            type="radio"
            name={`serviceLocation-${index}`}   // 👈 IMPORTANT
            className="mr-2"
            onClick={() => {
              console.log("Selected for day", index, val.service_type[0]);

                let arr = [...serviceName]
                 arr[index] = true;

                   serviceTypeDropdown(arr);
            }}
          />
          {val.service_locations}
        </label>
      ))}
    </div>
  )} */}

  {serviceTypeDropdown[index] && (
  <div
    className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 bg-white shadow"
    onMouseDown={e => e.preventDefault()}
  >
    {serviceName.map((type, i) => (
      <label
        key={i}
        className="flex items-center px-3 py-2 border-b cursor-pointer"
      >
        <input
          type="radio"
          name={`serviceType-${index}`}
          className="mr-2"
          onClick={() => {
            const selected = [...selectedServiceType];
            selected[index] = type; // ✅ update input value
            setSelectedServiceType(selected);

            const arr = [...serviceTypeDropdown];
            arr[index] = false; // close dropdown
            setServiceTypeDropdown(arr);
          }}
        />
        {type}
      </label>
    ))}
  </div>
)}

        </div>
            </label>
          </div>

          {/* RIGHT */}
          <div className="flex-1 overflow-x-auto text-right">
            <table className="min-w-full border text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Transportation</th>
                  <th className="border px-4 py-2">Rate</th>
                  <th className="border px-4 py-2">Given</th>
                </tr>
              </thead>
              <tbody>
              <tr>
        
            {rows[index].flag == true && (
                 <>
                 <td className="border px-4 py-2">{rows[index].car_name}</td>
                 <td className="border px-4 py-2"><sup>INR</sup>NA</td>
                 <td className="border px-4 py-2"><input type="number"/> </td>
                 </>
            ) }
            
          </tr>
              </tbody>
            </table>


           <button 
            className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
  onClick={() => {
    if (activeDays > 0) {
          // 1️⃣ dayDropdown se remove
    const dd = [...dayDropdown];
    dd.splice(index, 1);
    setDayDropdown(dd);
      setActiveDays(activeDays - 1);
    }
  }}
>
  Remove
</button>

          </div>

        </div>
      ))}
    </>
  )
}

 

 {activeDays < stayNights2.length && transportDisplay && (
<div className='text-right'>
 <button
  className="bg-green-600 text-white px-4 py-2 rounded"
  onClick={() => {
    // 1️⃣ next day add
    setActiveDays(prev => prev + 1);

    // // 2️⃣ dropdown control
    // setDayDropdown(prev => [...prev, false]);

    // 3️⃣ IMPORTANT: previous day ka flag copy
    setRows(prev => {
      const copy = [...prev];

      if (copy[activeDays - 1]?.flag === true) {
        copy[activeDays] = {
          ...copy[activeDays],
          flag: true
        };
      }

      return copy;
    });
  }}
>
  Next
</button>
  </div>
)}


    {/* any extra or sightseeing in Transportation */}


<ExtraServices  services={services}  setServices={setServices}/>


{/* Summary */}

<div>
  <div>
    <h3 className='font-bold text-2xl'>Summary</h3>
    <p>Please review the quote's data before creating</p>
  </div>

 <div className='border-4 p-2 border-black bg-white'>
   <table className='w-[30%] '>
    <thead className='text-left'>
     <tr>
       <th>START DATE</th>
      <th>DURATION</th>
      <th>PAX</th>
     </tr>
    </thead>
    <tbody>
      <tr>
 
                    <td className=" ">{userData.nightDates[0].date}</td>
                    <td className=" ">{`${userData.noOfNights} nights, ${userData.noOfDays} Days`}</td>
                    <td className=" ">{userData.noOFAdults} Adults</td>
      </tr>
    </tbody>
  </table>
 </div>

 <div>
  <h3>Accommodation</h3>
  <table>
    <thead>
      <tr>
        <th>Night</th>
        <th>Hotel</th>
        <th>Meal</th>
        <th>Rooms</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
  <div className='p-2  text-right'>
    Total: <sup>INR</sup>
  </div>
 </div>
</div>


    </div>
    
        </div>
      ) : 
      (  <h1 className="text-center text-gray-400 py-10">Loading...</h1>
      )
      
      }







    </>
  );
}

export default NewQuote









  