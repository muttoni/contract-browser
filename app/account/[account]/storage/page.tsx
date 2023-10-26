"use client"
import { Separator } from "@/components/ui/separator"

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Storage</h3>
        <p className="text-sm text-muted-foreground">
          Storage details for this account.
        </p>
      </div>
      <Separator />
    </div>
  )
}