"use client"

import FlowLogo from '@/components/ui/FlowLogo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatFlowBalance, storageCapacity, formatStorageSize } from '@/lib/utils'
import { useAccount } from 'hooks/useAccount'
import { Disc, Eye, Key, Plus, Text } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import Link from "next/link"

function AccountPage({}) {
  const account = useAccount(useParams().address)
  const path = usePathname()

  return (
<>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Flow Balance
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center space-x-2">
            <FlowLogo size={24} />
            <span>{formatFlowBalance(account.flowBalance)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex">
          <Link href={path + "/tokens"}>
            <Button size="sm" className="h-7" variant="outline">
              <Eye className="h-4 w-4 me-2" />
              View all tokens
            </Button>
            </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Contracts Deployed
          </CardTitle>
          <Text className="h-4 w-4 text-muted-foreground" />
          
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            {Object.keys(account.contracts || {}).length}
          </div>
        </CardContent>
        <CardFooter className="flex">
            <Link href={path+"/contracts"}>
            <Button size="sm" className="h-7" disabled={Object.keys(account.contracts || {}).length < 1} variant="outline">
              <Eye className="h-4 w-4 me-2" />
              View
            </Button>
            <Button size="sm" className="h-7" variant="outline">
              <Plus className="h-4 w-4 me-2" /> 
              Deploy
            </Button>
            </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Available Storage ({(100 - storageCapacity(account?.storage).percentage).toFixed(0)}%)</CardTitle>
          <Disc className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Progress value={100-storageCapacity(account?.storage).percentage} className="h-3" />
          <p className="text-xs mt-2 text-muted-foreground">
            {formatStorageSize(storageCapacity(account?.storage).capacity - storageCapacity(account?.storage).used) } of {formatStorageSize(storageCapacity(account?.storage).capacity)} free
          </p>
        </CardContent>
        <CardFooter className="flex">
        <Link href={path+"/tokens"}>
          <Button size="sm" className="h-7" variant="outline">
            <Eye className="h-4 w-4 me-2" />
            Inspect
          </Button>
        </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Keys
          </CardTitle>
          <Key className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{Object.keys(account?.keys || {} ).length}</div>
        </CardContent>
        <CardFooter className="flex">
          <Link href={path+"/keys"}>
            <Button size="sm" className="h-7" disabled={Object.keys(account.keys || {}).length < 1} variant="outline">
              <Eye className="h-4 w-4 me-2" />
              View
            </Button>
            <Button size="sm" className="h-7" variant="outline">
              <Plus className="h-4 w-4 me-2" /> 
              Add
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
</>

  )
}

export default AccountPage
