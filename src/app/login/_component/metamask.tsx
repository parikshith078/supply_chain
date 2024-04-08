"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        console.log("Connecting....")
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log("Connected")
        setWalletConnected(true);
      } catch (err: any) {
        setErrorMessage(err.message);
        setTimeout(() => setErrorMessage(null), 2000); // Clear message after 2 secs
      }
    } else {
      setErrorMessage("Install MetaMask please!!");
    }
  };

  //NOTE: Only for UX no really disconnect option by metamask
  const logout = () => {
    setWalletConnected(false);
    setWalletAddress(null);
    console.log("loged out");
    setErrorMessage("You are logged out!"); // Logout message
    setTimeout(() => setErrorMessage(null), 2000); // Clear message after 2 secs
  };

  return (
    <center>
      {errorMessage && <p className="text-green-500">{errorMessage}</p>}{" "}
      {/* Success/Logout messages */}
      <div className="flex items-center gap-2 fixed top-0 right-5">
        <p>{walletAddress && walletAddress}</p>
        <Button onClick={connectWallet}  disabled={walletConnected} className="mt-2 ml-2 shadow-lg">
          Connect Wallet
        </Button>
        <Button disabled={!walletConnected} onClick={logout} className="mt-2 ml-2 shadow-lg">
          Logout
        </Button>
      </div>
    </center>
  );
};

export default MetaMask;
