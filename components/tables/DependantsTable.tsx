
import { columns } from "@/components/tables/ContractUUIDTableColumns"
import { DataTable } from "@/components/tables/DataTable";
import SkeletonTable from "@/components/tables/SkeletonTable";
import { useContract } from "@/hooks/useContract";

export default function DependantsTable({ uuid, limit = 10 } : {
  uuid: string,
  limit?: number
}) {

  const contract = useContract(uuid)

  return (
    <div className="w-full">
      {contract && contract.dependantsObject ? 
        contract.dependantsObject.dependants && contract.dependantsObject.dependants.length > 0 ?
          <DataTable columns={columns} data={contract.dependantsObject.dependants} /> 
          : <div className="text-center text-muted-foreground py-6">This contract is not used by any other contracts.</div>
        : <SkeletonTable numCols={2} numRows={10} />}
    </div>
  )
}