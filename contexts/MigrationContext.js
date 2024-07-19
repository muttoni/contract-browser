"use client"
import { getContractAddress, sansPrefix } from '@/lib/utils';
import React, { createContext, useState, useEffect, useContext } from 'react';

const MigrationContext = createContext();

export const MigrationProvider = ({ children }) => {
  const [data, setData] = useState({
    contracts : [],
    addresses: [],
    contractsByAddress: {},
    contractDetails: []
  });
  const [error, setError] = useState(null);
  
  
  function cleanMainnet(result) {
    let contracts = result.map(row => row.CONTRACT);
    contracts = contracts.concat([
        "A.8624b52f9ddcd04a.FlowEpoch",
        "A.8624b52f9ddcd04a.FlowIDTableStaking",
        "A.8624b52f9ddcd04a.FlowEpoch",
        "A.8624b52f9ddcd04a.FlowDKG",
        "A.e467b9dd11fa00df.FlowServiceAccount",
        "A.e467b9dd11fa00df.NodeVersionBeacon",
        "A.e467b9dd11fa00df.RandomBeaconHistory",
        "A.e467b9dd11fa00df.FlowStorageFees",
        "A.8d0e87b65159ae63.FlowStakingCollection",
        "A.62430cf28c26d095.StakingProxy",
        "A.8d0e87b65159ae63.LockedTokens",
        "A.f919ee77447b7497.FlowFees",
        "A.1654653399040a61.FlowToken",
        "A.f233dcee88fe0abe.FungibleTokenMetadataViews",
        "A.f233dcee88fe0abe.FungibleToken",
        "A.631e88ae7f1d7c20.NonFungibleToken",
        "A.1d7e57aa55817448.NonFungibleToken",
        "A.631e88ae7f1d7c20.MetadataViews",
        "A.1d7e57aa55817448.MetadataViews",
        "A.1d7e57aa55817448.ViewResolver",
        "A.f233dcee88fe0abe.FungibleTokenSwitchboard",
        "A.f233dcee88fe0abe.Burner"
    ])
      const addresses = result.map(row => getContractAddress(row.CONTRACT));
    
    // Reduce to create contractsByAddress
    const contractsByAddress = contracts.reduce((acc, contract, index) => {
      const address = addresses[index];
      if (!acc[address]) {
        acc[address] = [];
      }
      acc[address].push(contract);
      return acc;
    }, {});
    
    return {
      contracts,
      addresses,
      contractsByAddress
    }
    
  }
  
  function cleanTestnet(response) {
    const contracts = response.map(item => `A.${(sansPrefix(item.account_address))}.${item.contract_name}`);
    const addresses = response.map(item => item.account_address);

    // Reduce to create contractsByAddress
    const contractsByAddress = contracts.reduce((acc, contract, index) => {
      const address = addresses[index];
      if (!acc[address]) {
        acc[address] = [];
      }
      acc[address].push(contract);
      return acc;
    }, {});
    
    // Access kind and error when looking up a contract
    const contractDetails = contracts.reduce((acc, contract, index) => {
      acc[contract] = {
        kind: response[index].kind,
        error: response[index].error,
      };
      return acc;
    },{});

    return {
      contracts,
      addresses,
      contractsByAddress,
      contractDetails
    }
  }
  
  useEffect(() => {

    
    const fetchData = async () => {
      let testnetData;
      let mainnetData;
      
      try {
        let fetchKey = 'dnzDailyData';
        let lastFetchKey = fetchKey + '-lastFetch';
        
        const localData = JSON.parse(localStorage.getItem(fetchKey));
        const lastFetch = localStorage.getItem(lastFetchKey);
        
        if (localData && lastFetch && new Date().getTime() - new Date(lastFetch).getTime() < 24 * 60 * 60 * 1000) {
          testnetData = localData;
        } else {

          const res = await fetch("/api/crescendo/staged/testnet");
          const response = await res.json();
          
          if (response.error) {
            throw new Error('Network response was not ok');
          }
          
          testnetData = cleanTestnet(response)
          
          localStorage.setItem(fetchKey, JSON.stringify(testnetData));
          localStorage.setItem(lastFetchKey, new Date().toISOString());
        }
        
        const mainnetres = await fetch('/api/crescendo/staged');
        const mainnetresult = await mainnetres.json();

        if (mainnetresult.error) {
          setError(result.error);
        } else {
          mainnetData = cleanMainnet(mainnetresult);
          
          const finalData = {
            contracts: [].concat(mainnetData.contracts, testnetData.contracts),
            addresses: [].concat(mainnetData.addresses, testnetData.addresses),
            contractsByAddress: { ...mainnetData.contractsByAddress, ...testnetData.contractsByAddress},
            contractDetails: testnetData.contractDetails,
            mainnetStagedCount: mainnetData.contracts.length,
            testnetStagedCount: testnetData.contracts.length,
          }
          setData(finalData);
        }
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <MigrationContext.Provider value={{ data, error }}>
    {children}
    </MigrationContext.Provider>
  );
};

export const useMigration = () => useContext(MigrationContext);
