import { getContractAddress } from "@/lib/utils";
import { FlipsideResponse } from "@/lib/types";

export async function GET() {

  const options = {
    method: 'GET'
  };

  const res = await fetch(`${process.env.FLIPSIDE_QUERY_URL}?tok=${Math.floor(Math.random()*10000)} `, options)
  const stagedContracts : FlipsideResponse = await res.json()

  return Response.json(stagedContracts)
}
