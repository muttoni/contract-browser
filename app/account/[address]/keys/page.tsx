"use client"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAccount } from "hooks/useAccount"
import { Key } from "lucide-react"
import { useParams } from "next/navigation"

const fmtCurve = i =>
  ({
    1: "ECDSA_P256",
    2: "ECDSA_secp256k1",
  }[i] || "--" + i)

const fmtHash = i =>
  ({
    1: "SHA2_256",
    3: "SHA3_256",
  }[i] || "--")

  export function Keys() {
    const { address } = useParams()
    const account = useAccount(address)
  
    const keys = account?.keys ? account?.keys: []
  
    return (
        <>
          {(keys || []).map(key => (
            <Card title={key.publicKey} key={key.index}>
              <Key className="h-4 w-4 text-muted-foreground" />
              {key.revoked && (
                <span className="text-red-600">REVOKED</span>
              )}
              <p className="hashtag">KeyId: {key.index}</p>
              <p className="weight-hanging">Weight: {key.weight}/1000</p>
              <p className="wave-sine">Curve: {fmtCurve(key.signAlgo)}</p>
              <p className="blender">Hash: {fmtHash(key.hashAlgo)}</p>
              <p className="dna">Sequence Number: {key.sequenceNumber}</p>
            </Card>
          ))}
        </>
    )
  }

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