import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";

export default function AddLand(){
   const {formData,handleChange,addLandTo}=  useContext(LandRegistrationContext);

    const handleSubmit=(e)=>{
        const {landId,area,city,pradesh,propertyId,document}= formData;
        e.preventDefault();
        addLandTo();
        
      }
    return(
        <>
         <h1>Welcome to Add Land</h1>
         Area<input type="number" name="area"  onChange={handleChange} />
         City<input type="text" name="city"  onChange={handleChange} />
         Pradesh<input type="text" name="pradesh" onChange={handleChange} />
         PropertyId<input type="number" name="propertyId" onChange={handleChange} />
         Document<input type="text" name="document"  onChange={handleChange} />
          <button type='button' onClick={handleSubmit}>submit</button>
        </>
       
    );

}