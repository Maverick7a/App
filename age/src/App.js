import { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [age, setAge] = useState(0);
  const [contract, setContract] = useState(""); 
//const [showAccount, setShowAccount] = useState(false);
  const [ageButtonClickCount, setAgeButtonClickCount] = useState(0);
  const [metamaskClickCount, setMetamaskClickCount] = useState(0);
  const [contractConnected, setContractedConnected] = useState(false);

  const { ethereum } = window;

  const connectMetamask = async () => {
    if (ethereum && typeof ethereum.request === "function") {
      try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        setMetamaskClickCount(metamaskClickCount +1);
        // setShowAccount(true);
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    }
  };

  const connectContract = async () => {
    const contractAddress = "0x21aD785bBE12968709DFaFa868e83cBd183f51a7";
    const contractAbi = [
      {
        name: "age",
        inputs: [],
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        name: "changeAge",
        inputs: [
          {
            internalType: "uint256",
            name: "_age",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable", 
        type: "function",
      },
    ];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    setContract(contract);
    setContractedConnected(true);
    console.log(contract.address);
  };

  const getData = async () => {
    if(contractConnected) {
    if (contract) {
      const phrase = await contract.age();
      setAge(phrase.toNumber()); // Convert BigNumber to string

      setAgeButtonClickCount(ageButtonClickCount + 1);
    }
    } else {
        alert("Please connect to the contract first")
    }
  };

  

  const changeData = async () => {
    if (contract) { // Check if contract is defined before using it
      const _age = age + 25;
      const tx = await contract.changeAge(_age);
      const txReceipt = await tx.wait();
      console.log(txReceipt);
    }
  };

//   const minusAge = async() => {
//     if (contract) {
//         const _age = age - 25;
//         const tx = await contract.changeAge(_age);
//         const txReceipt = await tx.wait();
//         console.log(tx.txReceipt);
//     }
//   }

//   const accountVisibility = () => {
//     setShowAccount(!showAccount);
//   };

  return (
    <div className="App">
        <h1 className="header">Daniel this one is for you my dear friend</h1>
        <button id="connectMetamask" onClick={connectMetamask}>Connect to Metamask</button>
        <p>{metamaskClickCount % 2 === 1 ? account : null}</p>
      {/* {showAccount && <p>{account}</p>}
      {showAccount && <button onClick={accountVisibility}>Hide Account</button>} */}
      <button id="connectContract" onClick={connectContract}>Connect to Contract</button>
      <button id="getData" onClick={getData}>Age</button> 
      <button id="changeData" onClick={changeData}>Change Age</button>
      {/* <button onClick={minusAge}>Minus Age</button>  */}
      <p>{ageButtonClickCount % 2 === 1 ? `Age: ${age}` : null}</p>
      {/* <p>{ageButtonClickCount % 2 === 1 ? age : null}</p> */}
    </div>
  );
}

export default App;
