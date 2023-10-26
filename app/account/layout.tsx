"use client"
import useCurrentUser from "hooks/useCurrentUser"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/AccountSideBar"
import { useParams } from "next/navigation"

interface AccountLayoutProps {
  children: React.ReactNode
}

export default function AccountLayout({ children }: AccountLayoutProps) {

  const user = useCurrentUser()
  const params = useParams()

  const sidebarNavItems = [
    {
      title: "Overview",
      href: "/account/" + params.account,
    },
    {
      title: "Contracts",
      href: "/account/" + params.account + "/contracts",
    },
    {
      title: "Tokens",
      href: "/account/" + params.account + "/tokens",
    },
    {
      title: "Storage",
      href: "/account/" + params.account + "/storage",
    },
    {
      title: "Keys",
      href: "/account/" + params.account + "/keys",
    },
    {
      title: "Settings",
      href: "/account/" + params.account + "/settings",
    },
  ]

  return (

    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Account</h2>
        <p className="text-muted-foreground">
          {
            params.account === user?.addr ? 
            "Inspect and manage your account, contracts and keys." : 
            `Viewing the account of ${params.account}. Login with this account to access all features.`
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