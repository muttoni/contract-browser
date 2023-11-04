import { ContractResponseType } from "@/lib/types";

export async function GET(
  request: Request,
  { params } : { params: { uuid: string } }
  ) {

  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network')
  const uuid = params.uuid
  let res; 
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  try {
    res = await fetch(`${process.env.API_DOMAIN}/api/v1/contracts/${uuid}?network=${network}`, options)
  } catch(e) {
    console.log(e)
  }
  const contract : ContractResponseType = await res.json()
  return Response.json(contract)
}