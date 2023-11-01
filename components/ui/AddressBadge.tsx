import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, getNetworkFromAddress } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function AddressBadge({ address, className }: { address: string, className?: string }) {

  const network = getNetworkFromAddress(address)
  
  return (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
      <Link href={`/account/${address}`}>
        <Badge variant="outline" className={cn("font-mono rounded-sm", className)}>{address}</Badge>
      </Link>
      </TooltipTrigger>
      <TooltipContent className={ network === 'mainnet' ? '' : 'bg-orange-600' }>
        <p>{address} is a {network} account</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}

