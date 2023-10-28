"use client"
import { SidebarNav } from "@/components/AccountSideBar"
import { useParams } from "next/navigation"
import { useNetworkForAddress } from "@/hooks/useNetwork"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { getContractAddress, getContractName, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
      href: "/" + contractId + "/code",
    },
    {
      title: "Used by",
      type: "parent",
      href: "/" + contractId + "/dependants",
    },
    {
      title: "Events",
      type: "parent",
      href:"/" + contractId + "/events",
    }
  ]

  return (
    <div className="space-y-6 p-10 pb-16 flex flex-col flex-1">
      <div className="space-y-0.5">
        <h2 className="text-3xl items-center flex gap-2 font-bold tracking-tight">
          <span className="">{getContractName(contractId)}</span>
          <Badge variant="secondary" className={cn("capitalize", network === 'testnet' ? "bg-orange-400" : "bg-green-400")}>{network}</Badge>
          <span className="text-muted-foreground ms-2">by {getContractAddress(contractId)}</span>
        </h2>
        <p className="text-muted-foreground">
          {
            getContractAddress(contractId) === user?.addr ? 
            "You own this contract, so you can update it." : 
            `Login with your account to access all features.`
          }
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col flex-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        {children}
      </div>
    </div>
  )
}