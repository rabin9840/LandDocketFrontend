import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const landRegistrationContract = new ethers.Contract(contractAddress, contractABI, signer);

var userTable=[];
var usersAddresses=[];
const verifyTheUser= async(userAddress)=>{
    try {
    
     const isVerified= await landRegistrationContract.verifyUser(userAddress);
     console.log("verification success");
    } catch (error) {
      console.log(error);
      
    }
  }


const UserCard=({name,age,city,citizenShipNumber,email,userAccount})=>{
    return (
        <>
        <h1>name:{name}</h1>
        {/* <h1>age:{age}</h1> */}
        <h1>city:{city}</h1>
        <h1>citizenShipNumber:{citizenShipNumber}</h1>
        <h1>email:{email}</h1>
        <h1>address:{userAccount}</h1>
        <button type="button" onClick={()=>{verifyTheUser(userAccount)}}>Verify the user</button>
      
        </>
    )

}


export default  function Admin(){
    const {userDetails,getUserInfo,userData,setUserDetails,setUserData,viewUserInfo}=  useContext(LandRegistrationContext);
     const [usersInfo,setUsersInfo]=useState([]);

    if (!ethereum) return alert("Please install Metamask to continue");
    async function getUserData(){
         const addressList= await landRegistrationContract.getUser();

        addressList.forEach(async address=>{
            console.log("Insisde loop");
            const users= await landRegistrationContract.getUserDetails(address);
            // sconsole.log(userInfo[0]);
            const structUserInfo= {
                name:users[0],
                age:users[1],
                city:users[2],
                citizenShipNumber:users[3],
                email:users[4],
                userAccount:address
            }
            setUsersInfo((prev)=>[...prev, structUserInfo])
            
        })

        console.log(usersInfo);

    }

    //  to load the address when loading the page
    // remove react strict mode in main jsx or else data would be shown two times
    useEffect(()=>{
        getUserData();
    },[]);


    

    return(
        <>
          <h1>Admin Page</h1>
        {/* <button type='button' onClick={getUserAddresses}>Get user Details</button> */}
        <button type='button' onClick={getUserData}>Get user Details</button>
        


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
            usersInfo.map((user,i)=>(
                // user.name
                <UserCard key={i}{...user}/>
                // user.name,
            ))

        }

    </div>



    


        </>
        
      

        

    );

}
