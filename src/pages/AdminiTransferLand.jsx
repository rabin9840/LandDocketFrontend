// in case of land requested of particular user

import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import VerifiedRequestCard from '../Components/VerifiedRequestCard';




export default  function AdminTransferLand(){
    const {getApprovedRequests,requestInfo}= useContext(LandRegistrationContext);



    //  to load the address when loading the page
    // remove react strict mode in main jsx or else data would be shown two times
    // useEffect(()=>{
    //     getAllLands();
    // },[]);


    

    return(
        <>
          <h1>Available Request To transfer land ownership</h1>
        {/* <button type='button' onClick={getUserAddresses}>Get user Details</button> */}
        <button type='button' onClick={getApprovedRequests}>Get approved Requests</button>
        
    {/* <div>
        {
            userInformationDetail.map((user,i)=>(
                // user.name
                <UserCard key={i}{...user}/>
                // user.name,
            ))

        }

    </div> */}

      {/* <div>
        {
             requestInfo.map((request,i)=>(
                // user.name
                //when land not transferred
                <VerifiedRequestCard key={i}{...request}/>
                // user.name,
            ))

        }

    </div> */}

    <div>
        {
            requestInfo.map((request,i)=>{
                // user.name
                // to view unverified data
                if(!request.isTransfered)
                {
                    return <VerifiedRequestCard key={i}{...request}/>
                }
            })

        }

    </div>



    


        </>
        
      

        

    );

}
