"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, Copy, ListTree, ScrollText, Network, Check, Pencil, Terminal, AlertTriangle, Info } from "lucide-react"
import CodeEditor from "@/components/CodeEditor"
import CadenceEditor from "@/components/editor"
import { useEffect, useState } from "react"
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { useContract } from "@/hooks/useContract"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { calculateStringSizeInBytes, formatStorageSize, getContractAddress, getNetworkFromAddress, sansPrefix, truncateLongWords } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { CopyButton } from "@/components/ui/CopyButton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
// import { useMigration } from "@/contexts/MigrationContext"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ContractPage() {
  const [contractCopied, setContractCopied] = useState(false)
  const [importCopied, setImportCopied] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)
  // const [contractMigrationInfo, setContractMigrationInfo] = useState({} as any)

  const [editMode, setEditMode] = useState(false)
  const contractId = useParams().contractId as string
  const contract = useContract(contractId)
  const user = useCurrentUser()

  // const { data, error } = useMigration();

  // const [staged, setStaged] = useState(false);

  // useEffect(() => {
  
  //   if (error || !data.contracts) {
  //     return;
  //   }
    
  //   if(data.contracts.includes(contractId)) {
  //     console.log("contract is staged")
  //     setStaged(true);

  //     if(data.contractDetails[contractId]) {
  //       setContractMigrationInfo(data.contractDetails[contractId])
  //     }
  //   }
  // }, [data])

  return (
    <>
      {/* {(true || user?.addr === getContractAddress(contractId)) && <div>

      {contract && !staged && <Alert className="text-orange-500 bg-orange-50">
          <AlertTriangle className="h-4 w-4 !text-orange-500 me-5"></AlertTriangle>
          <AlertTitle className="font-bold">This contract has not been staged for Crescendo!</AlertTitle>
          <AlertDescription>Get this contracts ready for Crescendo: stage this contract as soon as possible. <Link className="font-bold text-orange-600" href="https://flow.com/upgrade/crescendo/migration" target="_blank">Learn more &rarr;</Link>
          </AlertDescription>
        </Alert>}

      {contract && staged && <Alert className="text-green-500 bg-green-50">
          <Check className="h-4 w-4 !text-green-500 me-5"></Check>
          <AlertTitle className="font-bold">This contract has been staged!</AlertTitle>
          <AlertDescription>Please ensure all your other contracts are staged for Crescendo. <Link className="font-bold text-green-600" href="https://flow.com/upgrade/crescendo/migration" target="_blank">Learn more &rarr;</Link>
          </AlertDescription>
        </Alert>}

      {contract && staged && contractMigrationInfo && contractMigrationInfo?.kind !== "contract-update-success" && contractMigrationInfo?.error && <Alert className="text-orange-500 bg-orange-50 mt-2">
          <AlertTriangle className="h-4 w-4 !text-orange-500 me-5"></AlertTriangle>
          <AlertTitle className="font-bold">Staging Issues:</AlertTitle>
          <AlertDescription className="">
            <div className="w-full">
              {truncateLongWords(contractMigrationInfo?.error)} 
              <br/>
              <Link className="flex text-orange-400 text-xs justify-end" href="https://staging.dnz.dev" target="_blank">powered by staging.dnz.dev</Link>
            </div>
          </AlertDescription>
        </Alert>}

      </div>} */}
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
        <div className="border rounded relative p-4 flex gap-3 align-center overflow-x-auto">
          {/* <span className="absolute top-0 left-2 text-xs">FLOW CLI COMMAND</span> */}
            <Terminal className="text-muted-foreground"/>
          <span className="font-mono"><span className="opacity-70">
            flow dependencies add </span> {getNetworkFromAddress(contract.address)}://{sansPrefix(contract.address)}.{contract.name}</span>
          <CopyButton text={`${getNetworkFromAddress(contract.address)}://${sansPrefix(contract.address)}.${contract.name}`} className="" />
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href="https://developers.flow.com/tools/flow-cli/dependency-manager" target="_blank" className="text-muted-foreground">
                <Info className="h-4 w-4"/>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to learn more about the Flow CLI Dependency Manager</p>
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>
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