import { DNZResponse } from "@/lib/types";
import { sansPrefix } from "@/lib/utils";

export async function GET() {

  const options = {
    method: 'GET'
  };

  const res = await fetch(`${process.env.DNZ_STAGE_URL}`, options)
  const response : DNZResponse = await res.json()

  return Response.json(response, {
    headers: {
      'Cache-Control': 'public, s-maxage=500',
      'CDN-Cache-Control': 'public, s-maxage=500',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=500',
    },
  })
}
