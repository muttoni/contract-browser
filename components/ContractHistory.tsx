
import Link from "next/link";
import { ArrowUpRight, Diff, FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { timeSince, formatDate, getContractAddress, getContractName, ellipsify, cn } from "@/lib/utils";
import { useContract } from "@/hooks/useContract";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import DiffEditor from "./editor/diff";

export default function ContractHistory({uuid}) {
  const contract = useContract(uuid)

  return (
  <div className="w-full">
  {contract && contract.deploymentsObject && contract.deploymentsObject.deployments && contract.deploymentsObject.deployments.length > 0 ?
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
    if(!deployments) return
    getDiffs.then((diffsToSet) => {
      setDiffs(diffsToSet)
      console.log(diffsToSet)
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
    <ol className="relative ms-2 pt-2">
      {deployments && deployments.length && deployments.sort((a, b) => new Date(b.block_timestamp).getTime() - new Date(a.block_timestamp).getTime()).map((deployment, i) => (
      <li className={cn("pb-10 ml-0 ps-10", deployment.type !== "added" ? 'border-l': '')} key={deployment.tx_id}>            
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
            <span className="font-mono text-sm py-1 px-2 ms-2 bg-muted rounded inline-flex items-center">
              {deployment.block_height}
              <ArrowUpRight className="w-4 h-4 ms-2" />
            </span>
          </Link>
        </p>

        {/* {diffs && diffs[deployment.tx_id]?.diff &&
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {diffs[deployment.tx_id]?.diff.split(/^(\+|-)/gm).length - 1} lines changed in this version.
        </p>
        } */}

        <div className="flex items-center gap-2">
        {diffs && diffs[deployment.tx_id]?.body && diffs[deployment.tx_id].body && 
          <DiffViewer 
            original={diffs[deployments[deployments.findIndex((d) => d.type === 'added')]?.tx_id]}
            current={diffs[deployment.tx_id]} 
            latest={diffs[deployments[0].tx_id]}
            previous={diffs[deployments[i + 1]?.tx_id]}
            isOriginal={i === deployments.length - 1}
            isLatest={i === 0}
            deployments={deployments}
          />
        } 
        </div>
      </li>
      ))}
    </ol>
    </>
  )
}

function DiffViewer({current, original, latest, previous, isOriginal, isLatest, deployments }) {

  const [diffType, setDiffType] = useState(isLatest ? "previous" : "latest")
  const [left, setLeft] = useState(isLatest ? previous : current)
  const [right, setRight] = useState(isLatest ? current : latest)

  useEffect(() => {
    if(diffType === "latest") {
      setLeft(current)
      setRight(latest)
    } else if(diffType === "original") {
      setLeft(original)
      setRight(current)
    } else if(diffType === "previous") {
      setLeft(previous)
      setRight(current)
    }
  },[diffType])

  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button size="sm" variant="outline">
      <Diff className="w-4 h-4 me-2" />
      View Diff
    </Button>
    </DialogTrigger>
    <Select onValueChange={setDiffType} value={diffType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={diffType + " version"} defaultValue={diffType} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Compare against...</SelectLabel>
          {!isLatest && <SelectItem value="latest">latest version</SelectItem>}
          {!isOriginal && previous && <SelectItem value="previous">previous version</SelectItem>}
          {!isOriginal && <SelectItem value="original">original version</SelectItem>}
        </SelectGroup>
      </SelectContent>
    </Select>
    <DialogContent className="min-w-[80vw]">
      <DialogHeader>
        <DialogTitle>Contract Evolution</DialogTitle>
        <DialogDescription>
          Comparing the selected version to the {diffType} version. The <strong>most recent</strong> version is always on the right.
        </DialogDescription>
      </DialogHeader>
        <div className="flex justify-between gap-3 text-center font-mono">
          <Link href={`https://flowdiver.io/${left.tx_id}`} target="_blank" className="w-full font-mono text-sm py-1 px-2 ms-2 bg-muted rounded text-center" title={left.tx_id}>
            {deployments[deployments.findIndex((t) => t.tx_id === left.tx_id)].block_height}
          </Link>
          <p className="w-10 text-muted-foreground">vs</p>
          <Link href={`https://flowdiver.io/${right.tx_id}`} target="_blank" className="w-full font-mono text-sm py-1 px-2 ms-2 bg-muted rounded text-center" title={right.tx_id}>
            {deployments[deployments.findIndex((t) => t.tx_id === right.tx_id)].block_height}
          </Link>
        </div>
      <div className="grid gap-4 h-[80vh]">
        <DiffEditor original={left.body} modified={right.body} />
      </div>
    </DialogContent>
  </Dialog>
)}