
//import config from "@/config/fcl"
import * as fcl from "@onflow/fcl"
import { Button } from "@/components/ui/button"
import { ChevronDown, Cog, Plus, Eye, LogOut, ArrowLeftRight, LogIn, UserCircle } from "lucide-react"

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

import { formatFlowBalance, getNetworkFromAddress } from "@/lib/utils"
import { getNetworkConfig } from '@/hooks/useNetwork'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useAccount } from '@/hooks/useAccount'
import ConnectionLight from "./ui/ConnectionLight"
import FlowLogo from "./ui/FlowLogo"
import { 
  Avatar,
  AvatarImage,
  AvatarFallback
} from "./ui/avatar"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Loading from "./ui/Loading"


export function UserNav() {
  
  const user = useCurrentUser()
  const [network, setNetwork] = useState("mainnet")
  const searchParams = useSearchParams()
  const networkParam = searchParams.get("network")
  
  function changeNetwork(desiredNetwork: string) {
    //fcl.unauthenticate()
    fcl.config(getNetworkConfig(desiredNetwork))
    setNetwork(desiredNetwork)
    //fcl.authenticate()
  }

  useEffect(() => {
    //fcl.config.get('flow.network').then(setNetwork)

    if(networkParam && networkParam !== network){
      console.log("preferred network changing to", networkParam)
      changeNetwork(networkParam)
    } else {
      changeNetwork(network)
    }
  }, [])

  return (
    <DropdownMenu>
    {user && !user.loggedIn &&
      <Button onClick={user.logIn}>
        <LogIn className="h-4 w-4 me-2" />
        <span className="hidden md:inline-block">Connect Wallet</span>
      </Button>
    }

    {user.loggedIn && (
      <AccountNav {...user} />
    )}
    </DropdownMenu>
  )
}


export default function AccountNav(user) {
  const account = useAccount(user.addr)
  const network = getNetworkFromAddress(user.addr)

  return user && account ? (
    <>
    <DropdownMenuTrigger asChild>
    <Button variant="outline">
      <ConnectionLight status="online"/><span className="w-2"></span> 
      <span className="hidden md:inline-block">{ account.storage && account.storage?.find ? account.storage?.find.name : user?.addr }</span>
      {account.storage && account.storage?.find ? 
      <Avatar className="h-6 w-6 me-2 md:hidden">
        <AvatarImage src={account.storage?.find.avatar} alt={account.storage?.find.name} />
      </Avatar>
      : <UserCircle className="h-4 w-4 md:hidden" />
      }
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

          {account.storage && account.storage?.find && 
          <>
            <div className="flex pt-2 pb-1 items-center">
            <Avatar className="h-6 w-6 me-2">
              <AvatarImage src={account.storage?.find.avatar} alt={account.storage?.find.name} />
              <AvatarFallback>{account.storage?.find.name[0]}</AvatarFallback>
            </Avatar>
            <Link href={{pathname: `https://find.xyz/${account.storage?.find.name}`}} target="_blank"> {account.storage?.find.name}.find  </Link>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{account.storage?.find.description}  </p>
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
          <DropdownMenuRadioGroup value={network}>
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
      <DropdownMenuItem onClick={user.changeUser}>
        Switch Account
        <DropdownMenuShortcut>
        <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={user.logOut}>
        Log out
        <DropdownMenuShortcut>
        <LogOut className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
    </>
  ) : (
    <>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        <ConnectionLight status="online"/><span className="w-2"></span> 
        <span className="hidden md:inline-block"><Loading className="h-5 w-5 m-0"/></span>
      </Button>
    </DropdownMenuTrigger>
    </>
  )
}