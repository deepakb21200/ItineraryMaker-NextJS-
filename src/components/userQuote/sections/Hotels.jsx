import React, { useEffect, useState , useContext} from 'react'
import {supabase} from "../../../supabase-client"
import { context } from  "../../../context/LoginContext";
function Hotels({
   formId,              // parent se form_no/id
  stayNights,          // parent se nights

}) {


const {
  inputValue,
  setInputValue,
  mealSearch,
  setMealSearch,
  roomSearch,
  setRoomSearch,
  nightPrices,
  setNightPrices,
  roomDetails,
  setRoomDetails,

} = useContext(context)


 

useEffect(()=>{
console.log(roomDetails);


},[roomDetails.roomPrice])


 
  
    let [hotelDisplay, setHotelDisplay] = useState(false)
      const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [showDropdown4, setShowDropdown4] = useState(false);
     const [selectedNights, setSelectedNights] = useState([]);
       const [showPopup, setShowPopup] = useState(false);
 
  const [inputValue2, setInputValue2] = useState(""); // meal
  const [inputValue3, setInputValue3] = useState(""); // room type
   const [meal, setMeal] = useState([]);
  const [stayHotel, setStayHotel] = useState([]);
    const [room, setRoom] = useState([]);


 

 useEffect(() => {
    if (formId) {
      setRoomDetails(prev => ({
        ...prev,
        form_no: formId
      }));
    }
  }, [formId]);




  async function getData2(){
        const { data, error } = await supabase.from("Hotels").select("*");
    
       setStayHotel(data) }


   





function grandTotal(date = null) {
  const nights = Object.keys(roomDetails.price_by_date || {});

  // CASE 1: specific date
  if (date) {
    const day = roomDetails.price_by_date?.[date] || {};
    return (
      (parseFloat(day.room_price) || 0) * (parseInt(roomDetails.noOfRooms) || 0) +
      (parseInt(roomDetails.adultWithExtraBed) || 0) * (parseFloat(day.aweb) || 0) +
      (parseInt(roomDetails.childWithExtraBed) || 0) * (parseFloat(day.cweb) || 0) +
      (parseInt(roomDetails.childNoBed) || 0) * (parseFloat(day.cnb) || 0)
    );
  }

  // CASE 2: overall total
  return nights.reduce((sum, nightDate) => {
    const day = roomDetails.price_by_date[nightDate] || {};
    return (
      sum +
      (parseFloat(day.room_price) || 0) * (parseInt(roomDetails.noOfRooms) || 0) +
      (parseInt(roomDetails.adultWithExtraBed) || 0) * (parseFloat(day.aweb) || 0) +
      (parseInt(roomDetails.childWithExtraBed) || 0) * (parseFloat(day.cweb) || 0) +
      (parseInt(roomDetails.childNoBed) || 0) * (parseFloat(day.cnb) || 0)
    );
  }, 0);
}



 


const RoomHandler = (e, nightDate = null) => {
  const { name, value } = e.target;
  const numericValue = value === "" ? "" : Number(value);



  console.log("nights", nightDate);
  

  // ✅ DATE-WISE PRICE HANDLING (FIXED)
  if (nightDate && ["room_price", "aweb", "cweb", "cnb"].includes(name)) {
    setRoomDetails(prev => {
      const prevDay = prev.price_by_date?.[nightDate] || {
        room_price: 0,
        aweb: 0,
        cweb: 0,
        cnb: 0
      };

      return {
        ...prev,
        price_by_date: {
          ...prev.price_by_date,
          [nightDate]: {
            ...prevDay,
            [name]: numericValue   // 🔥 THIS IS THE KEY LINE
          }
        }
      };
    });
    return;
  }

  // 🔹 NON-DATE FIELDS
  setRoomDetails(prev => ({
    ...prev,
    [name]: numericValue
  }));
};

 

const handleCheckboxChange = (item) => {
  setSelectedNights(prev => {
    const exists = prev.some(n => n.date === item.date);

    if (exists) {
      // ❌ remove
      return prev.filter(n => n.date !== item.date);
    } else {
      // ✅ add
      return [...prev, item];
    }
  });
};



 
const [keepSamePrice, setKeepSamePrice] = useState(false);
const [activeNight, setActiveNight] = useState(null);


const saveRoomDetails = async () => {
  try {
    if (!activeNight) {
      alert("Please select a date first!");
      return;
    }

    // ✅ Current price values for activeNight
    const currentValues = {
      room_price: roomDetails.price_by_date[activeNight.date]?.room_price || 0,
      aweb: roomDetails.price_by_date[activeNight.date]?.aweb || 0,
      cweb: roomDetails.price_by_date[activeNight.date]?.cweb || 0,
      cnb: roomDetails.price_by_date[activeNight.date]?.cnb || 0,
    };

    // ✅ Updated price object
    let updatedPrices = { ...roomDetails.price_by_date };

    if (keepSamePrice) {
      // Keep same price for all selected nights
      stayNights.forEach(night => {
        updatedPrices[night.date] = { ...currentValues };
      });
    } else {
      // Sirf activeNight ki date update
      updatedPrices[activeNight.date] = { ...currentValues };
    }

    // ✅ Supabase upsert
    const { data, error } = await supabase
      .from("hotel_pricing") // apna table name
      .upsert([{
        form_no: formId,
        hotel_name: inputValue,
        meal_plan: mealSearch,
        room_type: roomSearch,
        pax_per_room: Number(roomDetails.paxRoom) || 0,
        no_of_rooms: Number(roomDetails.noOfRooms) || 0,
        adult_with_extra_bed: Number(roomDetails.adultWithExtraBed) || 0,
        child_with_extra_bed: Number(roomDetails.childWithExtraBed) || 0,
        child_no_bed: Number(roomDetails.childNoBed) || 0,
        price_by_date: updatedPrices
      }],
      { onConflict: ["form_no"] }).select();
      

    if (error) {
      console.error("Error saving room details:", error);
      alert("Failed to save data!");
      return;
    }

    console.log("Saved successfully:", data);

    // ✅ Update local state
    setRoomDetails(prev => ({ ...prev, price_by_date: updatedPrices }));
    setShowPopup(false); // popup close
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
};


useEffect(()=>{
 console.log(selectedNights,"ok");
},[roomDetails.roomPrice])









// const fetchRoomDetails = async () => {
  
  
//   const { data, error } = await supabase
//     .from("hotel_pricing")
//     .select("*")
//     .eq("form_no", formId).single()
 
//   console.log(data);
  

//   if (error) {
//     console.log("Fetch Error:", error);
//     return;
//   }

//   if (data) {
//     // 🔹 Room base details
//     setRoomDetails({
//       paxRoom: data.pax_room?.toString() || "",
//       noOfRooms: data.no_of_rooms?.toString() || "",
//       adultWithExtraBed: data.adult_with_extra_bed?.toString() || "",
//       childWithExtraBed: data.child_with_extra_bed?.toString() || "",
//       childNoBed: data.child_no_bed?.toString() || "",
//       roomPrice: data.room_price?.toString() || "",
//       awebPrice: data.aweb_price?.toString() || "",
//       cwebPrice: data.cweb_price?.toString() || "",
//       cnbPrice: data.cnb_price?.toString() || "",
//       form_no: data.form_no
//     });

//     // 🔹 SEARCH fields
//     setInputValue(data.hotel_name || "");
//     setMealSearch(data.meal_plan || "");
//     setRoomSearch(data.room_type || "");

//     // ✅ MOST IMPORTANT
//     if (data.night_prices) {
//       setNightPrices(data.night_prices);
//     }
//   }
// };



const fetchRoomDetails = async () => {
  const { data, error } = await supabase
    .from("hotel_pricing")
    .select("*")
    .eq("form_no", formId)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  setRoomDetails({
    paxRoom: data.pax_room?.toString() || "",
    noOfRooms: data.no_of_rooms?.toString() || "",
    adultWithExtraBed: data.adult_with_extra_bed?.toString() || "",
    childWithExtraBed: data.child_with_extra_bed?.toString() || "",
    childNoBed: data.child_no_bed?.toString() || "",
    roomPrice: data.night_prices || {}, // ⭐ IMPORTANT
    awebPrice: data.aweb_price?.toString() || "",
    cwebPrice: data.cweb_price?.toString() || "",
    cnbPrice: data.cnb_price?.toString() || "",
    form_no: data.form_no
  });
};


// useEffect(() => {
//   if (formId) {
//     fetchRoomDetails();
//   }
// }, [formId]);



 

const openPricePopup = (night) => {
  setActiveNight(night);   // 🔥 MOST IMPORTANT
  setShowPopup(true);
};



  return (
 <div className=''>
  <h2 className='font-bold text-black text-2xl'>Hotels</h2>
   <p>Please add hotels details</p>

 
<button className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300 ${hotelDisplay ? "hidden": "block"}`}
onClick={()=>setHotelDisplay(true)}>
  Add Hotel
</button>

<div className={`   flex  ${hotelDisplay ? "  ": "hidden"}`}>

<div>
  
<div className="flex space-x-6 items-start ">
 
  <div className="flex flex-col relative">
     
     
     
     {/* <div className='absolute  top-full left-0 w-full max-h-[15vh] overflow-y-auto  text-black  border z-1000 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'>
{
stayNights.length > 0 &&
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

    </div> */}







    
    <label htmlFor="stay-nights" className="text-gray-700 font-medium">Stay Nights</label>
 <div className=''>
    <div className='relative'>
       <input type="text" id="stay-nights" placeholder="Enter nights" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500
       w-full"
    onChange={()=>{
// console.log(stayNights);

    }}
    onFocus={()=>setShowDropdown4(true)}
    onBlur={()=>setShowDropdown4(false)}/>


         {showDropdown4 && (
    <div
      className='absolute bg-[lightblue] mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 animate-fadeIn  shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'
      onMouseDown={(e) => e.preventDefault()}>

     {/* {

stayNights.length > 0 &&
  stayNights.map((date, index) => (
    <div key={index} className="flex items-center px-3 py-2 cursor-pointer border-b-2 border-grey">
      <input
        type="checkbox"
        id={`night-${index}`}
        name="selectedNights"
        value={date}
           checked={selectedNights.includes(date)}
            onChange={handleCheckboxChange}
        className="mr-2"/>
      <label htmlFor={`night-${index}`}>{date}</label>
    </div>
  ))
} */}


{
  stayNights.length > 0 &&
  stayNights.map((item, index) => (
    <div
      key={index}
      className="flex items-center px-3 py-2 cursor-pointer border-b-2 border-grey"
    >
      <input
        type="checkbox"
        id={`night-${index}`}
        value={item.date}   // 👈 string value
        checked={selectedNights.some(n => n.date === item.date)}
        onChange={() => handleCheckboxChange(item)}
        className="mr-2"
      />

      <label htmlFor={`night-${index}`}>
        {item.date} ({item.day})
      </label>
    </div>
  ))
}


    </div>
  )}

    </div>




   





 </div>

   {/* Selected nights display */}
{/* <div className="mt-2 border p-2">
  {selectedNights.length > 0 && (
    selectedNights.map((night, index) => (
      <div key={index} className="flex items-center px-3 py-1 border-b border-gray-200">
        <input type="checkbox" checked={true} readOnly className="mr-2" onClick={() => handleCheckboxChange()} />
        <span>{night}</span>
      </div>
    ))
  ) }
</div> */}
 

{/* {selectedNights.length >0 &&
<div className="mt-2 border p-2">
  {
    selectedNights.map((night, index) => (
      <div key={index} className="flex items-center px-3 py-1 border-b border-gray-200">

        <input
          type="checkbox"
          value={night}
          checked={true}
          className="mr-2"
          onChange={handleCheckboxChange}
        />

        <span>{night}</span>
      </div>
    ))
  }
  </div>} */}



  {selectedNights.length > 0 && (
  <div className="mt-2   borderp-2 rounded">
    {selectedNights.map((night, index) => (
      <div
        key={index}
        className="flex items-center px-3 py-1 border-b border-gray-200"
      >
        <input
          type="checkbox"
          checked={true}   // selected list hai, to true hi rahega
          className="mr-2"
          onChange={() => handleCheckboxChange(night)} // 👈 object pass
        />

        <span>
          {night.date} ({night.day})
        </span>
      </div>
    ))}
  </div>
)}

  </div>


  {/* <!-- Hotel --> */}
<div className="relative flex flex-col">
  <label htmlFor="hotel" className="text-gray-700 font-medium">Hotel</label>
{/* cpS */}
  <input  type="text" id="hotel" placeholder="Hotel name"  className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2
     focus:ring-blue-500" value={inputValue} autoComplete='off'

    onFocus={() => {
      setShowDropdown(true);
      getData2();
    }}

    onChange={(e) => setInputValue(e.target.value)}
 
    onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // small delay
  />

  {showDropdown && (
    <div
      className='absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'
      onMouseDown={(e) => e.preventDefault()} // <-- prevent blur while clicking
    >
      {inputValue === "" && <div className="px-3 py-2 text-gray-500">Type to search</div>}
      {inputValue !== "" && stayHotel.length > 0 &&
        stayHotel.map((val, index) => (
          <label
            key={index}
            className='flex items-center px-[12px] py-[8px] border-b border-gray-200 cursor-pointer' >
            <input
              type="radio"
              name="selectedHotel"
              className='mr-2 checked:bg-transparent appearance-none w-4 h-4 border border-gray-400 rounded-full focus:outline-none'
              onClick={() => {
                setInputValue(val.hotel_name);
                setMeal(val.meal_plan);
                setMealSearch(val.meal_plan[0]);
                setRoom(val.room);
       console.log("val.room",val.room);
       
                setRoomSearch(val.room[0])
                setShowDropdown(false);
              }}
            />
            {val.hotel_name}
          </label>
        ))
      }
    </div>
  )}
</div>


  {/* <!-- Meal Plan --> */}
  <div className="flex flex-col relative">
      {showDropdown2 && (
    <div
      className='absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'
 onMouseDown={(e) => e.preventDefault()} // <-- prevent blur while clicking
>
      {meal.length > 0 &&
        meal.map((val, index) => (
          <label   key={index} className='flex items-center px-[12px] py-[8px] border-b border-gray-200'  >
            <input type="radio" name="selectedHotel" value={val} className='mr-2 checked:bg-transparent appearance-none w-4 h-4 border border-gray-400 rounded-full focus:outline-none'
              onClick={(e) => {
                setInputValue2(val.hotel_name)
                // setMeal(val.meal_plan)   
                console.log("e",e.target.value);
                
                setMealSearch(e.target.value)
                setShowDropdown2(false); // click ke baad dropdown hide
              }}/>
            {val}
          </label>
        ))
      }




</div>)}



    <label htmlFor="meal-plan" className="text-gray-700 font-medium">Meal Plan</label>
    <input type="text" id="meal-plan" placeholder="Meal plan" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    autoComplete='off'
  

value={mealSearch}
    onChange={(e)=>{
      setMealSearch(e.target.value)
    }}

        onFocus={() => {
      setShowDropdown2(true);
      console.log("focus")   
    }}

    onBlur={()=>setShowDropdown2(false)}

    />
  </div>






  {/* <!-- Room Type --> */}
  <div className="flex flex-col relative">   
      {showDropdown3 && (
    <div
      className='absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'
  onMouseDown={(e) => e.preventDefault()}   // <-- prevent blur while clicking
>
      {room.length > 0 &&
        room.map((val, index) => (
          <label  key={index} className='flex items-center px-[12px] py-[8px] border-b border-gray-200'  >
            <input type="radio" name="selectedHotel" value={val} className='mr-2 checked:bg-transparent appearance-none w-4 h-4 border border-gray-400 rounded-full focus:outline-none'
            autoComplete='off'
              onClick={(e) => {
                setInputValue3(val.room)
                // setMeal(val.meal_plan)   
                // console.log("e",e.target.value);
                console.log("checking");
                
                setRoomSearch(e.target.value)
                setShowDropdown3(false); // click ke baad dropdown hide
              }}
              
            />
            {val}
          </label>
        ))
      }
</div>)}



    <label htmlFor="room-type" className="text-gray-700 font-medium">Room Type</label>
    <input type="text" id="room-type" placeholder="Room type" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
 autoComplete='off'
    value={roomSearch}
    onChange={(e)=>{
 
      setRoomSearch(e.target.value)
    }}

        onFocus={() => {
      setShowDropdown3(true);
      console.log("focus")   
    }}

    onBlur={()=>setShowDropdown3(false)}

    
    
    
    />
  </div>
</div>

<div className="flex space-x-6 items-end  ">
  {/* <!-- Pax/Room --> */}
  <div className="flex flex-col">
    <label htmlFor="pax-room" className="text-gray-700 font-medium">Pax/Room</label>
    <input type="number" name="paxRoom" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
    min={1}  value={roomDetails.paxRoom} onChange={RoomHandler}/>

  </div>
 
  {/* <!-- No. of Rooms --> */}
  <div className="flex flex-col">
    <label htmlFor="no-of-rooms" className="text-gray-700 font-medium">No. of Rooms</label>
  
{/* end */}
    <input type="number" name="noOfRooms" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
    min={1}  value={roomDetails.noOfRooms} onChange={RoomHandler}/>
  </div>

  {/* <!-- AWEB --> */}
  <div className="flex flex-col">
    <label htmlFor="aweb" className="text-gray-700 font-medium">AWEB</label>
    <input type="number" name="adultWithExtraBed" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" min={1}
      value={roomDetails.adultWithExtraBed}  onChange={RoomHandler}/>

 

  </div>

  {/* <!-- CWEB --> */}
  <div className="flex flex-col">
    <label htmlFor="cweb" className="text-gray-700 font-medium">CWEB</label>
    <input type="number" name="childWithExtraBed" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" min={1}
     value={roomDetails.childWithExtraBed} onChange={RoomHandler}/>

     {/* <input type="number" name="cwebPrice" value={roomDetails.price_by_date?.[activeNight?.date]?.cweb || ""}
  onChange={(e) => RoomHandler(e, activeNight.date)}/> */}

  </div>

  {/* <!-- CNB --> */}
  <div className="flex flex-col">
    <label htmlFor="cnb" className="text-gray-700 font-medium">CNB</label>
    <input type="number" name="childNoBed" placeholder="0" className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" min={1}
    value={roomDetails.childNoBed}   onChange={RoomHandler}/>
 

  </div>
</div>

</div>



<div className="p-4 bg-white rounded shadow-md   w-full">
{/* //dk */}

   {/* Static Popup Modal */}
      {showPopup && (


        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">Duplicate Table</h2>

            {/* Table with static values */}
           <div>
            {/* <h2>Given Price- {stayNights[0]}</h2> */}
            <h2>
  Given Price – {stayNights[0]?.date} ({stayNights[0]?.day})
</h2>

<table className="border border-gray-300 text-left w-full">
  <thead className="bg-gray-100">
    <tr>
      <th></th>
      <th className="text-center">Price (INR)</th>
      <th>Quantity</th>
      <th>Total</th>
    </tr>
  </thead>

  <tbody>

    {/* ROOM */}
    <tr>
      <td>/Room ({roomDetails.paxRoom || 0}P)</td>

      <td className="text-center">
        {roomDetails.paxRoom ? (
    
<input
  type="number"
  name="room_price"
  value={roomDetails.price_by_date?.[activeNight?.date]?.room_price ?? ""}
  onChange={(e) => RoomHandler(e, activeNight.date)}
/>




        ) : "—"}
      </td>

      {/* QUANTITY */}
      <td>
        {roomDetails.paxRoom 
          ? roomDetails.noOfRooms
          : "—"}
      </td>

 
<td>
  {activeNight
    ? (
        (parseFloat(roomDetails.price_by_date?.[activeNight.date]?.room_price) || 0)
        * (parseInt(roomDetails.noOfRooms) || 0)
      )
    : "—"}
</td>





    </tr>

    {/* AWEB */}
    <tr>
      <td>/AWEB</td>

      <td className="text-center">
        {roomDetails.adultWithExtraBed ? (
    


<input
  type="number"
  name="aweb"
  value={roomDetails.price_by_date?.[activeNight?.date]?.aweb ?? ""}
  onChange={(e) => RoomHandler(e, activeNight.date)}
/>

        ) : "—"}
      </td>

      {/* QUANTITY = adultWithExtraBed */}
      <td>{roomDetails.adultWithExtraBed
          ? roomDetails.adultWithExtraBed
          : "—"} </td>
          <td>
    {roomDetails.adultWithExtraBed && activeNight
      ? roomDetails.adultWithExtraBed *
        (roomDetails.price_by_date?.[activeNight.date]?.aweb || 0)
      : "—"}
  </td>
    </tr>

    {/* CWEB */}
    <tr>
      <td>/CWEB</td>

      <td className="text-center">
        {roomDetails.childWithExtraBed ? (
    

<input
  type="number"
  name="cweb"
  value={roomDetails.price_by_date?.[activeNight?.date]?.cweb ?? ""}
  onChange={(e) => RoomHandler(e, activeNight.date)}
/>

        ) : "—"}
      </td>

      <td>
        {roomDetails.childWithExtraBed
          ? roomDetails.childWithExtraBed
          : "—"}
      </td>
 

  




  <td>
  {roomDetails.childWithExtraBed && activeNight
    ? roomDetails.childWithExtraBed *
      (roomDetails.price_by_date?.[activeNight.date]?.cweb || 0)
    : "—"}
</td>

    </tr>

    {/* CNB */}
    <tr>
      <td>/CNB</td>

      <td className="text-center">
        {roomDetails.childNoBed ? (
   
 <input
  type="number"
  name="cnb"
  value={roomDetails.price_by_date?.[activeNight?.date]?.cnb ?? ""}
  onChange={(e) => RoomHandler(e, activeNight.date)}
/>

        ) : "—"}
      </td>

      <td>
        {roomDetails.childNoBed
          ? roomDetails.childNoBed
          : "—"}
      </td>

     
      <td>
  {roomDetails.childNoBed && activeNight
    ? roomDetails.childNoBed *
      (roomDetails.price_by_date?.[activeNight.date]?.cnb || 0)
    : "—"}
</td>

    </tr>

    {/* GRAND TOTAL */}
    <tr className="bg-gray-100 font-semibold">
      <td>Total</td>
      <td><sup>INR</sup></td>
      <td></td>
        <td>
    {activeNight 
      ? grandTotal(activeNight.date)   // ✅ sirf clicked date ka total
      : "—"
    }
  </td>
    </tr>

  </tbody>
</table>




            <div>
              <div>
                {/* <input type="checkbox" name="" id="" /> */}
                <input type="checkbox"  checked={keepSamePrice}  onChange={(e) => setKeepSamePrice(e.target.checked)}/>
<span className="font-bold text-lg"> Keep same prices for other nights</span>

       
              </div>
              <button className='p-3 text-white bg-blue-500 rounded-sm mr-3' onClick={saveRoomDetails}>Save</button>
              <button className='p-3 text-white bg-red-500 rounded-sm'>Cancel</button>
            </div>
           </div>

            {/* Close button */}
            
            <button  onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg" >✕
</button>
          </div>
        </div>
      )}







  <h3 className="font-bold text-2xl text-black mb-2">Prices</h3>
  <p className="mb-4 text-gray-600">Please fill all required fields</p>
 

{selectedNights.length > 0 && (
  <table className="border border-gray-300 text-left w-full">
    <thead className="bg-gray-100">
      <tr>
        <th>Date</th>
        <th>Rate</th>
        <th>Given</th>
      </tr>
    </thead>
<tbody>
  {selectedNights.map((night, index) => (
    <tr key={index}>
      <td>
        {night.date} ({night.day})
      </td>

      <td>INR N/A</td>

      <td
        className="cursor-pointer"
        onClick={() => openPricePopup(night)}

      >
        {grandTotal(night.date)  // sirf is date ka total
          ? `INR ${grandTotal(night.date)}`
          : "INR 0"}
      </td>

    </tr>
  ))}
</tbody>

  
  </table>
)}




  <div className="mt-4 flex gap-2">
    <button className="px-4 py-2 text-blue-600 border border-gray-500 rounded hover:bg-gray-100" onClick={()=>setShowPopup(true)}>Duplicate</button>
    <button className="px-4 py-2 text-blue-600 border border-gray-500 rounded hover:bg-gray-100">Remove</button>
  </div>
</div>



{/* deepak */}






</div>

<div>
    <h2 className='font-bold'>Any special inclusions in hotels</h2>
  <p>Add any extra services for hotels e.g, special dinner, honeymoon cake etc.</p>
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300">
  Add services
</button>
</div>

          </div>
  )
}

export default Hotels




