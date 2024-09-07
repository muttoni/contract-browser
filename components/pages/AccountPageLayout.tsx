"use client"
import { currentUser, useCurrentUser } from "@/hooks/useCurrentUser"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/AccountSideBar"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cleanAddress, cn, getNetworkFromAddress } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { useMigration } from '@/contexts/MigrationContext';

import { AlertTriangle, Check } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAccount } from "@/hooks/useAccount"

export default function AccountPageLayout({ children }) {

  const user = useCurrentUser()
  const params = useParams()
  const address = cleanAddress(params.address as string)
  const network = getNetworkFromAddress(address)
  const account = useAccount(address)

  // const { data, error } = useMigration();

  //const [staged, setStaged] = useState(false);

  // useEffect(() => {
  //   if (error || !data.contracts) {
  //     return;
  //   }
    
  //   if(data.contractsByAddress[address]?.length > 0) {
  //     setStaged(true);
  //   }
  // }, [data])

  const sidebarNavItems = [
    {
      title: "Overview",
      type: "parent",
      href: "/account/" + address,
    },
    {
      title: `Contracts (${(Object.keys(account.contracts || {}).length) || 0})`,
      type: "parent",
      href: "/account/" + address + "/contracts",
    },

    {
      title: "Deploy",
      type: "sub",
      href: "/account/" + address + "/contracts/deploy",
    },
    {
      title: "Tokens",
      type: "parent",
      href: "/account/" + params.address + "/tokens",
    },
  ]

  return (

    <div className="space-y-6 pt-4 pb-16 h-full flex-1">
      <div className="space-y-0.5">
        <h2 className="text-xl md:text-2xl items-start md:items-center flex flex-col md:flex-row gap-2 font-bold tracking-tight">

          <span className="hidden md:inline-block text-muted-foreground">Account</span>{address}
          <div className="flex items-center gap-2">
          <Badge className={cn("rounded-sm h-6 font-mono font-light uppercase", `${network === 'testnet' ? "border-orange-600 bg-orange-400 hover:bg-orange-400 text-orange-800" : "border-green-600 bg-green-400 hover:bg-green-400 text-green-800"}`)}>{network}</Badge>
          {address === user?.addr && <Badge className={cn("rounded-sm h-6 font-mono font-light uppercase whitespace-nowrap","border-blue-600 bg-blue-400 hover:bg-blue-400 text-blue-800")}>Current User</Badge>}
          </div>
        </h2>
        <p className="text-muted-foreground hidden md:block">
          {
            address === user?.addr ? 
            "Inspect and manage your account, contracts and keys." : 
            `Viewing the account of ${address}. Login with this account to access all features.`
          }
        </p>
      </div>
      {/* {user?.addr === address && <div>
        {staged && Object.keys(account.contracts || {}).length > 0 &&
        <Alert className="text-green-500 bg-green-50">
          <Check className="h-4 w-4 !text-green-500 me-5"></Check>
          <AlertTitle className="font-bold">You have staged contracts on this account!</AlertTitle>
          <AlertDescription>Please ensure all your contracts are upgraded for Crescendo. <Link className="font-bold text-green-600" href="https://flow.com/upgrade/crescendo/migration" target="_blank">Learn more &rarr;</Link>
          </AlertDescription>
        </Alert>
        }
        {!staged && Object.keys(account.contracts || {}).length > 0 &&
        <Alert className="text-orange-500 bg-orange-50">
          <AlertTriangle className="h-4 w-4 !text-orange-500 me-5"></AlertTriangle>
          <AlertTitle className="font-bold">You have un-staged contracts on this account!</AlertTitle>
          <AlertDescription>Get your contracts ready for Crescendo: stage your contracts as soon as possible. <Link className="font-bold text-orange-600" href="https://flow.com/upgrade/crescendo/migration" target="_blank">Learn more &rarr;</Link>
          </AlertDescription>
        </Alert>
        }
      </div>} */}
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:mx-0 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>

  )
}