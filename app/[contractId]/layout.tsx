"use client"
import { SidebarNav } from "@/components/AccountSideBar"
import { useParams } from "next/navigation"
import { useNetworkForAddress } from "@/hooks/useNetwork"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { getContractAddress, getContractName, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import AddressBadge from "@/components/ui/AddressBadge"
import { CaretRightIcon } from "@radix-ui/react-icons"

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
      <div className="space-y-1">
        <h2 className="text-3xl items-center flex gap-2 font-bold tracking-tight">
          <span className="">{getContractName(contractId)}</span>
        </h2>
        <div className="flex items-center">
          <Badge className={cn("rounded-sm h-6 text-base me-2 font-normal uppercase", `${network === 'testnet' ? "border-orange-500 bg-orange-400 hover:bg-orange-400 text-orange-800" : "border-green-500 bg-green-400 hover:bg-green-400 text-green-800"}`)}>{network}</Badge>
          <CaretRightIcon className="h-6 w-6 mx-0 text-muted-foreground" />
          <AddressBadge className="h-6 text-base" address={getContractAddress(contractId)} />
          { false &&
          <p className="text-xs">
            getContractAddress(contractId) === user?.addr ? 
            "You own this contract, so you can update it." : 
            `Login with the deploying account to modify this contract.`
          </p>
          }
        </div>
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