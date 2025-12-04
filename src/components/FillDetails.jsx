import React, { useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import "../CSS/form.css";
import { supabase } from '../supabase-client'
import { useNavigate } from "react-router-dom";


function FillDetails() {
          const [details, setDetails] = useState({
        querysource:"",
        referenceid:"",
        destination:"",
        startDate:"",
        noOfNights:"",
        noOFAdults:"",
        userName:"",
        userNumber:"",
        Comments:""
    })
    let navigate = useNavigate()

function formFill(e) {
    setDetails({
        ...details,  [e.target.name]: e.target.value
    });
}


const DataSubmit = async(e)=>{
    e.preventDefault()

    console.log("form", details);
    
  let {data,error} = await supabase.from("form_1").insert({
      ...details,   
    }).select().single()

  console.log(data);
  
}
  return (
<div className="form-wrapper">

  <form onSubmit={DataSubmit}>

    {/* Query Source */}
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

    {/* Reference ID */}
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

    <div className="form-section">
      <button className="btn-blue">You</button>
    </div>

    {/* Destination, Start Date, Duration */}
    <div className="grid-3 form-section">

      <div>
        <label className="form-label">Destination</label>
        <input
          type="text"
          name="destination"
          className="form-input"
          value={details.destination}
          onChange={formFill}
        />
      </div>

      <div>
        <label className="form-label">Start Date</label>
        <input
          type="date"
          name="startDate"
          className="form-input"
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
       
      </div>

    </div>

    {/* Adults & Children */}
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

    {/* Name & Phone */}
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
  

          {/* <input type="text" className="form-input" /> */}
        <span>
              <CiCirclePlus />
          <CiCirclePlus />
          <CiCirclePlus />
        </span>
        </div>
      </div>
    </div>

    {/* Comments */}
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

    <button type="submit" className="btn-green">Save</button>
     <button  onClick={() => navigate("/trips/")}className="btn-red ml-2">Cancel</button>
  </form>
</div>

  )
}

export default FillDetails