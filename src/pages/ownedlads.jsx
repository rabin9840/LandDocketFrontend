import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const landRegistrationContract = new ethers.Contract(contractAddress, contractABI, signer);


const LandCard=({landId,area,city,pradesh,propertyId,document})=>{
    return (
        <>
        <h1>LandId:{landId}</h1>
        <h1>Area:{parseInt(area)}</h1>
        <h1>City:{city}</h1>
        <h1>Pradesh:{pradesh}</h1>
        <h1>Property Id:{parseInt(propertyId)}</h1>
        <h1>Document:{document}</h1>
        </>
    )

}

export default function OwnedLands(){
   const { currentAccount}=  useContext(LandRegistrationContext);
   const [landsInfo,setLandsInfo]=useState([]);

   async function getAllLands(){
    try {
      if (!ethereum) return alert("Please install Metamask to continue");
      const landCount= await landRegistrationContract.getLandsCount();
      const TotalLandCount=parseInt(landCount);

      for(let i=1;i<TotalLandCount+1;i++){
        const landOwner= await landRegistrationContract.getLandOwner(i);
        if(currentAccount==landOwner.toLowerCase()){
            console.log('inside if condition')
            const landDetails= await landRegistrationContract.getLandDetails(i);
            console.log('landDetails'+landDetails);
            console.log(parseInt(landDetails[0]));
            const structLandInfo= {
                landId:parseInt(landDetails[0]),
                area:parseInt(landDetails[1]),
                city:landDetails[2],
                pradesh:landDetails[3],
                propertyId:parseInt(landDetails[4]),
                document:landDetails[5]
                //isVerified:isUserVerified
            }
            console.log(structLandInfo);
            setLandsInfo((prev)=>[...prev, structLandInfo])

        }
      }

      console.log('lands information'+landsInfo);


      
    } catch (error) {
      console.log(error);
      
    }
  }

    useEffect(()=>{
        getAllLands()
    },[]);


    return(
        <>
        <div>
        <h1>Welcome To view your owned land information</h1>
         <button type='button' onClick={getAllLands}>Get All lands of current user</button>
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