import { useState, useEffect } from 'react';
// import Web3 from 'web3';
import { LandRegistrationContext } from './context/LandRegistrationContext'; 
import React, {useContext} from "react";
function App() {
   const {connectWallet, currentAccount,formData,sendTransaction,handleChange}=  useContext(LandRegistrationContext);
   
   const handleSubmit=(e)=>{

    const {landId,area,city,pradesh,propertyId,document}=formData;

    e.preventDefault();

    console.log(landId);
    // if(!landId || !amount || !address) return;

    console.log("value present")
    console.log(formData)

    sendTransaction();
  }

  return (
    <div className='App'>
      <div className="app-header">
        <h1>React Dapp authentication with React Web3.js and metamask</h1>
      </div>
      
      <div className="app-wrapper">
        {/* {!currentAccount && (
            <button className="app-button_login" onClick={connectWallet}>
              Login
            </button>
        ) } */}
        {!currentAccount && (
            <button className="app-button_login" onClick={connectWallet}>
              Login
            </button>
        )}
      </div>

        <div>
        LandId:<input type="text" name="landId" onChange={handleChange} />
        Area<input type="text" name="area" onChange={handleChange} />
        City<input type="text" name="city" onChange={handleChange} />
        Pradesh<input type="text" name="pradesh" onChange={handleChange} />
        PropertyId<input type="text" name="propertyId" onChange={handleChange} />
        Document<input type="text" name="document" onChange={handleChange} />
        
       

        <button type='button' onClick={handleSubmit}>submit</button>
      </div>



      <div>
        {/* for displaying the contract data */}

      </div>

    


    </div>
    

  
  )

  
}

export default App
