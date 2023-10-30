import { ContractSearchResponseType } from '@/lib/types'

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network')
  const query = searchParams.get('query')
  const offset = searchParams.get('offset') || 0
  const limit = searchParams.get('limit') || 200

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  const res = await fetch(`${process.env.API_DOMAIN}/api/v2/contracts/search?network=${network}&keyword=${query}&offset=${offset}&limit=${limit}`, options)
  const results : ContractSearchResponseType = await res.json()
  return Response.json(results)
}

