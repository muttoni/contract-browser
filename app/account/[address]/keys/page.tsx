"use client"
import { Separator } from "@/components/ui/separator"
import { useAccount } from "hooks/useAccount"
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
        <Box sx={{marginLeft: 1, padding: "5px"}}>
          {(keys || []).map(key => (
            <Group title={key.publicKey} icon="key" key={key.index}>
              {key.revoked && (
                <Item icon="folder-times">
                  <Bad>REVOKED</Bad>
                </Item>
              )}
              <Item icon="hashtag">KeyId: {key.index}</Item>
              <Item icon="weight-hanging">Weight: {key.weight}/1000</Item>
              <Item icon="wave-sine">Curve: {fmtCurve(key.signAlgo)}</Item>
              <Item icon="blender">Hash: {fmtHash(key.hashAlgo)}</Item>
              <Item icon="dna">Sequence Number: {key.sequenceNumber}</Item>
            </Group>
          ))}
        </Box>
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