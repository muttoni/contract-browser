"use client"

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, getContractAddress, getContractName, getNetworkFromAddress, ellipsify } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { isVerified } from "@/lib/verified-contracts";
import { VerifiedBadge } from "./VerifiedBadge";
import { Check, FileWarningIcon } from "lucide-react";
import { useMigration } from '@/contexts/MigrationContext';
import { useEffect, useState } from "react";


export default function ContractBadge({ uuid, className, showMigrationState }: { uuid: string, className?: string, showMigrationState?: boolean }) {

  const address = getContractAddress(uuid)
  const contractName = getContractName(uuid)
  const network = getNetworkFromAddress(address)

  const { data, error } = useMigration();

  const [staged, setStaged] = useState(false);

  useEffect(() => {
    if (error || !data.contracts || !showMigrationState) {
      return;
    }
    
    if(data.contracts.includes(uuid)) {
      setStaged(true);
    }
  }, [data])

  return (
    <div className="flex align-center">
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href={`/${uuid}`}>
            <Badge variant="secondary" className={cn("font-mono rounded-sm text-sm bg-transparent px-1", className)}>
              <span className="me-1">{ellipsify(contractName, 30)}</span>
              {isVerified(uuid) && <VerifiedBadge/>}
            </Badge>
          </Link>
        </TooltipTrigger>
        <TooltipContent className={ network === 'mainnet' ? 'bg-green-400 border-green-500 text-green-800' : 'bg-orange-400 border-orange-500' }>
          <p>{uuid} is deployed on {network}</p>
        </TooltipContent>
      </Tooltip>
      {showMigrationState && <Tooltip>
        <TooltipTrigger>
          {staged 
          ? <Check className="h-4 w-4 text-green-400"/>
          : <FileWarningIcon className="h-4 w-4 text-orange-400"/>
          }
        </TooltipTrigger>
        <TooltipContent className={ staged ? 'bg-green-400 border-green-500 text-green-800' : 'bg-orange-400 border-orange-500' }>
          <p><strong>{contractName}</strong> has {!staged && " NOT "} been staged for Crescendo. <br/>Please click on the contract to learn more.</p>
        </TooltipContent>
      </Tooltip>}
    </TooltipProvider>
    </div>
  )
}