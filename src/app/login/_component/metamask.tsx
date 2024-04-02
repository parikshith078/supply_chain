// "use client";
// import React, { useState, useEffect } from "react";
// import { ethers, formatEther } from "ethers"; // Import BigNumber if needed
// import { Button } from "@/components/ui/button";

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// const MetaMask = () => {
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
//   const [userBalance, setUserBalance] = useState<string | null>(null);
//   const [walletConnected, setWalletConnected] = useState(false);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         accountChanged(accounts[0]);
//         setWalletConnected(true);
//         setErrorMessage("You are logged in!"); // Success message on connect
//         setTimeout(() => setErrorMessage(null), 2000); // Clear message after 2 secs
//       } catch (err: any) {
//         setErrorMessage(err.message);
//       }
//     } else {
//       setErrorMessage("Install MetaMask please!!");
//     }
//   };

//   const accountChanged = (accountName: string) => {
//     setDefaultAccount(accountName);
//     getUserBalance(accountName);
//   };

//   const getUserBalance = async (accountAddress: string) => {
//     if (window.ethereum) {
//       try {
//         const balance = await window.ethereum.request({
//           method: "eth_getBalance",
//           params: [String(accountAddress), "latest"],
//         });
//         const formattedBalance = formatEther(balance as ethers.BigNumberish);
//         setUserBalance(formattedBalance);
//       } catch (err: any) {
//         setErrorMessage(err.message);
//       }
//     }
//   };

//   const logout = () => {
//     if (window.ethereum && window.ethereum.disconnect) {
//       window.ethereum.disconnect();
//     }
//     setWalletConnected(false);
//     setDefaultAccount(null);
//     setUserBalance(null);
//     setErrorMessage("You are logged out!"); // Logout message
//     setTimeout(() => setErrorMessage(null), 2000); // Clear message after 2 secs
//   };

//   return (
//     <center>
//       {errorMessage && <p className="text-green-500">{errorMessage}</p>}{" "}
//       {/* Success/Logout messages */}
//       <div className="flex items-center gap-2">
//         <Button onClick={connectWallet}>Connect Wallet</Button>
//         {walletConnected && (
//           <>
//             <Button
//               onClick={() =>
//                 setErrorMessage(
//                   "Address: " +
//                     defaultAccount +
//                     ", Balance: " +
//                     userBalance +
//                     " ETH"
//                 )
//               }
//               variant="secondary"
//             >
//               Show Details
//             </Button>
//             <Button onClick={logout}>Logout</Button>
//           </>
//         )}
//         {!walletConnected && (
//           <>
//             <Button disabled>Show Details</Button>
//             <Button disabled>Logout</Button>
//           </>
//         )}
//       </div>
//     </center>
//   );
// };

// export default MetaMask;
"use client";
import React, { useState, useEffect } from "react";
import { ethers, formatEther } from "ethers"; // Import BigNumber if needed
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        accountChanged(accounts[0]);
        setWalletConnected(true);
        setErrorMessage("You are logged in!"); // Success message on connect
        setTimeout(() => setErrorMessage(null), 2000); // Clear message after 2 secs
      } catch (err: any) {
        setErrorMessage(err.message);
      }
    } else {
      setErrorMessage("Install MetaMask please!!");
    }
  };

  const accountChanged = (accountName: string) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };

  const getUserBalance = async (accountAddress: string) => {
    if (window.ethereum) {
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [String(accountAddress), "latest"],
        });
        const formattedBalance = formatEther(balance as ethers.BigNumberish);
        setUserBalance(formattedBalance);
      } catch (err: any) {
        setErrorMessage(err.message);
      }
    }
  };

  const logout = () => {
    if (window.ethereum && window.ethereum.disconnect) {
      window.ethereum.disconnect();
    }
    setWalletConnected(false);
    setDefaultAccount(null);
    setUserBalance(null);
    setErrorMessage("You are logged out!"); // Logout message
    setTimeout(() => setErrorMessage(null), 2000); // Clear message after 2 secs
  };

  return (
    <center>
      {errorMessage && <p className="text-green-500">{errorMessage}</p>}{" "}
      {/* Success/Logout messages */}
      <div className="flex items-center gap-2 fixed top-0 right-5">
        <Button onClick={connectWallet} className="mt-2 ml-2 shadow-lg">
          Connect Wallet
        </Button>
        {walletConnected && (
          <>
            <Button onClick={() => setShowDetails(true)} variant="secondary">
              Show Details
            </Button>
            <Button onClick={logout}>Logout</Button>
          </>
        )}
        {!walletConnected && (
          <>
            <Button disabled className="mt-2 ml-2 shadow-lg">
              Show Details
            </Button>
            <Button disabled className="mt-2 ml-2 shadow-lg">
              Logout
            </Button>
          </>
        )}
      </div>
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="mb-2 text-black">Public Key: {defaultAccount}</p>
            <p className="mb-2 text-black">Balance: {userBalance} ETH</p>
            <Button onClick={() => setShowDetails(false)}>Close</Button>
          </div>
        </div>
      )}
    </center>
  );
};

export default MetaMask;
