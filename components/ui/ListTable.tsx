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

export function ListTable({ items, header, caption }) {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{header}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item : string) => (
          <TableRow key={item}>
            <TableCell className="font-medium">{item}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default ListTable;
