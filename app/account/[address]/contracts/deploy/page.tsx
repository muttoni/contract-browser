"use client"

import React, { useState, useEffect } from 'react'
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import { getFileExtension } from '@/lib/file'
import { readFileAsText } from '@/lib/file'
import CodeEditor from '@/components/editor'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Container } from 'lucide-react'
import { withPrefix } from '@/lib/utils'
import { Input } from '@/components/ui/input'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useParams } from 'next/navigation' 
import { useTx, IDLE } from '@/hooks/useTx'

interface Props {}

const MyComponent: React.FC<Props> = () => {
  const [code, setCode] = useState(Array.from({length: 12}, _ => "\n").join(""))
  const [name, setName] = useState("")
  const [exec, status, txStatus, details] = useTx(
    [
      fcl.transaction`
      transaction(name: String, code: String) {
        prepare(acct: AuthAccount) {
          if acct.contracts.get(name: name)==nil{
              acct.contracts.add(name: name, code: code.decodeHex())
            }else{
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
    exec([
      fcl.arg(name, t.String),
      fcl.arg(Buffer.from(code, "utf8").toString("hex"), t.String)
    ])
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
    // TODO: Implement deploy functionality
  };

  const IS_CURRENT_USER = withPrefix(user?.addr) === withPrefix(params?.address)

  if (!IS_CURRENT_USER) return <div className="w-full h-full text-center">Please log in with this account to deploy a contract.</div>

  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Deploy a new contract</h3>
        <p className="text-sm text-muted-foreground">
          Paste or upload your contract code here and click "Deploy" to deploy it to the blockchain.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center mb-4 gap-4">
        <Input id="cadenceFile" className="w-60" type="file" onChange={handleFileChange} />
        <Button className="flex" onClick={handleDeployClick}>
          <Container className="h-4 w-4 me-2" />Deploy
        </Button>
      </div>
      <CodeEditor code={code} onChange={setCode} />
    </>
  );
};

export default MyComponent;
