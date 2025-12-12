import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import LoginContext from './context/LoginContext.jsx'
import App2 from './App2.jsx'

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
  <LoginContext> 
    <App />
    {/* <App2/> */}
  </LoginContext>
     </BrowserRouter>

)
