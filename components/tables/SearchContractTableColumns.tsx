"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Contract } from "@/lib/types"
import { getContractAddress } from "@/lib/utils"
import AddressBadge from "@/components/ui/AddressBadge"
import ContractBadge from "../ui/ContractBadge"

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <ContractBadge uuid={`${row.original.uuid}`} className="" />
    }
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({row}) => {
      const address: string = getContractAddress(row.original.uuid)
  
      return (
        <AddressBadge address={address} />
      )
    }
  },
  {
    accessorKey: "dependants_count",
    header: () => <div className="text-right">Used by</div>,
    cell: ({row}) => {
      const dependants_count: number = row.getValue("dependants_count")
      return <div className="text-right">{dependants_count}</div>
    }
  },
]