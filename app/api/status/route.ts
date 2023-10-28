import { StatusResponseType } from "@/lib/types"

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network')

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
      'Content-Type': 'application/json',
    }
  };

  const res = await fetch(`${process.env.API_DOMAIN}/api/v1/status?network=${network}`, options)
  const status : StatusResponseType = await res.json()
 
  return Response.json({ status })
}