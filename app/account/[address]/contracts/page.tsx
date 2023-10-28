"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { cleanAddress } from "@/lib/utils"
import { useAccount } from "hooks/useAccount"
import { useParams } from "next/navigation"
import {useCurrentUser} from "@/hooks/useCurrentUser"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export default function ContractsPage({  }) {

  const address = useParams().address
  const account = useAccount(address)
  const user = useCurrentUser()


  return (
    <>
    {Object.keys(account?.contractNames || {}).length > 0 ? (
      <div className="space-y-6">
      <div className="flex align-middle items-center justify-between">
      <div>
        <h3 className="text-lg font-medium">Contracts</h3>
        <p className="text-sm text-muted-foreground">
          {account?.contractNames?.length} contracts deployed to this account. Click on a contract to inspect.
        </p>
      </div>
      {user?.addr === account?.address &&  <Link href={"/account/" + address + "/contracts/deploy"}><Button size="sm"><Plus className="h-4 w-4 me-2" /> Deploy a new contract</Button></Link> }
      </div>
      <Separator />
      <Table>
        <TableCaption>{`${account?.contractNames?.length} contracts deployed on this account.`}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Contract name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {account?.contractNames.map((contract : string) => (
            <TableRow key={contract}>
              <Link href={`/A.${cleanAddress(address, false)}.${contract}`}>
              <TableCell className="font-medium w-full">
                {contract}
              </TableCell>
            </Link>
            </TableRow>
          ))}
          </TableBody>
        </Table>
    </div>
    ) : (
    <div className="w-full h-full flex-col items-center">
      <p className="text-center w-full py-8">This account has no contracts yet.</p>
      {user?.addr === account?.address && <Link href={"/account/" + address + "/contracts/deploy"}><Button size="sm" variant="outline" className="flex mx-auto"><Plus className="h-4 w-4 me-2" /> Deploy a new contract</Button></Link>}
    </div>
    )}

    </>
  )
}