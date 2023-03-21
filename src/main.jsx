import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { LandRegistrationProvider } from './context/LandRegistrationContext'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <LandRegistrationProvider>
      
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
  </LandRegistrationProvider>

)
