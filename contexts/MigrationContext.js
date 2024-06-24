"use client"
import { getContractAddress } from '@/lib/utils';
import React, { createContext, useState, useEffect, useContext } from 'react';

const MigrationContext = createContext();

export const MigrationProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/crescendo/staged');
        const result = await response.json();

        if (result.error) {
          setError(result.error);
        } else {
          const contracts = result.map(row => row.CONTRACT);
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

          setData({
            contracts,
            addresses,
            contractsByAddress
          });
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
