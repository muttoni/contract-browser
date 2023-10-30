"use client"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ui/ModeToggle"
import { Badge } from "./ui/badge"
import { NetworkSelect } from "./NetworkSelect"
import { getNetwork } from '../hooks/useNetwork'

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  var network = getNetwork().network

  return (
    <nav
      className={cn("flex space-x-2 items-center md:space-x-4", className)}
      {...props}
    >
      <Link href="/" className="flex items-center text-sm space-x-3 font-medium transition-colors hover:text-primary">
        <Image src="/icon.png" alt="logo" className="object-contain max-w-[32px] min-w-[32px] h-[32px] md:h-[42px] md:w-auto" width="256" height="256" /> 
        <span className="text-lg hidden sm:inline-block leading-tight">Contract Browser</span>
      </Link>
          {/* <Badge className="ml-2">{network}</Badge> */}

      {/* <NetworkSelect /> */}
      <ModeToggle />

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
    </nav>
  )
}
