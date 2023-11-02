import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, getContractAddress, getContractName, getNetworkFromAddress, ellipsify } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { isVerified } from "@/lib/official-contracts";
import { BadgeCheck } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

export default function ContractBadge({ uuid, className }: { uuid: string, className?: string }) {

  const address = getContractAddress(uuid)
  const contractName = getContractName(uuid)
  const network = getNetworkFromAddress(address)

  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Link href={`/${uuid}`}>
          <Badge variant="secondary" className={cn("font-mono rounded-sm", className)}>
            {ellipsify(contractName, 30)}
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

const VerifiedBadge = () => {
  return ( <HoverCard>
            <HoverCardTrigger asChild>
              <BadgeCheck className="h-4 px-0 text-purple-400" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80 font-normal">
              This contract is verified by Contract Browser.
            </HoverCardContent>
          </HoverCard>
  )
}