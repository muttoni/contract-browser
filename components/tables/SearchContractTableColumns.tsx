"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Contract } from "@/lib/types"
import Link from "next/link"
import { getContractAddress, getContractName } from "@/lib/utils"

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name: string = getContractName(row.original.uuid)
      return <Link href={`/${row.original.uuid}`} className="">{name}</Link>
    }
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({row}) => {
      const address: string = getContractAddress(row.original.uuid)
  
      return (
        <Link href={`/account/${getContractAddress(row.original.uuid)}`}>
          <div className="font-mono">{address}</div>
        </Link>
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