import React, { useContext, useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import "../CSS/form.css";
import { supabase } from '../supabase-client'
import { useNavigate } from "react-router-dom";
import { context } from '../context/LoginContext';
 

function FillDetails() {

  const [query, setquery] = useState([]);
    const [query2, setquery2] = useState([]);
  // let [value, setValue] = useState("") 
  //   let [value2, setValue2] = useState("") 
   const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);




 async function queryData(){
    const { data, error } = await supabase.from("QuerySource").select("*")
    console.log(data)
    setquery(data)
   }

      async function queryData2(){

    const { data, error } = await supabase.from("TourDestination").select("*")
    console.log(data)
    setquery2(data)
   }

 

 


      let navigate = useNavigate()
      let [  startDate, setStartdate] =useState("")
        const { userSession, logoutHandler } = useContext(context);
          const [details, setDetails] = useState({
        querysource:"",
        referenceid:"",
        destination:"",
        // startDate:"",
        noOfNights:1,
        noOfDays:2,
        noOFAdults:1,
        userName:"",
        userNumber:"",
        Comments:"",

        // formNo:""
    })
 
useEffect(()=>{
console.log(startDate);

},[startDate])

function formFill(e) {
    setDetails({
        ...details,  [e.target.name]: e.target.value
    });

    if(e.target.name === "noOfNights"){
      let a = Number(e.target.value)

       setDetails(prev => ({
       ...prev, noOfNights: a ,
        noOfDays:++a}))
      }

      else if(e.target.name === "noOFAdults"){
        let a = Number(e.target.value)
       setDetails(prev => ({
       ...prev, noOFAdults: a }))
      }
}


 



  const DataSubmit = async (e) => {
    e.preventDefault();
    let formNo= Math.floor(1000000 + Math.random() * 9000000).toString();

    try {
      console.log("form", details);

      const start = new Date(startDate);
  const nightDates = [];

  for (let i = 0; i < Number(details.noOfNights); i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    nightDates.push(d.toISOString().split("T")[0]);
  }
  console.log("night",nightDates);
  
      const { data, error } = await supabase
        .from("form_1")
        .insert({ ...details, formNo, nightDates}).select().single();

      if (data) {
        console.log("datasa",data);
        
  setFlag(false)


      navigate("/trips");
      
        
      
      }else{
        console.log(  error.message);
      }

    

    } catch (err) {
      console.log("Unexpected Error:", err.message);
    }
  };

let [flag, setFlag] = useState(false)

  if (!userSession) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-600">
          Please login first...
        </h2>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6     rounded-2xl shadow-lg">
  <form onSubmit={DataSubmit} className="space-y-6">

    {/* Query Source */}
    <div className="flex flex-col  relative">


      <div className="absolute  top-full left-0 w-full max-h-[15vh] overflow-y-auto  text-black  border  rounded-2xl    z-1000 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]">




        {query.length > 0 && dropdownOpen && (
          query.map((item, index) => (
             
              <div className="flex flex-col px-3 py-2 cursor-pointer border-b-2 border-grey " key={index}
                onMouseDown={() => {   // IMPORTANT: blur se bachne ke liye
        setDetails({ ...details, querysource: item.ListOfQueries });
        setDropdownOpen(false);
      }} >  {item.ListOfQueries}   </div>)))}
              </div>




      <label className="text-gray-700  font-medium mb-2">Query Source</label>
      <input
        type="text"
        name="querysource"
         autoComplete='off'
        placeholder="Type to Search..."
        className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500  "
        value={details.querysource}
        onChange={formFill}
        onFocus={() =>  {
          setDropdownOpen(true)
          queryData()

        }}
  onBlur={() =>  setDropdownOpen(false)}
  required
      />
    </div>

    {/* Reference ID */}
    <div className="flex flex-col">
      <label className="text-gray-700  font-medium mb-2">Reference ID</label>
      <input
        type="text"
        name="referenceid"
        placeholder="1231231"
        className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500   "
        value={details.referenceid}
        onChange={formFill}
          required
      />
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        A custom id for your reference regarding the query
      </p>
    </div>

    {/* Destination, Start Date, No. of Nights */}
    <div className="grid md:grid-cols-3 gap-6">
      {/* Destination */}
      <div className="relative">

        
      <div className="absolute  top-full left-0 w-full max-h-[15vh] overflow-y-auto  text-black  border  rounded-2xl    z-1000 animate-fadeIn bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]">




        {query2.length > 0 && dropdownOpen2 && (
          query2.map((item, index) => (
             
              <div className="flex flex-col px-3 py-2 cursor-pointer border-b-2 border-grey" key={index}
                         onMouseDown={() => {   // IMPORTANT: blur se bachne ke liye
        setDetails({ ...details, destination: item.NameOfDestination });
        setDropdownOpen2(false);
      }}>
        
                {item.NameOfDestination}
             
              </div>
               )) 
               
               )}

      
      </div>
        <label className="text-gray-700  font-medium mb-2 block">Destination</label>
        <input
          type="text"
          name="destination"
          placeholder="Type to search..."
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500  "
          value={details.destination}
           autoComplete='off'
          onChange={formFill}
          onBlur={() =>  setDropdownOpen2(false)}
        onFocus={() =>  {
          setDropdownOpen2(true)
          queryData2()
        }} required
        />
   
      </div>

      {/* Start Date */}
      <div className="flex flex-col">
        <label className="text-gray-700  font-medium mb-2">Start Date</label>
        <input
          type="date"
          name="startDate"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500   "
         value={details.startDate}
        
  //         value={
  // details.startDate && new Date(details.startDate).toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // })}
          onChange={(e)=>setStartdate(e.target.value)}
            required
        />
      </div>

      {/* No. of Nights */}
      <div className="flex flex-col">
        <label className="text-gray-700  font-medium mb-2">No. of Nights</label>
        <input
          type="number"
          min="1"
          name="noOfNights"
          value={details.noOfNights}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500   "
          onChange={formFill}
            required
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {details.noOfNights} Nights, {details.noOfDays} Days


         
        </span>
      </div>
    </div>

    {/* Adults & Children */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <label className="text-gray-700  font-medium mb-2">No. of Adults</label>
        <input
          type="number"
          name="noOFAdults"
          min="1"
          value={details.noOFAdults}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500   "
          onChange={formFill}
            required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700  font-medium mb-2">Add children and their ages</label>
        <button className="btn-green flex items-center justify-center gap-2 py-2 px-4 rounded-lg hover:bg-green-600 transition">
          <CiCirclePlus /> Add Child
        </button>
      </div>
    </div>

    {/* Name & Phone */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <label className="text-gray-700  font-medium mb-2">Name</label>
        <input
          type="text"
          name="userName"
          placeholder="Anoop Rai"
          value={details.userName}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500  "
          onChange={formFill}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700  font-medium mb-2">Phone</label>
        <div className="flex gap-2">
          <select
            name="countryCode"
            className="w-24 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500  "
            onChange={formFill}
          >
            <option value="91">+91 IN</option>
            <option value="1">+1 US</option>
            <option value="44">+44 UK</option>
            <option value="61">+61 AU</option>
            <option value="81">+81 JP</option>
          </select>
          <input
            type="text"
            name="userNumber"
            value={details.userNumber}
         
            placeholder="1234567890"
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500  "
            onChange={formFill}
          />
        </div>
      </div>
    </div>

    {/* Comments */}
    <div className="flex flex-col">
      <label className="text-gray-700  font-medium mb-2">Comments</label>
      <textarea
        name="Comments"
        placeholder="Only 5 star hotels"
        value={details.Comments}
        className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500  "
        onChange={formFill}
      ></textarea>
    </div>

    {/* Buttons */}
    <div className="flex gap-4 flex-wrap">
      <button
        type="submit"
        disabled={flag}
        className={`px-6 py-3 rounded-lg font-medium transition ${flag ? "bg-red-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"}`}
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => navigate("/trips/")}
        className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
      >
        Cancel
      </button>
    </div>

  </form>
</div>



 

  )
}

