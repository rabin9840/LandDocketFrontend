import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import UserCard from '../Components/UserCard';


var userTable=[];
var usersAddresses=[];


export default  function Admin(){
    const {getUserData,usersInfo}=  useContext(LandRegistrationContext);
    //  to load the address when loading the page
    // remove react strict mode in main jsx or else data would be shown two times
    useEffect(()=>{
        getUserData();
    },[]);

    return(
        <>
          <h1>Admin Page</h1>
        <button type='button' onClick={getUserData}>Get user Details</button>
        

      <div>
        {
            usersInfo.map((user,i)=>{
                // user.name
                // to view unverified data
                if(!user.isVerified)
                {
                    return <UserCard key={i}{...user}/>
                }
            })

        }

    </div>

        </>
    );

}
