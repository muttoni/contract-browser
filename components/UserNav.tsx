
import { Button } from "@/components/ui/button"
import { ChevronDown, Cog, Plus, Eye, LogOut, ArrowLeftRight, LogIn } from "lucide-react"
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
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

import * as fcl from '@onflow/fcl'
import { formatFlowBalance } from "@/lib/utils"
import { useNetworkForAddress, useNetwork } from '@/hooks/useNetwork'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useAccount } from '@/hooks/useAccount'
import ConnectionLight from "./ui/ConnectionLight"
import FlowLogo from "./ui/FlowLogo"
import { 
  Avatar,
  AvatarImage,
  AvatarFallback
} from "./ui/avatar"

export function UserNav() {

  const user = useCurrentUser()
  const network = user?.addr ? useNetworkForAddress(user?.addr) : null
  const account = useAccount(user?.addr || null)
  const accountStorage = account?.storage

  function changeNetwork(network) {
    console.log(network)
    fcl.unauthenticate()
    useNetwork(network)
    fcl.authenticate()
  }

  return (
    <DropdownMenu>

{!user.loggedIn && 
  <Button onClick={fcl.authenticate}>
    <LogIn className="h-4 w-4 me-2" />
    Connect Wallet
  </Button>
}
{user.loggedIn && (
    <>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        <ConnectionLight status="online"/><span className="w-2"></span> 
        { accountStorage && accountStorage?.find ? accountStorage?.find.name : user?.addr }
        <ChevronDown className="h-4 w-4 ml-1" />
      </Button>
    </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">You are logged in as</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.addr}
            </p>

            {accountStorage && accountStorage?.find && 
            <>
              <div className="flex pt-2 pb-1 items-center">
              <Avatar className="h-6 w-6 me-2">
                <AvatarImage src={accountStorage?.find.avatar} alt={accountStorage?.find.name} />
                <AvatarFallback>{accountStorage?.find.name[0]}</AvatarFallback>
              </Avatar>
              <Link href={{pathname: `https://find.xyz/${accountStorage?.find.name}`}} target="_blank"> {accountStorage?.find.name}.find  </Link>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{accountStorage?.find.description}  </p>
              </div>
            </>
            }
          </div>
        </DropdownMenuLabel>
          <Link href={"/account/" + user?.addr + "/"}>
          <DropdownMenuItem>
          <div className="flex-row">
            <div>Your account</div>
            <div className="text-xs flex space-x-1 align-middleleading-none text-muted-foreground">
              <FlowLogo size={16} />
              <span>{ formatFlowBalance(account?.flowBalance) }</span></div>
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
          { Object.keys(account?.contractNames || {})?.length ?? 0 }
            </DropdownMenuShortcut>
        </DropdownMenuItem>
        </Link>
        <Link href={"/account/" + user?.addr + "/contracts/deploy"}>
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
            <DropdownMenuRadioGroup value={network} onValueChange={changeNetwork}>
              <DropdownMenuRadioItem value={"mainnet"} >Mainnet</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={"testnet"}>Testnet</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
      
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Settings    
            <DropdownMenuShortcut>
            <Cog className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={fcl.reauthenticate}>
          Switch Account
          <DropdownMenuShortcut>
          <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={fcl.unauthenticate}>
          Log out
          <DropdownMenuShortcut>
          <LogOut className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </>
)}
    </DropdownMenu>
  
  )
}
