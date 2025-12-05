import React, { createContext, useEffect, useState } from 'react'
import { supabase } from "../supabase-client"; 
export const context = createContext();

function LoginContext(props) {
 const [userSession, setUserSession] = useState(null);

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
     <context.Provider value={{ userSession, logoutHandler}}>
      {props.children}
    </context.Provider>
  )
}

export default LoginContext