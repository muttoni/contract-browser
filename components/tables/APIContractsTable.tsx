import { getContractName, getContractAddress } from "@/lib/utils";
import { useEffect, useState } from "react";

import { columns } from "@/components/tables/ContractTableColumns"
import { Contract } from "@/lib/types";
import { DataTable } from "@/components/tables/DataTable";
import SkeletonTable from "@/components/tables/SkeletonTable";
import { getNetworkFromAddress } from "@/lib/utils";


type ACTIONS = "recent" | "top" | "ownedBy"

async function getData(action?: ACTIONS, network: string = "mainnet", limit : number | string = 10, address? : string): Promise<Contract[]> {
  let _network = network
  // pick the right network if ownedBy address is set
  if(address) {
    _network = getNetworkFromAddress(address)
  }

  let url; 
  switch(action) {
    case "recent":
      url = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/?queryType=recent&network=${_network}&limit=${limit}`
      break;
    case "top":
      url = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/?queryType=top&network=${_network}&limit=${limit}`
      break;
    case "ownedBy":
      url = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/?queryType=ownedBy&address=${address}&network=${_network}&limit=${limit}`
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
  limit, 
  address
} : { 
  action?: ACTIONS, 
  network?: string, 
  limit? : number | string, 
  address? : string
 }) {
  const [data, setData] = useState(null as unknown as Contract[] | null | undefined)

  useEffect(() => {
    getData(action, network, limit, address).then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div className="">
      {data ? 
        data.length ? <DataTable columns={columns} data={data} /> 
        : <p className="py-6 text-center">No contracts {address ? " for this account ": ""} found.</p>
      : !data && <SkeletonTable numCols={3} numRows={10} />}
    </div>
  )
}