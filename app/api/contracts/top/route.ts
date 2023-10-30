import { ContractResponseType } from "@/lib/types";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network')
  const limit = searchParams.get('limit') || 10

  let res; 
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  try {
    res = await fetch(`${process.env.API_DOMAIN}/api/v2/contracts/?network=${network}&order_by=dependants_count&order_by_direction=desc&limit=${limit}`, options)
  } catch(e) {
    console.log(e)
  }
  const contract : ContractResponseType = await res.json()
  return Response.json(contract)
}