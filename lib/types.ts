export type DependantsResponseType = {
  contract: {
    code: number,
    data: {
      dependants: any[],
      total_dependants_count: number,
      uuid: string
    }
  }
}

export type DependenciesResponseType = {
  dependants: {
    code: number;
    data: {
      dependencies: string[];
      total_dependants_count: number;
      uuid: string;
    };
  };
};


export type ContractResponseType = {
  contract: {
    code: number;
    data: {
      address: string;
      code: string;
      dependants_count: number;
      dependencies_count: number;
      events: any[];
      name: string;
      uuid: string;
    };
  };
};

export type StatusResponseType = {
  status: {
    code: number;
    data: {
      contract_amount: number;
      last_sync_at: string;
      network: string;
      synced_height: number;
    };
  };
}

export type Contract = {
	dependants_count: number;
	dependencies_count: number;
	uuid: string;
}

export type ContractSearchResponseType = {
	code: number;
	data: {
    contracts: Contract[],
    total_contracts_count: number
  }
}