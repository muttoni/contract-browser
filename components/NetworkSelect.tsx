"use client"

import { NETWORKS } from "@/constants/index"
import { useSearchParams } from 'next/navigation'

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function NetworkSelect({ className }) {
  const searchParams = useSearchParams()
  const network = searchParams.get("network") || "mainnet"

  const handleValueChange = (value) => {
    window.location.href = `${window.location}?network=${value}`
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