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
      className={cn("flex items-center md:space-x-4", className)}
      {...props}
    >
      <Link href="/" className="flex items-center text-sm space-x-2 font-medium transition-colors hover:text-primary">
        <CBLogo /> 
        <span className="text-base md:text-lg w-[100px] md:w-auto font-semibold tracking-tighter leading-none">Contract Browser</span>
      </Link>
      <ModeToggle />
    </nav>
  )
}
