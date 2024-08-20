import { DNZResponse } from "@/lib/types";
import { sansPrefix } from "@/lib/utils";

export async function GET() {

  const options = {
    method: 'GET'
  };

  const res = await fetch(`${process.env.DNZ_STAGE_URL}`, options)
  if(!res.ok) return; 
  const response : DNZResponse = await res.json()

  return Response.json(response)
}
