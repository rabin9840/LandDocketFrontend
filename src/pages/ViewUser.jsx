import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";



export default function ViewUser(){
   const {getUserInfo,userData}=  useContext(LandRegistrationContext);
   
   const handleUserInfo=(e)=>{
    e.preventDefault();
    getUserInfo();
  }
    return(
        <>
         <h1>Welcome To view user function</h1>
            <div>
                <button type='button' onClick={handleUserInfo}> Retirieve user info</button>
                
                    {/* {userDetails} */}
                    <h1>name:{userData.name}</h1>
                    <h1>city:{userData.city}</h1>
                    <h1>citizenShipNumber:{userData.citizenShipNumber}</h1>
                    <h1>Email:{userData.email}</h1>
                    
            {/* age:userDetails[1],
            city:userDetails[2],
            citizenShipNumber:userDetails[3],
            email:userDetails[4],
            document:userDetails[5] */}
                
               
            </div>
        </>
       
    );

}