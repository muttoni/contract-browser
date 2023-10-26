"use client"
import { Separator } from "@/components/ui/separator"

export default function KeysPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Keys</h3>
        <p className="text-sm text-muted-foreground">
          Keys associated with this account.
        </p>
      </div>
      <Separator />
    </div>
  )
}