import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";

export default function Form(){
   const {addUserTo,userData,handleUserChange}=  useContext(LandRegistrationContext);
   
    const handleUserSubmit=(e)=>{
        const {name,age,city,citizenShipNumber,email,document}= userData;
        e.preventDefault();
        console.log(userData);
        addUserTo();
      }

    return(
        <>
        {/* <div>
            <label>
                <p>Upload Image</p>
                <input type="file" placeholder="Upload image" onChange={async(e)=>{
                    const file= e.target.files[0];
                    console.log(file);

                    //console.log(client);
                    const add=await client.add(file);
                    const imageUrl= `https://ipfs.infura.io/ipfs/${add.path}`;
                    console.log(imageUrl);

                }} />
            </label>
        </div> */}
        
        <div>
         Name: <input type="text" name="name" onChange={handleUserChange} />
         age: <input type="number" name="age" onChange={handleUserChange} />
         city: <input type="text" name="city" onChange={handleUserChange} />
         citizenShipNumber: <input type="text" name="citizenShipNumber" onChange={handleUserChange} />
         email: <input type="text" name="email" onChange={handleUserChange} />
         {/* document: <input type="text" name="document" onChange={handleUserChange} /> */}
         <button type='button' onClick={handleUserSubmit}>add user</button>
        </div>

        </>
    );

}