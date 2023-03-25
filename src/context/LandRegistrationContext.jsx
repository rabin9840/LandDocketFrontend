import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
export const LandRegistrationContext = React.createContext();
const { ethereum } = window;

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const landRegistrationContract = new ethers.Contract(contractAddress, contractABI, signer);

const getEthereumContract = () => {
  console.log(window);
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const landRegistrationContract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log({
            provider,signer,landRegistrationContract
        });
  return landRegistrationContract;
};

export const LandRegistrationProvider=({children})=>{
    const [currentAccount,setCurrentAccount]=useState("");
    const [formData, setFormData]= useState({
      area:0,
      city:'',
      pradesh:'',
      propertyId:0,
      document:''
  });

    const [userData, setUserData]= useState({
      name:'',
      age:0,
      city:'',
      citizenShipNumber:'',
      email:'',
      document:''
    });

    const [requestInfo,setRequestInfo]=useState([]);

    const [usersInfo,setUsersInfo]=useState([]);

    const [isAdmin,setIsAdmin]=useState(false);

    const [userTransaction, setUserTransaction]=useState([]);

    const [userDetails,setUserDetails]=useState(null);

     const [userAddress,setUserAddress]= useState(null);

     const [landsInfo,setLandsInfo]=useState([]);

    const [landDetails,setLandDetails]=useState(null);
    const [isLoadin,setisLoading]=useState(false);
    const [isLandTransfer,setIsLandTransfered]=useState(false);

    const handleChange = (e) => {
      console.log("handle change called");
          setFormData(() => ({
          ...formData,
          [e.target.name]: e.target.value,
        }));
  
        console.log(formData);
  }

    const handleUserChange = (e) => {
      console.log("handle change called");
          setUserData(() => ({
          ...userData,
          [e.target.name]: e.target.value,
        }));
  
        console.log(userData);
  }

  const handleVerify = (e) => {
    console.log("handle change called");
        setUserAddress(e.target.value);

      console.log(userAddress);
}


  const checkIfWalletIsConnected = async () => {
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          const accounts = await ethereum.request({ method: "eth_accounts" });
          console.log("present account adress:"+ accounts[0]);
          
          if (accounts.length) {
            const account = accounts[0];
            setCurrentAccount(account);
            console.log(account);

        

          } else {
            console.log("No authorized account found");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          }); //get all accounts
          console.log(accounts);
          setCurrentAccount(accounts[0]); //set the 1st account as default account

          const checkIfAdmin = await landRegistrationContract.isLandInspector(accounts[0]);
          // const checkIfAdmin = await testContract.isLandInspector(currentAccount);

          const isAdmin=checkAdmin(checkIfAdmin);
          console.log(isAdmin)
          if(isAdmin){
            setIsAdmin(isAdmin);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const checkAdmin= async()=>{
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          console.log(currentAccount);
          const testContract=getEthereumContract();
          console.log("check admin called");
          console.log(contractABI);
          console.log(contractAddress);

          // const adminDetail= await testContract.viewLandRegistrator();
          // console.log("admin details extracted");
          // console.log(adminDetail);
          
          const checkIfAdmin = await testContract.isLandInspector(currentAccount);
          console.log(checkIfAdmin);
          // const transactionHash=await testContract.isLandInspector(currentAccount);
          // setisLoading(true);
          // console.log(`Loading: ${transactionHash.hash}`)
          // await transactionHash.wait();
          // setisLoading(false);
          // console.log(`Success: ${transactionHash.hash}`)
          if(checkAdmin){
            setIsAdmin(true);
          }

          
        } catch (error) {
          console.log(error);
          
        }
      }

      // FUCNTION TO ADD USER
      const addUserTo= async ()=>{
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          const {name,age,city,citizenShipNumber,email,document}= userData;
          console.log("add user function called");
          console.log(currentAccount);
          const testContract=getEthereumContract();
          const additionUser= await testContract.addUser(name,age,city,citizenShipNumber,email,document);
          console.log("success");
          console.log(additionUser);
          
        } catch (error) {
          console.log(error);
          
        }
      }

      //function to retrieve current user details
      const getUserInfo=async()=>{
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          console.log("getUserInfo called");
          const testContract= getEthereumContract();
          console.log("contract retrieved");
          console.log(currentAccount);
          const userDetails= await testContract.getCurrentUserDetails();
          console.log("userDetails retrieved");
          console.log(userData);
          setUserData(() => ({
            name: userDetails[0],
            age:userDetails[1],
            city:userDetails[2],
            citizenShipNumber:userDetails[3],
            email:userDetails[4],
            document:userDetails[5],
          }));
          console.log(userData);
          console.log("User details:"+userDetails);
          console.log("from user data"+userData.name);

          
        } catch (error) {
          console.log(error);
          
        }
      }

      // function to get userinformation by admin
      async function getUserData(){
        if (!ethereum) return alert("Please install Metamask to continue");
          console.log("getUserData called");
          const testContract= getEthereumContract();
          console.log("contract retrieved");
          const addressList= await testContract.getUser();

          addressList.forEach(async address=>{
           console.log("Insisde loop");
           const users= await testContract.getUserDetails(address);
           // check if user verified or not
           const isUserVerified= await testContract.isVerified(address);
           const structUserInfo= {
               name:users[0],
               age:users[1],
               city:users[2],
               citizenShipNumber:users[3],
               email:users[4],
               userAccount:address,
               isVerified:isUserVerified
           }
            setUsersInfo((prev)=>[...prev, structUserInfo])
           
       })

       console.log(usersInfo);

   }


      //function to check if user is verified or not
      const checkUserVerification = async()=>{
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          console.log("check user verification function called");
          const testContract= getEthereumContract();
          console.log("contract retrieved");
          const isVerified= await testContract.isVerified(currentAccount);
          console.log("verfication check done");
          console.log(isVerified);
          
        } catch (error) {
          console.log(error);
          
        }
      }

      const checkUserVerified= async(userAddress)=>{
        try {
        
            const isUserVerified= await landRegistrationContract.isVerified(userAddress);
         console.log(isUserVerified);
        //  isVerified=true;
        } catch (error) {
          console.log(error);
          
        }
      }

      // function to check if current user is admin or users
      const checkUser= async()=>{
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          console.log("check user called");
          const testContract= getEthereumContract();
          console.log("contract retrieved");
          console.log("current account :"+currentAccount);
          const isUser= await testContract.isUser(currentAccount);
          console.log("checking operation performed");
          console.log(isUser);

          
        } catch (error) {
          console.log(error);
          
        }
      }


      // function to display the information of the user to verify
      // by admin
      const viewUserInfo= async()=>{
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          console.log("Inside admin panel:"+"view user function of the request:");
          landRegistrationContract.on('Registration',async (userAddress)=>{
            console.log("INSIDE EVENT"+userAddress);
            const userInfo= await landRegistrationContract.getUserDetails(userAddress);
            console.log(userInfo);
            // const isVerified= await landRegistrationContract.verifyUser(userAddress);
            console.log("verification success");
          })

          console.log(userAddress);
          
        } catch (error) {
          console.log(error);
          
        }

      }

      // function to verify user
      // const verifyTheUser= async()=>{

      //   try {
      //     if (!ethereum) return alert("Please install Metamask to continue");
      //     landRegistrationContract.on('Registration',async (userAddress)=>{
      //       console.log("INSIDE EVENT"+userAddress);
      //       const isVerified= await landRegistrationContract.verifyUser(userAddress);
      //       console.log("verification success");
      //     })

      //     console.log(userAddress);
          
      //   } catch (error) {
      //     console.log(error);
          
      //   }
      // }
      const verifyTheUser= async(userAddress)=>{
        try {
        
         const isVerified= await landRegistrationContract.verifyUser(userAddress);
         console.log("verification success");
        } catch (error) {
          console.log(error);
          
        }
      }

      // function to add land
      const addLandTo= async()=>{
        try {
           if (!ethereum) return alert("Please install Metamask to continue");
          //const {landId,area,city,pradesh,propertyId,document}= formData;
          const {area,city,pradesh,propertyId,document}= formData;

          console.log("add land function called");
          console.log(currentAccount);
          const testContract=getEthereumContract();
          //const additionLand= await testContract.addLand(landId,area,city,pradesh,propertyId,document);
          const additionLand= await testContract.addLand(area,city,pradesh,propertyId,document);

          console.log("success");
          console.log(additionLand);
        } catch (error) {
          console.log(error);
          
        }
      }

      // function to get land details
      // const getAllLands= async()=>{
      //   try {
      //     if (!ethereum) return alert("Please install Metamask to continue");
      //     console.log("getland info called");
      //     const testContract= getEthereumContract();
      //     console.log("contract retrieved");
      //     const landDetails= await testContract.getLands();
      //     console.log("landDetails retrieved");
      //     console.log(landDetails);
      //     // console.log("first land");
      //     // console.log("first land id:"+landDetails[0].landId);
      //     // console.log("first land city:"+landDetails[0].city);
      //     // console.log(landDetails[1]);
      //     // console.log("seconde land id:"+landDetails[1].landId);
      //     // console.log(landDetails[2]);
      //     // console.log("third land id:"+landDetails[2].landId);
          
      //   } catch (error) {
      //     console.log(error);
          
      //   }
      // }

      // IMPORTANT NOTE
      //used in OwnedLands function 
      async function getAllLand(){
        if (!ethereum) return alert("Please install Metamask to continue");
        console.log("getUserData called");
        const testContract= getEthereumContract();
        console.log("contract retrieved");
    
          // to get the available number of lands
          const landCount= await testContract.getLandsCount();
          const TotalLandCount=parseInt(landCount);
    
          console.log(TotalLandCount);
    
          for(let i=1;i<TotalLandCount+1;i++){
            // check if the current user is the owner of the land
            console.log("inside loop");
            const landOwner= await testContract.getLandOwner(i);
            const actualLandOwner=landOwner.toLowerCase();
            if(currentAccount==actualLandOwner){
                // get the land details of the given land
                console.log('inside if condition')
                const landDetails= await testContract.getLandDetails(i);
                console.log('landDetails'+landDetails);
                console.log(parseInt(landDetails[0]));
                const isLandVerified= await testContract.isLandVerified(i);
                console.log(isLandVerified);
                const structLandInfo= {
                    landId:parseInt(landDetails[0]),
                    area:parseInt(landDetails[1]),
                    city:landDetails[2],
                    pradesh:landDetails[3],
                    propertyId:parseInt(landDetails[4]),
                    document:landDetails[5],
                    isVerified:isLandVerified.toString()
                }
                console.log(structLandInfo);
                setLandsInfo((prev)=>[...prev, structLandInfo])
    
            }
          }
    
          console.log('lands information'+landsInfo);
      }

      // IN ALLLANDS CALLED
      async function getAllLands(){
        if (!ethereum) return alert("Please install Metamask to continue");
        console.log("getUserData called");
        const testContract= getEthereumContract();
        console.log("contract retrieved");

        const landCount= await testContract.getLandsCount();
        const TotalLandCount=parseInt(landCount);
  
        for(let i=1;i<TotalLandCount+1;i++){
              console.log("inside loop");
              const landOwner= await testContract.getLandOwner(i);
              // get the land details of the given land
              const landDetails= await testContract.getLandDetails(i);
              console.log('landDetails'+landDetails);
              console.log(parseInt(landDetails[0]));
              const isLandVerified= await testContract.isLandVerified(i);
              const landAccount= await testContract.getLandOwner(i);
              console.log("land owner address"+landAccount);
              // may be needed to change landOwner Address to lower case
              const structLandInfo= {
                  landId:parseInt(landDetails[0]),
                  area:parseInt(landDetails[1]),
                  city:landDetails[2],
                  pradesh:landDetails[3],
                  propertyId:parseInt(landDetails[4]),
                  document:landDetails[5],
                  isVerified:isLandVerified.toString(),
                  landOwnerAddress:landAccount
              }
              console.log(structLandInfo);
              setLandsInfo((prev)=>[...prev, structLandInfo])
  
          }
  
          console.log(landsInfo);
  
      }

      // for verification of the land by the admin

      async function getUserAllData(){
        if (!ethereum) return alert("Please install Metamask to continue");
        console.log("getUserData called");
        const testContract= getEthereumContract();
        console.log("contract retrieved");

        const landCount= await testContract.getLandsCount();
        const TotalLandCount=parseInt(landCount);
  
        for(let i=1;i<TotalLandCount+1;i++){
              console.log("inside loop");
              const landOwner= await testContract.getLandOwner(i);
              // get the land details of the given land
              const landDetails= await testContract.getLandDetails(i);
              console.log('landDetails'+landDetails);
              console.log(parseInt(landDetails[0]));
              const isLandVerified= await testContract.isLandVerified(i);
              const structLandInfo= {
                  landId:parseInt(landDetails[0]),
                  area:parseInt(landDetails[1]),
                  city:landDetails[2],
                  pradesh:landDetails[3],
                  propertyId:parseInt(landDetails[4]),
                  document:landDetails[5],
                  isVerified:isLandVerified
              }
              console.log(structLandInfo);
              setLandsInfo((prev)=>[...prev, structLandInfo])
  
          }
  
          console.log(landsInfo);
  
      }


      //function to check land verified or not
      const checkLandVerified= async(landId)=>{
        try {
        
            const isLandVerified= await landRegistrationContract.isLandVerified(landId);
         console.log(isLandVerified);
        //  isVerified=true;
        } catch (error) {
          console.log(error);
          
        }
      }

      //function to verify the land
      const verifyTheLand= async(landId)=>{
        try {
        
         const isVerified= await landRegistrationContract.verifyLand(landId);
         console.log("verification success");
        } catch (error) {
          console.log(error);
          
        }
      }
    

      const checkLand= async()=>{
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          console.log("check land called");
          const testContract= getEthereumContract();
          console.log("contract retrieved");
          console.log("current account :"+currentAccount);
          const allLands= await testContract.getLands();

          console.log(allLands);
          console.log("total length"+allLands.length);

          // console.log("first land id"+allLands[0][0]);
          // const firstLandID= allLands[0][0];
          //  const isLandVerified= await testContract.isLandVerified(firstLandID);
          //  // for all lands we can use for loop
          //  console.log("Is land Verified:"+ isLandVerified);

          console.log("second land id"+allLands[1][0]);
          const secondLandID= allLands[1][0];
           const isLandVerified= await testContract.isLandVerified(secondLandID);
           // for all lands we can use for loop
           console.log("Is land Verified:"+ isLandVerified);


          console.log("checking operation performed");

          
        } catch (error) {
          console.log(error);
          
        }
      }

      


      //function to verify land
      const verifyUserLand= async()=>{
        var i=0;
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
           console.log("Verify land function called");
          // const testContract= getEthereumContract();
          // console.log("contract retrieved");

          // console.log("to verify user current lands");
          // const currentLandCount= await testContract.getLandsCount();
          // console.log(typeof(currentLandCount));
          // console.log("lands count retrieved");
          // for(i=1;i<currentLandCount+1;i++){
          //   // console.log(i);
          //   console.log("land ids:");
          //   const landDetailFromContract= await testContract.getLandDetails(i);
          //   console.log("processing");
          //   console.log(landDetailFromContract);
          // }
          // here number in getLandDetails refer to the landCount
          // const landDetailFromContract= await testContract.getLandDetails(3);
          // console.log(landDetailFromContract);
          landRegistrationContract.on('AddingLand',async (eventLandId)=>{
            console.log("INSIDE EVENT"+eventLandId);
            const isLandVerified= await landRegistrationContract.verifyLand(eventLandId);
            console.log("verification success");
          })
      

          
        } catch (error) {
          console.log(error);
          
        }

      }

      //function to request the land
      const requestThisLand= async(landId,landOwnerAddress)=>{
        try {
          // IF ABOVE LANDREGISTRATION CONTRACT IS REMOVED THEN IN BELOW getEthereum contract need to be called
           const requesttheLand=await landRegistrationContract.requestLand(landOwnerAddress,landId);
            console.log("land Requested");
           } catch (error) {
             console.log(error);
             
           }
    }

    //FUNCTION TO GET ALL REQUEST
    async function getAllRequests(){
      // ALSO CAN USE GETETHEREUM FUNCTION
      const requestCount= await landRegistrationContract.getRequestsCount();
      const TotalRequestCount= parseInt(requestCount);
      console.log('inside request function'+currentAccount);

      for(let i=1;i<TotalRequestCount+1;i++){
        console.log('inside loop');
        const requestDetails= await landRegistrationContract.requestDetails(i);
        console.log(requestDetails);
        // const isSellerSame= (currentAccount== requestDetails[0].toLowerCase());
        // console.log(isSellerSame);
        if(currentAccount== requestDetails[0].toLowerCase()){
            const structRequestInfo={
                requestId:i,
                sellerAddress:requestDetails[0],
                buyerAddress:requestDetails[1],
                landId:requestDetails[2],
                requestStatus:requestDetails[3]
            }
            console.log(structRequestInfo);
            setRequestInfo((prev)=>[...prev,structRequestInfo]);
        }
        
      }

      console.log(requestInfo);

    }

    //Function to approve the request
    const approveRequest= async(requestId)=>{
      const isRequested= await landRegistrationContract.approveRequest(requestId);
      console.log("land Request Approved");
  }

  // function to get approved request
  const getApprovedRequests=async()=>{
    const requestCount= await landRegistrationContract.getRequestsCount();
    const TotalRequestCount= parseInt(requestCount);
    console.log('inside request function'+currentAccount);

    for(let i=1;i<TotalRequestCount+1;i++){
      console.log('inside loop');
      const isRequestApproved= await landRegistrationContract.isApproved(i);
      if(isRequestApproved){
          const requestDetails= await landRegistrationContract.requestDetails(i);
          // console.log(typeof(isLandTransfer));
          // console.log("in request getting"+isLandTransfer);
          // const isLandTransfered= isLandTransfer;
          // console.log('islandtransfered'+isLandTransfered);
          
          console.log(typeof(requestDetails[4]));
          console.log(requestDetails[4]);
         
              const structRequestInfo={
                  requestId:i,
                  sellerAddress:requestDetails[0],
                  buyerAddress:requestDetails[1],
                  landId:requestDetails[2],
                  requestStatus:requestDetails[3],
                  isTransfered:requestDetails[4]
              }
              console.log(structRequestInfo);
              setRequestInfo((prev)=>[...prev,structRequestInfo]);
      }

      
    }

    console.log(requestInfo);

  }

  const transferLand= async(landId,buyerAddress,requestId)=>{
    // after transfer of land remove the request
    // when the landid of the request is equal to above landind
    const jobTransferLand= await landRegistrationContract.LandOwnershipTransfer(landId,buyerAddress);
    // to set transfer of given request to true
    const transferSuccessful= await landRegistrationContract.checkTransfer(requestId);
    console.log("land Transfer successful");

}

      // function to check if ether can be sent or not from one account to another
      const checkPayment= async()=>{
        try {
          
          if (!ethereum) return alert("Please install Metamask to continue");
          console.log("Verify land function called");
          const testContract= getEthereumContract();
          console.log("contract retrieved");
          const amountInEther= 0.5;
          const amountInWei= ethers.utils.parseEther(amountInEther.toString());
          console.log("amount in wei: "+amountInWei);

          const receiverAddress='0x90F79bf6EB2c4f870365E785982E1f101E93b906';// can be obtained from request id collection
          const landId=4;
          const tx=await testContract.payment(receiverAddress,landId,{value: amountInWei});
          await tx.wait();

        } catch (error) {
          console.log(error);
          
        }
      }

      // function to return the landId of the owner

    // const sendTransaction= async()=>{
    //     try {
    //       if (!ethereum) return alert("Please install Metamask to continue");
    //       // get data from the form
    //       const {landId,area,city,pradesh,propertyId,document}=formData;
    //       const landRegistrationContract= getEthereumContract();
    //       console.log(formData);
    //       console.log(landId,area,city,pradesh,propertyId,document)

    //       // const parsedAmount= ethers.utils.parseEther(amount);
    //       //USE landRegistrationContract anywhere needed
    //       // to send ether from one account to another
    //       // await ethereum.request(
    //       //   {
    //       //     method: 'eth_sendTransaction',
    //       //     params: [{
    //       //       from:currentAccount,
    //       //       to: addressTo,
    //       //       gas:'0x5208',
    //       //       value: parseEther
    //       //     }]
    //       //   });
          
    //       // to perform action on blockchain through contract
    //       const transactionHash=await landRegistrationContract.addLand(landId,area,city,pradesh,propertyId,document);
    //       console.log(formData);
    //       console.log(landId,area,city,pradesh,propertyId,document)
    //       console.log("hello")
    //       setisLoading(true);
    //       console.log(`Loading: ${transactionHash.hash}`)
    //       await transactionHash.wait();

    //       setisLoading(false);
    //       console.log(`Success: ${transactionHash.hash}`)

    //       getAllLand();

    //       // const transactionCount= await landRegistrationContract.getTransactionCount();
            
    //     } catch (error) {
    //         console.log(error);
    //         // throw new Error("No ethereum object")
            
    //     }
    // }

    useEffect(()=>{
        checkIfWalletIsConnected();
    },[]);


    return(
      // <LandRegistrationContext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,getAllLand}}>
      <LandRegistrationContext.Provider value={{connectWallet,currentAccount,checkAdmin,isAdmin,addUserTo,formData,userData,setFormData,setUserData,handleChange,handleUserChange, getUserInfo,getUserData,usersInfo,checkUserVerification,checkUserVerified,checkUser,verifyTheUser,handleVerify,addLandTo,getAllLands,getUserAllData,landsInfo,verifyUserLand,checkLand,viewUserInfo,checkPayment,userDetails,setUserDetails,checkLandVerified,verifyTheLand,requestThisLand,getAllLand,approveRequest,requestInfo,getAllRequests,transferLand,getApprovedRequests,isLandTransfer}}>
            {children}
        </LandRegistrationContext.Provider>
    )

};
