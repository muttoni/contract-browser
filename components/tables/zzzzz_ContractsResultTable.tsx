import * as React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getContractAddress, getContractName } from '@/lib/utils';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

type ContractResult = {
  uuid: string,
  dependants_count: number,
  dependencies_count: number,
}

export default function ContractsTable({ 
  contracts, 
  limit = 10,
} : { 
  contracts: ContractResult[],
  limit?: number,
}) {

  console.log("rendering table", contracts)
  return contracts && contracts.length ? (
    <Table className="table-auto border rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="">Contract name</TableHead>
          <TableHead className="w-[100px]">Address</TableHead>
          <TableHead className="text-right w-[200px]">Used By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map((contract: ContractResult) => (
          <TableRow key={contract.uuid}>
            <TableCell className="font-medium">
            <Link href={`/${contract.uuid}`}>
              {getContractName(contract.uuid)}
            </Link>
            </TableCell>
            <TableCell className="font-medium font-mono">
            <Link href={`/account/${getContractAddress(contract.uuid)}`}>
              {getContractAddress(contract.uuid)}
            </Link>
            </TableCell>
            <TableCell className="font-medium text-right">
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
      {!contracts && [...Array(10)].map((i) => (
        <TableRow key={i}>
          <TableCell className="font-medium w-full">
            <Skeleton className="h-5 w-full"></Skeleton>
          </TableCell>
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
