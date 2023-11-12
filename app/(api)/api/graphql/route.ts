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
        ,diff
      }
    }
  `, 
}

const DATA_FUNCTIONS = {
  'CONTRACT_DIFFS': (data) => {
    let diffObject = {}
    data.contracts.forEach((contract) => {
      diffObject[contract.transaction_hash] = {
        tx_id: contract.transaction_hash,
        body: contract.body,
        //diff: contract.diff,
      }
    })
    return diffObject
  }
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
  return Response.json(DATA_FUNCTIONS[queryType](result?.data))
}