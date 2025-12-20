import React, { use, useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { supabase } from "../../supabase-client";
import { useNavigate, useParams } from "react-router-dom";
import { LogIn } from "lucide-react";
import ExtraServices from "./sections/ExtraServices";
import Hotels from "./sections/Hotels";
import { context } from "../../context/LoginContext";

function NewQuote() {
  let [userData, setUserData] = useState(null);
let [dropdown2, setDropdownOpen2]= useState(false)
  // let [mealSearch, setMealSearch]= useState("")
  const [typeValue, setTypeValue] = useState("");
    let [car_quantity, setCar_quantity] = useState("");
  // let [roomSearch, setRoomSearch] = useState("")
  let [stayNights, setStayNights] = useState([]);
const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
const [rowsData, setRowsData] = useState([]);


const [selectedValues, setSelectedValues] = useState([]);

  let { id } = useParams();

  let [showModal, setShowModal] = useState(false);
  let [allCars, setAllcars] = useState([]);

  let navigate = useNavigate();

  let [stayNights2, setStayNights2] = useState([]);

  useEffect(() => {
    console.log(stayNights, "rocks");
  }, [stayNights]);

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
 

// const handleRemoveRow = (rowIndex) => {
//   setSelectedValues(prev => {
//     const updated = [...prev];
//     updated.splice(rowIndex, 1); // remove specific row safely
//     return updated;
//   });

//   // Optional: adjust activeDays if you are still using it
//   setActiveDays(prev => Math.max(prev - 1, 0));
// };


// const handleRemoveRow = (index) => {
//   setSelectedValues(prev => prev.filter((_, i) => i !== index));
//   setRowsData(prev => prev.filter((_, i) => i !== index));
//   // setActiveDays(prev => Math.max(prev - 1, 0));
//   setActiveDays(prev => prev > 0 ? prev - 1 : 0);

// };

// const handleRemoveRow = (index) => {
//   setSelectedValues(prev => prev.filter((_, i) => i !== index)); // remove
//   setRowsData(prev => prev.filter((_, i) => i !== index)); // remove corresponding row
//   setActiveDays(prev => prev > 0 ? prev - 1 : 0);
// };



// const handleRemoveRow = (index) => {
//   setSelectedValues(prev => prev.filter((_, i) => i !== index)); // remove & compact
//   setRowsData(prev => prev.filter((_, i) => i !== index));
//   setActiveDays(prev => (prev > 0 ? prev - 1 : 0));
// };


const handleRemoveRow = (index) => {
  setSelectedValues(prev => prev.filter((_, i) => i !== index));
  setRowsData(prev => prev.filter((_, i) => i !== index));
  setActiveDays(prev => Math.max(prev - 1, 0));
};


  const handleTypeChange = (index, value) => {
  setRows(prev =>
    prev.map((row, i) =>
      i === index ? { ...row, type: value } : row
    )
  );
};
 
  const toggleDropdown = (index, value) => {
  setRows(prev =>
    prev.map((row, i) =>
      i === index ? { ...row, dropdownOpen: value } : row
    )
  );
};

 

  const handleQuantityChange = (index, value) => {
  setRows(prev =>
    prev.map((row, i) =>
      i === index ? { ...row, quantity: value } : row
    )
  );
};


 

 
// const handleNext = () => {
//   // Find first stayNights2 date that is not yet selected
//   const nextNight = stayNights2.find(night => 
//     !selectedValues.some(selected => selected.date === night.date)
//   );

//   if (!nextNight) return; // agar sab selected ho gaye

//   setSelectedValues(prev => [...prev, nextNight]);
//   setActiveDays(prev => prev + 1); // optional
// };

// const handleNext = () => {
//   // last row ka selected day
//   const lastSelected = selectedValues[selectedValues.length - 1];

//   // agar pehla hi Next click hai
//   if (!lastSelected) {
//     setSelectedValues([stayNights2[0]]);
//     setRowsData([{
//       day: stayNights2[0],
//       car_name: typeValue || "",
//       price: ""
//     }]);
//     setActiveDays(1);
//     return;
//   }

//   const currentIndex = stayNights2.findIndex(
//     n => n.date === lastSelected.date
//   );

//   const nextNight = stayNights2[currentIndex + 1];
//   if (!nextNight) return;

//   setSelectedValues(prev => [...prev, nextNight]);
//   setRowsData(prev => [
//     ...prev,
//     {
//       day: nextNight,
//       car_name: typeValue || "",
//       price: ""
//     }
//   ]);
//   setActiveDays(prev => prev + 1);
// };





// const handleNext = () => {
//   // activeDays bata raha hai kitni rows visible hain
//   const currentIndex = activeDays - 1;

//   // agar pehli baar Next dabaya
//   if (currentIndex < 0) {
//     setSelectedValues([stayNights2[0]]);
//     setRowsData([{
//       day: stayNights2[0],
//       car_name: typeValue || "",
//       price: ""
//     }]);
//     setActiveDays(1);
//     return;
//   }

//   const currentDay = selectedValues[currentIndex];
//   if (!currentDay) return;

//   const stayIndex = stayNights2.findIndex(
//     n => n.date === currentDay.date
//   );

//   const nextNight = stayNights2[stayIndex + 1];
//   if (!nextNight) return;

//   setSelectedValues(prev => {
//     const updated = [...prev];
//     updated[currentIndex + 1] = nextNight;
//     return updated;
//   });

//   setRowsData(prev => {
//     const updated = [...prev];
//     updated[currentIndex + 1] = {
//       day: nextNight,
//       car_name: typeValue || "",
//       price: ""
//     };
//     return updated;
//   });

//   setActiveDays(prev => prev + 1);
// };




// const handleNext = () => {
//   // agar kuch bhi select nahi hua
//   if (selectedValues.length === 0) {
//     setSelectedValues([stayNights2[0]]);
//     setRowsData([{
//       day: stayNights2[0],
//       car_name: typeValue || "",
//       price: ""
//     }]);
//     setActiveDays(1);
//     return;
//   }

//   // 🔥 hamesha last selected day lo
//   const lastSelected = selectedValues[selectedValues.length - 1];

//   const currentIndex = stayNights2.findIndex(
//     n => n.date === lastSelected.date
//   );

//   const nextNight = stayNights2[currentIndex + 1];
//   if (!nextNight) return;

//   setSelectedValues(prev => [...prev, nextNight]);

//   setRowsData(prev => [
//     ...prev,
//     {
//       day: nextNight,
//       car_name: typeValue || "",
//       price: ""
//     }
//   ]);

//   setActiveDays(prev => prev + 1);
// };


// const handleNext = () => {
//   // agar selectedValues empty hai
//   if (selectedValues.length === 0) {
//     const firstNight = stayNights2[0];
//     setSelectedValues([firstNight]);
//     setRowsData([{
//       day: firstNight,
//       car_name: typeValue || "",
//       price: ""
//     }]);
//     setActiveDays(1);
//     return;
//   }

//   // last existing selected night
//   const lastSelected = selectedValues[selectedValues.length - 1];
//   const currentIndex = stayNights2.findIndex(n => n.date === lastSelected.date);

//   const nextNight = stayNights2[currentIndex + 1];
//   if (!nextNight) return; // agar last night already hai

//   // add next night
//   setSelectedValues(prev => [...prev, nextNight]);
//   setRowsData(prev => [...prev, {
//     day: nextNight,
//     car_name: typeValue || "",
//     price: ""
//   }]);
//   setActiveDays(prev => prev + 1);
// };

 

// const handleNext = () => {
//   // agar selectedValues empty hai
//   if (selectedValues.length === 0) {
//     const firstNight = stayNights2[0];
//     setSelectedValues([firstNight]);
//     setRowsData([{
//       day: firstNight,
//       car_name: typeValue || "",
//       price: ""
//     }]);
//     setActiveDays(1);
//     return;
//   }

//   // 🔹 last selected night ke actual index ko stayNights2 me find karo
//   const lastSelected = selectedValues[selectedValues.length - 1];
//   const lastSelectedIndex = stayNights2.findIndex(
//     n => n.date === lastSelected.date
//   );

//   // next night nikal
//   const nextNight = stayNights2[lastSelectedIndex + 1];
//   if (!nextNight) return; // last night already selected

//   // update arrays
//   setSelectedValues(prev => [...prev, nextNight]);
//   setRowsData(prev => [...prev, {
//     day: nextNight,
//     car_name: typeValue || "",
//     price: ""
//   }]);
//   setActiveDays(prev => prev + 1);
// };


// const handleNext = () => {
//   // agar selectedValues empty hai → first night select karo
//   if (selectedValues.length === 0) {
//     const firstNight = stayNights2[0];
//     setSelectedValues([firstNight]);
//     setRowsData([{
//       day: firstNight,
//       car_name: typeValue || "",
//       price: ""
//     }]);
//     setActiveDays(1);
//     return;
//   }

//   // last selected night ka index nikal lo
//   const lastSelected = selectedValues[selectedValues.length - 1];
//   const lastIndex = stayNights2.findIndex(n => n.date === lastSelected.date);

//   // next night
//   const nextNight = stayNights2[lastIndex + 1];
//   if (!nextNight) return; // last night already selected → stop

//   // add next night
//   setSelectedValues(prev => [...prev, nextNight]);
//   setRowsData(prev => [...prev, {
//     day: nextNight,
//     car_name: typeValue || "",
//     price: ""
//   }]);
//   setActiveDays(prev => prev + 1);
// };

const handleNext = () => {
  // next index calculate karo
  const nextIndex = activeDays; // activeDays batata hai kitni rows visible hain

  // agar next index out of bounds hai → stop
  if (nextIndex >= stayNights2.length) return;

  const nextNight = stayNights2[nextIndex];

  // add next night
  setSelectedValues(prev => {
    const updated = [...prev];
    updated[nextIndex] = nextNight; // index ke hisaab se assign
    return updated;
  });

  setRowsData(prev => {
    const updated = [...prev];
    updated[nextIndex] = {
      day: nextNight,
      car_name: typeValue || "",
      price: ""
    };
    return updated;
  });

  setActiveDays(prev => prev + 1);
};



// const [car , setCar] = useState("");
 
// const handleCheckboxSelect = (rowIndex, night, nightDate) => {
  // for(carDetail of rows ){

  //   if(carDetail.date === nightDate){
  //     setCar(carDetail.type);
  //   }
  // }  



//   const handleCheckboxSelect = (rowIndex, night) => {

  

//   setSelectedValues(prev => {
//     const updated = [...prev];
//     updated[rowIndex] = night; // assign selected night to specific row
//     return updated;
//   });


// };


// const handleCheckboxSelect = (rowIndex, night) => {
//   setSelectedValues(prev => {
//     const updated = [...prev];

//     // agar same date already selected hai → remove (toggle off)
//     if (updated[rowIndex]?.date === night.date) {
//       updated[rowIndex] = undefined; // ya null
//     } else {
//       // warna select karo
//       updated[rowIndex] = night;
//     }

//     return updated;
//   });
// };



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
        car_name: typeValue || "",
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

  // useEffect(() => {
  // openDropdownIndex
  // }, [openDropdownIndex]);

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

  const hotelsTotal = rows.reduce((sum, row) => {
    if (!row.flag) return sum;
    return sum + Number(row.price || 0) * Number(row.quantity || 0);
  }, 0);

  // ➕ Extras / Services total
  const extrasTotal = services.reduce((sum, item) => {
    return sum + Number(item.price || 0);
  }, 0);

  // 🔢 Grand Total
  const grandTotal2 = hotelsTotal + extrasTotal;

  //HOtells carpet
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

  const handleCheckboxChange = (item) => {
    setSelectedNights((prev) => {
      const exists = prev.some((n) => n.date === item.date);

      if (exists) {
        // ❌ remove
        return prev.filter((n) => n.date !== item.date);
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
                             {/* //992 */}
                      {/* {rows.map((row, index) => (
                        <tr key={index}>
                          <td className="border-b border-gray-300 px-4 py-2 relative">
                            <input
                              type="text"
                              placeholder="Enter type"
                              className="border-4 rounded px-2 py-1 w-full"
                              value={row.type}
                              onFocus={async () => {
                                await CarsData();
                                toggleDropdown(index, true);
                              }}
                              onBlur={() => toggleDropdown(index, false)}
                              onChange={(e) =>
                                handleTypeChange(index, e.target.value)
                              }
                            />

                            {row.dropdownOpen && (
                              <div
                                className="absolute mt-1 top-full left-0 w-full max-h-[15vh]
                        overflow-y-auto text-black border z-50 bg-white shadow"
                              >
                                {allCars.map((val, i) => (
                                  <label
                                    key={i}
                                    className="flex items-center px-3 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                                    onMouseDown={() => {
                                      handleTypeChange(index, val.car_name);
                                      toggleDropdown(index, false);
                                    }} >
                                    <input type="radio"
                                      className="mr-2"
                                      checked={row.type === val.car_name}
                                      readOnly
                                    />
                                    {val.car_name}
                                  </label>
                                ))}
                              </div>
                            )}
                          </td>

                          <td className="border-b border-gray-300 px-4 py-2 flex gap-3">
                            <input
                              type="number"
                              min={1}
                              className="border border-gray-400 rounded px-2 py-1 w-full"
                              value={row.quantity}
                              onChange={(e) =>
                                handleQuantityChange(index, e.target.value)
                              }
                            />

                            {rows.length >= 1 && (
                              <button onClick={() => handleRemoveRow(index)}
                              className="border-2 border-black text-black px-2">Remove </button>  )}
                          </td>
                        </tr>
                         ))} */}



                         <tr >
                <td className="border-b border-gray-300 px-4 py-2 relative">
<input
  type="text"
  placeholder="Enter type"
  className="border-4 rounded px-2 py-1 w-full"
  value={typeValue}                 // ✅ ADD THIS
  onFocus={async () => {
    await CarsData();
    setDropdownOpen2(true);
  }}
  onBlur={() => setDropdownOpen2(false)}
  onChange={(e) => setTypeValue(e.target.value)}  // ✅
/>


    
        {dropdown2 && (
  <div className="absolute mt-1 top-full left-0 w-full max-h-[15vh]
                  overflow-y-auto text-black border z-50 bg-white shadow">
                    
                      {allCars.map((val, i) => (
                          <label  key={i}
       className="flex items-center px-3 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"

        onMouseDown={() => {
          setTypeValue(val.car_name)
          setDropdownOpen2(false)}}>
        <input type="radio" className="mr-2" checked={typeValue === val.car_name} readOnly/> {val.car_name} </label> ))}
  </div>
)}

        </td>

 
        <td className="border-b border-gray-300 px-4 py-2 flex gap-3">

          <input type="number" placeholder="type here!" className="border border-gray-400 rounded px-2 py-1 w-full" 
          value={car_quantity}  min={1}
          onChange={(e) => {
            setCar_quantity(e.target.value)}}/>

            {/* <button  className="border-2 border-black text-black p-1"  > remove </button> */}
         
        </td>
      </tr>
                    </tbody>
                  </table>

       
                  {/* <button
                    onClick={handleAddRow}
                    disabled={rows.length >= maxRows}
                    className="mt-3 border px-3 py-1 disabled:opacity-50"
                  >
                    Add More
                  </button> */}

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
                {stayNights2.slice(0, activeDays).map((day, index) => (
  <div key={index} className="flex flex-col md:flex-row gap-8 p-4 border-4 border-blue-500 rounded">
    <div className="flex-1 flex gap-4">
      <label className="flex flex-col border-4 border-black">
        <span className="font-semibold mb-1"> Days</span>
        <div className="relative">
          <input
            type="text"
            // value={selectedValues[index]?.date ? `${selectedValues[index].date} (${selectedValues[index].day})` : ""}
            onFocus={() => setOpenDropdownIndex(index)}
            onBlur={() => setOpenDropdownIndex(null)}
            readOnly
            className="border rounded px-3 py-2"
          />

          {openDropdownIndex === index && (
            <div
              className="absolute mt-1 top-full left-0 w-full max-h-[15vh] overflow-y-auto bg-white border z-50 shadow"
              onMouseDown={(e) => e.preventDefault()} >
              {stayNights2.map((night, i) => (
                <div key={i} className="flex items-center px-3 py-2 cursor-pointer border-b">
                  <input type="checkbox" 
                  // checked={selectedValues[index]?.date === night.date}
                    checked={selectedValues.some(val => val?.date === night.date)}
                    // onChange={() => handleCheckboxSelect(index, night, night.date)}  className="mr-2"  />
                        onChange={() => handleCheckboxSelect(index, night)}  className="mr-2"  />
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
            <td className="border px-4 py-2">{typeValue && typeValue}</td>
            <td className="border px-4 py-2"><sup>INR</sup> NA</td>
            <td className="border px-4 py-2">
              <input type="number" className="border rounded px-2 py-1 w-full"
                value={rowsData[index]?.price || ""}
                  onChange={(e) => {
                     const value = e.target.value;
                     setRowsData(prev => {
                       const updated = [...prev];
                        updated[index] = {
                           ...updated[index],
                           price: value};
                       return updated
                       });
                       }}/>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => handleRemoveRow(index)}
      >
        Remove
      </button>
    </div>
  </div>
))}
              </>
            )}


            {/* {activeDays < stayNights2.length && transportDisplay &&(
              <div className="text-right">
  <button
    className="bg-green-600 text-white px-4 py-2 rounded"
    onClick={handleNext}
  >
    Next
  </button>
     </div>
)} */}

{/* Next button */}
{/* {selectedValues.length < stayNights2.length && transportDisplay && (
  <div className="text-right">
    <button
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={handleNext}
    >
      Next
    </button>
  </div>
)} */}

{/* {selectedValues.length < stayNights2.length && transportDisplay && (
  <div className="text-right">
    <button
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={handleNext}
    >
      Next
    </button>
  </div>
)} */}


{selectedValues.length < stayNights2.length && transportDisplay && (
  <div className="text-right">
    <button
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={handleNext}
    >
      Next
    </button>
  </div>
)}



           
          
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
                          <tr
                            key={index}
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
                  <table className="w-full border border-gray-200 text-sm">
                    <tbody>
                      {stayNights.map((night, index) => (
                        <tr
                          key={index}
                          className="bg-white   hover:bg-gray-100 transition"
                        >
                          {/* DAY */}
                          <td className=" border-b px-4 py-2">
                            {night.date} ({night.day})
                          </td>

                          {/* SERVICE LOCATION */}
                          {/* <td className="border px-3 py-2">
        {selectedServiceLocation[index] || "—"}<br/>
          {selectedServiceType[index] || "—"}
      </td> */}

                          <td className="border-b px-4 py-2">
                            {selectedServiceLocation[index] ||
                            selectedServiceType[index] ? (
                              <>
                                {selectedServiceLocation[index] && (
                                  <>
                                    <strong>
                                      {selectedServiceLocation[index]}
                                    </strong>
                                    <br />
                                  </>
                                )}
                                {selectedServiceType[index] &&
                                  selectedServiceType[index]}
                              </>
                            ) : (
                              "—"
                            )}
                          </td>

                          {/* SERVICE TYPE */}

                          {/* TRANSPORT */}
                          <td className=" px-4 py-2 border-b">
                            {rows[index]?.flag ? rows[index].car_name : "—"}
                          </td>

                          {/* PRICE INPUT */}
                          <td className=" px-4 py-2 border-b text-right">
                            {rows[index]?.flag ? (
                              rows[index]?.price ? (
                                <>
                                  <sup>INR</sup> {rows[index].price}
                                </>
                              ) : (
                                "NA"
                              )
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-2 text-right font-bold  border-black">
                  Total: <sup>INR</sup> {hotelsTotal}
                  {/* Total: <sup>INR</sup> {totalAmount} */}
                </div>

                {services.length > 0 &&
                  services.some((item) => item.service || item.price) && (
                    <>
                      <table className="w-full border border-gray-200 text-sm mb-2">
                        <tbody>
                          {/* <tr>
          <th className="px-4 py-2  text-left" colSpan={1}>
            Service
          </th>
          <th className="px-4 py-2   k text-right" colSpan={2}>
            Price (INR)
          </th>
        </tr> */}
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
