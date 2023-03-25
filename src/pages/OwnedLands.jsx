import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import LandCard from '../Components/LandCard';

export default function OwnedLands(){
   const { getAllLand,landsInfo}=  useContext(LandRegistrationContext);
   
  useEffect(()=>{
    getAllLand();
},[]);

    return(
        <>
        <div>
        <h1>Welcome To view your owned land information</h1>
         <button type='button' onClick={getAllLand}>Get All lands of current user</button>
       </div>


    <div>
        {
            landsInfo.map((land,i)=>(
                <LandCard key={i}{...land}/>
            ))

        }

    </div>
        </>
    );

}