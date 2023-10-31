"use client"
import ContractHistory from "@/components/ContractHistory";
import { getContractName } from "@/lib/utils";
import { useParams } from "next/navigation"

export default function DeploymentPage() {
  const contractId = useParams().contractId as string
  return (
    <>
      <div className="block mb-2">
        <h3 className="text-lg font-medium">Timeline</h3>
        <p className="text-sm text-muted-foreground">
        Timeline of events for {getContractName(contractId)}.
        </p>
      </div>
      <ContractHistory uuid={contractId}  />
    </>
  )
}