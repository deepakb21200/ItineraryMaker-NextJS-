import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase-client"; 
 
 
function SignIn() {
  let navigate = useNavigate()

const [formData, setFormData] = useState({
  email: "",
  emailPass: ""
});

async function submitForm(e) {
  e.preventDefault();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.emailPass
    });

    if (data) {
       navigate("/trips")
     
    }else{
       console.log(error.message);
    }


  } catch (err) {
 
    console.log("Something went wrong:", err.message);
  }
}




  
 


  function changeHandler(e){
      setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
  }



  return (
    <form className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg
    border-4" onSubmit={submitForm} autoComplete="off">
      
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
        <p className="text-sm text-gray-600 mt-1">
          Don't have account? <span className="text-blue-600 cursor-pointer font-medium">Create Account</span>
        </p>
      </div>

      <div className="space-y-4">
        
        <input 
          type="email"
          required
          placeholder="Email Address"
           name="email"
            value={formData.email} 
            onChange={changeHandler}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <input 
          type="password"
           name="emailPass"
          value={formData.emailPass}
          required
          placeholder="Password"
          onChange={changeHandler}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <button  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md cursor-pointer transition"
        >submit</button>

      </div>
    </form>
  )
}

export default SignIn
