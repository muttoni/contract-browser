import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ui/ModeToggle"

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Contract Browser
      </Link>
      <Link
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
      </Link>
      <ModeToggle />
    </nav>
  )
}
