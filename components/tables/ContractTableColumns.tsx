"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Contract } from "@/lib/types"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { getContractAddress, getContractName } from "@/lib/utils"
import AddressBadge from "@/components/ui/AddressBadge"
import ContractBadge from "@/components/ui/ContractBadge"

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="ps-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name")
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pe-0 flex ms-auto"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Used by
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      const dependants_count: number = row.getValue("dependants_count")
      return <div className="text-right">{dependants_count}</div>
    }
  },
  {
    id: "actions",
    header: () => {
      return <div className="sr-only w-4">Actions</div>
    },
    cell: ({ row }) => {
      const contract = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-auto flex h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(contract.uuid)}
            >
              Copy contract ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`import ${getContractName(contract.uuid)} from ${getContractAddress(contract.uuid)}`)}
            >
              Copy import snippet
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/[uuid]" as={`/${contract.uuid}`}>
            <DropdownMenuItem>View contract</DropdownMenuItem>
            </Link>
            <Link href="/[uuid]/dependants" as={`/${contract.uuid}/dependants`}>
            <DropdownMenuItem>View dependants</DropdownMenuItem>
            </Link>
            <Link href="/account/[address]" as={`/account/${getContractAddress(contract.uuid)}/`}>
            <DropdownMenuItem>View account</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]