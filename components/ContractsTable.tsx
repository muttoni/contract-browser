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

export function ContractsTable({ contracts }) {
  return (
    <Table>
      <TableCaption>A list of your recent contracts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Contract Name</TableHead>
          <TableHead>Cadence Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(contracts).map(([name, code] : [string, string]) => (
          <TableRow key={name}>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{code}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default ContractsTable;
