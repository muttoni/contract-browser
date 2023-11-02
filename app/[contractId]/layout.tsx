"use client"
import { SidebarNav } from "@/components/AccountSideBar"
import { useParams } from "next/navigation"
import { useNetworkForAddress } from "@/hooks/useNetwork"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { getContractAddress, getContractName, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function ContractLayout({ children }) {
  
  const { contractId } = useParams()
  const user = useCurrentUser()
  const network = useNetworkForAddress(getContractAddress(contractId))

  const sidebarNavItems = [
    {
      title: "Overview",
      type: "parent",
      href: "/" + contractId,
    },
    {
      title: "Code",
      type: "parent",
      href: "/" + contractId + "/#code",
    },
    {
      title: "Used by",
      type: "parent",
      href: "/" + contractId + "/dependants",
    },
    {
      title: "History",
      type: "parent",
      href:"/" + contractId + "/events",
    }
  ]

  return (
    <div className="space-y-6 pt-4 pb-16 flex flex-col flex-1">
      <div className="space-y-0.5">
        <h2 className="text-3xl items-center flex gap-2 font-bold tracking-tight">
          <span className="">{getContractName(contractId)}</span>
          <Badge className={cn("capitalize text-sm", network === 'testnet' ? "bg-orange-400 text-orange-800" : "bg-green-400 text-green-800")}>{network}</Badge>
        </h2>
        <p className="text-muted-foreground">
          <Link href={`/account/${getContractAddress(contractId)}`}><span className="text-2xl tracking-tight font-bold text-muted-foreground">by {getContractAddress(contractId)}</span></Link>
          <br/>
          <span className="text-xs">
          {
            getContractAddress(contractId) === user?.addr ? 
            "You own this contract, so you can update it." : 
            `Login with the deploying account to modify this contract.`
          }
          </span>
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col flex-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 space-y-4 lg:ps-4">
        {children}
        </div>
      </div>
    </div>
  )
}