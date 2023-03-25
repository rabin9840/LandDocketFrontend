import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";

const RequestCard=({requestId,sellerAddress,buyerAddress,landId,requestStatus})=>{
    const {approveRequest}= useContext(LandRegistrationContext);
    return (
        <>
        <h1>RequestId:{requestId}</h1>
        <h1>LandId:{parseInt(landId)}</h1>
        <h1>BuyerAddress:{buyerAddress}</h1>
        <button type='button' onClick={()=>{approveRequest(requestId)}}>Approve</button>
        </>
    )

}


export default RequestCard;