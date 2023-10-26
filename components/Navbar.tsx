"use client"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ui/ModeToggle"
import { Badge } from "./ui/badge"
import { NetworkSelect } from "./NetworkSelect"
import useConfig from '../hooks/useConfig'

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  var network = useConfig().network

  return (
    <nav
      className={cn("flex items-center space-x-2 lg:space-x-4", className)}
      {...props}
    >
      <Link href="/" className="text-sm space-x-3 flex font-medium transition-colors hover:text-primary">
        <Image src="/icon.png" alt="logo" className="h-7 w-7" width="256" height="256" /> 
        <span className="text-lg">Contract Browser</span>
      </Link>
          {/* <Badge className="ml-2">{network}</Badge> */}
          <NetworkSelect />


      {/* <Link
        href="/"
        className="text-sm font-medium underline transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/contracts"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Contracts
      </Link>
      <Link
        href="/snippets"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Code Snippets
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link> */}
      <ModeToggle />
    </nav>
  )
}
