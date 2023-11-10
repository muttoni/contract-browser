
import Link from "next/link";
import { ArrowUpRight, Diff, FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { timeSince, formatDate, getContractAddress, getContractName } from "@/lib/utils";
import { useContract } from "@/hooks/useContract";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import DiffEditor from "./editor/diff";

export default function ContractHistory({uuid}) {
  const contract = useContract(uuid)

  return (
  <div className="w-full">
  {contract && contract.deploymentsObject.deployments && contract.deploymentsObject.deployments.length > 0 ?
      <ContractTimeline deployments={contract.deploymentsObject.deployments as DeploymentsType} uuid={uuid} original={contract.code} />
      : <div className="text-center text-muted-foreground py-6">No history available for this contract.</div>  }
  </div>
  )
}

type DeploymentsType = {
  block_height: number;
  block_timestamp: string;
  tx_id: string;
  type: string;
}[]

function ContractTimeline({deployments, uuid, original}) {

  const [diffs, setDiffs] = useState({} as any)

  useEffect(() => {
    let diffsToSet = {} as any
    getDiffs.then((diffsResponse) => {
      diffsResponse.contracts.map((diffResponseItem, i) => {
        // find the deployment in the deployments array that matches the tx_id in the diff array
        const deploymentIndex = deployments.findIndex((d) => d.tx_id === diffResponseItem.transaction_hash)
        // if the deployment is found, add the diff data
        if (deploymentIndex > -1) {
          diffsToSet[deployments[deploymentIndex].tx_id] = diffResponseItem.body
        }
      })
      setDiffs(diffsToSet)
    })
  }, [deployments])

  const getDiffs = fetch(`${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/graphql/`, {
    method: "POST",
    body: JSON.stringify({
      queryType: "CONTRACT_DIFFS",
      args: {
        uuid
      }
    })
  }).then((res) => res.json())

  return (
    <>
    <ol className="relative ms-2 pt-2 border-l">
      {deployments && deployments.length && deployments.sort((a, b) => new Date(b.block_timestamp).getTime() - new Date(a.block_timestamp).getTime()).map((deployment, i) => (
      <li className="mb-10 ml-6 ps-3" key={deployment.tx_id}>            
        {deployment.type === "added" ? 
          <span className="absolute flex items-center justify-center w-8 h-8 bg-green-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 dark:bg-green-900">
            <FilePlus2 className="w-4 h-4  text-green-800 dark:text-green-300" />
          </span>
          : <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </span>
        }
        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white capitalize">
          {deployment.type}
          {deployment.type === "added" && <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 ml-3">Deployment</span>}
          {i === 0 && <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">Latest</span>}
        </h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{timeSince(new Date(`${deployment.block_timestamp}`))} ago on {formatDate(new Date(`${deployment.block_timestamp}`))}</time>



        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          Contract was {deployment.type} at block height: 
          <Link href={`https://flowdiver.io/${deployment.tx_id}`}>
            <span className="font-mono text-sm py-1 px-2 ms-2 bg-muted rounded">{deployment.block_height}</span>
          </Link>
        </p>
        <div className="flex items-center gap-2">
        {diffs && diffs[deployment.tx_id] && diffs[deployment.tx_id] !== original && <DiffViewer original={diffs[deployment.tx_id]} modified={original}></DiffViewer>} 
        <Link href={`https://flowdiver.io/${deployment.tx_id}`} target="_blank">
          <Button size="sm" variant="ghost">
            View Transaction
            <ArrowUpRight className="w-4 h-4 ms-2" />
          </Button>
        </Link>
        </div>
      </li>
      ))}
    </ol>
    </>
  )
}

function DiffViewer({original, modified}) {
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button size="sm" variant="outline">
      <Diff className="w-4 h-4 me-2" />
      View Diff
    </Button>
    </DialogTrigger>
    <DialogContent className="min-w-[80vw]">
      <DialogHeader>
        <DialogTitle>Diff compared to the latest version</DialogTitle>
        <DialogDescription>
          See how this contract evolved over time. The selected version is on the left, the <strong>latest</strong> version is on the right.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 h-[80vh]">
        <DiffEditor original={original} modified={modified} />
      </div>
    </DialogContent>
  </Dialog>
)}