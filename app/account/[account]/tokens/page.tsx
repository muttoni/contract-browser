"use client"
import { Separator } from "@/components/ui/separator"

export default function TokensPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tokens</h3>
        <p className="text-sm text-muted-foreground">
          Tokens in this account.
        </p>
      </div>
      <Separator />
    </div>
  )
}