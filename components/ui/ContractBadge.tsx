import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, getContractAddress, getContractName, getNetworkFromAddress, ellipsify } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ContractBadge({ uuid, className }: { uuid: string, className?: string }) {

  const address = getContractAddress(uuid)
  const contractName = getContractName(uuid)
  const network = getNetworkFromAddress(address)

  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Link href={`/${uuid}`}>
          <Badge variant="secondary" className={cn("font-mono rounded-sm", className)}>{ellipsify(contractName, 30)}</Badge>
        </Link>
      </TooltipTrigger>
      <TooltipContent className={ network === 'mainnet' ? '' : 'bg-orange-600' }>
        <p>{uuid} is deployed on {network}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}