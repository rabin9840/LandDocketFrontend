const LandCard=({landId,area,city,pradesh,propertyId,document,isVerified})=>{
    return (
        <>
        <h1>LandId:{landId}</h1>
        <h1>Area:{parseInt(area)}</h1>
        <h1>City:{city}</h1>
        <h1>Pradesh:{pradesh}</h1>
        <h1>Property Id:{parseInt(propertyId)}</h1>
        <h1>Document:{document}</h1>
        <h1>Land Verfied:{isVerified}</h1>
        </>
    )

}

export default LandCard;