export const VERIFIED_CONTRACTS = {
  "FlowToken": {
    "address": {
      "testnet": "0x7e60df042a9c0868",
      "mainnet": "0x1654653399040a61"
    },
    "uuid": {
      "testnet": "A.7e60df042a9c0868.FlowToken",
      "mainnet": "A.1654653399040a61.FlowToken",
    },
    "name": "FlowToken",
    "metadata": {
      "name": "Flow Token",
      "description": `This is the contract that defines the network token for Flow. This token is used for account creation fees, transaction fees, staking, and more. It is implemented as a regular smart contract so that it can be easily used just like any other token in the network. See the \[flow fungible token repository\](https\:\/\/github.com/onflow/flow-ft) for more information.`,
    } 
  },
  "FungibleToken": {
    "address": {
      "testnet": "0x9a0766d93b6608b7",
      "mainnet": "0xf233dcee88fe0abe"
    },
    "uuid": {
      "testnet": "A.9a0766d93b6608b7.FungibleToken",
      "mainnet": "A.f233dcee88fe0abe.FungibleToken",
    },
    "name": "FungibleToken",
    "metadata": {
      "name": "Fungible Token",
      "description": `The FungibleToken contract implements the Fungible Token Standard. It is the second contract ever deployed on Flow.`,
    } 
  },
  "NonFungibleToken": {
    "address": {
      "testnet": "0x631e88ae7f1d7c20",
      "mainnet": "0x1d7e57aa55817448"
    },
    "uuid": {
      "testnet": "A.631e88ae7f1d7c20.NonFungibleToken",
      "mainnet": "A.1d7e57aa55817448.NonFungibleToken",
    },
    "name": "NonFungibleToken",
    "metadata": {
      "name": "Non-Fungible Token Interface",
      "description": `The NonFungibleToken contract lets you create a non-custodial Resource (NFT) marketplace on the FLOW blockchain. NFTStorefrontV2 makes it simple for Sellers to list NFTs in dApp specific marketplaces. DApp developers leverage the APIs provided by the contract to manage listings being offered for sale and to transact NFT trades.`,
    } 
  },
  "NFTStorefrontV2": {
    "address": {
      "testnet": "0x2d55b98eb200daef",
      "mainnet": "0x4eb8a10cb9f87357"
    },
    "uuid": {
      "testnet": "A.2d55b98eb200daef.NFTStorefrontV2",
      "mainnet": "A.4eb8a10cb9f87357.NFTStorefrontV2",
    },
    "name": "NFTStorefrontV2",
    "metadata": {
      "name": "NFT Storefront Smart Contract",
      "description": `The NFTStorefrontV2 contract lets you create a non-custodial Resource (NFT) marketplace on the FLOW blockchain. NFTStorefrontV2 makes it simple for Sellers to list NFTs in dApp specific marketplaces. DApp developers leverage the APIs provided by the contract to manage listings being offered for sale and to transact NFT trades.`,
    } 
  },
  "MetadataViews": {
    "address": {
      "testnet": "0x631e88ae7f1d7c20",
      "mainnet": "0x1d7e57aa55817448"
    },
    "uuid": {
      "testnet": "A.631e88ae7f1d7c20.MetadataViews",
      "mainnet": "A.1d7e57aa55817448.MetadataViews",
    },
    "name": "MetadataViews",
    "metadata": {
      "name": "NFT Metadata Contract",
      "description": `The MetadataViews contract implements the Fungible Token Standard. It is the second contract ever deployed on Flow.`,
    } 
  },
  "FlowStorageFees": {
    "address": {
      "testnet": "0x8c5303eaa26202d6",
      "mainnet": "0xe467b9dd11fa00df"
    },
    "uuid": {
      "testnet": "A.8c5303eaa26202d6.StorageFeeContract",
      "mainnet": "A.e467b9dd11fa00df.StorageFeeContract"
    },
    "name": "FlowStorageFees",
    "metadata": {
      "name": "Storage Fee Contract",
      "description": "This contract defines fees that are spent to pay for the storage that an account uses. There is a minimum balance that an account needs to maintain in its main FlowToken Vault in order to pay for the storage it uses. You can see more docs about storage capacity and fees here."
    }
  },
  "FlowFees": {
    "address": {
      "testnet": "0x912d5440f7e3769e",
      "mainnet": "0xf919ee77447b7497"
    },
    "uuid": {
      "testnet": "A.912d5440f7e3769e.FlowTransactionFee",
      "mainnet": "A.f919ee77447b7497.FlowTransactionFee"
    },
    "name": "FlowFees",
    "metadata": {
      "name": "Flow Transaction Fee Contract",
      "description": "This contract defines fees that are spent for executing transactions and creating accounts."
    }
  },
  "FlowServiceAccount": {
    "address": {
      "testnet": "0x8c5303eaa26202d6",
      "mainnet": "0xe467b9dd11fa00df"
    },
    "uuid": {
      "testnet": "A.8c5303eaa26202d6.FlowServiceAccount",
      "mainnet": "A.e467b9dd11fa00df.FlowServiceAccount"
    },
    "name": "FlowServiceAccount",
    "metadata": {
      "name": "Service Account Contract",
      "description": "This contract manages account creation and flow token initialization. It enforces temporary requirements for which accounts are allowed to create other accounts, and provides common functionality for flow tokens."
    }
  },
  "FlowIDTableStaking": {
    "address": {
      "testnet": "0x9eca2b38b18b5dfe",
      "mainnet": "0x8624b52f9ddcd04a"
    },
    "uuid": {
      "testnet": "A.9eca2b38b18b5dfe.FlowIDTableStaking",
      "mainnet": "A.8624b52f9ddcd04a.FlowIDTableStaking"
    },
    "name": "FlowIDTableStaking",
    "metadata": {
      "name": "Flow ID Table Staking Contract",
      "description": "These contracts manage the list of identities that correspond to node operators in the Flow network as well as the process for adding and removing nodes from the network via Epochs. Each node identity stakes tokens with these contracts, and also gets paid rewards with their contracts. This contract also manages the logic for users to delegate their tokens to a node operator and receive their own rewards."
    }
  },
  "FlowEpoch": {
    "address": {
      "testnet": "0x9eca2b38b18b5dfe",
      "mainnet": "0x8624b52f9ddcd04a"
    },
    "uuid": {
      "testnet": "A.9eca2b38b18b5dfe.FlowIDTableStaking",
      "mainnet": "A.8624b52f9ddcd04a.FlowIDTableStaking"
    },
    "name": "FlowEpoch",
    "metadata": {
      "name": "Flow ID Table Staking Contract",
      "description": "These contracts manage the list of identities that correspond to node operators in the Flow network as well as the process for adding and removing nodes from the network via Epochs. Each node identity stakes tokens with these contracts, and also gets paid rewards with their contracts. This contract also manages the logic for users to delegate their tokens to a node operator and receive their own rewards."
    },
  },
  "LockedTokens": {
    "address": {
      "testnet": "0x95e019a17d0e23d7",
      "mainnet": "0x8d0e87b65159ae63"
    },
    "uuid": {
      "testnet": "A.95e019a17d0e23d7.FlowLockedTokens",
      "mainnet": "A.8d0e87b65159ae63.FlowLockedTokens"
    },
    "name": "LockedTokens",
    "metadata": {
      "name": "Locked Tokens Contract",
      "description": "This contract manages the two year lockup of Flow tokens that backers purchased in the initial token sale in October of 2020. See more documentation about LockedTokens here."
    }
  },
  "FlowStakingCollection": {
    "address": {
      "testnet": "0x95e019a17d0e23d7",
      "mainnet": "0x8d0e87b65159ae63"
    },
    "uuid": {
      "testnet": "A.95e019a17d0e23d7.FlowStakingCollection",
      "mainnet": "A.8d0e87b65159ae63.FlowStakingCollection"
    },
    "name": "Flow Staking Collection Contract",
    "metadata": {
      "name": "Flow Staking Collection Contract",
      "description": "A Staking Collection is a resource that allows its owner to manage multiple staking objects in a single account via a single storage path, and perform staking and delegation actions using both locked and unlocked Flow."
    }
  }
  
}
  
export function findContractByUUID(uuid: string, network:string = "mainnet") {
  for (const [contractName, contract] of Object.entries(VERIFIED_CONTRACTS)) {
    if (contract.uuid[network] === uuid) {
      return contract
    }
  }
  return null
}

export function getVerifiedContractAddressByName(name: string, network:string = "mainnet") {
  for (const [contractName, contract] of Object.entries(VERIFIED_CONTRACTS)) {
    if (contractName === name) {
      return contract.address[network]
    }
  }
  return null
}

export function isVerified(uuid: string) {
  return findContractByUUID(uuid, "mainnet") !== null || findContractByUUID(uuid, "testnet") !== null
}


