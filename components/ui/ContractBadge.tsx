import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, getContractAddress, getContractName, getNetworkFromAddress, ellipsify } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { isVerified } from "@/lib/official-contracts";
import { VerifiedBadge } from "./VerifiedBadge";

export default function ContractBadge({ uuid, className }: { uuid: string, className?: string }) {

  const address = getContractAddress(uuid)
  const contractName = getContractName(uuid)
  const network = getNetworkFromAddress(address)

  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Link href={`/${uuid}`}>
          <Badge variant="secondary" className={cn("font-mono rounded-sm text-sm bg-transparent", className)}>
            <span className="me-1">{ellipsify(contractName, 30)}</span>
            {isVerified(uuid) && <VerifiedBadge/>}
          </Badge>
        </Link>
      </TooltipTrigger>
      <TooltipContent className={ network === 'mainnet' ? 'bg-green-400 border-green-500 text-green-800' : 'bg-orange-400 border-orange-500' }>
        <p>{uuid} is deployed on {network}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}