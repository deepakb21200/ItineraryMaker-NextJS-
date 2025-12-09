

import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabase-client";  
import "../../CSS/inprogress.css";
 
import { Link, useParams} from "react-router-dom";
 

function NewQuery() {
  const [rows, setRows] = useState([]);
  let [flag, setFlag] = useState(false)

  let {id} = useParams()
  console.log(id);
  
 
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
            <td><Link  to={`/trips/${row.formNo}`}> {row.referenceid}</Link></td>

            <td>{row.userName}<br />{row.userNumber}</td>

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

export default NewQuery;



