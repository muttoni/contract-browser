"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Contract } from "@/lib/types"
import { getContractAddress } from "@/lib/utils"
import AddressBadge from "@/components/ui/AddressBadge"
import ContractBadge from "../ui/ContractBadge"
import { Search } from "lucide-react"

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "address",
    header: "Address",
    cell: ({row}) => {
      const address: string = getContractAddress(row.original.uuid)
      const dependants_count: number = row.getValue("dependants_count")
  
      return (
        <div className="flex items-center gap-2">
        <Search className="h-4 w-4 ms-1 me-2 text-muted-foreground"></Search>
        <AddressBadge address={address} colorBasedOnNetwork={true} />
        <ContractBadge uuid={`${row.original.uuid}`} className="" />
        </div>
      )
    }
  },
  {
    accessorKey: "dependants_count",
    header: () => <div className="text-right">Used by</div>,
    cell: ({row}) => {
      const dependants_count: number = row.getValue("dependants_count")
      return <div className="text-right text-muted-foreground"><span className="font-bold" title={dependants_count + " contracts use this"}>{dependants_count} </span><span className="text-xs hidden md:inline-block">compose on this</span></div>
    }
  },
]