import {useEffect} from "react"
import {atom, useRecoilState} from "recoil"
import * as fcl from "@onflow/fcl"

export const currentUser = atom({
  key: "CURRENT_USER",
  default: {addr: null, cid: null, loggedIn: false},
})

export function useCurrentUser() {
  const [$data, setData] = useRecoilState(currentUser)

  useEffect(() => {
    const subscription = fcl.currentUser().subscribe(setData);
    return () => {
      (subscription as any).unsubscribe();
    };
  }, [setData]);

  const user = {
    logIn: fcl.logIn,
    logOut: fcl.unauthenticate,
    signUp: fcl.signUp,
    changeUser: fcl.reauthenticate,
    ...$data,
  }

  return user
}