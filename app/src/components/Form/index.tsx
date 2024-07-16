"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Form() {
  const [isFutureMintChecked, setIsFutureMintChecked] = useState(false);
  const [isMaxSupplyFixed, setIsMaxSupplyFixed] = useState(true);

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

  const handleFutureMintCheckboxChange = () => {
    setIsFutureMintChecked(!isFutureMintChecked);
  };

  const handleMaxSupplyCheckboxChange = () => {
    setIsMaxSupplyFixed(!isMaxSupplyFixed);
  };

  return (
    <div className="max-w-2xl w-full rounded-none md:rounded-2xl p-4 md:p-12 shadow-input bg-white dark:bg-black">
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
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Launch
          <BottomGradient />
        </button>
      </form>
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
