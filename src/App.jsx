import { useState, useEffect } from 'react';
import { LandRegistrationContext } from './context/LandRegistrationContext'; 
import React, {useContext} from "react";
import{Routes, Link,Route} from 'react-router-dom';
import Admin from './pages/Admin';
import User from './pages/Users';
import Form from './pages/Form';
import ViewUser from './pages/ViewUser';
import AddLand from './pages/AddLand';
import OwnedLands from './pages/OwnedLands';
import AdminLand from './pages/AdminLand';
import AllLands from './pages/AllLands';
import Requests from './pages/Requests';
import AdminTransferLand from './pages/AdminiTransferLand';



import { ethers } from "ethers";

import { contractABI, contractAddress } from "./utils/constants";




function App() {

  const { ethereum } = window;

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const landRegistrationContract = new ethers.Contract(contractAddress, contractABI, signer);


   const {connectWallet, currentAccount, checkAdmin,addUserTo,formData,userData,handleChange,handleUserChange,getUserInfo,checkUserVerification,checkUser,verifyTheUser,handleVerify,addLandTo,getAllLands,verifyUserLand,checkLand,viewUserInfo,checkPayment}=  useContext(LandRegistrationContext);
   
   const [landId,setlandId]=useState(0);
   const [buttonClicked, setButtonClicked] = useState(false);


   //for displaying user request
   const [data, setData] = useState(null);

useEffect(() => {

  landRegistrationContract.on('Registration',async (userAddress)=>{
    console.log("INSIDE EVENT"+userAddress);
    const userInfo= await landRegistrationContract.getUserDetails(userAddress);
    console.log(userInfo);

    // const isVerified= await landRegistrationContract.verifyUser(userAddress);
    console.log("verification success");
  })
}, []);




  const handleSubmit=(e)=>{
    const {landId,area,city,pradesh,propertyId,document}= formData;
    e.preventDefault();
    // console.log(formData);
    addLandTo();
    
  }

  const handleUserInfo=(e)=>{
    e.preventDefault();
    getUserInfo();
  }

  const handleUserRegister=(e)=>{
    e.preventDefault();
    checkUserVerification();
  }

  const handleUserCheck=(e)=>{
    e.preventDefault();
    checkUser();
  }

  const handleUserVerification=(e)=>{
    e.preventDefault();
    verifyTheUser();
  }

  const handleLandSubmit=(e)=>{
    e.preventDefault();
    console.log("handle land submit called");
    getAllLands();
  }

  const handleLandCheck=(e)=>{
    e.preventDefault();
    checkLand();
  }
  const handleLandVerification=(e)=>{
    e.preventDefault();
    verifyUserLand();
  }

  const handlePayment=(e)=>{
    e.preventDefault();
    checkPayment();
  }

const handleUserSubmit=(e)=>{
  setButtonClicked(true);
  const {name,age,city,citizenShipNumber,email,document}= userData;
  e.preventDefault();
  console.log(userData);
  addUserTo();
}

  //  const handleSubmit=(e)=>{

  //   const {landId,area,city,pradesh,propertyId,document}=formData;

  //   e.preventDefault();

  //   // console.log(landId);
  //   // if(!landId || !amount || !address) return;

  //   console.log("value present")
  //   console.log(formData)

  //   sendTransaction();
  // }

  // const handleGetLand = async (event) => {
  //   event.preventDefault();
  //   getAllLand();
  // };

  return (
    // <div className='App'>
    //   <div className="app-header">
    //     <h1>React Dapp authentication with React Web3.js and metamask</h1>
    //   </div>
      
    //   <div className="app-wrapper">
    //     {/* {!currentAccount && (
    //         <button className="app-button_login" onClick={connectWallet}>
    //           Login
    //         </button>
    //     ) } */}
    //     {!currentAccount && (
    //         <button className="app-button_login" onClick={connectWallet}>
    //           Login
    //         </button>
    //     )}
    //   </div>

    //     {/* <div>
    //     LandId:<input type="number" name="landId" value={formData.landId} onChange={handleChange} />
    //     Area<input type="number" name="area" value={formData.area} onChange={handleChange} />
    //     City<input type="text" name="city" value={formData.city} onChange={handleChange} />
    //     Pradesh<input type="text" name="pradesh" value={formData.pradesh} onChange={handleChange} />
    //     PropertyId<input type="number" name="propertyId" value={formData.propertyId} onChange={handleChange} />
    //     Document<input type="text" name="document" value={formData.document} onChange={handleChange} />
        
       

    //     <button type='button' onClick={handleSubmit}>submit</button>
    //   </div> */}

    //   <div>
    //     <button className='check-if-admin' onClick={checkAdmin}>Check if admin or not</button>
    //   </div>


    //      <div>
    //     {/* LandId:<input type="number" name="landId" value={formData.landId} onChange={handleChange} />
    //     Area<input type="number" name="area" value={formData.area} onChange={handleChange} />
    //     City<input type="text" name="city" value={formData.city} onChange={handleChange} />
    //     Pradesh<input type="text" name="pradesh" value={formData.pradesh} onChange={handleChange} />
    //     PropertyId<input type="number" name="propertyId" value={formData.propertyId} onChange={handleChange} />
    //     Document<input type="text" name="document" value={formData.document} onChange={handleChange} /> */}

    //     {/* LandId:<input type="number" name="landId" onChange={handleChange} /> */}
    //     Area<input type="number" name="area"  onChange={handleChange} />
    //     City<input type="text" name="city"  onChange={handleChange} />
    //     Pradesh<input type="text" name="pradesh" onChange={handleChange} />
    //     PropertyId<input type="number" name="propertyId" onChange={handleChange} />
    //     Document<input type="text" name="document"  onChange={handleChange} />
        
       

    //     <button type='button' onClick={handleSubmit}>submit</button>
    //   </div>

    //   <div>
    //     Name: <input type="text" name="name" onChange={handleUserChange} />
    //     age: <input type="number" name="age" onChange={handleUserChange} />
    //     city: <input type="text" name="city" onChange={handleUserChange} />
    //     citizenShipNumber: <input type="text" name="citizenShipNumber" onChange={handleUserChange} />
    //     email: <input type="text" name="email" onChange={handleUserChange} />
    //     document: <input type="text" name="document" onChange={handleUserChange} />
    //     <button type='button' onClick={handleUserSubmit}>add user</button>
    //   </div>

    //   {/* <div>
    //     <h1>View user request in console</h1>
    //     {
    //       buttonClicked ? viewUserInfo() : <h1>The data cannot be recieved yet</h1>
       
    //     }
    //   </div> */}

    //   <div>
    //     <button type='button' onClick={handleUserInfo}> Retirieve user info</button>
    //   </div>

    //   <div>
    //     <button type='button' onClick={handleUserCheck}>Check if the current account is user</button>
    //   </div>

    //   <div>
    //     <button type='button' onClick={handleUserRegister}>check if user registered</button>
    //   </div>

    //   <div>
    //     {/* <input type="text" name='userAddress' onChange={handleVerify} /> */}
    //     <button type='button' onClick={handleUserVerification}>User verify by admin</button>
    //   </div>

    //   <div>
    //     <button type='button' onClick={handleLandSubmit}>Get All lands of current user</button>
    //   </div>

    //   <div>
    //     <button type='button' onClick={handleLandVerification}>Perform land verification by admin</button>
    //   </div>

    //   <div>
    //     <button type='button' onClick={handleLandCheck}>Check if land verified or note</button>
    //   </div>

    //   <div>
    //     <button type='button' onClick={handlePayment}>Check if amount transfer possible or not</button>
    //   </div>


    


    // </div>

    <>
    <ul>

 
    <li>
      <Link to="/user">User</Link>
    </li>
    <li>  <Link to="/admin">Admin</Link></li>
    <li><Link to='/form'>Form Page</Link></li>
    <li><Link to='/viewUser'>View User Information</Link></li>
    <li><Link to='/addLand'>Add Land</Link></li>
    <li><Link to='/viewLand'>View users Land</Link></li>
    <li><Link to='/adminViewLand'>Admin View Land</Link></li>
    <li><Link to='/allLands'>View All available Lands</Link></li>
    <li><Link to='/viewRequests'>View All available Requests of your land</Link></li>
    <li><Link to='/landTransfer'>Transfer Land by admin</Link></li>

    </ul>

    <Routes>
      <Route path="/user" element={<User />}/>
      <Route path="/admin" element={<Admin />}/>
      <Route path="/form" element={<Form />}/>
      <Route path="/viewUser" element={<ViewUser />}/>
      <Route path="/addLand" element={<AddLand />}/>
      <Route path="/viewLand" element={<OwnedLands />}/>
      <Route path="/adminViewLand" element={<AdminLand />}/>
      <Route path="/allLands" element={<AllLands />}/>
      <Route path="/viewRequests" element={<Requests />}/>
      <Route path="/landTransfer" element={<AdminTransferLand />}/>
    </Routes>
    </>
    

  
  )

  
}

export default App
