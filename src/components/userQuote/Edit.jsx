import React, { useEffect, useState } from 'react'
import { supabase } from "../../supabase-client"


function Edit() {

    let [open, setOpen] = useState(false)
    const [packageName, setPackageName] = useState("");
    let [package_list, setpackage_list] = useState(null)
    const [openTC, setOpenTC] = useState(false);
    let[inputValue, setInputValue] = useState("")


 

   async  function packages(){
        const { data, error } = await supabase.from("packages").select("package_name");

        if (error) console.error(error);
        else {
            console.log(data);
            setpackage_list(data)
        }

    }

    useEffect(()=>{
        packages()
    },[])










    const [packageDetails, setPackageDetails] = useState({ inclusions: [], exclusions: [] });

const handlePackageSelect = async (packageName) => {
  setPackageName(packageName); // store selected package
  setOpen(false); // close dropdown

  const { data, error } = await supabase
    .from("packages")
    .select("inclusions, exclusions")
    .eq("package_name", packageName)
    .single(); // only one row expected

  if (error) {
    console.error(error);
    setPackageDetails({ inclusions: [], exclusions: [] });
  } else {
    setPackageDetails({
      inclusions: data.inclusions || [],
      exclusions: data.exclusions || []
    });
  }
};


    const [packageDetails2, setPackageDetails2] = useState({});
// Fetch T&C from Supabase
const fetchTerms = async () => {
  const { data, error } = await supabase
    .from("terms_conditions")
    .select("content")
    .eq("title", "Terms & Conditions")
    .single(); // expecting only one row

  if (error) {
    console.error(error);
    setPackageDetails2({}); // or empty object
  } else {
    setPackageDetails2(data.content);
  }
};

useEffect(() => {
  fetchTerms();
}, []);



async function hotel_details(){
  const { data, error } = await supabase
    .from("hotel_pricing")
    .select("content")
    .eq("title", "Terms & Conditions")
    .single(); 

}


    
  return (
     <>
     <div>
        <label htmlFor="packagesN relative">
         <div className='relative '>
               <input type="text" onFocus={()=>{setOpen(true)}} onBlur={()=>{setOpen(false)}} placeholder='Type to search..'
               className='' value={inputValue}
               onChange={(e)=>{setInputValue(e.target.value)}}/>


                         {open && (
        <div className="absolute mt-1 top-full left-0   w-full max-h-[15vh] overflow-y-auto text-black border z-50
         bg-white shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]"
          onMouseDown={(e) => e.preventDefault()}>
 

{package_list.map((opt, i) => (
  <div
    key={i}
    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
    onMouseDown={(e) => e.preventDefault()} // optional: prevent blur
    onClick={() => {
        handlePackageSelect(opt.package_name)
         
          setInputValue(opt.package_name); // ✅ yahi chahiye
    }} // ✅ call fetch function
  >
    {opt.package_name}
  </div>
))}


        </div>
      )}

         </div>

  


        </label>



 


<div className="mt-4  ">
  <h3 className="font-semibold text-lg">Inclusions</h3>


  
{packageDetails.inclusions.length > 0 && (
  <>
    {packageDetails.inclusions.map((item, index) => (
      <div key={index} className="flex items-center gap-2 my-1">
        <input
          type="text"
          className="border px-2 py-1 rounded w-full"
          value={item}
          onChange={(e) => {
            const updated = [...packageDetails.inclusions];
            updated[index] = e.target.value;
            setPackageDetails(prev => ({ ...prev, inclusions: updated }));
          }}
        />
        <button
          type="button"
          className="text-red-500 font-bold"
          onClick={() => {
            const updated = packageDetails.inclusions.filter((_, i) => i !== index);
            setPackageDetails(prev => ({ ...prev, inclusions: updated }));
          }}
        >
          ×
        </button>
      </div>
    ))}

    {/* 👇 Button sirf tab dikhe jab map chal raha ho */}
    <button
      type="button"
      className="text-blue-600 mt-2"
      onClick={() =>
        setPackageDetails(prev => ({
          ...prev,
          inclusions: [...prev.inclusions, ""]
        }))
      }
    >
      Add More
    </button>
  </>
)}

  <h3 className="font-semibold text-lg mt-4">Exclusions</h3>
 

  {packageDetails.exclusions.length > 0 && (
  <>
    {packageDetails.exclusions.map((item, index) => (
      <div key={index} className="flex items-center gap-2 my-1">
        <input
          type="text"
          className="border px-2 py-1 rounded w-full"
          value={item}
          onChange={(e) => {
            const updated = [...packageDetails.exclusions];
            updated[index] = e.target.value;
            setPackageDetails(prev => ({ ...prev, exclusions: updated }));
          }}
        />
        <button
          type="button"
          className="text-red-500 font-bold"
          onClick={() => {
            const updated = packageDetails.exclusions.filter((_, i) => i !== index);
            setPackageDetails(prev => ({ ...prev, exclusions: updated }));
          }}
        >
          ×
        </button>
      </div>
    ))}

    {/* 👇 Button conditionally */}
    <button
      type="button"
      className="text-blue-600 mt-2"
      onClick={() =>
        setPackageDetails(prev => ({
          ...prev,
          exclusions: [...prev.exclusions, ""]
        }))
      }
    >
      Add More
    </button>
  </>
)}
</div>




<h1 className="text-xl font-bold cursor-pointer select-none" onClick={() => setOpenTC(prev => !prev)}>Terms and Conditions</h1>

 

{openTC && (
  <div className="mt-4 border border-gray-400 bg-gray-100  h-[200px] overflow-y-auto p-3">
    {Object.entries(packageDetails2).map(([section, items], i) => (
      <div key={i} className="mb-4">
        <h3 className="font-semibold text-lg">{section}</h3>
        <ul className="list-disc ml-6">
          {items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}



<div>
  <h2 className='font-bold text-xl'>Day wise Schedule</h2>

  {Array.from({ length: 5 }).map((_, i) => (
   <>

   
   </>
))}


</div>





     </div>
     </>
  )
}

export default Edit