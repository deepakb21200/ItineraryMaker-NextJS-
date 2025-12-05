// import React, { useEffect } from "react";
//  import { supabase } from '../supabase-client'
// import "../CSS/inprogress.css";
// function InProgress() {
//   // sample data
//   const data = [
//     {
//       id: 1,
//       contact: {
//         name: "Anoop Rai",
//         email: "anoop@example.com",
//         phone: "+91 9876543210",
//       },
//       tags: ["Team A", "VIP"],
//     },
//     {
//       id: 2,
//       contact: {
//         name: "Rita Sharma",
//         email: "rita@example.com",
//         phone: "+91 9123456780",
//       },
//       tags: ["Team B", "Follow-up"],
//     },
//     {
//       id: 3,
//       contact: {
//         name: "John Doe",
//         email: "john@example.com",
//         phone: "+1 555-123-4567",
//       },
//       tags: ["Team C", "New Lead"],
//     },
//   ];

//  async function getData() {
//     const { data, error } = await supabase.from("USERS").select("*");
//     if (error) {
//       console.error("Error fetching data:", error);
//     } else {
//       setRows(data);
//       console.log("Fetched data:", data);
//     }
//   }
//   useEffect(()=>{
// getData()
//   },[])

//   return (
//     <div className="inprogress-wrapper">
//       <h2>In Progress Tasks</h2>
//       <table className="inprogress-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Contact and Details</th>
//             <th>Sales Team / Tags</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <tr key={row.id}>
//               <td>{row.id}</td>
//               <td className="contact-details">
//                 <strong>{row.contact.name}</strong>
//                 <br />
//                 {row.contact.email}
//                 <br />
//                 {row.contact.phone}
//               </td>
//               <td>
//                 {row.tags.map((tag, idx) => (
//                   <span className="tag" key={idx}>
//                     {tag}
//                   </span>
//                 ))}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default InProgress;





// import React, { useState, useEffect } from "react";
// import { supabase } from "../supabase-client"; // aapka supabase client
// import "../CSS/inprogress.css";

// function InProgress() {
//   const [rows, setRows] = useState([]);

//   async function getData() {
//     const { data, error } = await supabase.from("form_1").select("*");
//     if (error) {
//       console.error("Error fetching data:", error);
//     } else {
//       setRows(data);
//       console.log("Fetched data:", data);
//     }
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div className="inprogress-wrapper">
//       <h2>In Progress Tasks</h2>
//       <table className="inprogress-table" name="form_1">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User Name</th>
//             <th>Email</th>
//             <th>Query</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row) => (
//             <tr key={row.id}>
//               <td>{row.id}</td>
//               <td>{row.userName}</td>
//               <td>{row.email}</td>
//               <td>{row.query}</td>
//               <td>{new Date(row.created_at).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default InProgress;







// import React, { useState, useEffect } from "react";
// import { supabase } from "../supabase-client"; // ensure correct path
// import "../CSS/inprogress.css";

// function InProgress() {
//   const [rows, setRows] = useState([]);

//   async function getData() {
//     const { data, error } = await supabase
//       .from("form_1")
//       .select("*");
//     if (error) {
//       console.error("Error fetching data:", error);
//     } else {
//       setRows(data);
//       console.log("Fetched data:", data);
//     }
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div className="inprogress-wrapper">
//       <h2>In Progress Tasks</h2>
//       <table className="inprogress-table" name="form_1">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User Name</th>
//             <th>User Number</th>
//             <th>Destination</th>
//             <th>Start Date</th>
//             <th>No. of Adults</th>
//             <th>No. of Nights</th>
//             <th>Comments / Query Source / Reference ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row) => (
//             <tr key={row.id}>
//               <td>{row.id}</td>
//               <td>{row.userName}</td>
//               <td>{row.userNumber}</td>
//               <td>{row.destination}</td>
//               <td>{row.startDate}</td>
//               <td>{row.noOFAdults}</td>
//               <td>{row.noOfNights}</td>
//               <td>
//                 <div>Comments: {row.Comments}</div>
//                 <div>Query Source: {row.querysource}</div>
//                 <div>Reference ID: {row.referenceid}</div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default InProgress;




import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../supabase-client";  
import "../CSS/inprogress.css";
 

function InProgress() {
  const [rows, setRows] = useState([]);
  let [flag, setFlag] = useState(false)
 
  async function getData() {
    const { data, error } = await supabase.from("form_1").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setRows(data);
      setFlag(true)
      console.log("Fetched data:", data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if(!flag){
    return <h1>Loading......</h1>
  }



  return(
  

    <div className="inprogress-wrapper">
  <h2>In Progress Tasks</h2>
  {rows.length > 0 ? (
    <table className="inprogress-table" name="form_1">
      <thead>
        <tr>
          <th>Reference ID</th>
          <th>Contact</th>
          <th>Destination</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td>{row.referenceid}</td>
            <td>
              {row.userName}<br />
              {row.userNumber}
            </td>
            <td>{row.destination}</td>
            <td>{row.Comments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Currently no data</p>
  )}
</div>

  )


 

}

export default InProgress;



