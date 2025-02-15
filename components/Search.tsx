"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  cn,
  debounce,
  getContractAddress,
  sansPrefix,
  withPrefix,
} from "@/lib/utils";
import { ContractSearchResponseType } from "@/lib/types";

import useOutsideClick from "@/hooks/useOutsideClick";

import SearchDataTable from "./tables/SearchDataTable";
import { columns } from "./tables/SearchContractTableColumns";

import { Clock, Info, SearchIcon, Wallet } from "lucide-react";

import Loading from "@/components/ui/Loading";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ContractBadge from "@/components/ui/ContractBadge";
import AddressBadge from "@/components/ui/AddressBadge";
import Link from "next/link";

export function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [network, setNetwork] = useState("mainnet");
  const [contractResultsMainnet, setContractResultsMainnet] = useState(
    {} as ContractSearchResponseType
  );
  const [contractResultsTestnet, setContractResultsTestnet] = useState(
    {} as ContractSearchResponseType
  );
  const [loadingMainnetResults, setLoadingMainnetResults] = useState(false);
  const [loadingTestnetResults, setLoadingTestnetResults] = useState(false);
  const [showSearchWindow, setShowSearchWindow] = useState(false);
  const [showEVMModal, setShowEVMModal] = useState(false);

  const [recentContracts, setRecentContracts] = useState([] as string[]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);

  const pathName = usePathname();

  const handleOutsideClick = () => {
    setShowSearchWindow(false);
  };
  const ref = useOutsideClick(handleOutsideClick);

  const isEVMAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

  const getResults = useCallback(
    debounce(async (query) => {
      setLoadingMainnetResults(true);
      setLoadingTestnetResults(true);

      const reqMainnet = fetch(
        `api/search/contracts?network=mainnet&query=${query}&offset=${offset}&limit=${limit}`
      )
        .then((res) => res.json())
        .then((res) => {
          setLoadingMainnetResults(false);
          setContractResultsMainnet(res);
        });

      const reqTestnet = fetch(
        `api/search/contracts?network=testnet&query=${query}&offset=${offset}&limit=${limit}`
      )
        .then((res) => res.json())
        .then((res) => {
          setLoadingTestnetResults(false);
          setContractResultsTestnet(res);
        });
    }, 500),
    []
  );

  useEffect(() => {
    setRecentContracts(
      JSON.parse(localStorage.getItem("recentContracts")) as string[]
    );

    if (isEVMAddress(query)) {
      setShowEVMModal(true);
    } else {
      setShowEVMModal(false);
    }

    switch (true) {
      case /^(?:0x)?[0-9a-fA-F]{8,16}$/.test(query):
        break;
      case /^(?:A\.)?[0-9a-fA-F]{8,16}\.[\w-]+$/.test(query):
        setQuery("");
        return router.push(`/${query}`);
      default:
        break;
    }

    if (query.length > 0) {
      setShowSearchWindow(true);
    }

    if (query.length > 2) {
      getResults(query);
    }
  }, [query, offset, limit]);

  useEffect(() => {
    setShowSearchWindow(false);
  }, [pathName]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm",
          showSearchWindow ? "" : "hidden"
        )}
      ></div>
      <div className="relative flex items-center z-50 w-full" ref={ref}>
        <SearchIcon
          className={cn("h-6 w-6 text-muted-foreground absolute left-4")}
        />
        <Input
          type="search"
          placeholder="Search contracts, addresses and code"
          className="w-full h-10 md:h-14 md:text-lg ps-14 ring-2 ring-muted rounded-md"
          onFocus={() => setShowSearchWindow(true)}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />

        {showSearchWindow && (recentContracts?.length || query.length > 2) ? (
          <>
            <Card className="max-h-[80vh] shadow-lg absolute overflow-auto w-full top-[38px] md:top-[50px] z-10 px-0 rounded-t-none">
              {/^(?:0x)?[0-9a-fA-F]{8,16}$/.test(query) && (
                <Link href={"/account/" + query}>
                  <div className="text-sm flex items-center gap-2 pt-2 ps-3 text-muted-foreground hover:bg-muted rounded">
                    <Wallet className="h-4 w-4 me-2" />
                    <AddressBadge
                      address={withPrefix(query)}
                      colorBasedOnNetwork={true}
                      className=""
                    />
                  </div>
                </Link>
              )}

              {recentContracts?.length > 0 && (
                <>
                  <ul className="text-sm max-h-[150px] overflow-auto mt-1">
                    {recentContracts
                      .filter((recentContract) =>
                        recentContract
                          .toLowerCase()
                          .includes(sansPrefix(query, true).toLocaleLowerCase())
                      )
                      .map((recentContract) => {
                        return (
                          <Link
                            key={recentContract}
                            href={"/" + recentContract}
                          >
                            <li className="flex items-center gap-2 py-1 ps-3 text-muted-foreground hover:bg-muted">
                              <Clock className="h-4 w-4 flex-shrink-0 me-2" />
                              <AddressBadge
                                address={getContractAddress(recentContract)}
                                colorBasedOnNetwork={true}
                              />
                              <ContractBadge uuid={recentContract} />
                            </li>
                          </Link>
                        );
                      })}
                  </ul>
                  <Separator />
                </>
              )}
              {query.length > 2 && (
                <>
                  <CardHeader className="px-2 pb-2 pt-3 md:px-2 md:pt-3">
                    <h3 className="text font-bold flex text-sm items-center justify-between">
                      <span>Search Results</span>
                      <span className="text-muted-foreground font-normal text-sm">
                        {(contractResultsMainnet?.data?.total_contracts_count ||
                          0) +
                          (contractResultsTestnet?.data
                            ?.total_contracts_count || 0)}{" "}
                        total results
                      </span>
                    </h3>
                  </CardHeader>
                  <CardContent className="px-0 md:px-0">
                    <Tabs defaultValue="mainnet" className="">
                      <div className="flex px-2">
                        <TabsList className="p-1 h-9">
                          <TabsTrigger
                            value="mainnet"
                            onClick={() => setNetwork("mainnet")}
                            className="flex items-center text-xs"
                          >
                            Mainnet{" "}
                            {loadingMainnetResults ? (
                              <Loading className="w-4 h-4 ms-2" />
                            ) : (
                              `(${
                                contractResultsMainnet?.data
                                  ?.total_contracts_count || 0
                              })`
                            )}
                          </TabsTrigger>
                          <TabsTrigger
                            value="testnet"
                            onClick={() => setNetwork("testnet")}
                            className="flex items-center text-xs"
                          >
                            Testnet{" "}
                            {loadingTestnetResults ? (
                              <Loading className="w-4 h-4 ms-2" />
                            ) : (
                              `(${
                                contractResultsTestnet?.data
                                  ?.total_contracts_count || 0
                              })`
                            )}
                          </TabsTrigger>
                        </TabsList>
                        <span
                          className={`flex gap-2 ms-4 items-center text-xs text-muted-foreground ${
                            network !== "testnet" ? "hidden" : null
                          }`}
                        >
                          <Info className="h-4 w-4" />
                          Note: Testnet API is slower
                        </span>
                      </div>

                      <TabsContent value="mainnet" className="">
                        {contractResultsMainnet &&
                        contractResultsMainnet?.data?.contracts?.length &&
                        contractResultsMainnet?.data?.contracts?.length > 0 ? (
                          <SearchDataTable
                            data={contractResultsMainnet?.data?.contracts}
                            columns={columns}
                            onRowClick={(row) => router.push("/" + row.uuid)}
                          />
                        ) : (
                          <div
                            className={cn(
                              "text-sm block pt-4 text-center pb-8 text-muted-foreground",
                              loadingMainnetResults ? "hidden" : ""
                            )}
                          >
                            No results.
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="testnet" className="">
                        {contractResultsTestnet &&
                        contractResultsTestnet?.data?.contracts?.length &&
                        contractResultsTestnet?.data?.contracts?.length > 0 ? (
                          <SearchDataTable
                            data={contractResultsTestnet?.data?.contracts}
                            columns={columns}
                            onRowClick={(row) => router.push("/" + row.uuid)}
                          />
                        ) : (
                          <div
                            className={cn(
                              "text-sm block pt-4 pb-8 text-muted-foreground",
                              loadingTestnetResults ? "hidden" : ""
                            )}
                          >
                            No results.
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </>
              )}
            </Card>
          </>
        ) : null}
      </div>

      {showEVMModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 float-right"
              onClick={() => setShowEVMModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              EVM Input Detected
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              It looks like you&apos;ve entered an EVM address or transaction hash.
              Flow supports both Cadence and EVM environments. To locate your
              address or transaction details, please use the appropriate EVM
              block explorer:
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                Testnet:{" "}
                <a
                  href="https://evm-testnet.flowscan.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  EVM Testnet Explorer
                </a>
              </li>
              <li>
                Mainnet:{" "}
                <a
                  href="https://evm.flowscan.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  EVM Mainnet Explorer
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
