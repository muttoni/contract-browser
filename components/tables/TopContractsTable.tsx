import APIContractsTable from "./APIContractsTable";

export default function TopContractsTable({ network, limit = 10 }) {

  return (
    <APIContractsTable action="top" network={network} limit={limit} />
  )
}