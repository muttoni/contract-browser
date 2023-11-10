import { DependenciesResponseType } from "@/lib/types";
import { getNetworkFromAddress, getContractAddress } from "@/lib/utils";

export async function GET(
  request: Request,
  { params } : { params: { uuid: string } }
  ) {

  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network') || getNetworkFromAddress(getContractAddress(params.uuid))
  const uuid = params.uuid

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`
    }
  };

  const res = await fetch(`${process.env.API_DOMAIN}/api/v1/contracts/${uuid}/dependencies?network=${network}`, options)
  const dependencies : DependenciesResponseType = await res.json()
  return Response.json(dependencies)
}
