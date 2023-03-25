import { LandRegistrationContext } from '../context/LandRegistrationContext'; 
import React, {useContext} from "react";

const AllLandCard=({landId,area,city,pradesh,propertyId,document,isVerified,landOwnerAddress})=>{
    const {requestThisLand}=  useContext(LandRegistrationContext);
    return (
        <>
        <h1>LandId:{landId}</h1>
        <h1>Area:{parseInt(area)}</h1>
        <h1>City:{city}</h1>
        <h1>Pradesh:{pradesh}</h1>
        <h1>Property Id:{parseInt(propertyId)}</h1>
        <h1>Document:{document}</h1>
        <h1>Verified:{isVerified}</h1>
        <h1>Land Owner Account:{landOwnerAddress}</h1>
        <button type='button' onClick={()=>{requestThisLand(landId,landOwnerAddress)}}>Click to request the land</button>
        </>
    )

}

export default AllLandCard;