"use client"

import React, { useState, useEffect, use } from 'react'
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import { getFileExtension } from '@/lib/file'
import { readFileAsText } from '@/lib/file'
import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import { Info, UploadCloud } from 'lucide-react'
import { getContractAddress, getNetworkFromAddress, sansPrefix, withPrefix } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useParams } from 'next/navigation' 
import { useTx, IDLE } from '@/hooks/useTx'
import { Alert } from '@/components/ui/alert'
import Loading from '@/components/ui/Loading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ContractSearchResponseType } from '@/lib/types'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getVerifiedContractAddressByName } from '@/lib/verified-contracts'
import Link from 'next/link'
import { ContractCache } from '@/lib/cache'

export default function CodeEditor ({ initialCode = '', mustBeAuthedToViewCode = false}) {
  const [code, setCode] = useState(initialCode || Array.from({length: 12}, _ => "\n").join(""))
  const [imports, setImports] = useState([])
  const [name, setName] = useState("")
  const user = useCurrentUser()
  const network = user?.addr ? getNetworkFromAddress(user?.addr) : "mainnet"
  const params = useParams()

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
        ContractCache.invalidateAllForContract(`A.${sansPrefix(user.addr)}.${name}`)
        window.location.href = `${window.location.origin}/A.${sansPrefix(user.addr)}.${name}`
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
  }


  function replaceImports(code, newImports) {
    const regex = /^ *import "?(?<contracts>[A-Za-z_][A-Za-z0-9_]*( *, *[A-Za-z_][A-Za-z0-9_]+)*)"? *(from)? *(?<address>0x[a-f0-9]+)?/igm;
    const matches = Array.from(code.matchAll(regex))

    let newCode = code
    for (const match of matches) {
      const importNameToReplace = match[1]
      const importIndex = findImportIndexInMatches(importNameToReplace, newImports)
      if (importIndex !== -1 && newImports[importIndex][4]) {
        newCode = newCode.replace(match[0], `import ${newImports[importIndex][1]} from ${newImports[importIndex][4]}`)
      }
    }
    return newCode
  }

  function findImportIndexInMatches(importName, matches) {
    for (let i = 0; i < matches.length; i++) {
      if (matches[i][1] === importName) {
        return i;
      }
    }
    return -1;
  }
  
  useEffect(() => {
    setName(code.match(/(?<access>pub|access\(all\)) contract (?<name>\w+)/)?.groups?.name ?? "")

    // Find all import statements that don't specify an address
    const parseImports = /^ *import "?(?<contracts>[A-Za-z_][A-Za-z0-9_]*( *, *[A-Za-z_][A-Za-z0-9_]+)*)"? *(from *(?<address>0x[a-f0-9]+))?/igm
    const matches = Array.from(code.matchAll(parseImports))
    const detectedImports = []

    for (const match of matches) {
      detectedImports.push(match)
    }
    setImports(detectedImports)
  }, [code, name])

  function updateImportsAndCode(imports) {
    setImports(imports)
    setCode(replaceImports(code, imports))

  }

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

  const IS_CURRENT_USER = withPrefix(user?.addr) === withPrefix(params?.address) || withPrefix(user?.addr) === getContractAddress(params?.contractId)

  return (
    <div className=''>
      {IS_CURRENT_USER && 
      <>
        {txStatus === IDLE ?
        <div className="flex items-center justify-between mb-4 gap-4">
          <Input id="cadenceFile" className="w-60" type="file" onChange={handleFileChange} />
          <Button className="flex" onClick={handleDeployClick}>
            <UploadCloud className="h-4 w-4 me-2" />
            {txStatus === IDLE ? (initialCode ? "Update" : "Deploy") : "Deploying"}
          </Button>
        </div>
        :
          <Alert className='flex gap-4 mb-4 p-2 px-4 pe-2 items-center'>
              <Loading className="w-6 h-6" />
              <div className='m-0 p-0 items-center flex flex-1 justify-between'> 
                <p className='m-0 p-0'>Deploying your contract...({txStatus as string})</p>
                {/* 
                // @ts-ignore */}
                <Link target="_blank" href={`https://${network === "testnet" && "testnet."}flowdiver.io/${details.txId}`}>
                  <Button variant='secondary' size='sm'>View transaction</Button>
                </Link>
              </div>
            </Alert>
          }
      </>
      }
      {(IS_CURRENT_USER || (!IS_CURRENT_USER && !mustBeAuthedToViewCode)) ?
      <>
      {imports.length > 0 &&
      <Accordion type="single" collapsible defaultValue="imports" className="mb-3 w-full px-2 md:px-4 border rounded-md">
      <AccordionItem value="imports" className="border-none">
        <AccordionTrigger>{imports.length} imports detected</AccordionTrigger>
        <AccordionContent>
          <ImportsTable matches={imports} onChange={updateImportsAndCode} network={network} />
        </AccordionContent>
      </AccordionItem>
      </Accordion>
      }
      <div className='grid min-h-[800px] h-full'>
        <Editor code={code} onChange={IS_CURRENT_USER && txStatus === IDLE ? setCode : false} />
      </div>
      </>
      : <p className="p-16 text-center">Please login first.</p>
      }
    </div>
  );
};

