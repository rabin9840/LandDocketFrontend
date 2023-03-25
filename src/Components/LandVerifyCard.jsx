import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";

const LandVerifyCard=({landId,area,city,pradesh,propertyId,document,isVerified})=>{
    const {verifyTheLand,checkLandVerified}=  useContext(LandRegistrationContext);
    return (
        <>
        <h1>LandId:{landId}</h1>
        <h1>Area:{parseInt(area)}</h1>
        <h1>City:{city}</h1>
        <h1>Pradesh:{pradesh}</h1>
        <h1>Property Id:{parseInt(propertyId)}</h1>
        <h1>Document:{document}</h1>
        <h1>Verified:{isVerified}</h1>
        <button type='button' onClick={()=>{verifyTheLand(landId)}}>Verify the Land</button>
        <button type='button' onClick={()=>{checkLandVerified(landId)}}>Check if land verified</button>
        </>
    )

}

export default LandVerifyCard;