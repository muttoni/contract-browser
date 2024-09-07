"use client"
import { useParams } from "next/navigation"
import { useAccount } from "@/hooks/useAccount"
import { UUIDContractTable } from "@/components/tables/UUIDContractTable"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getNetworkFromAddress, sansPrefix } from "@/lib/utils"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export default function ContractsPage({  }) {

  const user = useCurrentUser()
  const address = useParams().address as string
  const account = useAccount(address)
  const contracts = account?.contractNames

  function convertToUUIDs(contracts: string[]) : string[] {
    if(!contracts) return []
    const uuids = []
    contracts.map((contractName) => {
      uuids.push(`A.${sansPrefix(address)}.${contractName}`)
    })

    return uuids
  }

  return (
    <>
      <UUIDContractTable contracts={convertToUUIDs(contracts)} loading={!account.contracts} />
      {contracts && contracts.length > 0 &&
        <p className="text-sm text-muted-foreground mt-4">There are {contracts.length} contracts deployed to this account. <br/><span className="text-xs">Note: If the number doesn&apos;t match with the items in the table, please contact us.</span></p>
      }
      <div className="block w-full text-center mx-auto mt-5">
        <Link href={`/account/${address}/contracts/deploy`}>
          <Button variant="outline">Deploy a new contract</Button>
        </Link>
      </div>
    </>
  )
}