const ImportsTable = ({ matches, network, onChange }) => {

  const [imports, setImports] = useState(matches)

  function updateImportAddress(value, index) {
    const newImports = imports.slice()
    newImports[index][4] = value
    setImports(newImports)
    onChange(newImports)
  }

  useEffect(() => {
    setImports(matches)
  }, [matches])


return imports && imports.length > 0 && (
<Table>
  {/* <TableCaption>{imports.length} imports detected</TableCaption> */}
  <TableHeader>
    <TableRow>
      <TableHead className="">Imported Contract</TableHead>
      <TableHead className="max-w-[170px]">Address</TableHead>
      <TableHead className="">
        Autofill
        <Popover>
          <PopoverTrigger>
            <Info className="ms-2 w-4 h-4 inline-block" />
          </PopoverTrigger>
          <PopoverContent>Autofill finds the address of the most popular contract with that name on the current network. Note: This is experimental</PopoverContent>
        </Popover>
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {imports.map((imp, index) => {
      return (
        <ImportTableRow key={imp[1]} imp={imp} index={index} onChange={updateImportAddress} network={network} />
      )
    })}
  </TableBody>
</Table>
)

}

const ImportTableRow = ({imp, index, onChange, network}) => {

  const [autofilling, setAutofilling] = useState(false)

  async function getMostPopularContractByName(name, network, index) {
    setAutofilling(true)
    const verifAddress = getVerifiedContractAddressByName(name, network)
    if(verifAddress) {
      setAutofilling(false)
      return onChange(verifAddress, index)
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/search/contracts?network=${network}&query=${name}&offset=0&limit=1`
    const res = await fetch(url)
    const json : ContractSearchResponseType = await res.json()
    if(json?.data?.contracts?.length > 0) {
      onChange(getContractAddress(json.data.contracts[0].uuid), index)
    }
    setAutofilling(false)
  }
  
  return (
  <TableRow key={imp[1]}>
    <TableCell className="font-medium text-sm">
      {imp[1]}
    </TableCell>
    <TableCell className="w-[210px]">
      <Input type="text" disabled={imp[1] === 'Crypto'} className="h-8 font-mono" value={imp[4] || ""} onChange={(e) => onChange(e.target.value, index)} />
    </TableCell>
    <TableCell className="">
      <Button disabled={autofilling || imp[1] === 'Crypto'} className='h-8 w-[145px] flex items-center ${}' variant='outline' onClick={() => getMostPopularContractByName(imp[1], network, index)}>
        {!autofilling && <>🪄 Autofill</>}
        {autofilling && <><Loading className="h-4 w-4 m-0"/><span className="ms-2">Autofilling ✨</span></>}
      </Button>
    </TableCell>
  </TableRow>
  )
}
