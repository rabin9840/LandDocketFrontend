import {useEffect } from 'react';
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
import AdminLogin from './pages/AdminLogin';
import ImageInstalling from './pages/ImageInstalling';



import { ethers } from "ethers";

import { contractABI, contractAddress } from "./utils/constants";




function App() {

  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();  
  const landRegistrationContract = new ethers.Contract(contractAddress, contractABI, signer);

useEffect(() => {

  landRegistrationContract.on('Registration',async (userAddress)=>{
    console.log("INSIDE EVENT"+userAddress);
    const userInfo= await landRegistrationContract.getUserDetails(userAddress);
    console.log(userInfo);

    // const isVerified= await landRegistrationContract.verifyUser(userAddress);
    console.log("verification success");
  })
}, []);

  return (
    <>
    <ul>
    <li><Link to="/user">User</Link></li>
    <li><Link to="/adminLogin">Admin Login</Link></li>
    <li><Link to="/admin">Admin</Link></li>
    <li><Link to='/form'>Form Page</Link></li>
    <li><Link to='/viewUser'>View User Information</Link></li>
    <li><Link to='/addLand'>Add Land</Link></li>
    <li><Link to='/viewLand'>View users Land</Link></li>
    <li><Link to='/adminViewLand'>Admin View Land</Link></li>
    <li><Link to='/allLands'>View All available Lands</Link></li>
    <li><Link to='/viewRequests'>View All available Requests of your land</Link></li>
    <li><Link to='/landTransfer'>Transfer Land by admin</Link></li>
    <li><Link to='/imageInstall'>To Install the image in IPFS</Link></li>

    </ul>

    <Routes>
      <Route path="/user" element={<User />}/>
      <Route path="/adminLogin/*" element={<AdminLogin />}/>
      <Route path="/admin" element={<Admin />}/>
      <Route path="/form" element={<Form />}/>
      <Route path="/viewUser" element={<ViewUser />}/>
      <Route path="/addLand" element={<AddLand />}/>
      <Route path="/viewLand" element={<OwnedLands />}/>
      <Route path="/adminViewLand" element={<AdminLand />}/>
      <Route path="/allLands" element={<AllLands />}/>
      <Route path="/viewRequests" element={<Requests />}/>
      <Route path="/landTransfer" element={<AdminTransferLand />}/>
      <Route path="/imageInstall" element={<ImageInstalling />}/>
    </Routes>
    </>
    

  
  )

  
}

export default App
