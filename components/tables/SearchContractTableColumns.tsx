"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Contract } from "@/lib/types"
import { getContractAddress } from "@/lib/utils"
import AddressBadge from "@/components/ui/AddressBadge"
import ContractBadge from "../ui/ContractBadge"

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "address",
    header: "Address",
    cell: ({row}) => {
      const address: string = getContractAddress(row.original.uuid)
  
      return (
        <div className="flex items-center gap-2">
        <AddressBadge address={address} colorBasedOnNetwork={true} />
        <ContractBadge uuid={`${row.original.uuid}`} className="" />
        </div>
      )
    }
  },
  // {
  //   accessorKey: "name",
  //   header: "Name",
  //   cell: ({ row }) => {
  //     return <ContractBadge uuid={`${row.original.uuid}`} className="" />
  //   }
  // },
  {
    accessorKey: "dependants_count",
    header: () => <div className="text-right">Used by</div>,
    cell: ({row}) => {
      const dependants_count: number = row.getValue("dependants_count")
      return <div className="text-right text-muted-foreground"><span className="font-bold">{dependants_count} </span><span className="text-xs hidden md:inline-block">compose on this</span><span className="text-xs md:hidden">use this</span></div>
    }
  },
]