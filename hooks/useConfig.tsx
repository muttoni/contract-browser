import * as fcl from '@onflow/fcl'
import { useEffect, useState } from 'react'

export default function useConfig(): { network: string | null } {
  const [network, setNetwork] = useState<string|null>(null)

  useEffect(() => {
    async function getConfig() {
      const flowNetwork = await fcl.config.get('flow.network')
      setNetwork(flowNetwork)
    }
    getConfig()
  }, [])

  return { network }
}