/* VERIFY YOUR CONTRACT BY CREATING A PR FOLLOWING THE SCHEMA BELOW */

export const VERIFIED_CONTRACTS = {

  // CORE FLOW CONTRACTS
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
      "authors": [
        "Flow Team"
      ],
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
      "authors": [
        "Flow Team"
      ],
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
      "testnet": "A.8c5303eaa26202d6.FlowStorageFees",
      "mainnet": "A.e467b9dd11fa00df.FlowStorageFees"
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
      "testnet": "A.912d5440f7e3769e.FlowFees",
      "mainnet": "A.f919ee77447b7497.FlowFees"
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
      "testnet": "A.9eca2b38b18b5dfe.FlowEpoch",
      "mainnet": "A.8624b52f9ddcd04a.FlowEpoch"
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
      "testnet": "A.95e019a17d0e23d7.LockedTokens",
      "mainnet": "A.8d0e87b65159ae63.LockedTokens"
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
  },
  "MigrationContractStaging": {
    "address": {
      "testnet": "0x2ceae959ed1a7e7a",
      "mainnet": "0x56100d46aa9b0212",
    },
    "uuid": {
      "testnet": "A.2ceae959ed1a7e7a.MigrationContractStaging",
      "mainnet": "A.56100d46aa9b0212.MigrationContractStaging",
    },
    "name": "Migration Contract Staging",
    "metadata": {
      "name": "Migration Contract Staging Contract",
      "description":
        "Used as a staging ground for Cadence 1.0 migration, this contract allows for a contract's updated Cadence 1.0 code to be staged and retrieved. Contracts MUST be staged here to be updated at the Cadence 1.0 milestone.",
    },
  },

  // FLOW SUPPORTED RANDOMNESS
  "RandomBeaconHistory": {
    "address": {
      "testnet": "0x8c5303eaa26202d6",
      "mainnet": "0xe467b9dd11fa00df"
    },
    "uuid": {
      "testnet": "A.8c5303eaa26202d6.RandomBeaconHistory",
      "mainnet": "A.e467b9dd11fa00df.RandomBeaconHistory"
    },
    "name": "Random Beacon History Contract",
    "metadata": {
      "name": "Random Beacon History Contract",
      "description": "This contract stores the history of random sources generated by the Flow network on a per-block bases. The defined Heartbeat resource is updated by the Flow Service Account at the end of every block with that block's source of randomness. Consider using a PRG where unique values per block are desired & commit-reveal schemes where reversion on results might occur."
    },
  },
  "Xorshift128plus": {
    "address": {
      "testnet": "0xed24dbe901028c5c",
      "mainnet": "0x45caec600164c9e6"
    },
    "uuid": {
      "testnet": "A.ed24dbe901028c5c.Xorshift128plus",
      "mainnet": "A.45caec600164c9e6.Xorshift128plus"
    },
    "name": "Xorshift128plus Pseudo-Random Number Generator Contract",
    "metadata": {
      "name": "Xorshift128plus Pseudo-Random Number Generator Contract",
      "description": "Defines a xorsift128+ pseudo random generator (PRG) struct used to generate random numbers given some source of randomness and salt byte arrays. See RandomBeaconHistory contract for secure sources of randomness on a per-block basis. Consider commit-reveal scheme where reversion on results might occur."
    }
  },

  // HYBRID CUSTODY CONTRACTS
  "HybridCustody": {
    "address": {
      "testnet": "0x294e44e1ec6993c6",
      "mainnet": "0xd8a7e05a7ac670c0"
    },
    "uuid": {
      "testnet": "A.294e44e1ec6993c6.HybridCustody",
      "mainnet": "A.d8a7e05a7ac670c0.HybridCustody"
    },
    "name": "Hybrid Custody Contract",
    "metadata": {
      "name": "Hybrid Custody Contract",
      "description": "This contract enables account linking accounts in a child parent relationship where the child account defines a the scope of access a parent account can have on its behalf. Once claimed, the parent can access permitted assets and perform actions on behalf of the child account."
    }
  },
  "CapabilityDelegator": {
    "address": {
      "testnet": "0x294e44e1ec6993c6",
      "mainnet": "0xd8a7e05a7ac670c0"
    },
    "uuid": {
      "testnet": "A.294e44e1ec6993c6.CapabilityDelegator",
      "mainnet": "A.d8a7e05a7ac670c0.CapabilityDelegator"
    },
    "name": "Capability Delegator Contract",
    "metadata": {
      "name": "Capability Delegator Contract",
      "description": "CapabilityDelegator is a contract used to share Capabiltities to other accounts. It is used by the HybridCustody contract to allow more flexible sharing of Capabilities when an app wants to share things that aren't the NFT-standard interface types."
    }
  },
  "CapabilityFactory": {
    "address": {
      "testnet": "0x294e44e1ec6993c6",
      "mainnet": "0xd8a7e05a7ac670c0"
    },
    "uuid": {
      "testnet": "A.294e44e1ec6993c6.CapabilityFactory",
      "mainnet": "A.d8a7e05a7ac670c0.CapabilityFactory"
    },
    "name": "Capability Factory Contract",
    "metadata": {
      "name": "Capability Factory Contract",
      "description": "This contract defines a Factory interface and a Manager resource to contain Factory implementations, as well as a Getter interface for retrieval of contained Factories. Constructs in this contract are used in HybridCustody to access capabilities from underlying linked accounts."
    }
  },
  "CapabilityFilter": {
    "address": {
      "testnet": "0x294e44e1ec6993c6",
      "mainnet": "0xd8a7e05a7ac670c0"
    },
    "uuid": {
      "testnet": "A.294e44e1ec6993c6.CapabilityFilter",
      "mainnet": "A.d8a7e05a7ac670c0.CapabilityFilter"
    },
    "name": "Capability Filter Contract",
    "metadata": {
      "name": "Capability Filter Contract",
      "description": "CapabilityFilter defines `Filter` intended to determine if a given Capability type is allowed by the implementation. This contract was designed with the HybridCustody contract in mind, enabling child accounts to set up filters for the types of Capabilities that can be shared with parent accounts."
    }
  },

  // FLOW REWARDS
  "FlowRewards": {
    "address": {
      "testnet": "0x2e7cfb413f04382f",
      "mainnet": "0xa45ead1cf1ca9eda"
    },
    "uuid": {
      "testnet": "A.2e7cfb413f04382f.FlowRewards",
      "mainnet": "A.a45ead1cf1ca9eda.FlowRewards"
    },
    "name": "Flow Rewards NFT Contract",
    "metadata": {
      "name": "Flow Rewards NFT Contract",
      "description": "The official Flow Rewards NFT contract enabling the locking and claiming FLOW rewards and more."
    }
  },
  "FlowRewardsMetadataViews": {
    "address": {
      "testnet": "0x2e7cfb413f04382f",
      "mainnet": "0xa45ead1cf1ca9eda"
    },
    "uuid": {
      "testnet": "A.2e7cfb413f04382f.FlowRewardsMetadataViews",
      "mainnet": "A.a45ead1cf1ca9eda.FlowRewardsMetadataViews"
    },
    "name": "Flow Rewards NFT Metadata Views Contract",
    "metadata": {
      "name": "Flow Rewards NFT Metadata Views Contract",
      "description": "Supporting metadata views and data structures for the Flow Rewards NFT Contract"
    }
  },
  "FlowRewardsRegistry": {
    "address": {
      "testnet": "0x2e7cfb413f04382f",
      "mainnet": "0xa45ead1cf1ca9eda"
    },
    "uuid": {
      "testnet": "A.2e7cfb413f04382f.FlowRewardsRegistry",
      "mainnet": "A.a45ead1cf1ca9eda.FlowRewardsRegistry"
    },
    "name": "Flow Rewards Registry",
    "metadata": {
      "name": "Flow Rewards Registry",
      "description": "Constructs to support storage of Flow Rewards NFT lockup data and summaries."
    }
  },
  "FlowRewardsModels": {
    "address": {
      "testnet": "0x2e7cfb413f04382f",
      "mainnet": "0xa45ead1cf1ca9eda"
    },
    "uuid": {
      "testnet": "A.2e7cfb413f04382f.FlowRewardsModels",
      "mainnet": "A.a45ead1cf1ca9eda.FlowRewardsModels"
    },
    "name": "Flow Rewards Models",
    "metadata": {
      "name": "Flow Rewards Models",
      "description": "Supporting reward and distribution models for the Flow Rewards NFT Contract"
    }
  },
  "FlowRewardsValets": {
    "address": {
      "testnet": "0x2e7cfb413f04382f",
      "mainnet": "0xa45ead1cf1ca9eda"
    },
    "uuid": {
      "testnet": "A.2e7cfb413f04382f.FlowRewardsValets",
      "mainnet": "A.a45ead1cf1ca9eda.FlowRewardsValets"
    },
    "name": "Flow Rewards Valets",
    "metadata": {
      "name": "Flow Rewards Valets",
      "description": "Reward distribution valets supporting claims and rewards for the Flow Rewards NFT Contract"
    }
  },

  // USDC
  "FiatToken": {
    "address": {
      "testnet": "0xa983fecbed621163",
      "mainnet": "0xb19436aae4d94622"
    },
    "uuid": {
      "testnet": "A.a983fecbed621163.FiatToken",
      "mainnet": "A.b19436aae4d94622.FiatToken"
    },
    "name": "FiatToken",
    "metadata": {
      "name": "USDC Contract on Flow",
      "description": "The CENTRE Fiat Token, USDC on Flow",
      "url": "https://github.com/flow-usdc/flow-usdc",
    }
  },

  // EMERALD CITY
  "EmeraldPass": {
    "address": {
      "testnet": "0x692e8e2f2f8db5b6",
      "mainnet": "0x6a07dbeb03167a13"
    },
    "uuid": {
      "testnet": "A.692e8e2f2f8db5b6.EmeraldPass",
      "mainnet": "A.6a07dbeb03167a13.EmeraldPass"
    },
    "name": "EmeraldPass",
    "metadata": {
      "name": "Emerald Pass Contract",
      "description": `
        The official Emerald Pass contract. Access premium features across Emerald City tools and education by having an active subscription.
        Purchase or learn more about Emerald Pass: https://pass.ecdao.org/
        Created by Emerald City DAO: https://ecdao.org/`
    }
  },
  "FLOAT": {
    "address": {
      "testnet": "0x0afe396ebc8eee65",
      "mainnet": "0x2d4c3caffbeab845"
    },
    "uuid": {
      "testnet": "A.0afe396ebc8eee65.FLOAT",
      "mainnet": "A.2d4c3caffbeab845.FLOAT"
    },
    "name": "FLOAT",
    "metadata": {
      "name": "The FLOAT Contract",
      "description": `This contract is for FLOAT, a proof of participation platform on Flow. It is similar to POAP, but a lot, lot cooler. ;)`
    }
  },

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


