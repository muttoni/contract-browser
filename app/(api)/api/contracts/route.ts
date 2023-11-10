import { ContractResponseType } from "@/lib/types";
import { QUERY_TYPE } from "@/lib/types";

type ORDER_TYPE = 'dependants_count' | 'inserted_at' | 'dependencies_count' | null
type OWNER_TYPE = string | null
type NETWORK_TYPE = 'mainnet' | 'testnet'
type ORDER_DIR_TYPE = 'asc' | 'desc' | null

export async function GET(request: Request) {


  const { searchParams } = new URL(request.url)
  const queryType : QUERY_TYPE = searchParams.get('queryType') as QUERY_TYPE || 'top'
  const limit : string | number = searchParams.get('limit') as string | number || 10
  const address : OWNER_TYPE = searchParams.get('address') as OWNER_TYPE || "" 
  let network : NETWORK_TYPE = searchParams.get('network') as NETWORK_TYPE || 'mainnet'
  let orderBy : ORDER_TYPE = searchParams.get('orderBy')  as ORDER_TYPE || 'dependants_count'
  let orderByDirection : ORDER_DIR_TYPE = searchParams.get('orderByDirection') as ORDER_DIR_TYPE || 'desc'

  // set the right order by and order by direction
  switch(queryType) {
    case 'top':
      orderBy = 'dependants_count'
      orderByDirection = 'desc'
      break;
    case 'topByDependencies':
      orderBy = 'dependencies_count'
      orderByDirection = 'desc'
      console.log('topByDependencies', orderBy, orderByDirection)
      break;
    case 'ownedBy':
      orderBy = 'dependants_count'
      orderByDirection = 'desc'
      break;
    case 'recent':
      orderBy = 'inserted_at'
      orderByDirection = 'desc'
      break;
  }


  let res; 
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  let url = `${process.env.API_DOMAIN}/api/v2/contracts?${address ? "owner=" + address + "&": ""}network=${network}&order_by=${orderBy}&order_by_direction=${orderByDirection}&limit=${limit}`

  try {
    res = await fetch(url, options)
  } catch(e) {
    console.log(e)
  }
  const contract : ContractResponseType = await res.json()
  return Response.json(contract)
}