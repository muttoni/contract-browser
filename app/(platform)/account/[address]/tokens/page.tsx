"use client"
import { Separator } from "@/components/ui/separator"

import { useAccount } from "hooks/useAccount"
import { useParams } from "next/navigation"
import { getNetwork } from "hooks/useNetwork" 

import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Coins, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TokensPage() {

  const address = useParams().address
  const network = getNetwork().network
  const accountStorage = useAccount(address).storage

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tokens</h3>
        <p className="text-sm text-muted-foreground">
          Tokens in this account.
        </p>
      </div>

      <div className="flex">
        <Link href={`https://${network === 'testnet' ? 'testnet' : ''}flowview.app/account/${address}`}>
        <Button size="sm" variant="outline" className="flex me-2">
          <Eye className="h-4 w-4 me-2" /> FlowView 
        </Button>
        </Link>

        <Link href={`https://f.dnz.dev/${address}`}>
        <Button size="sm" variant="outline" className="flex">
          <Eye className="h-4 w-4 me-2" /> f.dnz.dev 
        </Button>
        </Link>
      </div>

      {accountStorage && accountStorage?.ft.sort(function compareFn(a, b) { return a.balance - b.balance}).map(vault => (

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