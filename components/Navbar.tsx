"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ui/ModeToggle"
import { CBLogo } from "./CBLogo"

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {


  return (
    <nav
      className={cn("flex space-x-2 items-center md:space-x-4", className)}
      {...props}
    >
      <Link href="/" className="flex items-center text-sm space-x-2 font-medium transition-colors hover:text-primary">
        <CBLogo /> 
        <span className="text-lg inline-block font-semibold tracking-tight whitespace-nowrap">Contract Browser</span>
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
