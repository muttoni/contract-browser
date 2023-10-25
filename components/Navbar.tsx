import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ui/ModeToggle"
import { Badge } from "./ui/badge"
import useConfig from '../hooks/useConfig'

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  var network = useConfig().network

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className="text-sm space-x-3 flex font-medium transition-colors hover:text-primary">
        <Image src="/icon.png" alt="logo" width="30" height="30" className="inline" /> 
        <div className="flex-row">
          <span className="text-lg">Contract Browser</span>
          <Badge className="ml-2">{network}</Badge>
        </div>
      </Link>

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
