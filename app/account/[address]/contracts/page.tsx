"use client"
import { useParams } from "next/navigation"
import { useAccount } from "@/hooks/useAccount"
import APIContractsTable from "@/components/tables/APIContractsTable"

export default function ContractsPage({  }) {

  const address = useParams().address as string
  const account = useAccount(address)
  const contracts = account?.contractNames
  //console.log("contracts page", contracts)

  return (
    <>
      <APIContractsTable action="ownedBy" address={address} limit={200} />
      {contracts && contracts.length > 0 &&
        <p className="text-sm text-muted-foreground">There are {contracts.length} contracts deployed to this account. <br/><span className="text-xs">Note: If the number doesn't match with the items in the table, please contact us.</span></p>
      }
    </>
  )
}