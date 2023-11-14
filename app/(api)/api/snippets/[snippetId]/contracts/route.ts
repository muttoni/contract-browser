import { ContractSearchResponseType } from "@/lib/types";

export async function GET( request: Request, { params } : { params: { snippetId: string } }) {

  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network') || 'mainnet'
  const snippetId = params.snippetId

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  const res = await fetch(`${process.env.API_DOMAIN}/api/v2/snippets/${snippetId}/contracts/?network=${network}`, options)
  const contracts : ContractSearchResponseType = await res.json()
  return Response.json(contracts)
}