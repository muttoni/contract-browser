"use client"
import { SidebarNav } from "@/components/AccountSideBar"
import { useParams } from "next/navigation"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { getContractAddress, getContractName, cn, getNetworkFromAddress } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import AddressBadge from "@/components/ui/AddressBadge"
import { CaretRightIcon } from "@radix-ui/react-icons"
import { BadgeHelp } from "lucide-react"
import { isVerified } from "@/lib/verified-contracts"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { VerifiedBadge } from "@/components/ui/VerifiedBadge"

export default function ContractPageLayout({ children }) {
  
  const { contractId } = useParams()
  const user = useCurrentUser()
  const network = getNetworkFromAddress(getContractAddress(contractId))

  const sidebarNavItems = [
    {
      title: "Overview",
      type: "parent",
      href: "/" + contractId,
    },
    {
      title: "Snippets",
      type: "parent",
      href: "/" + contractId + "/snippets",
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
      <div className="space-y-2">
        <h2 className="text-3xl items-center flex gap-2 font-bold tracking-tight">
          <span className="">{getContractName(contractId)}</span>
          {isVerified(contractId as string) ? <VerifiedBadge size={6}/> : <NotVerifiedBadge />}
        </h2>
        <div className="flex items-center">
          <Badge className={cn("rounded-sm h-6 text-xs font-mono font-light uppercase", `${network === 'testnet' ? "border-orange-600 bg-orange-400 hover:bg-orange-400 text-orange-800" : "border-green-600 bg-green-400 hover:bg-green-400 text-green-800"}`)}>{network}</Badge>
          <CaretRightIcon className="h-6 w-6 mx-0 text-muted-foreground" />
          <AddressBadge className="text-sm h-6" address={getContractAddress(contractId)} copyBadge={true}/>

          {/* <p className="text-xs">
            getContractAddress(contractId) === user?.addr ? 
            "You own this contract, so you can update it." : 
            `Login with the deploying account to modify this contract.`
          </p> */ }

        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col flex-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 space-y-4 lg:ps-4">
        {children}
        </div>
      </div>
    </div>
  )
}

const NotVerifiedBadge = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <BadgeHelp className="h-6 w-6 text-muted" />
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col space-y-2 font-sans text-sm text-start tracking-normal">
        <div className="text-sm font-bold">This contract is not verified.</div>
        <div className="text-sm text-muted-foreground font-normal">Be mindful you are sourcing from the correct account.</div>
        <Link target="_blank" href="https://github.com/muttoni/contract-browser/blob/main/lib/verified-contracts.ts" className="text-sm text-blue-600 hover:underline">
          Verify your contract
        </Link>
      </HoverCardContent>
    </HoverCard>
  )
}