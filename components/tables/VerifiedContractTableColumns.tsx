"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye } from "lucide-react"
import AddressBadge from "@/components/ui/AddressBadge"
import { cn, ellipsify } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { VerifiedBadge } from "../ui/VerifiedBadge"
import Link from "next/link"

type VerifiedContract = {
  address: {
    testnet: string;
    mainnet: string;
  };
  uuid: {
    testnet: string;
    mainnet: string;
  };
  name: string;
  metadata: {
    name: string;
    authors: string[];
    description: string;
  };
};

export const columns: ColumnDef<VerifiedContract>[] = [
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
      return (
      <Badge variant="secondary" className="hover:bg-transparent font-mono rounded-sm text-sm bg-transparent px-1">
        <span className="me-1">{ellipsify(row.original.name, 80)}</span>
        <VerifiedBadge/>
      </Badge>
      )
    }
  },
  {
    accessorKey: "actions",
    header: "Quick links",
    cell: ({row}) => {
  
      return (
        <div className="flex items-center gap-2">
        <Link href={"/"+row.original.uuid.mainnet}>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 me-2" />
            Mainnet
          </Button>
        </Link>
        <Link href={"/"+row.original.uuid.testnet}>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 me-2" />
            Testnet
          </Button>
        </Link>
        </div>
      )
    }
  },
  {
    accessorKey: "addresses",
    header: "Addresses",
    cell: ({row}) => {
  
      return (
        <div className="flex items-center gap-2">
        <AddressBadge colorBasedOnNetwork={true} address={row.original.address.mainnet} copyBadge={true} />
        <AddressBadge colorBasedOnNetwork={true}  address={row.original.address.testnet} copyBadge={true} />
        </div>
      )
    }
  },
]