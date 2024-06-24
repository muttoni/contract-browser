"use client"

import { ColumnDef } from "@tanstack/react-table"

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

export const columnsWithMigrationState: ColumnDef<string>[] = [
  {
    accessorKey: "name",
    accessorFn: (contract: string) => getContractName(contract),
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
      return <ContractBadge uuid={`${row.original}`} showMigrationState={true} />
    }
  },
  {
    accessorKey: "address",
    header: "Address",
    accessorFn: (contract: string) => getContractAddress(contract),
    cell: ({row}) => {
      const address: string = getContractAddress(row.original)
  
      return (
        <AddressBadge address={address} />
      )
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
              onClick={() => navigator.clipboard.writeText(contract)}
            >
              Copy contract ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`import ${getContractName(contract)} from ${getContractAddress(contract)}`)}
            >
              Copy import snippet
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/[uuid]" as={`/${contract}`}>
            <DropdownMenuItem>View contract</DropdownMenuItem>
            </Link>
            <Link href="/[uuid]/dependents" as={`/${contract}/dependents`}>
            <DropdownMenuItem>View dependants</DropdownMenuItem>
            </Link>
            <Link href="/account/[address]" as={`/account/${getContractAddress(contract)}/`}>
            <DropdownMenuItem>View account</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]