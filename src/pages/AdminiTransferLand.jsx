// in case of land requested of particular user

import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const landRegistrationContract = new ethers.Contract(contractAddress, contractABI, signer);

const transferLand= async(landId,buyerAddress)=>{
    const jobTransferLand= await landRegistrationContract.LandOwnershipTransfer(landId,buyerAddress);
    console.log("land Transfer successful");

}


const RequestCard=({requestId,sellerAddress,buyerAddress,landId,requestStatus,isTransfered})=>{
    return (
        <>
        <h1>RequestId:{requestId}</h1>
        <h1>LandId:{parseInt(landId)}</h1>
        <h1>BuyerAddress:{buyerAddress}</h1>
        <h1>Request Status:{requestStatus.toString()}</h1>
        <h1>Is land Transferrred:{isTransfered.toString()}</h1>
        <button type='button' onClick={()=>{transferLand(landId,buyerAddress)}}>Transfer Land</button>
        </>
    )

}


export default  function AdminTransferLand(){
    //const {userDetails,getUserInfo,userData,setUserDetails,setUserData,viewUserInfo}=  useContext(LandRegistrationContext);
    const [requestInfo,setRequestInfo]=useState([]);
    const {currentAccount}= useContext(LandRegistrationContext);

    if (!ethereum) return alert("Please install Metamask to continue");
    async function getApprovedRequests(){
      const requestCount= await landRegistrationContract.getRequestsCount();
      const TotalRequestCount= parseInt(requestCount);
      console.log('inside request function'+currentAccount);

      for(let i=1;i<TotalRequestCount+1;i++){
        console.log('inside loop');
        const isRequestApproved= await landRegistrationContract.isApproved(i);
        if(isRequestApproved){
            const requestDetails= await landRegistrationContract.requestDetails(i);
            const isLandTransfered= false;
            console.log(requestDetails);
                const structRequestInfo={
                    requestId:i,
                    sellerAddress:requestDetails[0],
                    buyerAddress:requestDetails[1],
                    landId:requestDetails[2],
                    requestStatus:requestDetails[3],
                    isTransfered:isLandTransfered
                }
                console.log(structRequestInfo);
                setRequestInfo((prev)=>[...prev,structRequestInfo]);
        }

        
      }

      console.log(requestInfo);

    }

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

      <div>
        {
             requestInfo.map((request,i)=>(
                // user.name
                <RequestCard key={i}{...request}/>
                // user.name,
            ))

        }

    </div>



    


        </>
        
      

        

    );

}
