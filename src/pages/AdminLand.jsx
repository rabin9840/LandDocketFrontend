import {useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import LandVerifyCard from '../Components/LandVerifyCard';

export default  function AdminLand(){
    const {getUserAllData,landsInfo}=  useContext(LandRegistrationContext);
    // remove react strict mode in main jsx or else data would be shown two times
    useEffect(()=>{
        getUserAllData();
    },[]);


    

    return(
        <>
          <h1>User all lands to verify</h1>
        <button type='button' onClick={getUserAllData}>Get user Land data to verify</button>

      <div>
        {
            landsInfo.map((land,i)=>{
                // user.name
                // to view unverified data
                if(!land.isVerified)
                {
                    return <LandVerifyCard key={i}{...land}/>
                }
            })

        }

    </div>



    


        </>
        
      

        

    );

}
