"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      <div className="flex align-middle items-center justify-between">
      <div>
        <h3 className="text-lg font-medium">Contracts</h3>
        <p className="text-sm text-muted-foreground">
          Contracts deployed to this account.
        </p>
      </div>
      <Button size="sm"><Plus className="h-4 w-4 me-2" /> Deploy a new contract</Button>
      </div>
      <Separator />

    </div>
  )
}