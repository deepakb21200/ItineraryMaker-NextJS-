import React, { createContext, useEffect, useState } from 'react'
import { supabase } from "../supabase-client"; 
export const context = createContext();

function LoginContext(props) {
 const [userSession, setUserSession] = useState(null);


//hotels

  const [inputValue, setInputValue] = useState("");
  const [mealSearch, setMealSearch] = useState("");
  const [roomSearch, setRoomSearch] = useState("");
  const [nightPrices, setNightPrices] = useState({});
  

  // 

    const [roomDetails, setRoomDetails] = useState({
    paxRoom: "",
    noOfRooms: "",
    adultWithExtraBed: "",
    childWithExtraBed: "",
    childNoBed: "",
    // roomPrice: {},
     // ⭐ object because date-wise mandatory
  price_by_date: {},
    awebPrice: "",
    cwebPrice: "",
    cnbPrice: "",

    form_no: null
  });




useEffect(() => {
  fetchUserSession();

  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    setUserSession(session);
  });

  return () => {
    authListener.subscription.unsubscribe();
  };
}, []);


const fetchUserSession = async () => {
  const currentSession = await supabase.auth.getSession();
//   console.log(currentSession.data);
//   console.log(currentSession.data.session);

//   setUserSession(currentSession.data.session);
};

const logoutHandler = async () => {
  await supabase.auth.signOut();
};







  return (
     <context.Provider 
           value={{
            userSession, logoutHandler,
        inputValue,
        setInputValue,
        mealSearch,
        setMealSearch,
        roomSearch,
        setRoomSearch,
        nightPrices,
        setNightPrices,
        roomDetails,
        setRoomDetails
      }}
     >
      {props.children}
    </context.Provider>
  )
}

export default LoginContext