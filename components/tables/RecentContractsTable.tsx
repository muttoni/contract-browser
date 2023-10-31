import { getContractName, getContractAddress } from "@/lib/utils";
import { useEffect, useState } from "react";

import { columns } from "@/components/tables/ContractTableColumns"
import { Contract } from "@/lib/types";
import { DataTable } from "@/components/tables/DataTable";
import SkeletonTable from "@/components/tables/SkeletonTable";

async function getData(network: string, limit : number = 10): Promise<Contract[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/recent?network=${network}&limit=${limit}`)
  const json = await res.json() 

  if(!json?.data?.contracts) return []

  const contracts = json.data.contracts.map((contract, i) => {
    return {
      ...contract,
      name: getContractName(contract.uuid),
      address: getContractAddress(contract.uuid)
    }
  })
  return contracts
}


export default function RecentContractsTable({ network, limit = 10 }) {
  const [data, setData] = useState(null as unknown as Contract[] | null | undefined)

  useEffect(() => {
    getData(network, limit).then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div className="">
      {data && data.length ? <DataTable columns={columns} data={data} /> : <SkeletonTable numCols={3} numRows={10} />}
    </div>
  )
}