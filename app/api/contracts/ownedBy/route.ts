import { ContractSearchResponseType } from "@/lib/types";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network')
  const limit = searchParams.get('limit') || 10
  const owner = searchParams.get('owner') || null

  let res; 
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  try {
    res = await fetch(`${process.env.API_DOMAIN}/api/v2/contracts/?network=${network}&owner=${owner}&order_by=dependants_count&order_by_direction=desc&limit=${limit}`, options)
  } catch(e) {
    console.log(e)
  }
  const contract : ContractSearchResponseType = await res.json()
  return Response.json(contract)
}