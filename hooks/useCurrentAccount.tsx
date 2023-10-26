"use client"
import * as fcl from '@onflow/fcl'
import { Account } from '@onflow/typedefs'

import { useEffect, useState } from 'react'

export default function useCurrentAccount() : Account {
  const [currentAccount, setCurrentAccount] = useState<Account>({
    address: null,
    balance: null,
    code: null,
    contracts: null,
    keys: null,
  })

  useEffect(() => {
    fcl.currentUser.subscribe(async (user) => {
      if(!user?.addr) {
        console.log("no user")
        return
      } 
      const accountObject = await fcl.account(user?.addr)
      setCurrentAccount(accountObject)

      console.log(currentAccount)
    }
    )
  }, [])

  return currentAccount 
}