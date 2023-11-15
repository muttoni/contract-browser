"use client"

import { useAccount } from "hooks/useAccount"
import { useParams } from "next/navigation"

import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { ArrowUpRight, Coins, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getNetworkFromAddress } from "@/lib/utils"

export default function TokensPage() {

  const address = useParams().address
  const network = getNetworkFromAddress(address)
  const account = useAccount(address)

  console.log(account)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tokens</h3>
        <p className="text-sm text-muted-foreground">
          Fungible Tokens in this account. For a more detailed overview, check out the links below.
        </p>
      </div>

      <div className="flex">
        <Link target="_blank" href={`https://${network === 'testnet' ? 'testnet.' : ''}flowview.app/account/${address}`}>
        <Button size="sm" variant="outline" className="flex me-2">
          <Eye className="h-4 w-4 me-2" /> FlowView 
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Button>
        </Link>

        <Link target="_blank" href={`https://${network === 'testnet' ? 'testnet.' : ''}flowdiver.io/account/${address}`}>
        <Button size="sm" variant="outline" className="flex me-2">
          <Eye className="h-4 w-4 me-2" /> Flowdiver 
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Button>
        </Link>

        <Link target="_blank" href={`https://f.dnz.dev/${address}`}>
        <Button size="sm" variant="outline" className="flex">
          <Eye className="h-4 w-4 me-2" /> f.dnz.dev 
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Button>
        </Link>
      </div>

      {account && account.storage && account.storage.ft && account.storage.ft.sort(function compareFn(a, b) { return a.balance - b.balance}).map(vault => (

            <Card key={vault.path.domain+"/"+vault.path.identifier}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                {vault.path.identifier} Balance
                </CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-2 font-bold flex items-center space-x-2">
                  <span>{vault.balance}</span>
                </div>
              </CardContent>
            </Card>        
        ))}
    </div>
  )
}