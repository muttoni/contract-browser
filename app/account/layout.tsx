"use client"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/AccountSideBar"
import { useParams } from "next/navigation"
import { useNetworkForAddress } from "@/hooks/useNetwork"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function AccountLayout({ children }) {

  const user = useCurrentUser()
  const params = useParams()
  const network = useNetworkForAddress(params.address)

  const sidebarNavItems = [
    {
      title: "Overview",
      type: "parent",
      href: "/account/" + params.address,
    },
    {
      title: "Contracts",
      type: "parent",
      href: "/account/" + params.address + "/contracts",
    },

    {
      title: "Deploy",
      type: "sub",
      href: "/account/" + params.address + "/contracts/deploy",
    },
    {
      title: "Tokens",
      type: "parent",
      href: "/account/" + params.address + "/tokens",
    },
    {
      title: "Storage",
      type: "parent",
      href: "/account/" + params.address + "/storage",
    },
    {
      title: "Keys",
      type: "parent",
      href: "/account/" + params.address + "/keys",
    },
    {
      title: "Settings",
      type: "parent",
      href: "/account/" + params.address + "/settings",
    },
  ]

  return (

    <div className="space-y-6 p-10 pb-16 h-full flex-1">
      <div className="space-y-0.5">
        <h2 className="text-2xl items-center flex gap-2 font-bold tracking-tight">
          Account <span className="text-muted-foreground">{params.address}</span>
          <Badge variant="secondary" className={cn("capitalize", network === 'testnet' ? "bg-orange-400" : "bg-green-400")}>{network}</Badge>
        </h2>
        <p className="text-muted-foreground">
          {
            params.address === user?.addr ? 
            "Inspect and manage your account, contracts and keys." : 
            `Viewing the account of ${params.address}. Login with this account to access all features.`
          }
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>

  )
}