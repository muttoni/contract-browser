const { Flipside } = require("@flipsidecrypto/sdk");

// Initialize `Flipside` with your API key
const flipside = new Flipside(
  process.env.FLIPSIDE_API_KEY,
  "https://api-v2.flipsidecrypto.xyz"
);

const sql = `
-- Visualization of valid staged contracts.
  -- Staging Events:
    -- Stage: Counted as staged.
    -- Replace: Counted as staged.
    -- Unstage: Not counted as staged.
    -- Contracts that have not historically had Stage/Replace events: Not counted as staged.

WITH StagedContracts AS (
    SELECT DISTINCT event_data:contract AS contract
    FROM flow.core.fact_events
    WHERE block_timestamp > '2024-04-01'
        AND event_type ILIKE '%StagingStatusUpdated%'
        AND event_contract = 'A.56100d46aa9b0212.MigrationContractStaging'
        AND event_data:action = 'stage'
)

SELECT 
    x.event_contract as contract, 
    CASE 
        WHEN x.contract_name IN (
            'FlowEpoch', 
            'FlowIDTableStaking', 
            'FlowQC', 
            'FlowDKG', 
            'FlowServiceAccount', 
            'NodeVersionBeacon', 
            'RandomBeaconHistory', 
            'FlowStorageFees', 
            'FlowStakingCollection', 
            'StakingProxy', 
            'LockedTokens', 
            'FlowFees', 
            'FlowToken', 
            'FungibleToken', 
            'FungibleTokenMetadataViews', 
            'NonFungibleToken', 
            'MetadataViews', 
            'ViewResolver', 
            'FungibleTokenSwitchboard', 
            'EVMContract', 
            'Burner'
        ) 
        OR EXISTS (SELECT 1 FROM StagedContracts sc WHERE sc.contract = x.contract_name) 
        THEN 'Yes' 
        ELSE 'No' 
    END AS staged
FROM flow.core.dim_contract_labels x
WHERE staged = 'Yes'


-- Visualization of the total percentage/number of Active Mainnet Contracts staged.
  -- Active Contracts Criteria:
  -- Last 30 days snapshot of all transactions and their dependencies/imports to identify contract addresses.
  -- Union with contracts that have emitted at least one event in the last 30 days.

-- Visualization of the percentage/number of Most Depended on Contracts staged (10+ dependencies).
-- Visualization of valid staged contracts.
  -- Staging Events:
    -- Stage: Counted as staged.
    -- Replace: Counted as staged.
    -- Unstage: Not counted as staged.
    -- Contracts that have not historically had Stage/Replace events: Not counted as staged.

-- Total number of active contracts and their list.
-- Visualization of the percentage/number of unmaintained contracts (data to be provided).
`

