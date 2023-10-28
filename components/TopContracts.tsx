import Link from "next/link";
import { getContractName, getContractAddress } from "@/lib/utils";
import { ContractsListResponseType } from "@/lib/types"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function({ network }) {

  const [ topContracts, setTopContracts ] = useState(null as unknown as ContractsListResponseType | null | undefined)

  async function getData(): Promise<ContractsListResponseType> {
    const res = await fetch(`${window.location}/api/contract/top?network=${network}`)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json() 
  }

  useEffect(() => {
    getData().then((data) => {
      setTopContracts(data)
    })
  }, [network])

  return topContracts && topContracts.contract.data.length ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Contract name</TableHead>
          <TableHead className="w-[100px]">Address</TableHead>
          <TableHead className="w-auto text-right">Used By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topContracts.contract.data.map((contract) => (
          <TableRow key={contract.uuid}>
            <TableCell className="font-medium w-full">
            <Link href={`/${contract.uuid}`}>
              {getContractName(contract.uuid)}
            </Link>
            </TableCell>
            <TableCell className="font-medium w-full">
            <Link href={`/account/${getContractAddress(contract.uuid)}`}>
              {getContractAddress(contract.uuid)}
            </Link>
            </TableCell>
            <TableCell className="font-medium w-full text-right">
            <Link href={`/${contract.uuid}/dependants`}>
              {contract.dependants_count}
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
        <TableHead className="">Used By</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {!topContracts && [...Array(10)].map(() => (
        <TableRow>
          <TableCell className="font-medium w-full">
            <Skeleton className="h-6 w-full"></Skeleton>
          </TableCell>
          <TableCell className="font-medium w-full">
            <Skeleton className="h-6 w-full"></Skeleton>
          </TableCell>
          <TableCell className="font-medium w-full">
            <Skeleton className="h-6 w-full"></Skeleton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}