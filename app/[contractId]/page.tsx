"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, Copy, ListTree, Wallet, ScrollText, Network, Check } from "lucide-react"
import CodeEditor from "@/components/editor"
import { useState } from "react"
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { useContract } from "@/hooks/useContract"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getContractAddress } from "@/lib/utils";


export default function ContractPage() {
  const [contractCopied, setContractCopied] = useState(false)
  const [importCopied, setImportCopied] = useState(false)
  const contractId = useParams().contractId
  const contract = useContract(contractId)

  return (
    <div className="flex-1 space-y-4 ps-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            lines of code
          </p>
        </CardContent>
      </Card>
    </div>
    <div className="flex gap-2">
      <CopyToClipboard text={contract?.code}>
      <Button size="sm" variant="outline" onClick={() => setContractCopied(true)}>
        {contractCopied ?
          <Check className="h-4 w-4 me-2" />
        : <Copy className="h-4 w-4 me-2" />
        }
        Copy Code
      </Button>
      </CopyToClipboard>
      <CopyToClipboard text={`import ${contract?.name} from ${getContractAddress(contract?.uuid)}`}>
      <Button size="sm" variant="outline" onClick={() => setImportCopied(true)}>
        {importCopied ?
          <Check className="h-4 w-4 me-2" />
        : <Copy className="h-4 w-4 me-2" />
        }
        Copy Import Statement
      </Button>
      </CopyToClipboard>
      <Button size="sm" variant="outline">
        <Wallet className="h-4 w-4 me-2" />
        View Account
      </Button>
      <Button size="sm" variant="outline">
        <Network className="h-4 w-4 me-2" />
        View Dependencies
      </Button>

    </div>
    <CodeEditor code={contract?.code} />
  </div>
  )
}