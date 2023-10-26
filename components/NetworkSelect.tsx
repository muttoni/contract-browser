"use client"

import * as React from "react"
import useConfig from "hooks/useConfig"
import { type SelectTriggerProps } from "@radix-ui/react-select"
import { NETWORKS } from "@/constants/index"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function NetworkSelect({ className }: SelectTriggerProps) {

  let network = useConfig().network; 
  return (
    <Select
      value={network}
      onValueChange={() =>{}}
    >
      <SelectTrigger
        className={cn(
          "h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4 capitalize",
          className
        )}
      >
        <span className="text-muted-foreground">Network: </span>
        <SelectValue placeholder={network} />
      </SelectTrigger>
      <SelectContent>
        {NETWORKS.map((network) => (
          <SelectItem key={network} value={network} className="text-xs capitalize">
            {network}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}