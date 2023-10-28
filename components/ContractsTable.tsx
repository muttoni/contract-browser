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

export function ContractsTable({ contracts, names = true, addresses = false }) {
  return (
    <Table>
      <TableCaption>{contracts.length} contracts deployed on this account.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Contract Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map((contract : string) => (
          <TableRow key={contract}>
            <TableCell className="font-medium">{contract}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default ContractsTable;
