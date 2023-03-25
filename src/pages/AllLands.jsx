import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import AllLandCard from '../Components/AllLandCard';

export default  function AllLands(){
    const {getAllLands,landsInfo}=  useContext(LandRegistrationContext);

    //  to load the address when loading the page
    // remove react strict mode in main jsx or else data would be shown two times
    useEffect(()=>{
        getAllLands();
    },[]);


    

    return(
        <>
          <h1>Available Lands</h1>
        <button type='button' onClick={getAllLands}>Get available lands</button>

      <div>
        {
            landsInfo.map((land,i)=>{
                // user.name
                // to view unverified data
                // the current user should not be the owner of the availble land to perform selling transaction
                if(land.isVerified)
                {
                    return <AllLandCard key={i}{...land}/>
                }
            })

        }

    </div>



    


        </>
        
      

        

    );

}
