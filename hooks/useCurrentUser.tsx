import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"

export const currentUser = {addr: null, cid: null, loggedIn: false}

export function useCurrentUser() {
  const [user, setUser] = useState(currentUser)

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [setUser]);

  return user
}