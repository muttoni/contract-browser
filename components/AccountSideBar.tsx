"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CornerDownRight, Plus } from "lucide-react"

import { useParams } from "next/navigation"
import {useCurrentUser} from "@/hooks/useCurrentUser"


interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    type: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const address = useParams().address
  const userAddress =  useCurrentUser()?.addr

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            item.type === 'sub' && address !== userAddress
              ? "hidden" : "",
            "justify-start"
          )}
        >
          {item.type === 'sub' ? (<><span className="w-2"></span> <Plus className="h-4 w-4 muted me-2" /></>) : ''}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}