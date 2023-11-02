import { getContractName, getContractAddress } from "@/lib/utils";
import { useEffect, useState } from "react";

import { columns } from "@/components/tables/ContractTableColumns"
import { Contract } from "@/lib/types";
import { DataTable } from "@/components/tables/DataTable";
import SkeletonTable from "@/components/tables/SkeletonTable";
import { getNetworkFromAddress } from "@/lib/utils";


import { QUERY_TYPE } from "@/lib/types"

function deleteByAccessorKey(columns: any[], accessorKey: string) {
  const index = columns.findIndex((column) => column.accessorKey === accessorKey)
  if(index > -1) {
    columns.splice(index, 1)
  }
}

function addByAccessorKey(columns: any[], accessorKey: string, column: any, insertIndex = 0) {
  const index = columns.findIndex((column) => column.accessorKey === accessorKey)
  if(index > -1) {
    columns.splice(index, 1, column)
  } else {
    columns.splice(insertIndex, 0, column)
  }
}

async function getData(action?: QUERY_TYPE, network: string = "mainnet", limit : number | string = 10, address? : string): Promise<Contract[]> {
  let _network = network
  // pick the right network if ownedBy address is set
  if(address) {
    _network = getNetworkFromAddress(address)
  }

  let url; 
  switch(action) {
    case "recent":
      url = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts?queryType=recent&network=${_network}&limit=${limit}`
      break;
    case "top":
      url = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts?queryType=top&network=${_network}&limit=${limit}`
      break;
    case "topByDependencies":
      url = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts?queryType=topByDependencies&network=${_network}&limit=${limit}`
      break;
    case "ownedBy":
      url = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts?queryType=ownedBy&address=${address}&network=${_network}&limit=${limit}`
      break;
  }

  const res = await fetch(url)
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


export default function APIContractsTable({
  action, 
  network, 
  limit = 10, 
  address,
  border = true
} : { 
  action?: QUERY_TYPE, 
  network?: string, 
  limit? : number, 
  address? : string,
  border?: boolean
 }) {
  const [data, setData] = useState(null as unknown as Contract[] | null | undefined)
  const cols = [...columns]

  useEffect(() => {
    getData(action, network, limit, address).then((data) => {
      setData(data)
    })
  }, [])

  // remove dependencies_count column if action is not topByDependencies
  if(action !== "topByDependencies") {
    deleteByAccessorKey(cols, "dependencies_count")
  }

  if(action === "recent") {
    deleteByAccessorKey(cols, "dependants_count")
  }

  return (
    <div>
      {data ? 
        data.length ? <DataTable columns={cols} data={data} border={border}/> 
        : <p className="py-6 text-center">No contracts {address ? " for this account ": ""} found.</p>
      : !data && <SkeletonTable numCols={3} numRows={10} border={border} topRow={limit > 10} bottomRow={limit > 10} />}
    </div>
  )
}