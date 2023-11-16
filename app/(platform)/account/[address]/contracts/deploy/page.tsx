"use client"
import * as fcl from '@onflow/fcl'
import CodeEditor from '@/components/CodeEditor'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useParams } from 'next/navigation'
import { LogIn } from 'lucide-react'
import { getNetworkFromAddress } from '@/lib/utils'
import { getNetworkConfig } from '@/hooks/useNetwork'
import Link from 'next/link'

export default function DeploymentPage () {
  const address = useParams().address as string
  const currentUser = useCurrentUser()
  
  function handleLogin() {
    if(currentUser) {
      fcl.unauthenticate()
    }
    const network = getNetworkFromAddress(address)
    fcl.config(getNetworkConfig(network))
    fcl.authenticate()
  }

  return (
    <>
      {currentUser && currentUser.addr === address && 
      <div className='mb-4 h-full'>
        <h3 className="text-lg font-medium">Deploy a new contract</h3>
        <p className="text-sm text-muted-foreground">
          Paste or upload your contract code here and click &quot;Deploy&quot; to deploy it to the blockchain.
        </p>
        <div className='h-full mt-4'>
        <CodeEditor mustBeAuthedToViewCode={true} />
        </div>
      </div>}
      {!currentUser || currentUser?.addr !== address && 
      <div className="text-center text-muted-foreground mt-4 flex flex-col items-center gap-3">
          You must be logged in as the account owner to deploy a contract to this account.

          <div className="mt-4"></div>
          <Button onClick={handleLogin} className="">
            <LogIn className="h-4 w-4 me-2" />
            <span className="hidden md:inline-block">Authenticate as {address}</span>
          </Button>

          {currentUser?.addr && 
          <Link href={`/account/${currentUser.addr}/contracts/deploy`}>
            <Button variant='outline'>Deploy a contract to {currentUser.addr}</Button>
          </Link>
          }
      </div>}
    </>
  );
};

