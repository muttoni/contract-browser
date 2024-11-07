export default `

import FungibleToken from 0xFungibleToken 

access(all) fun main(addr: Address): {String: AnyStruct} {
  let acct = getAuthAccount<auth(Storage) &Account>(addr)
  let ret: {String: AnyStruct} = {}
  ret["capacity"] = acct.storage.capacity
  ret["used"] = acct.storage.used
  ret["available"] = 0
  if acct.storage.capacity > acct.storage.used {
    ret["available"] = acct.storageCapacity - acct.storageUsed
  }
  var ft : [{String:AnyStruct}] = []

  acct.forEachStored(fun (path: StoragePath, type: Type): Bool {
    if !type.isRecovered && type.isSubtype(of: Type<@FungibleToken.Vault>()) {
      var vault = acct.storage
        .borrow<&FungibleToken.Vault>(from:path)!
      ft.append({"path": path, "balance": vault.balance})
    }
    return true
  })
  
  ret["ft"] = ft
  
  //find profile
  var findProfile = acct.storage.borrow<&AnyResource>(from:/storage/findProfile)
  ret["find"] = findProfile
  
  return ret
}

`;
