import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const landRegistrationContract = new ethers.Contract(contractAddress, contractABI, signer);

const requestThisLand= async(landId,landOwnerAddress)=>{
    try {
        // const landOwnerAddress='0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
       const requesttheLand=await landRegistrationContract.requestLand(landOwnerAddress,landId);
        console.log("land Requested");
       } catch (error) {
         console.log(error);
         
       }

}


const LandCard=({landId,area,city,pradesh,propertyId,document,isVerified,landOwnerAddress})=>{
    return (
        <>
        <h1>LandId:{landId}</h1>
        <h1>Area:{parseInt(area)}</h1>
        <h1>City:{city}</h1>
        <h1>Pradesh:{pradesh}</h1>
        <h1>Property Id:{parseInt(propertyId)}</h1>
        <h1>Document:{document}</h1>
        <h1>Verified:{isVerified}</h1>
        <h1>Land Owner Account:{landOwnerAddress}</h1>
        <button type='button' onClick={()=>{requestThisLand(landId,landOwnerAddress)}}>Click to request the land</button>
        </>
    )

}


export default  function AllLands(){
    //const {userDetails,getUserInfo,userData,setUserDetails,setUserData,viewUserInfo}=  useContext(LandRegistrationContext);
    const [landsInfo,setLandsInfo]=useState([]);

    if (!ethereum) return alert("Please install Metamask to continue");
    async function getAllLands(){
      const landCount= await landRegistrationContract.getLandsCount();
      const TotalLandCount=parseInt(landCount);

      for(let i=1;i<TotalLandCount+1;i++){
            console.log("inside loop");
            const landOwner= await landRegistrationContract.getLandOwner(i);
            // get the land details of the given land
            const landDetails= await landRegistrationContract.getLandDetails(i);
            console.log('landDetails'+landDetails);
            console.log(parseInt(landDetails[0]));
            const isLandVerified= await landRegistrationContract.isLandVerified(i);
            const landAccount= await landRegistrationContract.getLandOwner(i);
            console.log("land owner address"+landAccount);
            // may be needed to change landOwner Address to lower case
            const structLandInfo= {
                landId:parseInt(landDetails[0]),
                area:parseInt(landDetails[1]),
                city:landDetails[2],
                pradesh:landDetails[3],
                propertyId:parseInt(landDetails[4]),
                document:landDetails[5],
                isVerified:isLandVerified.toString(),
                landOwnerAddress:landAccount
            }
            console.log(structLandInfo);
            setLandsInfo((prev)=>[...prev, structLandInfo])

        }

        console.log(landsInfo);

    }

    //  to load the address when loading the page
    // remove react strict mode in main jsx or else data would be shown two times
    useEffect(()=>{
        getAllLands();
    },[]);


    

    return(
        <>
          <h1>Available Lands</h1>
        {/* <button type='button' onClick={getUserAddresses}>Get user Details</button> */}
        <button type='button' onClick={getAllLands}>Get available lands</button>
        


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
            landsInfo.map((land,i)=>{
                // user.name
                // to view unverified data
                // the current user should not be the owner of the availble land to perform selling transaction
                if(land.isVerified)
                {
                    return <LandCard key={i}{...land}/>
                }
                // return <UserCard key={i}{...user}/>
                
                // user.name,
            })

        }

    </div>



    


        </>
        
      

        

    );

}
