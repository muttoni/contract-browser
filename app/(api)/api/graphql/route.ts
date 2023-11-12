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

  "CONTRACT_STATS": gql`
    query BlockchainStats($interval: Int! = 7, $time_scale: String! = "day") {
    blockexplorer_stats(args: { interval: $interval, time_scale: $time_scale }) {
      ,contracts
      ,contracts_diff
    }
  }`
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
  },
  'CONTRACT_STATS': (data) => {
    return data.blockexplorer_stats[0]
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


const testnetClient = new Client({
  url: process.env.FLOWDIVER_TESTNET_API_DOMAIN,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    return {
      headers: { authorization: `Bearer ${process.env.FLOWDIVER_API_KEY}` },
    };
  },
});

export async function POST(req: Request) {

  const { queryType, args, network = "mainnet" } = await req.json();
  let result;
  
  if(network !== 'testnet')
    result = await client.query(QUERIES[queryType], args ? args : null);
  else
    result = await testnetClient.query(QUERIES[queryType], args ? args : null);

  return Response.json(DATA_FUNCTIONS[queryType](result?.data))
}