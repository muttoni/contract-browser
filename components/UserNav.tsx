
import { Button } from "@/components/ui/button"
import { MoveUpRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import * as fcl from '@onflow/fcl'
import useCurrentUser from '../hooks/useCurrentUser'
import ConnectionLight from "./ui/ConnectionLight"

export function UserNav() {

  const user = useCurrentUser()

  return (
    <DropdownMenu>

{!user.loggedIn && 
  <Button onClick={fcl.authenticate}>Connect Wallet</Button>
}
{user.loggedIn && (
    <>
    <DropdownMenuTrigger asChild>
      <Button>
        <ConnectionLight status="online"/><span className="w-2"></span> { user?.addr } <ChevronDown className="h-4 w-4 ml-1" />
      </Button>
    </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">You are logged in as</p>
            <p className="text-xs leading-none text-muted-foreground">
            { user?.addr }
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link target="_blank" href={"https://flowview.app/account/" + user?.addr}>
          <DropdownMenuItem>
            Your account
            <DropdownMenuShortcut>
              <MoveUpRight className="h-4 w-4 mr-1" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            Manage your contracts
            <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={fcl.unauthenticate}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </>
)}
    </DropdownMenu>
  
  )
}
