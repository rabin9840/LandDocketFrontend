import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";

const UserCard=({name,age,city,citizenShipNumber,email,userAccount,isVerified})=>{
    const {verifyTheUser,checkUserVerified}=  useContext(LandRegistrationContext);
    return (
        <>
        <h1>name:{name}</h1>
        {/* <h1>age:{age}</h1> */}
        <h1>city:{city}</h1>
        <h1>citizenShipNumber:{citizenShipNumber}</h1>
        <h1>email:{email}</h1>
        <h1>address:{userAccount}</h1>
        <button type="button" onClick={()=>{verifyTheUser(userAccount,isVerified)}}>Verify the user</button>
        <button type='button' onClick={()=>{checkUserVerified(userAccount)}}>Check if user verfied or not</button>
      
        </>
    )

}

export default UserCard;