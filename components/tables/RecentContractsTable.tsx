import APIContractsTable from "./APIContractsTable";

export default function RecentContractsTable({ network, limit = 10 }) {

  return (
    <APIContractsTable action="recent" network={network} limit={limit} />
  )
}