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
    // const [formData, setFormData]= useState({
    //     landId:0,
    //     area:0,
    //     city:'',
    //     pradesh:'',
    //     propertyId:0,
    //     document:''
    // });

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

    const [userTransaction, setUserTransaction]=useState([]);

    const [userDetails,setUserDetails]=useState(null);

     const [userAddress,setUserAddress]= useState(null);

    const [landDetails,setLandDetails]=useState(null);
    const [isLoadin,setisLoading]=useState(false);

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


    // const getAllLand= async ()=>{
    //   try {
    //     if (!ethereum) return alert("Please install Metamask to continue");
    //     const landRegistrationContract= getEthereumContract();
    //     console.log("getlands called");
    //     //const landDetails = await landRegistrationContract.getLandDetails(formData.landId);
    //     const landDetails = await landRegistrationContract.getUserLandDetail();
    //     console.log("getuserlAND DETAILS");
    //     console.log(landDetails);

    //     const landId = landDetails[0];
    //     const area = landDetails[1];
    //     const city = landDetails[2];
    //     const pradesh = landDetails[3];
    //     const propertyId = landDetails[4];
    //     const document= landDetails[5];
    
    //       setLandDetails(
    //         "LandId: " + landId + "\n" +
    //         "Area: " + area + "\n" +
    //         "City: " + city + "\n" +
    //         "Pradesh: " + pradesh+'\n'+
    //         "Property Id: " + propertyId + "\n" +
    //         "Document: " + document 
    
    //       )
    //     console.log("data retreived")
    //     console.log(availableLands)
        

    //     // const structuredLandsDetails= availableLands.map((transactions)=>({
    //     //   landId:transactions.landId,
    //     //   area:transactions.area,
    //     //   city:transactions.city,
    //     //   pradesh:transactions.pradesh,
    //     //   propertyId:transactions.propertyId,
    //     //   document:transactions.document,
    //     // }))
    //     // console.log(structuredLandsDetails);


        
    //   } catch (error) {
        
    //   }
    // }

      
    

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
      
      // const checkIfTransactionExist= async ()=>{
      //   try {
      //     const transactionHash=await landRegistrationContract.addLand(landId,area,city,pradesh,propertyId,document);

          
      //   } catch (error) {
          
      //   }
      // }

      const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          }); //get all accounts
          console.log(accounts);
          setCurrentAccount(accounts[0]); //set the 1st account as default account
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
      // const getUserInfo=async()=>{
      //   try {
      //     if (!ethereum) return alert("Please install Metamask to continue");
      //     console.log("getUserInfo called");
      //     const testContract= getEthereumContract();
      //     console.log("contract retrieved");
      //     console.log(currentAccount);
      //     const userDetails= await testContract.getCurrentUserDetails();
      //     console.log("userDetails retrieved");
      //     console.log(userDetails);
          
      //   } catch (error) {
      //     console.log(error);
          
      //   }
      // }
      // const getUserInfo=async()=>{
      //   try {
      //     if (!ethereum) return alert("Please install Metamask to continue");
      //     console.log("getUserInfo called");
      //     const testContract= getEthereumContract();
      //     console.log("contract retrieved");
      //     console.log(currentAccount);
      //     const userDetails= await testContract.getCurrentUserDetails();
      //     console.log("userDetails retrieved");
      //     console.log(userDetails);
      //     console.log(userDetails[0]);
      //     console.log(userDetails[1]);
      //     console.log(userDetails[2]);
      //     console.log(userDetails[3]);
      //     console.log(userDetails[4]);
      //     setUserDetails(
      //       "Name: " + userDetails[0] + "\n" +
      //       "Age: " + userDetails[1] + "\n" +
      //       "City: " + userDetails[2] + "\n" +
      //       "Citizenship: " + userDetails[3]+'\n'+
      //       "email: " + userDetails[4] + "\n" 
            
    
      //     )
      //     console.log("User details:"+userDetails);

          
      //   } catch (error) {
      //     console.log(error);
          
      //   }
      // }

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
          // console.log("user data"+userData.name+"called");
          // console.log(typeof(userDetails));
          // console.log(userDetails);
          // console.log(userDetails[0]);
          // console.log(typeof(userDetails[0]));
          // console.log(userDetails[1]);
          // console.log(userDetails[2]);
          // console.log(userDetails[3]);
          // console.log(userDetails[4]);
          // setUserData({
          //   name:userDetails[0],
          //   age:userDetails[1],
          //   city:userDetails[2],
          //   citizenShipNumber:userDetails[3],
          //   email:userDetails[4],
          //   document:userDetails[5]
          // });
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

      // function to get all user
      // const getAllUser= async()=>{
      //   try { if (!ethereum) return alert("Please install Metamask to continue");
      //   console.log("Verify user function called");
      //   const testContract= getEthereumContract();
      //   console.log("contract retrieved");
      //  // verify user 

      //  const allUsers=await testContract.getUser();
      //  console.log("All users retrieved");
      // //  console.log(allUsers);
      // //  console.log(typeof(allUsers));
      // //  console.log(allUsers[0]);
      // //  const userAddress=allUsers[0];
      // console.log(allUsers[0]);
      // // setUserAddress(userAddressallUsers[0]);
      // userAddress=allUsers[0];

      // console.log(userAddress);
          
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }

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
      const verifyTheUser= async()=>{
        // try {
        //   //await getAllUser();
        //   if (!ethereum) return alert("Please install Metamask to continue");
        //   console.log("Verify user function called");
        //   const testContract= getEthereumContract();
        //   console.log("contract retrieved");
        //  // verify user 

        //  const allUsers=await testContract.getUser();
        //  console.log("All users retrieved");
        //  console.log(allUsers);
        //  console.log(typeof(allUsers));
        //  console.log(allUsers[0]);
        //  const userAddress=allUsers[0];

        // // const userAddress='0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
        
        //  const isVerified= await testContract.verifyUser(userAddress);
        //  console.log("verification success");
        // //  const isVerified= await testContract.verifyUser(allUsers[0]);
        // //  console.log("verification success");

        // console.log(currentAccount);
        // console.log(userAddress);


        // // console.log('Type of admin address'+typeof(currentAccount));
        // // console.log('type of above user adress'+typeof(userAddress));
        // // await testContract.verifyUser(userAddress);
        // // console.log("Verification completed");


          
        // } catch (error) {
        //   console.log(error);
          
        // }

        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          // console.log("Verify user function called");
          // const testContract= getEthereumContract();
          // console.log("contract retrieved");
          // // use the event fired during addUser in the beginning
          // testContract.on('Registration',(userAddress,event=>{
          //   console.log(userAddress);
          // }))
          // console.log("Newly added user: "+ userAddress);
          landRegistrationContract.on('Registration',async (userAddress)=>{
            console.log("INSIDE EVENT"+userAddress);
            const isVerified= await landRegistrationContract.verifyUser(userAddress);
            console.log("verification success");
          })

          console.log(userAddress);
          
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
      const getAllLands= async()=>{
        try {
          if (!ethereum) return alert("Please install Metamask to continue");
          console.log("getland info called");
          const testContract= getEthereumContract();
          console.log("contract retrieved");
          const landDetails= await testContract.getLands();
          console.log("landDetails retrieved");
          console.log(landDetails);
          // console.log("first land");
          // console.log("first land id:"+landDetails[0].landId);
          // console.log("first land city:"+landDetails[0].city);
          // console.log(landDetails[1]);
          // console.log("seconde land id:"+landDetails[1].landId);
          // console.log(landDetails[2]);
          // console.log("third land id:"+landDetails[2].landId);
          
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
      <LandRegistrationContext.Provider value={{connectWallet,currentAccount,checkAdmin,addUserTo,formData,userData,setFormData,setUserData,handleChange,handleUserChange, getUserInfo,checkUserVerification,checkUser,verifyTheUser,handleVerify,addLandTo,getAllLands,verifyUserLand,checkLand,viewUserInfo,checkPayment,userDetails,setUserDetails}}>
            {children}
        </LandRegistrationContext.Provider>
    )

};