export default FillDetails




{/* <div className="form-wrapper">

  <form onSubmit={DataSubmit}>

 
    <div className="form-section">
      <label className="form-label">Query Source</label>
      <input
        type="text"
        name="querysource"
        placeholder="Type to Search..."
        className="form-input"
        value={details.querysource}
        onChange={formFill}
      />
    </div>

 
    <div className="form-section">
      <label className="form-label">Reference ID</label>
      <input
        type="text"
        name="referenceid"
        placeholder="1231231"
        className="form-input"
        value={details.referenceid}
        onChange={formFill}
      />
      <p className="small-text">A custom id for your reference regarding the query</p>
    </div>


    <div className="grid-3 form-section">

      <div className='border-2 border-red-500'>
        <label className="form-label">Destination</label>
        <input
          type="text"
          name="destination"
          className="form-input relative"
          placeholder='Type to search...'
          value={details.destination}
          onChange={formFill}
        />

           <div className="absolute top-0 left-0 w-full    bg-[#0f1117]/95 backdrop-blur-xl border border-[#2a2c38] rounded-2xl shadow-2xl  z-50 animate-fadeIn">
        
           </div>
      </div>

      
      <div>
        <label className="form-label">Start Date</label>
        <input
          type="date"
          name="startDate"
          className="form-input"
          placeholder='MMMM D, YYY'
          value={details.startDate}
          onChange={formFill}
        />
      </div>

      <div>
        <label className="form-label">No. of Nights</label>
        <input
          type="number"
          min="1"
          name="noOfNights"
            value={details.noOfNights}
          className="form-input"
          onChange={formFill}
        />
        <h2 className='mt-1'>{details.noOfNights} Nights, {details.noOfNights+1} Days</h2>
       
      </div>

    </div>

     
    <div className="grid-2 form-section">
      <div>
        <label className="form-label">No. of Adults</label>
        <input
          type="number"
          name="noOFAdults"
          min="1"
          
          className="form-input"
          value={details.noOFAdults}
          onChange={formFill}
        />
      </div>

      <div>
        <label className="form-label">Add children and their ages</label>
        <button className="btn-green">
          <CiCirclePlus />
        </button>
      </div>
    </div>

 
    <div className="grid-2 form-section">
      <div>
        <label className="form-label">Name</label>
        <input
          type="text"
          name="userName"
          placeholder="Anoop Rai"
          className="form-input"
          value={details.userName}
          onChange={formFill}
        />
      </div>

      <div>
        <label className="form-label">Phone</label>
    

        <div className="phone-box">

          <select
            name="countryCode"
            className="form-select"
            onChange={formFill}
          >
            <option value="91">91-IN</option>
            <option value="1">1-US</option>
            <option value="44">44-UK</option>
            <option value="61">61-AU</option>
            <option value="81">81-JP</option>
          </select>
           <input
          type="text"
          name="userNumber"
          className="form-input"
          value={details.userNumber}
          onChange={formFill}
        />
  

   
        </div>
      </div>
    </div>

    
    <div className="form-section">
      <label className="form-label">Comments</label>
      <textarea
        name="Comments"
        className="form-textarea"
        placeholder="Only 5 star hotels"
        value={details.Comments}
        onChange={formFill}
      ></textarea>
    </div>

    <button type="submit" className={`${flag ? "btn-red cursor-not-allowed" : "btn-green"}`}
 disabled={flag}>Save</button>
 

     <button
  type="button"
  onClick={() => navigate("/trips/")}
  className="btn-red ml-2"
>
  Cancel
</button>

  </form>
</div> */}