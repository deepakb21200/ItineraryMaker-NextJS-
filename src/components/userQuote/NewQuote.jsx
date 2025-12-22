import React, { use, useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { supabase } from "../../supabase-client";
import { useNavigate, useParams } from "react-router-dom";
import { LogIn } from "lucide-react";
import ExtraServices from "./sections/ExtraServices";
import Hotels from "./sections/Hotels";
import { context } from "../../context/LoginContext";

function NewQuote() {
    let [stayNights2, setStayNights2] = useState([]);
  let [userData, setUserData] = useState(null);
let [dropdown2, setDropdownOpen2]= useState(false)
  // let [mealSearch, setMealSearch]= useState("")
  const [carName, setCarName] = useState("");
    let [carQuantity, setCarQuantity] = useState("");
  // let [roomSearch, setRoomSearch] = useState("")
  let [stayNights, setStayNights] = useState([]);
const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
// const [rowsData, setRowsData] = useState([]);
// const [rowsData, setRowsData] = useState([
//   {
//     car_name: carName,    // agar carName initially khali hai to "" bhi chal jaayega
//     day: stayNights2[0],  // first night by default
//     price: ""
//   }
// ]);



let [gstValue, setGstValue]= useState(5)







const [rowsData, setRowsData] = useState([
  {
    car_name: carName || "",
    day: stayNights2[0] || null,
    price: "",
    service_location: "",
    service_type: ""
  }
]);




const [selectedValues, setSelectedValues] = useState([]);

  let { id } = useParams();

  let [showModal, setShowModal] = useState(false);
  let [allCars, setAllcars] = useState([]);

  let navigate = useNavigate();




  useEffect(() => {
    console.log(stayNights2, "tttttttttttt")
  }, [stayNights2]);

  let [transportDisplay, setTransportDisplay] = useState(false);

  // let [dropdown2, setDropdownOpen2]= useState(false)

  let [maxRows, setMaxRows] = useState(null);

  // let [showCars, setShowCars]= useState([])

  const fetchRows = async () => {
    const { data } = await supabase
      .from("car_entries")
      .select("*")
      .eq("form_no", id);
    // console.log(data,"hell");

    if (data) {
      let mappedRows = data.map((d) => ({
        car_name: d.car_name,
        quantity: d.quantity,
        showDropdown: false,
        db_id: d.id,
      }));

      console.log(data);

      if (mappedRows.length === 0) {
        mappedRows = [
          { car_name: "", quantity: "", showDropdown: false, db_id: null },
        ];
      }
      setRows(mappedRows);
    }
  };




  useEffect(() => {
    console.log(selectedValues, "staynights2");
  }, [selectedValues]);

 
  const [activeDays, setActiveDays] = useState(1);
  const [dayDropdown, setDayDropdown] = useState([]);
  // example: [true, false, false]
  const [serviceDropdown, setServiceDropdown] = useState([]);

  const [serviceTypeDropdown, setServiceTypeDropdown] = useState([]);

  const [selectedServiceType, setSelectedServiceType] = useState([]);
  const [selectedServiceLocation, setSelectedServiceLocation] = useState([]);

 

 


// lock
  const [rows, setRows] = useState([
    {
      date : "",
      type: "",
      quantity: "",
      dropdownOpen: false,
    },
  ]);





 

  const handleAddRow = () => {
  if (rows.length < maxRows) {
    setRows(prev => [
      ...prev,
      {
        type: "",
        quantity: "",
        dropdownOpen: false,
      },
    ]);
  }
};


 
 
useEffect(()=>{
// console.log(selectedValues, "selected");
console.log(stayNights2, "stayNIghts");

},[stayNights2])
 
 
// const handleRemoveRow = (index) => {
//   setRowsData(prev => prev.filter((_, i) => i !== index));
//   setSelectedValues(prev => prev.filter((_, i) => i !== index));
//   setActiveDays(prev => Math.max(prev - 1, 1));
//   // setActiveDays(prev => prev > 1 ? prev - 1 : 1);

// };



// const handleRemoveRow = (index) => {
//   setSelectedValues(prev => {
//     const updated = [...prev];
//     updated.splice(index, 1); // remove exact index
//     return updated;
//   });

//   setRowsData(prev => {
//     const updated = [...prev];
//     updated.splice(index, 1); // remove exact index
//     return updated;
//   });

//   // activeDays ko adjust karo
//   setActiveDays(prev => {
//     if (prev > 1) return prev - 1;
//     return 1; // minimum 1 row
//   });



//   console.log(selectedValues);
//   console.log(rowsData);
  
  
// };



// const handleRemoveRow = (index) => {
//   // Remove selected value for that row
//   setSelectedValues(prev => prev.filter((_, i) => i !== index));

//   // Remove row from rowsData
//   setRowsData(prev => prev.filter((_, i) => i !== index));

//   // Adjust activeDays (minimum 1)
//   setActiveDays(prev => Math.max(prev - 1, 1));
// };


// const handleRemoveRow = (index) => {
//   setRowsData(prev => prev.filter((_, i) => i !== index));
//   setSelectedValues(prev => prev.filter((_, i) => i !== index));

//   setActiveDays(prev => Math.max(prev - 1, 1));
// };

const handleRemoveRow = (index) => {
  setRowsData(prev => prev.filter((_, i) => i !== index));
  setSelectedValues(prev => prev.filter((_, i) => i !== index));

  setActiveDays(prev => Math.max(prev - 1, 1));
};

 
// const handleNext = () => {
//   // ❌ tour days se zyada mat jao
//   if (activeDays >= stayNights2.length) return;

//   const nextIndex = activeDays;

//   // 👉 agar is index ka data exist nahi karta
//   setRowsData(prev => {
//     if (prev[nextIndex]) return prev;

//     const updated = [...prev];
//     updated[nextIndex] = {
//       car_name: carName,
//       day: selectedValues[nextIndex], // auto selected date
//       price: "",
//       quantity: carQuantity
//     };
//     return updated;
//   });

//   // ✅ ek nayi row dikhao
//   setActiveDays(prev => prev + 1);
// };


const handleNext = () => {
  if (activeDays >= stayNights2.length) return;

  const nextIndex = activeDays;

  setRowsData(prev => {
    const updated = [...prev];

    if (!updated[nextIndex]) {
      updated[nextIndex] = {
        car_name: carName,
        day: selectedValues[nextIndex] || stayNights2[nextIndex],
        price: "",
        quantity: carQuantity
      };
    }

    return updated;
  });

  setSelectedValues(prev => {
    const updated = [...prev];
    if (!updated[nextIndex]) {
      updated[nextIndex] = stayNights2[nextIndex];
    }
    return updated;
  });

  setActiveDays(prev => prev + 1);
};

 

 
 
 



useEffect(()=>{
console.log(rowsData,"de");

},[rowsData])

 


const handleCheckboxSelect = (rowIndex, night) => {


    setSelectedValues(prev => {
    const updated = [...prev];

    // agar same date already selected hai → remove (toggle off)
    if (updated[rowIndex]?.date === night.date) {
      updated[rowIndex] = undefined; // ya null
    } else {
      // warna select karo
      updated[rowIndex] = night;
    }

    return updated;
  });
  setRowsData(prev => {
    const updated = [...prev];

    if (updated[rowIndex]?.day?.date === night.date) {
      // toggle off
      updated[rowIndex] = {
        ...updated[rowIndex],
        day: null
      };
    } else {
      // select
      updated[rowIndex] = {
        ...updated[rowIndex],
        day: night,
        car_name: carName || "",
        price: updated[rowIndex]?.price || ""
      };
    }

    return updated;
  });
};

useEffect(()=>{
console.log(rowsData,"send");

},[rowsData])



  const saveCars = async () => {
    try {
      // 1️⃣ Fetch existing rows from Supabase for this form_no
      const { data: dbRows } = await supabase
        .from("car_entries")
        .select("*")
        .eq("form_no", id);

      // 2️⃣ IDs for comparison
      const dbIds = dbRows.map((r) => r.id); // DB me jo rows already hain
      const uiIds = rows.filter((r) => r.db_id).map((r) => r.db_id); // UI me jo rows hain with db_id

      // 3️⃣ DELETE → jo UI me nahi hain
      const toDelete = dbIds.filter((id) => !uiIds.includes(id));

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
              quantity: Number(row.quantity),
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

  // useEffect(() => {

  //      fetchRows();

  // }, [showModal]);

  const [services, setServices] = useState([]);
 

  useEffect(() => {
    async function userData() {
      const { data, error } = await supabase
        .from("form_1")
        .select("*")
        .eq("formNo", id)
        .single();
      //  console.log(data)
      setUserData(data);
      setStayNights(data.nightDates);
      setMaxRows(data.nightDates.length);
      setStayNights2(data.nightDates);
      //  setSelectedNights(data.nightDates)
    }

    userData();
  }, []);

  async function getData2() {
    const { data, error } = await supabase.from("Hotels").select("*");
    // console.log(data);
    setStayHotel(data);
  }

  let [serviceLocation, setServiceLocation] = useState([]);
  let [serviceName, setserviceName] = useState([]);

  async function getData3() {
    const { data, error } = await supabase.from("services_tour").select("*");
    // console.log(data);
    setServiceLocation(data);
  }

  async function CarsData() {
    const { data, error } = await supabase.from("cars").select("*");
    // console.log(data);
    setAllcars(data);
  }

  useEffect(() => {
    // console.log(services, "ok");
  }, [services]);

  // "deepak"

 
  const servicesTotal = services.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  // const saveRoomDetails = async () => {
  //   console.log("done");

  //   const { data, error } = await supabase
  //     .from("hotel_pricing")
  //     .upsert(
  //       {
  //         form_no: roomDetails.form_no,
  //         pax_room: Number(roomDetails.paxRoom) || 0,
  //         no_of_rooms: Number(roomDetails.noOfRooms) || 0,
  //         adult_with_extra_bed: Number(roomDetails.adultWithExtraBed) || 0,
  //         child_with_extra_bed: Number(roomDetails.childWithExtraBed) || 0,
  //         child_no_bed: Number(roomDetails.childNoBed) || 0,
  //         room_price: Number(roomDetails.roomPrice) || 0,
  //         aweb_price: Number(roomDetails.awebPrice) || 0,
  //         cweb_price: Number(roomDetails.cwebPrice) || 0,
  //         cnb_price: Number(roomDetails.cnbPrice) || 0,

  //         hotel_name:inputValue,
  //         meal_plan:mealSearch,
  //         room_type:roomSearch
  //       },
  //       {
  //         onConflict: 'form_no'
  //       }
  //     )
  //     .select();
  //     setShowPopup(false)

  //   if (error) {
  //     console.log("Save/Update Error:", error);
  //   } else {
  //     console.log("Saved/Updated Successfully:", data);
  //   }
  // };

  // Initial state

  // 🏨 Hotels total

  // const hotelsTotal = rows.reduce((sum, row) => {
  //   if (!row.flag) return sum;
  //   return sum + Number(row.price || 0) * Number(row.quantity || 0);
  // }, 0);



const hotelsTotal = rowsData.reduce((total, row) => {
  const price = Number(row.price || 0);
  const qty = Number(row.quantity || 0);
  return total + price * qty;
}, 0);















  // ➕ Extras / Services total
  const extrasTotal = services.reduce((sum, item) => {
    return sum + Number(item.price || 0);
  }, 0);



  //Hotells carpet
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
  } = useContext(context);


  const totalPrice = ['paxRoom', 'awebPrice', 'cwebPrice', 'cnbPrice'].reduce(
  (sum, key) => sum + Number(roomDetails[key] || 0),
  0
);


  // 🔢 Grand Total
  const grandTotal2 = hotelsTotal + extrasTotal + totalPrice;
console.log(grandTotal2);


  let [hotelDisplay, setHotelDisplay] = useState(false);
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

  //  useEffect(() => {
  //     if (formId) {
  //       setRoomDetails(prev => ({
  //         ...prev,
  //         form_no: formId
  //       }));
  //     }
  //   }, [formId]);

  async function getData2() {
    const { data, error } = await supabase.from("Hotels").select("*");

    setStayHotel(data);
  }

  function grandTotal(date = null) {
    const nights = Object.keys(roomDetails.price_by_date || {});

    // CASE 1: specific date
    if (date) {
      const day = roomDetails.price_by_date?.[date] || {};
      return (
        (parseFloat(day.room_price) || 0) *
          (parseInt(roomDetails.noOfRooms) || 0) +
        (parseInt(roomDetails.adultWithExtraBed) || 0) *
          (parseFloat(day.aweb) || 0) +
        (parseInt(roomDetails.childWithExtraBed) || 0) *
          (parseFloat(day.cweb) || 0) +
        (parseInt(roomDetails.childNoBed) || 0) * (parseFloat(day.cnb) || 0)
      );
    }

    // CASE 2: overall total
    return nights.reduce((sum, nightDate) => {
      const day = roomDetails.price_by_date[nightDate] || {};
      return (
        sum +
        (parseFloat(day.room_price) || 0) *
          (parseInt(roomDetails.noOfRooms) || 0) +
        (parseInt(roomDetails.adultWithExtraBed) || 0) *
          (parseFloat(day.aweb) || 0) +
        (parseInt(roomDetails.childWithExtraBed) || 0) *
          (parseFloat(day.cweb) || 0) +
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
      setRoomDetails((prev) => {
        const prevDay = prev.price_by_date?.[nightDate] || {
          room_price: 0,
          aweb: 0,
          cweb: 0,
          cnb: 0,
        };

        return {
          ...prev,
          price_by_date: {
            ...prev.price_by_date,
            [nightDate]: {
              ...prevDay,
              [name]: numericValue, // 🔥 THIS IS THE KEY LINE
            },
          },
        };
      });
      return;
    }

    // 🔹 NON-DATE FIELDS
    setRoomDetails((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
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
        room_price:
          roomDetails.price_by_date[activeNight.date]?.room_price || 0,
        aweb: roomDetails.price_by_date[activeNight.date]?.aweb || 0,
        cweb: roomDetails.price_by_date[activeNight.date]?.cweb || 0,
        cnb: roomDetails.price_by_date[activeNight.date]?.cnb || 0,
      };

      // ✅ Updated price object
      let updatedPrices = { ...roomDetails.price_by_date };

      if (keepSamePrice) {
        // Keep same price for all selected nights
        stayNights.forEach((night) => {
          updatedPrices[night.date] = { ...currentValues };
        });
      } else {
        // Sirf activeNight ki date update
        updatedPrices[activeNight.date] = { ...currentValues };
      }

      // ✅ Supabase upsert
      const { data, error } = await supabase
        .from("hotel_pricing") // apna table name
        .upsert(
          [
            {
              form_no: formId,
              hotel_name: inputValue,
              meal_plan: mealSearch,
              room_type: roomSearch,
              pax_per_room: Number(roomDetails.paxRoom) || 0,
              no_of_rooms: Number(roomDetails.noOfRooms) || 0,
              adult_with_extra_bed: Number(roomDetails.adultWithExtraBed) || 0,
              child_with_extra_bed: Number(roomDetails.childWithExtraBed) || 0,
              child_no_bed: Number(roomDetails.childNoBed) || 0,
              price_by_date: updatedPrices,
            },
          ],
          { onConflict: ["form_no"] }
        )
        .select();

      if (error) {
        console.error("Error saving room details:", error);
        alert("Failed to save data!");
        return;
      }

      console.log("Saved successfully:", data);

      // ✅ Update local state
      setRoomDetails((prev) => ({ ...prev, price_by_date: updatedPrices }));
      setShowPopup(false); // popup close
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    console.log(selectedNights, "ok");
  }, [roomDetails.roomPrice]);


//547
  useEffect(()=>{
console.log(dayDropdown);

  },[dayDropdown])
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
      form_no: data.form_no,
    });
  };

  // useEffect(() => {
  //   if (formId) {
  //     fetchRoomDetails();
  //   }
  // }, [formId]);



 
const getRotatedNights = (startDate) => {
  const startIndex = stayNights2.findIndex(
    n => n.date === startDate
  );

  return [
    ...stayNights2.slice(startIndex),
    ...stayNights2.slice(0, startIndex)
  ];
};



const [gstChecked, setGstChecked] = useState(true); // checkbox default ticked
// const [gstValue, setGstValue] = useState(5);       // default 5%
// const [grandTotal2, setGrandTotal2] = useState(10000); // example total
const [gstAmount, setGstAmount] = useState(0);
const [finalTotal, setFinalTotal] = useState(grandTotal2);

// Effect to calculate GST whenever total, gstValue, or checkbox changes
useEffect(() => {
  if (gstChecked) {
    const amount = (grandTotal2 * gstValue) / 100;
    setGstAmount(amount);
    setFinalTotal(grandTotal2 + amount);
  } else {
    setGstAmount(0);
    setFinalTotal(grandTotal2);
  }
}, [grandTotal2, gstValue, gstChecked]);



// const handleDateSelect = (night) => {
//   const orderedNights = getRotatedNights(night.date);


//   console.log(orderedNights,"as");
  
//   setSelectedValues(orderedNights);

//   setRowsData(
//     orderedNights.map(n => ({
//       car_name: carName,
//       day: n,
//       price: "",
//       quantity:carQuantity
//     }))
//   );

//   setActiveDays(1); // start from first row
// };

//  const handleDateSelect = (night, index) => {
//   // selectedValues update
//   setSelectedValues(prev => {
//     const updated = [...prev];
//     updated[index] = night;
//     return updated;
//   });

//   // rowsData ke sirf us index ko update karo
//   setRowsData(prev => {
//     const updated = [...prev];
//     updated[index] = {
//       ...updated[index],
//       day: night
//     };
//     return updated;
//   });
// };


const handleDateSelect = (night) => {
  const orderedNights = getRotatedNights(night.date);


  console.log(orderedNights,"as");
  
  setSelectedValues(orderedNights);

  setRowsData(
    orderedNights.map(n => ({
      car_name: carName,
      day: n,
      price: "",
      quantity:carQuantity
    }))
  );

  setActiveDays(1); // start from first row
};

  return (
    <>
      {userData ? (
        <div className="px-4 py-4  rounded-lg  mx-auto space-y-6 bg-blue-100">
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
              Please review basic details for this quote. You can edit these
              details to provide a quote with different configuration, without
              changing the trip details.
            </p>
          </div>

          {/* TABLE + BUTTON ROW */}
          <div className="flex flex-col  sm:flex-row sm:items-center xl:items-start sm:justify-between xl:justify-start gap-4">
            {/* TABLE */}
            <div className="overflow-x-auto   sm:w-auto flex justify-start">
              <table className=" border-collapse text-left   border-black">
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

          <div className="bg-white p-2 text-black font-semibold">
            Package Types / Categories: 1 Option
          </div>

          {/* //thisOne */}
          <Hotels formId={id} stayNights={stayNights} />

          {/* Transport and Activities */}

          <div className="p-4">
            {/* Trigger Div */}
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <h2 className="font-bold text-2xl text-black">
                Transports and Activities
              </h2>
              <div className="p-2 bg-green-300 flex gap-2 items-center relative">
                <input type="checkbox" />
                <span>Same Cab Type for All</span>
              </div>
            </div>
{/* 992 */}
            {showModal && (
              <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg w-1/2 p-6 relative">
                  <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </button>

                  <h3 className="font-bold text-xl mb-4">
                    Add Transport / Activity
                  </h3>

                  <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">
                          Type
                        </th>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">   Quantity    </th>
                      </tr>
                    </thead>

                    <tbody>




                         <tr >
                <td className="border-b border-gray-300 px-4 py-2 relative">
<input type="text" placeholder="Enter type" className="border-4 rounded px-2 py-1 w-full" value={carName}                 // ✅ ADD THIS
      onFocus={async () => {
    await CarsData();
    setDropdownOpen2(true);
      }}
         onBlur={() => setDropdownOpen2(false)}
      onChange={(e) => setCarName(e.target.value)}  />


    
        {dropdown2 && (
  <div className="absolute mt-1 top-full left-0 w-full max-h-[15vh]
                  overflow-y-auto text-black border z-50 bg-white shadow">
                    
                      {allCars.map((val, i) => (
                          <label  key={i}
       className="flex items-center px-3 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"

        onMouseDown={() => {
          setCarName(val.car_name)
          setDropdownOpen2(false)}}>
        <input type="radio" className="mr-2" checked={carName === val.car_name} readOnly/> {val.car_name} </label> ))}
  </div>
)}

        </td>

 
        <td className="border-b border-gray-300 px-4 py-2 flex gap-3">

          <input type="number" placeholder="type here!" className="border border-gray-400 rounded px-2 py-1 w-full" 
          value={carQuantity}  min={1}
          onChange={(e) => {
            setCarQuantity(e.target.value)}}/>

 
         
        </td>
      </tr>
                    </tbody>
                  </table>



                  <div className="mt-4 flex  gap-2">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      //  onClick={saveCars}
                      onClick={() => setShowModal(false)}
                    >
                      {" "}
                      Select Cab Types
                    </button>

                    <button
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!transportDisplay ? (
              <button
                className="bg-blue-600 mt-4 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded shadow-lg transition duration-300"
                onClick={() => {
                  setTransportDisplay(true);
                  setActiveDays(1);
                }}
              >
                Add services
              </button>
            ) : (
              <>
 {/* 993 */}
 
                           {/* {stayNights2.slice(0, activeDays).map((day, index) => (  */}
                           {rowsData.slice(0, activeDays).map((row, index) => (

  <div key={index} className="flex flex-col md:flex-row gap-8 p-4 border-4 border-blue-500 rounded">
    <div className="flex-1 flex gap-4">
      <label className="flex flex-col border-4 border-black">
        <span className="font-semibold mb-1"> Days</span>
        <div className="relative">
            {/* // value={selectedValues[index]?.date ? `${selectedValues[index].date} (${selectedValues[index].day})` : ""} */}

          <input
            type="text"
            onFocus={() => setOpenDropdownIndex(index)}
            onBlur={() => setOpenDropdownIndex(null)}
            readOnly
            className="border rounded px-3 py-2"
          />

          {openDropdownIndex === index && (
            <div className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto bg-white border z-50
             shadow"  onMouseDown={(e) => e.preventDefault()} >
              {stayNights2.map((night, i) => (
                <div key={i} className="flex items-center px-3 py-2 cursor-pointer border-b">
                  <input type="checkbox" 
 
                        checked={selectedValues[index]?.date === night.date}
  onChange={() => handleDateSelect(night, index)}
                    />
                  <div>{night.date} ({night.day})</div>
                </div>
              ))}
            </div>
          )}

          {selectedValues[index] && (
            <div className="mt-1 text-sm text-blue-600">
              {selectedValues[index].date} ({selectedValues[index].day})
            </div>
          )}
        </div>
      </label>




{/* 800 */}
{/* <label className="flex flex-col">
              <span className="font-semibold mb-1">Service Location</span>
          <div className='relative'> 
            
   <input className="border px-3 py-2 rounded"  type="text" value={selectedServiceLocation[index] || ""} 
          onChange={(e) => {
             const selected = [...selectedServiceLocation];
              selected[index] = e.target.value; 
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

 
  {serviceDropdown[index] && (
    <div  className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 bg-white shadow" onMouseDown={(e) => e.preventDefault()}>
      {serviceLocation.map((val, i) => (
        <label  key={i} className="flex items-center px-3 py-2 border-b cursor-pointer">
          <input type="radio"name={`serviceLocation-${index}`}   className="mr-2"
               onClick={() => {
 e
             const arr = [...serviceDropdown];
            arr[index] = false;
             setServiceDropdown(arr);

         
             const selected = [...selectedServiceLocation];
            selected[index] = val.service_locations;  
            setSelectedServiceLocation(selected);

    
           setserviceName(val.service_type);

    
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
  value={selectedServiceType[index] || ""}  
  onChange={(e) => {
    const updated = [...selectedServiceType];
    updated[index] = e.target.value;  
    setSelectedServiceType(updated);
  }}
 
        onFocus={() => {
        const arr = [...serviceTypeDropdown];
         arr[index] = true;   
           setServiceTypeDropdown(arr)}}
           
           
             onBlur={() => {
      const arr = [...serviceTypeDropdown];
      arr[index] = false;  
      setServiceTypeDropdown(arr);
  }}/>
 

  {serviceTypeDropdown[index] && (
  <div
    className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 bg-white shadow"
    onMouseDown={e => e.preventDefault()}>

    {serviceName.map((type, i) => (
      <label
        key={i} className="flex items-center px-3 py-2 border-b cursor-pointer">
        <input
          type="radio"
          name={`serviceType-${index}`}
          className="mr-2"
          onClick={() => {
            const selected = [...selectedServiceType];
            selected[index] = type; 
            setSelectedServiceType(selected);

            const arr = [...serviceTypeDropdown];
            arr[index] = false;  
            setServiceTypeDropdown(arr);
          }}
        />
        {type}
      </label>
    ))}
  </div>
)}

        </div>
            </label> */}

      <label className="flex flex-col">
              <span className="font-semibold mb-1">Service Location</span>
          <div className='relative'> 
            
   {/* <input className="border px-3 py-2 rounded"  type="text" value={selectedServiceLocation[index] || ""} 
          onChange={(e) => {
             const selected = [...selectedServiceLocation];
              selected[index] = e.target.value; 
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
            }}/> */}

            <input
  className="border px-3 py-2 rounded"
  type="text"
  value={rowsData[index]?.service_location || ""}
  onChange={(e) => {
    const updated = [...rowsData];
    updated[index] = {
      ...updated[index],
      service_location: e.target.value
    };
    setRowsData(updated);
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
  }}
/>



 
  {serviceDropdown[index] && (
    <div  className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 bg-white shadow" onMouseDown={(e) => e.preventDefault()}>
      {serviceLocation.map((val, i) => (
        <label  key={i} className="flex items-center px-3 py-2 border-b cursor-pointer">
          <input type="radio"name={`serviceLocation-${index}`}   className="mr-2"
          //      onClick={() => {
  
          //    const arr = [...serviceDropdown];
          //   arr[index] = false;
          //    setServiceDropdown(arr);

         
          //    const selected = [...selectedServiceLocation];
          //   selected[index] = val.service_locations;  
          //   setSelectedServiceLocation(selected);

    
          //  setserviceName(val.service_type);

    
          //   const selectedType = [...selectedServiceType];
          //   selectedType[index] = val.service_type[0];
          //  setSelectedServiceType(selectedType);
          //    }} 

          onClick={() => {
  const updated = [...rowsData];
  updated[index] = {
    ...updated[index],
    service_location: val.service_locations,
    service_type: val.service_type[0] // default first type
  };
  setRowsData(updated);

  const arr = [...serviceDropdown];
  arr[index] = false;
  setServiceDropdown(arr);

  setserviceName(val.service_type);
}}

             
             />
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
            {/* <input  className="border px-3 py-2 rounded" 
             type="text"
  value={selectedServiceType[index] || ""}  
  onChange={(e) => {
    const updated = [...selectedServiceType];
    updated[index] = e.target.value;  
    setSelectedServiceType(updated);
  }}
 
        onFocus={() => {
        const arr = [...serviceTypeDropdown];
         arr[index] = true;   
           setServiceTypeDropdown(arr)}}
           
           
             onBlur={() => {
      const arr = [...serviceTypeDropdown];
      arr[index] = false;  
      setServiceTypeDropdown(arr);
  }}/> */}

  <input
  className="border px-3 py-2 rounded"
  type="text"
  value={rowsData[index]?.service_type || ""}
  onChange={(e) => {
    const updated = [...rowsData];
    updated[index] = {
      ...updated[index],
      service_type: e.target.value
    };
    setRowsData(updated);
  }}
  onFocus={() => {
    const arr = [...serviceTypeDropdown];
    arr[index] = true;
    setServiceTypeDropdown(arr);
  }}
  onBlur={() => {
    const arr = [...serviceTypeDropdown];
    arr[index] = false;
    setServiceTypeDropdown(arr);
  }}
/>

 

  {serviceTypeDropdown[index] && (
  <div
    className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto text-black border z-50 bg-white shadow"
    onMouseDown={e => e.preventDefault()}>

    {serviceName.map((type, i) => (
      <label
        key={i} className="flex items-center px-3 py-2 border-b cursor-pointer">
        <input
          type="radio"
          name={`serviceType-${index}`}
          className="mr-2"
          // onClick={() => {
          //   const selected = [...selectedServiceType];
          //   selected[index] = type; 
          //   setSelectedServiceType(selected);

          //   const arr = [...serviceTypeDropdown];
          //   arr[index] = false;  
          //   setServiceTypeDropdown(arr);
          // }}

          onClick={() => {
  const updated = [...rowsData];
  updated[index] = {
    ...updated[index],
    service_type: type
  };
  setRowsData(updated);

  const arr = [...serviceTypeDropdown];
  arr[index] = false;
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
            <td className="border px-4 py-2">
  {rowsData[index]?.car_name || ""}
</td>

            <td className="border px-4 py-2"><sup>INR</sup> NA</td>
            <td className="border px-4 py-2">
              <input type="number" className="border rounded px-2 py-1 w-full"
                value={rowsData[index]?.price || ""}
                onChange={(e)=>{
                  let a = [...rowsData]
                  a[index].price = e.target.value
                  setRowsData(a)

                }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
      onClick={()=>handleRemoveRow(index)}>
        Remove
      </button>
    </div>
  </div>
))}
              </>
            )}


 

 
  <div className="text-right">
    {/* <button className="bg-green-600 text-white px-4 py-2 rounded" 
    onClick={()=>{

  if (activeDays >= selectedValues.length) return;

  setActiveDays(prev => prev + 1);}}
    
    >  Next</button> */}

    <button
  className="bg-green-600 text-white px-4 py-2 rounded"
onClick={handleNext}



  
>
  Next
</button>
  </div>
 


           
          
            {/* any extra or sightseeing in Transportation */}

            <ExtraServices
              services={services}
              setServices={setServices}
              duration={stayNights}
              formId={id}
            />

            {/* Summary */}

            <div>
              <div>
                <h3 className="font-bold text-2xl">Summary</h3>
                <p>Please review the quote's data before creating</p>
              </div>

              <div className=" p-2  bg-white">
                <table className="w-[30%] ">
                  <thead className="text-left">
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

              <div className="ce">
                {/* Acoomodation */}
                <div className="ce  rounded-xl   mt-4">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Accommodation
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 border text-left font-medium text-gray-700">
                            Night
                          </th>
                          <th className="px-3 py-2 border text-left font-medium text-gray-700">
                            Hotel
                          </th>
                          <th className="px-3 py-2 border text-left font-medium text-gray-700">
                            Meal
                          </th>
                          <th className="px-3 py-2 border text-left font-medium text-gray-700">
                            Rooms
                          </th>
                          <th className="px-3 py-2 border text-right font-medium text-gray-700">
                            Price
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {stayNights.map((data, index) => (
                          <tr   key={index}
                            // className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                            className="bg-white   hover:bg-gray-100 transition"
                          >
                            <td className="px-3 py-2 border">
                              {index + 1}, {data.date}
                            </td>

                            <td className="px-3 py-2 border">
                              {inputValue || "-"}
                            </td>

                            <td className="px-3 py-2 border">
                              {mealSearch || "-"}
                            </td>

                            <td className="px-3 py-2 border">
                              <div className="text-gray-700">
                                {roomDetails?.noOfRooms} {roomSearch || "-"}
                              </div>

                              <div className="text-xs text-gray-500 leading-tight">
                                {[
                                  roomDetails?.paxRoom &&
                                    `${roomDetails.paxRoom} Pax`,
                                  roomDetails?.adultWithExtraBed &&
                                    `${roomDetails.adultWithExtraBed} AWEB`,
                                  roomDetails?.childWithExtraBed &&
                                    `${roomDetails.childWithExtraBed} CWEB`,
                                  roomDetails?.childNoBed &&
                                    `${roomDetails.childNoBed} CNB`,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </div>
                            </td>

                            <td className="px-3 py-2 border text-right font-semibold text-gray-800">
                              INR{" "}
                              {Number(
                                roomDetails.room_price_by_date?.[data.date]
                                  ?.room_price || 0
                              ) +
                                Number(
                                  roomDetails.room_price_by_date?.[data.date]
                                    ?.aweb || 0
                                ) +
                                Number(
                                  roomDetails.room_price_by_date?.[data.date]
                                    ?.cweb || 0
                                ) +
                                Number(
                                  roomDetails.room_price_by_date?.[data.date]
                                    ?.cnb || 0
                                )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-2 text-right font-semibold">
                    Total: <sup>INR</sup>{" "}
                    {
                      // Room price total (date-wise × noOfRooms)
                      Object.values(
                        roomDetails?.room_price_by_date || {}
                      ).reduce(
                        (sum, day) =>
                          sum +
                          Number(day.room_price || 0) *
                            Number(roomDetails?.noOfRooms || 0) +
                          Number(day.aweb || 0) *
                            Number(roomDetails?.adultWithExtraBed || 0) +
                          Number(day.cweb || 0) *
                            Number(roomDetails?.childWithExtraBed || 0) +
                          Number(day.cnb || 0) *
                            Number(roomDetails?.childNoBed || 0),
                        0
                      )
                    }
                  </div>
                </div>

                <div>
        
                  <h3 className="font-bold text-xl my-3">
                    Transport and Activities
                  </h3>
                  {/* <table className="w-full border border-gray-200 text-sm"> */}
                             <table className="w-full text-sm rder border-gray-200 ">
                    <tbody>
                  {rowsData.map((row, index) => (
  <tr key={index} className="bg-white   hover:bg-gray-100 transition">
    <td className=" border-b px-4 py-2">{row.day?.date} ({row.day?.day})</td>

    <td className="border px-3 py-2">
      {row.service_location || row.service_type ? (
        <>
          {row.service_location && <strong>{row.service_location}</strong>}
          <br />
          {row.service_type}
        </>
      ) : "—"}
    </td>

    <td className="border-b px-4 py-2">{row.car_name || "—"}</td>

    <td className=" px-4 py-2 border-b text-right font-semibold">
      {row.price ? <><sup>INR</sup> {row.price}</> : "NA"}
    </td>
  </tr>
))}

                    </tbody>
                  </table>
                </div>
                <div className="p-2 text-right font-bold border-2 border-red-400 ">
                  Total: <sup>INR</sup> {hotelsTotal}
                  {/* Total: <sup>INR</sup> {totalAmount} */}
                </div>

                {services.length > 0 &&
                  services.some((item) => item.service || item.price) && (
                    <>
                      <table className="w-full border border-gray-200 text-sm mb-2">
                        <tbody>
      
                          {services.map((item, index) => (
                            <tr
                              key={index}
                              className="bg-white hover:bg-gray-100 transition border-b"
                            >
                              <td className="px-4 py-2  border-black">
                                {item.service || "—"}
                              </td>
                              <td className="px-4 py-2  border-black text-right">
                                {item.price ? `INR ${item.price}` : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="p-2 text-right font-bold border-black">
                        Others: <sup>INR</sup> {extrasTotal}
                      </div>
                    </>
                  )}

                <div className="total flex justify-end gap-6 mt-4 border-t pt-4 font-semibold ">
                  {/* LEFT : TOTAL COST */}
                  <div className="text-right">
                    <h3 className=" ">Total Cost</h3>
                    <span className="text-xl font-bold">
                      <sup>INR</sup> {grandTotal2}
                    </span>
                  </div>

                  {/* HOTELS */}
                  <div className="text-right">
                    Hotels <br />
                    <span className="font-semibold">
                      <sup>INR</sup> {hotelsTotal}
                    </span>
                  </div>

                  <div className="text-xl">+</div>

                  {/* EXTRAS */}
                  <div className="text-right">
                    Extras <br />
                    <span className="font-semibold">
                      <sup>INR</sup> {extrasTotal}
                    </span>
                  </div>
                </div>




<div>
  <h2 className="font-bold  text-2xl">set markup, tax and rounding</h2>


 <div>
    <div>Cost Price: {grandTotal2}</div>

    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={gstChecked}
        onChange={() => setGstChecked(prev => !prev)}
      />
      <span>
        GST:{" "}
        <input
          type="number"
          value={gstValue}
          min={0}
          onChange={(e) => setGstValue(Number(e.target.value))}
        />
        %
      </span>
    </div>

    <div>GST Amount: {gstAmount.toFixed(2)}</div>
    <div>Final Total: {finalTotal.toFixed(2)}</div>
  </div>

</div>
                <button
                  className="p-2 border-2 border-red-400 bg-orange-500"
                  onClick={async () => {
                    const formNo = Math.floor(
                      1000000 + Math.random() * 9000000
                    ).toString();
                    navigate(`/trips/${id}/quotes/${formNo}/edit-iternary`);
                  }}
                >
                  Save Quote{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-gray-400 py-10">Loading...</h1>
      )}
    </>
  );
}

export default NewQuote;

{
  /* Modal 76*/
}
{
  /* DROPDOWN 1/11/1111*/
}
