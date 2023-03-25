import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";

const VerifiedRequestCard=({requestId,sellerAddress,buyerAddress,landId,requestStatus,isTransfered})=>{
    const {transferLand}= useContext(LandRegistrationContext);
    return (
        <>
        <h1>RequestId:{requestId}</h1>
        <h1>LandId:{parseInt(landId)}</h1>
        <h1>BuyerAddress:{buyerAddress}</h1>
        <h1>Request Status:{requestStatus.toString()}</h1>
        <h1>Is land Transferrred:{isTransfered.toString()}</h1>
        <button type='button' onClick={()=>{transferLand(landId,buyerAddress,requestId)}}>Transfer Land</button>
        </>
    )

}

export default VerifiedRequestCard;