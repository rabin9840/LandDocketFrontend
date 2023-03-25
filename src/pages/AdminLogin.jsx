import { useState, useEffect } from 'react';
import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";
import{Routes, Link,Route} from 'react-router-dom';

import { Navigate } from 'react-router-dom';

import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import Admin from './Admin';


function AdminLogin(){
const {connectWallet, isAdmin,currentAccount, checkAdmin}=  useContext(LandRegistrationContext);

    // const isAdmin= checkAdmin();
    // console.log("inside Admin login page:"+ isAdmin);
    return (
        <>
        <h1>This is admin Login Page</h1>
        <div className="app-wrapper">
        {/* {!currentAccount && (
            <button className="app-button_login" onClick={connectWallet}>
              Login
            </button>
        ) } */}
        {!currentAccount && (
            <button className="app-button_login" onClick={connectWallet}>
              Login
            </button>
        )}

        {(currentAccount) && (
            <button className="app-button_login" onClick={checkAdmin}>
              check if admin
            </button>
        )}

        {isAdmin && (
           <Navigate to='/admin'></Navigate>
        )}  

        {

        }
      </div>

      </>
    )
}

export default AdminLogin;