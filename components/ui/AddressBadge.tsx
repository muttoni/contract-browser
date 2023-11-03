import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, getNetworkFromAddress } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CopyButton } from "./CopyButton";

export default function AddressBadge({ address, colorBasedOnNetwork = false, copyBadge = false, className }: { 
  address: string, 
  colorBasedOnNetwork?: boolean,
  copyBadge?: boolean,
  className?: string 
}) {

  const network = getNetworkFromAddress(address)
  
  return (
    <div className="inline-flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
          <Link href={`/account/${address}`} className="">
            <Badge variant="outline" className={cn("relative font-mono rounded-sm", 
              colorBasedOnNetwork && (network === 'mainnet' 
              ? 'bg-green-400 border-green-500 text-green-900' 
              : network === 'testnet' ? 'bg-orange-300 border-orange-500 text-orange-900'
              : '')
              , className)}>{address}</Badge>
          </Link>
          </TooltipTrigger>
          <TooltipContent className={ network === 'mainnet' ? 'bg-green-400 border-green-500 text-green-900' : 'bg-orange-300 border-orange-500 text-orange-900' }>
            <p>{address} is a {network} account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {copyBadge && <CopyButton text={address} />}
    </div>
  )
}



