import Link from "next/link";
import { getContractName, getContractAddress } from "@/lib/utils";
import { ContractsListResponseType } from "@/lib/types"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function({ network }) {
  const [ recentContracts, setRecentContracts ] = useState(null as unknown as ContractsListResponseType | null | undefined)

  async function getData(): Promise<ContractsListResponseType> {
    const res = await fetch(`${window.location}/api/contract/recent?network=${network}`)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json() 
  }

  useEffect(() => {
    getData().then((data) => {
      setRecentContracts(data)
    })
  }, [network])

  return recentContracts && recentContracts.contract.data.length ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Contract name</TableHead>
          <TableHead className="w-[100px]">Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentContracts.contract.data.map((contract) => (
          <TableRow key={contract.uuid}>
            <TableCell className="font-medium w-full">
            <Link href={`/${contract.uuid}`}>
              {getContractName(contract.uuid)}
            </Link>
            </TableCell>
            <TableCell className="font-medium w-full font-mono">
            <Link href={`/account/${getContractAddress(contract.uuid)}`}>
              {getContractAddress(contract.uuid)}
            </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="">Contract name</TableHead>
        <TableHead className="">Address</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {!recentContracts && [...Array(10)].map((i) => (
        <TableRow key={i}>
          <TableCell className="font-medium w-full">
            <Skeleton className="h-5 w-full"></Skeleton>
          </TableCell>
          <TableCell className="font-medium w-full">
            <Skeleton className="h-5 w-full"></Skeleton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}