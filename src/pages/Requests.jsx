// in case of land requested of particular user

import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import RequestCard from '../Components/RequestCard';

export default  function Requests(){
    //const {userDetails,getUserInfo,userData,setUserDetails,setUserData,viewUserInfo}=  useContext(LandRegistrationContext);
    const {getAllRequests,requestInfo}= useContext(LandRegistrationContext);


    // async function getAllRequests(){
    //   const requestCount= await landRegistrationContract.getRequestsCount();
    //   const TotalRequestCount= parseInt(requestCount);
    //   console.log('inside request function'+currentAccount);

    //   for(let i=1;i<TotalRequestCount+1;i++){
    //     console.log('inside loop');
    //     const requestDetails= await landRegistrationContract.requestDetails(i);
    //     console.log(requestDetails);
    //     // const isSellerSame= (currentAccount== requestDetails[0].toLowerCase());
    //     // console.log(isSellerSame);
    //     if(currentAccount== requestDetails[0].toLowerCase()){
    //         const structRequestInfo={
    //             requestId:i,
    //             sellerAddress:requestDetails[0],
    //             buyerAddress:requestDetails[1],
    //             landId:requestDetails[2],
    //             requestStatus:requestDetails[3]
    //         }
    //         console.log(structRequestInfo);
    //         setRequestInfo((prev)=>[...prev,structRequestInfo]);
    //     }
        
    //   }

    //   console.log(requestInfo);

    // }

    //  to load the address when loading the page
    // remove react strict mode in main jsx or else data would be shown two times
    // useEffect(()=>{
    //     getAllLands();
    // },[]);


    

    return(
        <>
          <h1>Available Request of your land</h1>
        {/* <button type='button' onClick={getUserAddresses}>Get user Details</button> */}
        <button type='button' onClick={getAllRequests}>Get available Requests</button>
    <div>
        {
            requestInfo.map((request,i)=>{
                // user.name
                // to view unverified data
                if(!request.requestStatus)
                {
                    return <RequestCard key={i}{...request}/>
                }
            })

        }

    </div>
        </>
        
      

        

    );

}
