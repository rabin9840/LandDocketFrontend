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

const approveRequest= async(requestId)=>{
    const isRequested= await landRegistrationContract.approveRequest(requestId);
    console.log("land Request Approved");

}


const RequestCard=({requestId,sellerAddress,buyerAddress,landId,requestStatus})=>{
    return (
        <>
        <h1>RequestId:{requestId}</h1>
        <h1>LandId:{parseInt(landId)}</h1>
        <h1>BuyerAddress:{buyerAddress}</h1>
        <button type='button' onClick={()=>{approveRequest(requestId)}}>Approve</button>
        </>
    )

}


export default  function Requests(){
    //const {userDetails,getUserInfo,userData,setUserDetails,setUserData,viewUserInfo}=  useContext(LandRegistrationContext);
    const [requestInfo,setRequestInfo]=useState([]);
    const {currentAccount}= useContext(LandRegistrationContext);

    if (!ethereum) return alert("Please install Metamask to continue");
    async function getAllRequests(){
      const requestCount= await landRegistrationContract.getRequestsCount();
      const TotalRequestCount= parseInt(requestCount);
      console.log('inside request function'+currentAccount);

      for(let i=1;i<TotalRequestCount+1;i++){
        console.log('inside loop');
        const requestDetails= await landRegistrationContract.requestDetails(i);
        console.log(requestDetails);
        // const isSellerSame= (currentAccount== requestDetails[0].toLowerCase());
        // console.log(isSellerSame);
        if(currentAccount== requestDetails[0].toLowerCase()){
            const structRequestInfo={
                requestId:i,
                sellerAddress:requestDetails[0],
                buyerAddress:requestDetails[1],
                landId:requestDetails[2],
                requestStatus:requestDetails[3]
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
          <h1>Available Request of your land</h1>
        {/* <button type='button' onClick={getUserAddresses}>Get user Details</button> */}
        <button type='button' onClick={getAllRequests}>Get available Requests</button>
        


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
            requestInfo.map((request,i)=>{
                // user.name
                // to view unverified data
                if(!request.requestStatus)
                {
                    return <RequestCard key={i}{...request}/>
                }
                // return <UserCard key={i}{...user}/>
                
                // user.name,
            })

        }

    </div>

      {/* <div>
        {
             requestInfo.map((request,i)=>(
                // user.name
                <RequestCard key={i}{...request}/>
                // user.name,
            ))

        }

    </div> */}



    


        </>
        
      

        

    );

}
