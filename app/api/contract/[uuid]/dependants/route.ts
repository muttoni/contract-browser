
import { DependantsResponseType } from "@/lib/types";

export async function GET(
  request: Request,
  { params } : { params: { uuid: string } }
  ) {

  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network')
  const uuid = params.uuid

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  const res = await fetch(`${process.env.API_DOMAIN}/api/v1/contracts/${uuid}/dependants?network=${network}`, options)
  const dependants : DependantsResponseType = await res.json()
  return Response.json({ dependants })
}