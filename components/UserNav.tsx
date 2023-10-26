
import { Button } from "@/components/ui/button"
import { MoveUpRight, ChevronDown, Cog, Plus, Eye } from "lucide-react"
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
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

import * as fcl from '@onflow/fcl'
import { formatFlowBalance } from "@/lib/utils"
import useCurrentUser from '../hooks/useCurrentUser'
import useConfig from '../hooks/useConfig'
import useCurrentAccount from '../hooks/useCurrentAccount'
import ConnectionLight from "./ui/ConnectionLight"
import FlowLogo from "./ui/FlowLogo"

export function UserNav() {

  const user = useCurrentUser()
  const network = useConfig().network
  const account = useCurrentAccount()

  return (
    <DropdownMenu>

{!user.loggedIn && 
  <Button onClick={fcl.authenticate}>Connect Wallet</Button>
}
{user.loggedIn && (
    <>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
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
          <Link href={"/account/" + user?.addr + "/"}>
          <DropdownMenuItem>
          <div className="flex-row">
            <div>Your account</div>
            <div className="text-xs flex space-x-1 align-middleleading-none text-muted-foreground">
             <FlowLogo size={16} />
              <span>{ formatFlowBalance(account?.balance) }</span></div>
            </div>
            <DropdownMenuShortcut>
              <Eye className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          </Link>
        <Link href={"/account/" + user?.addr + "/contracts"}>
        <DropdownMenuItem>
          Manage contracts
          <DropdownMenuShortcut>
          { Object.keys(account.contracts || {})?.length ?? 0 }
            </DropdownMenuShortcut>
        </DropdownMenuItem>
        </Link>
        <Link href={"/account/" + user?.addr + "/contracts"}>
        <DropdownMenuItem>
          Deploy a new contract
          <DropdownMenuShortcut>
            <Plus className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger><span className="text-muted-foreground me-2">Network:</span><span className="capitalize">{network}</span></DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Mainnet</DropdownMenuItem>
                <DropdownMenuItem>Testnet</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

        <DropdownMenuSeparator />
      
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Settings    
            <DropdownMenuShortcut>
            <Cog className="h-4 w-4" />
            </DropdownMenuShortcut>
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
