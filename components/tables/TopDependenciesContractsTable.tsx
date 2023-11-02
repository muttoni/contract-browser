import APIContractsTable from "./APIContractsTable";

export default function TopDependenciesContractsTable({ network, limit = 10 }) {

  return (
    <APIContractsTable action="topByDependencies" network={network} limit={limit} />
  )
}