"use client"
import DependantsTable from "@/components/tables/DependantsTable";
import { getContractName } from "@/lib/utils";
import { useParams } from "next/navigation"

export default function DependantsPage() {
  const contractId = useParams().contractId as string
  return (
    <>
    <div>
      <h3 className="text-lg font-medium">Used by</h3>
      <p className="text-sm text-muted-foreground">
      Contracts that use {getContractName(contractId)}.
      </p>
    </div>
    <DependantsTable uuid={contractId}  />
    </>
    )
  }