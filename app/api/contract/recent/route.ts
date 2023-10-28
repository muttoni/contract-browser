import { ContractsListResponseType } from "@/lib/types";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network')

  let res; 
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  try {
    res = await fetch(`${process.env.API_DOMAIN}/api/v1/contracts/?network=${network}&order_by=inserted_at&order_by_direction=desc&limit=10`, options)
  } catch(e) {
    console.log(e)
  }
  const contract : ContractsListResponseType = await res.json()
  return Response.json({ contract })
}