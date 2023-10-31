"use client"

import React, { useState, useEffect } from 'react'
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import { getFileExtension } from '@/lib/file'
import { readFileAsText } from '@/lib/file'
import Editor from '@/components/editor'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Container, RocketIcon, UploadCloud } from 'lucide-react'
import { withPrefix } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useParams } from 'next/navigation' 
import { useTx, IDLE } from '@/hooks/useTx'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'


export default function CodeEditor ({ mustBeAuthedToViewCode = false}) {
  const [code, setCode] = useState(Array.from({length: 12}, _ => "\n").join(""))
  const [name, setName] = useState("")
  const { toast } = useToast()
  const [exec, status, txStatus, details] = useTx(
    [
      fcl.transaction`
      transaction(name: String, code: String) {
        prepare(acct: AuthAccount) {
          if acct.contracts.get(name: name) == nil {
              acct.contracts.add(name: name, code: code.decodeHex())
            } else {
              acct.contracts.update__experimental(name: name, code: code.decodeHex())
            }
          }
      }
    `,
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(1000),
    ],
    {
      async onSuccess() {
        window.location.reload()
      },
    }
  )

  const saveContract = () => {
    // prettier-ignore
    // @ts-ignore
    exec([
      fcl.arg(name, t.String),
      fcl.arg(Buffer.from(code, "utf8").toString("hex"), t.String)
    ])

    toast({
      title: "Deploying contract...",
      // @ts-ignore
      description: `txStatus ${txStatus} \n details ${details && details.txId}`
    })
  }
  

  
  useEffect(() => {
    setName(code.match(/(?<access>pub|access\(all\)) contract (?<name>\w+)/)?.groups?.name ?? "")
  }, [code, name])

  const user = useCurrentUser()
  const params = useParams()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const extension = getFileExtension(file.name)
    if (extension !== 'txt' && extension !== 'cdc' && extension !== '') {
      console.error('Invalid file type')
      return
    }

    const fileText = await readFileAsText(file)
    setCode(fileText)
  };

  const handleDeployClick = () => {
    saveContract()
  };

  const IS_CURRENT_USER = withPrefix(user?.addr) === withPrefix(params?.address)

  return (
    <>
      {IS_CURRENT_USER && 
      <>
        <div className="flex items-center mb-4 gap-4">
          <Input id="cadenceFile" className="w-60" type="file" onChange={handleFileChange} />
          <Button className="flex" onClick={handleDeployClick}>
            <UploadCloud className="h-4 w-4 me-2" />
            {txStatus === IDLE ? "Deploy" : "Deploying"}
          </Button>
          {txStatus !== IDLE &&
          <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Deploying</AlertTitle>
              <AlertDescription> 
                {/* 
                // @ts-ignore */}
                txStatus {txStatus} | details ${details.txId}
              </AlertDescription>
            </Alert>
          }
        </div>
      </>
      }
      {(IS_CURRENT_USER || (!IS_CURRENT_USER && !mustBeAuthedToViewCode)) ?
      <Editor code={code} onChange={IS_CURRENT_USER ? setCode : false} />
      : <p className="p-16 text-center">Please login first.</p>
      }
    </>
  );
};

