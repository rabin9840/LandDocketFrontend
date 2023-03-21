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

const verifyTheUser= async()=>{
    // try {
    //   //await getAllUser();
    //   if (!ethereum) return alert("Please install Metamask to continue");
    //   console.log("Verify user function called");
    //   const testContract= getEthereumContract();
    //   console.log("contract retrieved");
    //  // verify user 

    //  const allUsers=await testContract.getUser();
    //  console.log("All users retrieved");
    //  console.log(allUsers);
    //  console.log(typeof(allUsers));
    //  console.log(allUsers[0]);
    //  const userAddress=allUsers[0];

    // // const userAddress='0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
    
    //  const isVerified= await testContract.verifyUser(userAddress);
    //  console.log("verification success");
    // //  const isVerified= await testContract.verifyUser(allUsers[0]);
    // //  console.log("verification success");

    // console.log(currentAccount);
    // console.log(userAddress);


    // // console.log('Type of admin address'+typeof(currentAccount));
    // // console.log('type of above user adress'+typeof(userAddress));
    // // await testContract.verifyUser(userAddress);
    // // console.log("Verification completed");


      
    // } catch (error) {
    //   console.log(error);
      
    // }

    try {
      if (!ethereum) return alert("Please install Metamask to continue");
      // console.log("Verify user function called");
      // const testContract= getEthereumContract();
      // console.log("contract retrieved");
      // // use the event fired during addUser in the beginning
      // testContract.on('Registration',(userAddress,event=>{
      //   console.log(userAddress);
      // }))
      // console.log("Newly added user: "+ userAddress);
      landRegistrationContract.on('Registration',async (userAddress)=>{
        console.log("INSIDE EVENT"+userAddress);
        const isVerified= await landRegistrationContract.verifyUser(userAddress);
        console.log("verification success");
      })

      console.log(userAddress);
      
    } catch (error) {
      console.log(error);
      
    }
  }


const UserCard=({name,age,city,citizenShipNumber,email})=>{
    return (
        <>
        <h1>name:{name}</h1>
        {/* <h1>age:{age}</h1> */}
        <h1>city:{city}</h1>
        <h1>citizenShipNumber:{citizenShipNumber}</h1>
        <h1>email:{email}</h1>
        {/* <button type="button" onClick={verifytheUser}>Verify the user</button>s */}
      
        </>
    )

}


export default  function Admin(){
    const {userDetails,getUserInfo,userData,setUserDetails,setUserData,viewUserInfo}=  useContext(LandRegistrationContext);
     const [userInformationDetail,setUserInformationDetail]=useState([]);

    if (!ethereum) return alert("Please install Metamask to continue");
    const getUserAddresses= async()=>{
    var usersAddresses=[];
    usersAddresses= await landRegistrationContract.getUser();
    console.log('total user'+usersAddresses);

    var userCount= await landRegistrationContract.getUsersCount();
    console.log("user count"+userCount);
    console.log(typeof(userTable));

    // to get the user details from the user count
    for(let i=0;i<userCount;i++){
        var user= await landRegistrationContract.getUserDetails(usersAddresses[i]);
        console.log("getting current user"+user);
        console.log(typeof(user));
        userTable.push(user);
        // userTable.push(<><h1>User name:</h1><h1>user[0]</h1></>)
        console.log(i);
        // setUserInformationDetail(()=>({
        //     ...userInformationDetail,
        //     name:user.i[0],
        //     age:user.i[1],
        //     city:user.i[2],
        //     citizenShipNumber:user.i[3],
        //     email:user.i[4]


        // }))

    }

    // console.log("outside loop"+userTable);
    // console.log("first user"+userTable[0]);
    // console.log("total length of user table"+userTable.length);
    // console.log("third user"+userTable[1]);
    console.log("Outside loop");
    console.log(userTable);
    console.log(typeof(userTable));
    console.log(userTable[0]);
    console.log(userTable[1]);

    console.log(userTable[0][0]);
    console.log(userTable[1][0]);
    console.log(typeof(userTable[1][0]));
    const structuredUserDetails= userTable.map((userinformation)=>({
        name:userinformation[0],
        // age:userTable[0][1],
        //     city:userTable[0][2],
        //     citizenShipNumber:userTable[0][3],
        //     email:userTable[0][4]
        age:userinformation[1],
            city:userinformation[2],
            citizenShipNumber:userinformation[3],
            email:userinformation[4]
    }))

    console.log(structuredUserDetails);
    setUserInformationDetail(structuredUserDetails);
    console.log("use state used");
    console.log(userInformationDetail);




    }

    // to load the address when loading the page
    // useEffect(()=>{
    //     getUserAddresses();
    // },[]);


    

    return(
        <>
          <h1>Admin Page</h1>
        <button type='button' onClick={getUserAddresses}>Get user Details</button>
        


    <div>
        {
            userInformationDetail.map((user,i)=>(
                // user.name
                <UserCard key={i}{...user}/>
                // user.name,
            ))

        }

    </div>

    


        </>
        
      

        

    );

}
