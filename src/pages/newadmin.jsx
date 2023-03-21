var userTable=[];
const UserCard=({name,age,city,citizenShipNumber,email})=>{
    return (
        <>
        <h1>name:{name}</h1>
        {/* <h1>age:{age}</h1> */}
        <h1>city:{city}</h1>
        <h1>citizenShipNumber:{citizenShipNumber}</h1>
        <h1>email:{email}</h1>
        <button type="button" onClick={verify}>Verify the user</button>
      
        </>
    )

}
export default  function Admin(){
     const [userInformationDetail,setUserInformationDetail]=useState([]);

    if (!ethereum) return alert("Please install Metamask to continue");
    const getUserAddresses= async()=>{
    var usersAddresses=[];
    usersAddresses= await landRegistrationContract.getUser();
    console.log('total user'+usersAddresses);

    var userCount= await landRegistrationContract.getUsersCount();
    console.log("user count"+userCount);
    console.log(typeof(userTable));

    // to get the user details from the user count
    for(let i=0;i<userCount;i++){
        var user= await landRegistrationContract.getUserDetails(usersAddresses[i]);
        console.log("getting current user"+user);
        console.log(typeof(user));
        userTable.push(user);
        console.log(i);
    }
    console.log("Outside loop");
    console.log(userTable);
    console.log(typeof(userTable));
    console.log(typeof(userTable[1][0]));
    const structuredUserDetails= userTable.map((userinformation)=>({
        name:userinformation[0],
        age:userTable[0][1],
            city:userTable[0][2],
            citizenShipNumber:userTable[0][3],
            email:userTable[0][4]
    }))

    console.log(structuredUserDetails);
    setUserInformationDetail(structuredUserDetails);
    }
    return(
        <>
          <h1>Admin Page</h1>
        <button type='button' onClick={getUserAddresses}>Get user Details</button>
    <div>
        {
            userInformationDetail.map((user,i)=>(
                <UserCard key={i}{...user}/>
            ))
        }
    </div>
        </>
    );

}
