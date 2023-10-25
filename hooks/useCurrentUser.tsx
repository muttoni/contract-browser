import * as fcl from '@onflow/fcl'
import { CurrentUser } from '@onflow/typedefs'
import { useEffect, useState } from 'react'

export default function useCurrentUser(): CurrentUser {
  const [user, setUser] = useState<CurrentUser>({
    addr: null,
    cid: null,
    expiresAt: null,
    f_type: null,
    f_vsn: null,
    loggedIn: false,
    services: []
  })

  useEffect(() => {
    fcl.currentUser.subscribe(setUser)
  }, [])

  return user
}