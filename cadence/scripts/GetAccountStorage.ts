export default `

import FungibleToken from 0xFungibleToken 

pub fun main(addr: Address): {String: AnyStruct} {
  let acct = getAccount(addr)
  let ret: {String: AnyStruct} = {}
  ret["capacity"] = acct.storageCapacity
  ret["used"] = acct.storageUsed
  ret["available"]  = 0
  if acct.storageCapacity>acct.storageUsed{
      ret["available"] = acct.storageCapacity - acct.storageUsed
  }
  var ft : [{String:AnyStruct}] = []
  
  getAuthAccount(addr).forEachStored(fun (path: StoragePath, type: Type): Bool {
      if type.isSubtype(of: Type<@FungibleToken.Vault>()){
          var vault = getAuthAccount(addr).borrow<&FungibleToken.Vault>(from:path)!
          ft.append({"path":path, "balance":vault.balance})
      }
      return true
  })
  
  ret["ft"] = ft
  
  //find profile
  var findProfile = getAuthAccount(addr).borrow<&AnyResource>(from:/storage/findProfile)
  ret["find"] = findProfile
  
  return ret
}

`