export async function GET() {
  // Send the `Query` to Flipside's query engine and await the results
  // const queryResultSet = await flipside.query.run({sql: sql});

  const queryResultSet = {"error":null,"queryId":"clxt6kv6j268zn40twecm4mbb","status":"finished","columns":["contract","staged","__row_index"],"columnTypes":["string","string","number"],"rows":[["A.82ed1b9cba5bb1b3.BYPRODUCT","Yes",0],["A.9212a87501a8a6a2.OrdinalVendor","Yes",1],["A.8624b52f9ddcd04a.FlowEpoch","Yes",2],["A.82ed1b9cba5bb1b3.DUNK","Yes",3],["A.9212a87501a8a6a2.FlowverseTreasures","Yes",4],["A.82ed1b9cba5bb1b3.TS","Yes",5],["A.1654653399040a61.FlowToken","Yes",6],["A.8624b52f9ddcd04a.FlowIDTableStaking","Yes",7],["A.82ed1b9cba5bb1b3.VO_SALES","Yes",8],["A.8f4f599546e2d7eb.MEDI","Yes",9],["A.82ed1b9cba5bb1b3.ACCO_SOLEIL","Yes",10],["A.e467b9dd11fa00df.FlowStorageFees","Yes",11],["A.82ed1b9cba5bb1b3.VO_LEGAL","Yes",12],["A.9212a87501a8a6a2.Ordinal","Yes",13],["A.1dc37ab51a54d83f.HeroesOfTheFlow","Yes",14],["A.82ed1b9cba5bb1b3.VO_IDEATION","Yes",15],["A.82ed1b9cba5bb1b3.VO_GA2","Yes",16],["A.09e8665388e90671.TixologiTickets","Yes",17],["A.82ed1b9cba5bb1b3.MEGAMI","Yes",18],["A.82ed1b9cba5bb1b3.SORACHI_BASE","Yes",19],["A.82ed1b9cba5bb1b3.MEDI","Yes",20],["A.9212a87501a8a6a2.FlowverseShirt","Yes",21],["A.8f4f599546e2d7eb.WE_PIN","Yes",22],["A.82ed1b9cba5bb1b3.VO_DOCUMENTATION","Yes",23],["A.82ed1b9cba5bb1b3.VO_RESEARCH","Yes",24],["A.a6ee47da88e6cbde.IconoGraphika","Yes",25],["A.82ed1b9cba5bb1b3.TOM","Yes",26],["A.8624b52f9ddcd04a.FlowDKG","Yes",27],["A.3cb7ceeb625a600a.FungibleTokenSwitchboard","Yes",28],["A.736de6f27d825c02.PEYE","Yes",29],["A.f919ee77447b7497.FlowFees","Yes",30],["A.8d0e87b65159ae63.FlowStakingCollection","Yes",31],["A.8d0e87b65159ae63.LockedTokens","Yes",32],["A.82ed1b9cba5bb1b3.Karatv2","Yes",33],["A.82ed1b9cba5bb1b3.DWLC","Yes",34],["A.82ed1b9cba5bb1b3.TNP","Yes",35],["A.82ed1b9cba5bb1b3.Karat","Yes",36],["A.5a0c531f9a64f3ce.FlowToken","Yes",37],["A.9212a87501a8a6a2.FlowversePrimarySaleV2","Yes",38],["A.82ed1b9cba5bb1b3.PEYE","Yes",39],["A.9212a87501a8a6a2.FlowversePrimarySale","Yes",40],["A.82ed1b9cba5bb1b3.EDGE","Yes",41],["A.f233dcee88fe0abe.FungibleTokenSwitchboard","Yes",42],["A.82ed1b9cba5bb1b3.Sorachi","Yes",43],["A.82ed1b9cba5bb1b3.Story","Yes",44],["A.56100d46aa9b0212.MigrationContractStaging","Yes",45],["A.82ed1b9cba5bb1b3.VO_GA","Yes",46],["A.82ed1b9cba5bb1b3.IAT","Yes",47],["A.31aed847945124fd.LockedTokens","Yes",48],["A.7a9442be0b3c178a.Boneyard","Yes",49],["A.82ed1b9cba5bb1b3.JOSHIN","Yes",50],["A.9212a87501a8a6a2.BulkPurchase","Yes",51],["A.82ed1b9cba5bb1b3.WE_PIN","Yes",52],["A.82ed1b9cba5bb1b3.MARK","Yes",53],["A.e467b9dd11fa00df.FlowServiceAccount","Yes",54],["A.82ed1b9cba5bb1b3.VO_FINANCE","Yes",55],["A.82ed1b9cba5bb1b3.REREPO","Yes",56],["A.82ed1b9cba5bb1b3.MCH","Yes",57],["A.82ed1b9cba5bb1b3.AIICOSMPLG","Yes",58],["A.82ed1b9cba5bb1b3.EBISU","Yes",59],["A.82ed1b9cba5bb1b3.MRFRIENDLY","Yes",60],["A.82ed1b9cba5bb1b3.KaratNFT","Yes",61],["A.9212a87501a8a6a2.FlowversePass","Yes",62]],"runStats":{"startedAt":"2024-06-24T16:17:14.000Z","endedAt":"2024-06-24T16:17:17.000Z","elapsedSeconds":3,"queryExecStartedAt":"2024-06-24T16:17:14.000Z","queryExecEndedAt":"2024-06-24T16:17:17.000Z","streamingStartedAt":"2024-06-24T16:17:17.000Z","streamingEndedAt":"2024-06-24T16:17:17.000Z","queuedSeconds":1,"streamingSeconds":0,"queryExecSeconds":3,"bytes":"3390","recordCount":63},"records":[{"contract":"A.82ed1b9cba5bb1b3.BYPRODUCT","staged":"Yes","__row_index":0},{"contract":"A.9212a87501a8a6a2.OrdinalVendor","staged":"Yes","__row_index":1},{"contract":"A.8624b52f9ddcd04a.FlowEpoch","staged":"Yes","__row_index":2},{"contract":"A.82ed1b9cba5bb1b3.DUNK","staged":"Yes","__row_index":3},{"contract":"A.9212a87501a8a6a2.FlowverseTreasures","staged":"Yes","__row_index":4},{"contract":"A.82ed1b9cba5bb1b3.TS","staged":"Yes","__row_index":5},{"contract":"A.1654653399040a61.FlowToken","staged":"Yes","__row_index":6},{"contract":"A.8624b52f9ddcd04a.FlowIDTableStaking","staged":"Yes","__row_index":7},{"contract":"A.82ed1b9cba5bb1b3.VO_SALES","staged":"Yes","__row_index":8},{"contract":"A.8f4f599546e2d7eb.MEDI","staged":"Yes","__row_index":9},{"contract":"A.82ed1b9cba5bb1b3.ACCO_SOLEIL","staged":"Yes","__row_index":10},{"contract":"A.e467b9dd11fa00df.FlowStorageFees","staged":"Yes","__row_index":11},{"contract":"A.82ed1b9cba5bb1b3.VO_LEGAL","staged":"Yes","__row_index":12},{"contract":"A.9212a87501a8a6a2.Ordinal","staged":"Yes","__row_index":13},{"contract":"A.1dc37ab51a54d83f.HeroesOfTheFlow","staged":"Yes","__row_index":14},{"contract":"A.82ed1b9cba5bb1b3.VO_IDEATION","staged":"Yes","__row_index":15},{"contract":"A.82ed1b9cba5bb1b3.VO_GA2","staged":"Yes","__row_index":16},{"contract":"A.09e8665388e90671.TixologiTickets","staged":"Yes","__row_index":17},{"contract":"A.82ed1b9cba5bb1b3.MEGAMI","staged":"Yes","__row_index":18},{"contract":"A.82ed1b9cba5bb1b3.SORACHI_BASE","staged":"Yes","__row_index":19},{"contract":"A.82ed1b9cba5bb1b3.MEDI","staged":"Yes","__row_index":20},{"contract":"A.9212a87501a8a6a2.FlowverseShirt","staged":"Yes","__row_index":21},{"contract":"A.8f4f599546e2d7eb.WE_PIN","staged":"Yes","__row_index":22},{"contract":"A.82ed1b9cba5bb1b3.VO_DOCUMENTATION","staged":"Yes","__row_index":23},{"contract":"A.82ed1b9cba5bb1b3.VO_RESEARCH","staged":"Yes","__row_index":24},{"contract":"A.a6ee47da88e6cbde.IconoGraphika","staged":"Yes","__row_index":25},{"contract":"A.82ed1b9cba5bb1b3.TOM","staged":"Yes","__row_index":26},{"contract":"A.8624b52f9ddcd04a.FlowDKG","staged":"Yes","__row_index":27},{"contract":"A.3cb7ceeb625a600a.FungibleTokenSwitchboard","staged":"Yes","__row_index":28},{"contract":"A.736de6f27d825c02.PEYE","staged":"Yes","__row_index":29},{"contract":"A.f919ee77447b7497.FlowFees","staged":"Yes","__row_index":30},{"contract":"A.8d0e87b65159ae63.FlowStakingCollection","staged":"Yes","__row_index":31},{"contract":"A.8d0e87b65159ae63.LockedTokens","staged":"Yes","__row_index":32},{"contract":"A.82ed1b9cba5bb1b3.Karatv2","staged":"Yes","__row_index":33},{"contract":"A.82ed1b9cba5bb1b3.DWLC","staged":"Yes","__row_index":34},{"contract":"A.82ed1b9cba5bb1b3.TNP","staged":"Yes","__row_index":35},{"contract":"A.82ed1b9cba5bb1b3.Karat","staged":"Yes","__row_index":36},{"contract":"A.5a0c531f9a64f3ce.FlowToken","staged":"Yes","__row_index":37},{"contract":"A.9212a87501a8a6a2.FlowversePrimarySaleV2","staged":"Yes","__row_index":38},{"contract":"A.82ed1b9cba5bb1b3.PEYE","staged":"Yes","__row_index":39},{"contract":"A.9212a87501a8a6a2.FlowversePrimarySale","staged":"Yes","__row_index":40},{"contract":"A.82ed1b9cba5bb1b3.EDGE","staged":"Yes","__row_index":41},{"contract":"A.f233dcee88fe0abe.FungibleTokenSwitchboard","staged":"Yes","__row_index":42},{"contract":"A.82ed1b9cba5bb1b3.Sorachi","staged":"Yes","__row_index":43},{"contract":"A.82ed1b9cba5bb1b3.Story","staged":"Yes","__row_index":44},{"contract":"A.56100d46aa9b0212.MigrationContractStaging","staged":"Yes","__row_index":45},{"contract":"A.82ed1b9cba5bb1b3.VO_GA","staged":"Yes","__row_index":46},{"contract":"A.82ed1b9cba5bb1b3.IAT","staged":"Yes","__row_index":47},{"contract":"A.31aed847945124fd.LockedTokens","staged":"Yes","__row_index":48},{"contract":"A.7a9442be0b3c178a.Boneyard","staged":"Yes","__row_index":49},{"contract":"A.82ed1b9cba5bb1b3.JOSHIN","staged":"Yes","__row_index":50},{"contract":"A.9212a87501a8a6a2.BulkPurchase","staged":"Yes","__row_index":51},{"contract":"A.82ed1b9cba5bb1b3.WE_PIN","staged":"Yes","__row_index":52},{"contract":"A.82ed1b9cba5bb1b3.MARK","staged":"Yes","__row_index":53},{"contract":"A.e467b9dd11fa00df.FlowServiceAccount","staged":"Yes","__row_index":54},{"contract":"A.82ed1b9cba5bb1b3.VO_FINANCE","staged":"Yes","__row_index":55},{"contract":"A.82ed1b9cba5bb1b3.REREPO","staged":"Yes","__row_index":56},{"contract":"A.82ed1b9cba5bb1b3.MCH","staged":"Yes","__row_index":57},{"contract":"A.82ed1b9cba5bb1b3.AIICOSMPLG","staged":"Yes","__row_index":58},{"contract":"A.82ed1b9cba5bb1b3.EBISU","staged":"Yes","__row_index":59},{"contract":"A.82ed1b9cba5bb1b3.MRFRIENDLY","staged":"Yes","__row_index":60},{"contract":"A.82ed1b9cba5bb1b3.KaratNFT","staged":"Yes","__row_index":61},{"contract":"A.9212a87501a8a6a2.FlowversePass","staged":"Yes","__row_index":62}],"page":{"currentPageNumber":1,"currentPageSize":63,"totalRows":63,"totalPages":1}}
  
  return new Response(JSON.stringify(queryResultSet), {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=43200',
      'CDN-Cache-Control': 'public, s-maxage=43200',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=43200',
    },
  });
}
