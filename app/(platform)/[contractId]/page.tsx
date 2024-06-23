"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, Copy, ListTree, ScrollText, Network, Check, Pencil, Terminal } from "lucide-react"
import CodeEditor from "@/components/CodeEditor"
import CadenceEditor from "@/components/editor"
import { useState } from "react"
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { useContract } from "@/hooks/useContract"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { calculateStringSizeInBytes, formatStorageSize, getContractAddress, getNetworkFromAddress, sansPrefix } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { CopyButton } from "@/components/ui/CopyButton"

export default function ContractPage() {
  const [contractCopied, setContractCopied] = useState(false)
  const [importCopied, setImportCopied] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const contractId = useParams().contractId as string
  const contract = useContract(contractId)
  const user = useCurrentUser()

  return (
    <>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {contract && contract.name ? 
      <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Used by
          </CardTitle>
          <Network className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{contract?.dependants_count}</div>
          <p className="text-xs text-muted-foreground">
            contracts use {contract?.name}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Dependencies
          </CardTitle>
          <ListTree className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{contract?.dependencies_count}</div>
          <p className="text-xs text-muted-foreground">
            contracts used by {contract?.name}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Events</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{contract?.events?.length}</div>
          <p className="text-xs text-muted-foreground">
            emitted by this contract
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            LOC
          </CardTitle>
          <ScrollText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{contract?.code?.split("\n").length}</div>
          <p className="text-xs text-muted-foreground">
            lines of code (<span className="text-muted-foreground">{formatStorageSize(calculateStringSizeInBytes(contract?.code))}</span>)
          </p>
        </CardContent>
      </Card>
      </>:
      <>
      <Skeleton className="flex h-36 w-full"></Skeleton>
      <Skeleton className="flex h-36 w-full"></Skeleton>
      <Skeleton className="flex h-36 w-full"></Skeleton>
      <Skeleton className="flex h-36 w-full"></Skeleton>
      </>
      }
    </div>
    <div id="code"></div>

    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
      <CopyToClipboard text={contract?.code}>
      <Button size="sm" variant="outline" onClick={() => setContractCopied(true)}>
        {contractCopied ?
          <Check className="h-4 w-4 me-2" />
        : <Copy className="h-4 w-4 me-2" />
        }
        Code
      </Button>
      </CopyToClipboard>
      <CopyToClipboard text={`import ${contract?.name} from ${getContractAddress(contract?.uuid)}`}>
      <Button size="sm" variant="outline" onClick={() => setImportCopied(true)}>
        {importCopied ?
          <Check className="h-4 w-4 me-2" />
        : <Copy className="h-4 w-4 me-2" />
        }
        Import
      </Button>
      </CopyToClipboard>
      <CopyToClipboard text={getContractAddress(contract?.uuid)}>
      <Button size="sm" variant="outline" className="w-full" onClick={() => setAddressCopied(true)}>
        {addressCopied ?
          <Check className="h-4 w-4 me-2" />
        : <Copy className="h-4 w-4 me-2" />
        }
        Account
      </Button>
      </CopyToClipboard>
      <Button size="sm" variant="outline" className="w-full" disabled={user?.addr !== getContractAddress(contractId)} onClick={() => setEditMode(true)}>
        <Pencil className="h-4 w-4 me-2" />
        Update
      </Button>
    </div>
    <div className="gap-2 grid-cols-1 md:grid-cols-2">
      {contract && contract.name ? 
        <>
        <div className="border rounded relative p-4 flex gap-3 align-center">
          {/* <span className="absolute top-0 left-2 text-xs">FLOW CLI COMMAND</span> */}
            <Terminal className="text-muted-foreground"/>
          <span className="font-mono"><span className="opacity-70">
            flow dependencies add </span> {getNetworkFromAddress(contract.address)}://{sansPrefix(contract.address)}.{contract.name}</span>
          <CopyButton text={`${getNetworkFromAddress(contract.address)}://${sansPrefix(contract.address)}.${contract.name}`} className="" />
        </div>
        </>
      : <Skeleton className="flex h-16 w-full"></Skeleton>
      }
    </div>
    <div className="h-full">
    {contract && contract.code && editMode && <CodeEditor initialCode={contract?.code} />}
    {contract && contract.code && !editMode && <CadenceEditor className="min-h-[400px]" code={contract?.code} />}
    {(!contract || !contract.code) && <Skeleton className="min-h-[400px] w-full" />}
    </div>
  </>
  )
}