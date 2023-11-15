"use client"
import { columns } from "@/components/tables/VerifiedContractTableColumns";
import { DataTable } from "@/components/tables/DataTable";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { VERIFIED_CONTRACTS } from "@/lib/verified-contracts";
import Link from "next/link";

export default function VerifiedContracts() {

  return (
    <div className="grid">
      <div>
        <div className="py-6">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">Verified <VerifiedBadge size={6} /></h2>
          <p className="text-muted-foreground">Below are the currently verified contracts on Contract Browser. Verify your contract today by submitting a PR <Link href="https://github.com/muttoni/contract-browser/blob/main/lib/verified-contracts.ts" target="_blank" className="font-bold underline">here</Link></p>
        </div>
          {/* @ts-ignore */}
          <DataTable columns={columns} data={Object.values(VERIFIED_CONTRACTS)} />
      </div>
  </div>
  )
}