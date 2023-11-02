"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Contract } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export const dependencyColumn: ColumnDef<Contract>[] = [
  {
    accessorKey: "dependencies_count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pe-0 flex ms-auto"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Imports
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      const dependencies_count: number = row.getValue("dependencies_count")
      return <div className="text-right">{dependencies_count}</div>
    }
  },
]