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
    
     const isVerified= await testContract.verifyUser(userAddress);
     console.log("verification success");
    //  const isVerified= await testContract.verifyUser(allUsers[0]);
    //  console.log("verification success");

    console.log(currentAccount);
    console.log(userAddress);


    // console.log('Type of admin address'+typeof(currentAccount));
    // console.log('type of above user adress'+typeof(userAddress));
    // await testContract.verifyUser(userAddress);
    // console.log("Verification completed");


      
    } catch (error) {
      console.log(error);
      
    }
  }


const UserCard=({name,age,city,citizenShipNumber,email,userAddress})=>{
    return (
        <>
        <h1>name:{name}</h1>
        {/* <h1>age:{age}</h1> */}
        <h1>city:{city}</h1>
        <h1>citizenShipNumber:{citizenShipNumber}</h1>
        <h1>email:{email}</h1>
        {/* <button type="button" onClick={verifyTheUser(userAddress)}>Verify the user</button> */}
      
        </>
    )

}


export default  function Admin(){
    const {userDetails,getUserInfo,userData,setUserDetails,setUserData,viewUserInfo}=  useContext(LandRegistrationContext);
     const [userInformationDetail,setUserInformationDetail]=useState([]);
     const [address,setAddress]=useState([]);
     const [usersInfo,setUsersInfo]=useState([]);

    if (!ethereum) return alert("Please install Metamask to continue");
    
// const getUserAddresses= async()=>{
   
//     usersAddresses= await landRegistrationContract.getUser();
//     console.log('total user'+usersAddresses);

//     var userCount= await landRegistrationContract.getUsersCount();
//     console.log("user count"+userCount);
//     console.log(typeof(userTable));

//     // to get the user details from the user count
//     for(let i=0;i<userCount;i++){
//         var user= await landRegistrationContract.getUserDetails(usersAddresses[i]);
//         console.log("getting current user"+user);
//         console.log(typeof(user));
//         userTable.push(user);
//         // address=usersAddresses[i];
//         setAddress(prev=>({...prev,[address]:user}));
//     }

//     // const structuredUserDetails= userTable.map((userinformation)=>({
//     //     name:userinformation[0],
//     //     age:userinformation[1],
//     //         city:userinformation[2],
//     //         citizenShipNumber:userinformation[3],
//     //         email:userinformation[4],
//     //         // userAddress:usersAddresses[i]
//     // }))

//     // console.log(structuredUserDetails);
//     // setUserInformationDetail(structuredUserDetails);
//     // console.log("use state used");
//     console.log(userInformationDetail);
//     console.log(address);







//     }

    // to load the address when loading the page
    // useEffect(()=>{
    //     getUserAddresses();
    // },[]);

    
    async function getUserData(){
         const addressList= await landRegistrationContract.getUser();

        // addressList.forEach(async address=>{
        //     const userInfo= await landRegistrationContract.getUserDetails(address);
        //     // sconsole.log(userInfo[0]);
        //     const structUserInfo= {
        //         name:userInfo[0],
        //         age:userInfo[1],
        //         city:userInfo[2],
        //         citizenShipNumber:userInfo[3],
        //         email:userInfo[4]
        //     }
        //     setUsersInfo(prevInfo=>({...prevInfo,[address]:structUserInfo}));
            
        // })

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
                // userAccount:address
            }
            setUsersInfo(prevInfo=>({...prevInfo,[address]:structUserInfo}));
            userTable.push(structUserInfo);
            // setUsersInfo[...Prev,structUserInfo]
            
        })

        console.log(usersInfo);

        // const structuredUserDetails= userTable.map((userinformation)=>({
        //     name:userinformation[0],
        //     age:userinformation[1],
        //         city:userinformation[2],
        //         citizenShipNumber:userinformation[3],
        //         email:userinformation[4],
        //         account:userinformation[5]
        // }))
    
        // console.log(structuredUserDetails);

        //  setUsersInfo(userTable);
        // // setUsersInfo(structuredUserDetails);
        // console.log(usersInfo);
        // console.log(usersInfo[0]);
        // console.log(usersInfo[1]);
        // console.log(usersInfo[2]);

        
        // console.log(usersInfo);
        // console.log(usersInfo[1]);
        // console.log(usersInfo[0]);

        // const structuredUserDetails= userTable.map((userinformation)=>({
        //     name:userinformation.name,
        //     // age:userTable[0][1],
        //     //     city:userTable[0][2],
        //     //     citizenShipNumber:userTable[0][3],
        //     //     email:userTable[0][4]
        //     age:userinformation.age,
        //         city:userinformation.city,
        //         citizenShipNumber:userinformation.citizenShipNumber,
        //         email:userinformation.email,
        //         userAccount:userinformation.userAccount
        // }))
    
        // console.log(structuredUserDetails);
        // setUserInformationDetail(structuredUserDetails);
        // console.log("use state used");
        // console.log(userInformationDetail);


        const structuredUserDetails= addressList.map((address,i)=>({
            userAccount:address,
            // age:usersInfo[address].age,
                city:usersInfo[address].city,
                citizenShipNumber:usersInfo[address].citizenShipNumber,
                email:usersInfo[address].email,
        }))

    console.log(structuredUserDetails);
    setUserInformationDetail(structuredUserDetails);
    console.log("use state used");
    console.log(userInformationDetail);

        // addressList.map((address,i)=>(
        //     console.log(address),
        //     console.log(usersInfo[address]),
        //     console.log(usersInfo[address].city)
            
        // ))

    }

     // to load the address when loading the page
    useEffect(()=>{
        getUserData();
    },[]);


    

    return(
        <>
          <h1>Admin Page</h1>
        {/* <button type='button' onClick={getUserAddresses}>Get user Details</button> */}
        <button type='button' onClick={getUserData}>Get user Details</button>
        


    <div>
        {
            userInformationDetail.map((user,i)=>(
                // user.name
                <UserCard key={i}{...user}/>
                // user.name,
            ))

        }

    </div>

      {/* <div>
        {
            usersInfo.map((user,i)=>(
                // user.name
                <UserCard key={i}{...user}/>
                // user.name,
            ))

        }

    </div> */}



    


        </>
        
      

        

    );

}
