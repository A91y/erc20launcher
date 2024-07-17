"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ERC20LauncherABI from "@/app/abi/ERC20Launcher.json";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "../ui/toast";
import SwitchNetworkDialog from "../SwitchNetworkDialog";

export default function Form() {
  const { toast } = useToast();
  const [isFutureMintChecked, setIsFutureMintChecked] = useState(false);
  const [isMaxSupplyFixed, setIsMaxSupplyFixed] = useState(true);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isMdScreen, setIsMdScreen] = useState(true);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [loading, setLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    function validateForm() {
      const form = e.target as any;
      const initialSupply = Number(form.initialSupply.value);
      const maxSupply = Number(form.maxSupply?.value);
      if (isFutureMintChecked && isMaxSupplyFixed) {
        if (maxSupply <= initialSupply) {
          toast({
            variant: "destructive",
            title: "Invalid Max Supply",
            description: "Max supply should be greater than initial supply",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          return false;
        }
      }
      return true;
    }

    if (!validateForm()) return;

    e.preventDefault();
    setLoading(true);
    const form = e.target as any;
    const tokenName = form.tokenname.value;
    const ticker = form.ticker.value;
    const decimals = ethers.utils.parseUnits(form.decimals.value, 0);
    const initialSupply = ethers.utils.parseUnits(form.initialSupply.value, 0);
    const maxSupply = isFutureMintChecked
      ? isMaxSupplyFixed
        ? ethers.utils.parseUnits(form.maxSupply.value, decimals)
        : ethers.constants.MaxUint256
      : ethers.utils.parseUnits(form.initialSupply.value, decimals);

    console.log("Form submitted");
    console.log("Token Name: ", tokenName);
    console.log("Ticker: ", ticker);
    console.log("Decimals: ", decimals);
    console.log("Initial Supply: ", initialSupply);
    console.log("Max Supply: ", maxSupply);

    if (signer) {
      const ERC20LauncherFactory = new ethers.ContractFactory(
        ERC20LauncherABI.abi,
        ERC20LauncherABI.bytecode,
        signer
      );

      try {
        const contract = await ERC20LauncherFactory.deploy(
          tokenName,
          ticker,
          initialSupply,
          decimals,
          maxSupply
        );

        toast({
          title: "Deploying Contract",
          description: "Please wait...",
        });
        await contract.deployed();
        console.log("Contract deployed at:", contract.address);
        setContractAddress(contract.address);
        localStorage.setItem("contractAddress", contract.address);
        toast({
          title: "Contract Deployed",
          description: `Address: ${truncateAddress(
            contract.address
          )} (click to copy)`,
          onClick: () => {
            navigator.clipboard.writeText(contract.address);
            toast({
              title: "Copied token address to clipboard",
            });
          },
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error deploying contract",
          description: (error as any)?.code,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        console.error("Error deploying contract:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  async function connectWallet() {
    if (typeof (window as any).ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
        "any"
      );
      let accounts = await provider.send("eth_requestAccounts", []);
      let account = accounts[0];
      provider.on("accountsChanged", function (accounts) {
        account = accounts[0];
        setWalletAddress(_walletAddress);
      });
      const signer = provider.getSigner();

      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
      setSigner(signer);
      // localStorage.setItem("walletAddress", _walletAddress);
      toast({
        title: "Wallet Connected",
        description: `Address: ${truncateAddress(_walletAddress)}\nNetworkId: ${
          provider.network.chainId
        }`,
        action: (
          <ToastAction
            altText="Switch Network"
            onClick={() => {
              document.getElementById("switch-network-button")?.click();
              setConnected(false);
              setWalletAddress("");
            }}
          >
            Switch Network
          </ToastAction>
        ),
      });
    } else {
      toast({
        variant: "destructive",
        title: "No Ethereum Wallet",
        description: "Please install an Ethereum wallet like MetaMask",
      });
      console.log("No Ethereum Wallet");
    }
  }

  function disconnectWallet() {
    setConnected(false);
    setWalletAddress("");
    localStorage.removeItem("walletAddress");
    toast({
      title: "Wallet Disconnected",
    });
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
    const storedContractAddress = localStorage.getItem("contractAddress");
    if (storedContractAddress) {
      setContractAddress(storedContractAddress);
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
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Launching..." : "Launch"}
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
      {!!contractAddress && (
        <div className="flex justify-center">
          <button
            className="text-gray-600 mt-2 text-center text-sm last-address-button"
            onClick={() => {
              navigator.clipboard.writeText(contractAddress);
              toast({
                title: "Copied last token address to clipboard",
                description: truncateAddress(contractAddress),
              });
              document.getElementsByClassName(
                "last-address-button"
              )[0].innerHTML = "Copied!";
              setTimeout(() => {
                document.getElementsByClassName(
                  "last-address-button"
                )[0].innerHTML = `${
                  isMdScreen
                    ? `Last Deployed: ${contractAddress}`
                    : `Last Deployed: ${truncateAddress(contractAddress)}`
                }`;
              }, 2000);
            }}
          >
            {isMdScreen
              ? `Last Deployed: ${contractAddress}`
              : `Last Deployed: ${truncateAddress(contractAddress)}`}
          </button>
        </div>
      )}
      <div className="flex justify-end flex-row">
        <SwitchNetworkDialog />
      </div>
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
