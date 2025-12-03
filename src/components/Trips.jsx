import React, { useState } from "react";
import "../CSS/user.css";
import { supabase } from '../supabase-client'

function Trips() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit =  async (e) => {
    e.preventDefault(); // page reload nahi hoga
    console.log("Form Submitted:", formData); // console me data
 
    setFormData({ userName: "", email: "", query: "" }); // form reset



    try {

          let {data,error} = await supabase.from("USERS").insert({
              ...formData,     // ⭐ IMPORTANT FIX
            }).select().single()
        
          console.log(data,"done");
        
    } catch (error) {
        console.log(error);
        
    }
  };

 return (
    <div className="trip-form-wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Query:</label>
          <textarea
            name="query"
            rows="5"
            value={formData.query}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* {submittedData && (
        <div className="submitted-data">
          <h3>Submitted Data:</h3>
          <p><strong>Name:</strong> {submittedData.userName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Query:</strong> {submittedData.query}</p>
        </div>
      )} */}
    </div>
  );
}

export default Trips
