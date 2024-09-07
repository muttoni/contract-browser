import Loading from "../ui/Loading"
import { columns } from "./ContractUUIDTableColumns"
// import { columnsWithMigrationState } from "./ContractUUIDTableColumnsWithMigrationState"
import { DataTable } from "./DataTable"

export function UUIDContractTable({ contracts, loading, showMigrationState }: { contracts: string[], loading: boolean, showMigrationState? : boolean}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loading className="h-16 w-16" />
        <p className="text-sm text-muted-foreground mt-4">Loading...</p>
      </div>
    )
  }
  return (
    <DataTable
      columns={columns}
      data={contracts}
    />
  )
}