"use client"

import { NETWORKS } from "@/constants/index"
import { useNetwork } from "@/hooks/useNetwork"
import { useSearchParams } from 'next/navigation'

import { cn, getCleanLocation, getNetworkFromAddress } from "@/lib/utils"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

export function NetworkSelect({ className }) {

  // NEEDS REFACTORING
  const [ network, setNetwork ] = useState(null)
  const searchParams = useSearchParams()
  const user = useCurrentUser()
  let userNetwork;

  if(user?.addr) {
    userNetwork = getNetworkFromAddress(user?.addr)
  }
  useNetwork(userNetwork || searchParams.get("network") || "mainnet").then((r) => setNetwork(r.network))

  const handleValueChange = (value) => {
    window.location.href = `${getCleanLocation(window)}?network=${value}`
  }

  return (
    <Select
      value={network}
      onValueChange={handleValueChange}
    >
      <SelectTrigger
        className={cn(
          "h-7 w-[90px] md:w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4 capitalize",
          className
        )}
      >
        <span className="text-muted-foreground hidden md:inline-block">Network: </span>
        <SelectValue placeholder={network} />
      </SelectTrigger>
      <SelectContent>
        {NETWORKS.map((_network) => (
          <SelectItem key={_network} value={_network} className="text-xs capitalize">
            {_network}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}