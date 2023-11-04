
import { SnippetsResponse } from "@/lib/types";
import { getContractAddress, getNetworkFromAddress } from "@/lib/utils";

export async function GET( request: Request, { params } : { params: { uuid: string } }) {

  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network') || getNetworkFromAddress(getContractAddress(params.uuid))
  const uuid = params.uuid

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  const res = await fetch(`${process.env.API_DOMAIN}/api/v2/contracts/${uuid}/snippets?network=${network}`, options)
  const snippets : SnippetsResponse = await res.json()
  return Response.json(snippets)
}
