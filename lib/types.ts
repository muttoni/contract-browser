export type APIResponse = {
  code: number;
  data: any;
}

export type StatusResponseType = APIResponse & {
  data: {
    contract_amount: number;
    last_sync_at: string;
    network: string;
    synced_height: number;
    contract_search_amount: number;
  };
}

export type Contract = {
	dependants_count: number;
	dependencies_count: number;
	uuid: string;
}

export type FullContract = Contract & {
  address: string;
  code: string;
  events: any[];
  name: string;
};

export type DeploymentsResult = {
  deployments: {
    block_height: number;
    block_timestamp: string;
    tx_id: string;
    type: string;
  }[];
  total_deployments_count: number;
};

export type ContractResponseType = APIResponse & {
  data: FullContract
};

export type DependantsResponseType = APIResponse & {
  data: {
    dependants: any[],
    total_dependants_count: number,
    uuid: string
  }
}

export type DependenciesResponseType = APIResponse & {
  data: {
    dependencies: string[];
    total_dependants_count: number;
    uuid: string;
  };
};

export type ContractSearchResponseType = APIResponse & {
	code: number;
	data: {
    contracts: Contract[],
    total_contracts_count: number
  }
}

export type DeploymentsResponseType = APIResponse & {
  data: DeploymentsResult
}

export type Snippet = {
  code: string;
  code_hash: string;
  contracts_count: number;
  type: string;
}

export type SnippetResponse = APIResponse & {
  data: Snippet
} 

export type SnippetsResponse = APIResponse & {
  data: Snippet[]
}

export type QUERY_TYPE = 'top' | 'ownedBy' | 'recent' | 'topByDependencies' | null

export type FlipsideResponseItem = {
  CONTRACT: string;
  STAGED: string;
}

export type FlipsideResponse = FlipsideResponseItem[];

export type DNZResponse = {
  kind: string;
  account_address: string;
  contract_name: string;
  error?: string | null;
}[]
