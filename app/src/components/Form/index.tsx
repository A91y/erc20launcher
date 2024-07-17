"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

export default function Form() {
  const [isFutureMintChecked, setIsFutureMintChecked] = useState(false);
  const [isMaxSupplyFixed, setIsMaxSupplyFixed] = useState(true);
  const [network, setNetwork] = useState<string>("");
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isMdScreen, setIsMdScreen] = useState(true);

  // useEffect(() => {
  //   const fetchNetwork = async () => {
  //     if (typeof (window as any).ethereum !== "undefined") {
  //       const provider = new ethers.providers.Web3Provider(
  //         (window as any).ethereum
  //       );
  //       const network = await provider.getNetwork();
  //       console.log(network);
  //       setNetwork(network.name);
  //     } else {
  //       setNetwork("Default Network");
  //     }
  //   };
  //   fetchNetwork();
  // }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("data", {
      tokenName: (e.target as any).tokenname.value,
      ticker: (e.target as any).ticker.value,
      decimals: (e.target as any).decimals.value,
      initialSupply: (e.target as any).initialSupply.value,
      maxSupply: (e.target as any).maxSupply?.value,
      isFutureMintChecked,
      isMaxSupplyFixed,
    });
    console.log("Form submitted");
  };

  async function connectWallet() {
    if (typeof (window as any).ethereum !== "undefined") {
      // show all the connected wallets and give options to connect other wallet
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum, "any"
      );

      let accounts = await provider.send("eth_accounts", []);

      let account = accounts[0];
      console.log(accounts); // Print address
      provider.on('accountsChanged', function (accounts) {
          account = accounts[0];
          console.log(account); // Print new address
          setWalletAddress(_walletAddress);
      });
  
      const signer = provider.getSigner();
  
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
      localStorage.setItem("walletAddress", _walletAddress);
    } else {
      console.log("No Ethereum Wallet");
      throw new Error("No Ethereum Wallet");
    }
  }

  function disconnectWallet() {
    setConnected(false);
    setWalletAddress("");
    localStorage.removeItem("walletAddress");
  }

  async function handleWalletButtonClick() {
    if (!connected) {
      await connectWallet();
    } else {
      disconnectWallet();
    }
  }

  const handleFutureMintCheckboxChange = () => {
    setIsFutureMintChecked(!isFutureMintChecked);
  };

  const handleMaxSupplyCheckboxChange = () => {
    setIsMaxSupplyFixed(!isMaxSupplyFixed);
  };

  const connectButtonClassName = connected
    ? "bg-red-500"
    : "from-purple-400 to-purple-800 hover:from-purple-500 hover:to-purple-700 ease-in-out duration-300 shadow-md";

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem("walletAddress");
    if (storedWalletAddress) {
      setConnected(true);
      setWalletAddress(storedWalletAddress);
    }
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  return (
    <div className="max-w-2xl w-full rounded-2xl p-4 md:p-12 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
        ERC 20 Launcher
      </h1>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-slate-500 to-transparent my-2 h-0.5 w-full" />
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="tokenname">
              Token Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="tokenname"
              placeholder="e.g. My Token"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="ticker">
              Ticker <span className="text-red-500">*</span>
            </Label>
            <Input id="ticker" placeholder="e.g. MTK" type="text" required />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="decimals">
            Decimals <span className="text-red-500">*</span>
          </Label>
          <Input
            id="decimals"
            placeholder="e.g. 18"
            defaultValue={18}
            type="number"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="initialSupply">
            Initial Supply <span className="text-red-500">*</span>
          </Label>
          <Input
            id="initialSupply"
            placeholder="e.g. 10000"
            type="number"
            required
          />
        </LabelInputContainer>
        {isFutureMintChecked && (
          <>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="maxSupply">
                Max Supply <span className="text-red-500">*</span>
              </Label>
              <Input
                id="maxSupply"
                placeholder="e.g. 10000"
                type="number"
                required
                disabled={!isMaxSupplyFixed}
              />
            </LabelInputContainer>
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="fixMaxSupply"
                onCheckedChange={handleMaxSupplyCheckboxChange}
                defaultChecked={isMaxSupplyFixed}
              />
              <Label htmlFor="fixMaxSupply">Fix Max Supply?</Label>
            </div>
          </>
        )}
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="futureMint"
            onCheckedChange={handleFutureMintCheckboxChange}
          />
          <Label htmlFor="futureMint">Mint more in future?</Label>
        </div>
        {connected && (
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Launch
            <BottomGradient />
          </button>
        )}
      </form>
      <button
        className={cn(
          "bg-gradient-to-br relative group/btn  block w-full text-white rounded-md h-10 font-medium ",
          connectButtonClassName
        )}
        onClick={handleWalletButtonClick}
      >
        {connected ? "Disconnect Wallet" : "Connect Wallet"}
      </button>
      {connected && (
        <p className="text-gray-500 mt-2 text-center text-sm">
          {" "}
          {isMdScreen ? walletAddress : truncateAddress(walletAddress)}
        </p>
      )}
      {/* <div className="flex justify-between items-center">
        <div>Network</div>
        <button>H</button>
      </div> */}
      {/* <div className="flex justify-between items-center">
        <div>Network</div>
        <Select>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder={network} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="default">Default Network</SelectItem>
              <SelectItem value="ethereum-mainnet">Ethereum Mainnet</SelectItem>
              <SelectItem value="sepolia">Sepolia</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
