"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/authContextSignal";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const MetaMask = () => {
  const { toast } = useToast();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        console.log("Connecting....");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        currentUser.value = accounts[0];
        localStorage.setItem("currentUser", String(currentUser.value));
        console.log("Connected");
        toast({
          title: "Connected!",
          description: "Your wallet is succesfully connected.",
        });
      } catch (err: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `Error: ${err.message}`,
        });
      }
    } else {
      toast({
        title: "Install MetaMask",
        description: "You need to install MetaMask plugin to connect",
        action: (
          <ToastAction altText="Try again">
            <a
              target="_blank"
              href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            >
              Install
            </a>
          </ToastAction>
        ),
      });
    }
  };

  return (
    <>
      <Button onClick={connectWallet} >
        Connect Wallet
      </Button>
    </>
  );
};

export default MetaMask;
