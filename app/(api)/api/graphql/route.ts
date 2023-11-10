import { gql, Client, cacheExchange, fetchExchange } from '@urql/core';

const QUERIES = {
  'CONTRACT_DIFFS': gql`
    query Diffs ($uuid : String) {
      contracts(
        order_by: {valid_from: desc}, 
        where: { 
          identifier: { _eq: $uuid}
        }
      ) {
        ,transaction_hash
        ,body
      }
    }
  `, 
}

const client = new Client({
  url: process.env.FLOWDIVER_API_DOMAIN,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    return {
      headers: { authorization: `Bearer ${process.env.FLOWDIVER_API_KEY}` },
    };
  },
});

export async function POST(req: Request) {
  const { queryType, args } = await req.json();
  const result = await client.query(QUERIES[queryType], args ? args : null);
  return Response.json(result?.data)
}