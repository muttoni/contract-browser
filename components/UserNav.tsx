
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
import { formatNumber } from "@/lib/utils"
import useCurrentUser from '../hooks/useCurrentUser'
import useConfig from '../hooks/useConfig'
import useCurrentAccount from '../hooks/useCurrentAccount'
import ConnectionLight from "./ui/ConnectionLight"

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
              <svg width="16" height="16" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2_3)">
              <path d="M128 256C198.692 256 256 198.692 256 128C256 57.3076 198.692 0 128 0C57.3076 0 0 57.3076 0 128C0 198.692 57.3076 256 128 256Z" fill="#00EF8B"/>
              <path d="M184.064 108.032H147.968V144.128H184.064V108.032Z" fill="white"/>
              <path d="M111.872 157.696C111.872 165.12 105.728 171.264 98.304 171.264C90.88 171.264 84.736 165.12 84.736 157.696C84.736 150.272 90.88 144.128 98.304 144.128H111.872V108.032H98.304C70.912 108.032 48.64 130.304 48.64 157.696C48.64 185.088 70.912 207.36 98.304 207.36C125.696 207.36 147.968 185.088 147.968 157.696V144.128H111.872V157.696Z" fill="white"/>
              <path d="M161.536 89.856H202.24V53.76H161.536C134.144 53.76 111.872 76.032 111.872 103.424V108.032H147.968V103.424C147.968 96 154.112 89.856 161.536 89.856Z" fill="white"/>
              <path d="M147.968 108.032H111.872V144.128H147.968V108.032Z" fill="#16FF99"/>
              </g>
              <defs>
              <clipPath id="clip0_2_3">
              <rect width="256" height="256" fill="white"/>
              </clipPath>
              </defs>
              </svg>
              <span>{ formatNumber((account?.balance || 0) / 10e7) }</span></div>
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
