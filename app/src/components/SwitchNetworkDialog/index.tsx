import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ethers } from "ethers";

export default function SwitchNetworkDialog() {
  const handleNetworkSwitch = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const networkName = (event.target as HTMLFormElement).elements.namedItem(
      "network-name"
    ) as HTMLInputElement;
    const rpcUrl = (event.target as HTMLFormElement).elements.namedItem(
      "rpc-url"
    ) as HTMLInputElement;
    const chainId = (event.target as HTMLFormElement).elements.namedItem(
      "chain-id"
    ) as HTMLInputElement;
    const decimals = (event.target as HTMLFormElement).elements.namedItem(
      "decimals"
    ) as HTMLInputElement;
    const currencyName = (event.target as HTMLFormElement).elements.namedItem(
      "currency-name"
    ) as HTMLInputElement;
    const explorerUrl = (event.target as HTMLFormElement).elements.namedItem(
      "explorer-url"
    ) as HTMLInputElement;

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      "any"
    );
    let payload: any;
    if (!explorerUrl.value) {
      payload = {
        chainId: `0x${parseInt(chainId.value, 10).toString(16)}`,
        chainName: networkName.value,
        nativeCurrency: {
          name: currencyName.value,
          symbol: currencyName.value,
          decimals: parseInt(decimals.value),
        },
        rpcUrls: [rpcUrl.value],
      };
    } else {
      payload = {
        chainId: `0x${parseInt(chainId.value, 10).toString(16)}`,
        chainName: networkName.value,
        nativeCurrency: {
          name: currencyName.value,
          symbol: currencyName.value,
          decimals: parseInt(decimals.value),
        },
        rpcUrls: [rpcUrl.value],
        blockExplorerUrls: [explorerUrl.value],
      };
    }
    await provider.send("wallet_addEthereumChain", [payload]);

    document.getElementById("close-dialog")?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" id="switch-network-button" className="mt-2">
          Switch Network
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:!max-w-[70%] lg:!max-w-[45%]">
        <form onSubmit={handleNetworkSwitch}>
          <DialogHeader>
            <DialogTitle className="text-center">
              Enter Network Details
            </DialogTitle>
            <DialogDescription className="text-center">
              Add a new network to switch to.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="network-name" className="text-right">
                Network Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="network-name"
                className="col-span-3"
                defaultValue={"Polygon Amoy Testnet"}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rpc-url" className="text-right">
                New RPC URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="rpc-url"
                className="col-span-3"
                defaultValue={"https://rpc-amoy.polygon.technology"}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chain-id" className="text-right">
                Chain ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="chain-id"
                className="col-span-3"
                defaultValue={80002}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency-name" className="text-right">
                Currency Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="currency-name"
                className="col-span-3"
                defaultValue={"MATIC"}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="decimals" className="text-right">
                Decimals <span className="text-red-500">*</span>
              </Label>
              <Input
                id="decimals"
                className="col-span-3"
                defaultValue={18}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="explorer-url" className="text-right">
                Block Explorer URL
              </Label>
              <Input
                id="explorer-url"
                className="col-span-3"
                defaultValue={"https://amoy.polygonscan.com"}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="hidden"
                id="close-dialog"
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Switch</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
