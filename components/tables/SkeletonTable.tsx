import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SkeletonTableProps {
  numRows: number;
  numCols: number;
  topRow?: boolean;
  bottomRow?: boolean;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ numRows, numCols, topRow = false, bottomRow = false }) => {
  return (
    <div className="rounded-md border mb-2 p-2">
    {topRow && <Skeleton className='w-full h-10 mb-2' />}
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: numCols }).map((_, colIndex) => (
            <TableHead key={colIndex} className="">
              <Skeleton className="h-7"></Skeleton>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: numCols }).map((_, colIndex) => (
              <TableCell key={colIndex} className="font-medium">
                <Skeleton className="h-8"></Skeleton>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {bottomRow && <Skeleton className='w-full h-10 mt-2' />}
    </div>
  );
};

export default SkeletonTable;
