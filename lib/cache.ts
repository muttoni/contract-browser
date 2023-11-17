export const ContractCache = {
  checkExpiry : (cacheKeys: string[]) => checkExpiry(cacheKeys),
  retrieve : (key: string) => retrieve(key),
  store : (key: string, item: any) => store(key, item),
  invalidateAllForContract : (uuid: string) => invalidateAllForContract(uuid)
}

const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours


function checkExpiry(cacheKeys: string[]) {
  const now = Date.now()
  if(!localStorage) return
  cacheKeys.forEach((key) => {
    const timestamp = localStorage.getItem(`${key}_timestamp`)
    if (timestamp && now - parseInt(timestamp) > CACHE_TTL) {
      invalidate(key)
    }
  })
}

function retrieve(key: string) {
  if(!localStorage) return
  const cachedData = localStorage.getItem(key)
  if(cachedData) {
    return JSON.parse(cachedData)
  } else {
    return null
  }
}

function store(key: string, item: any) {
  if(!localStorage) return
  localStorage.setItem(key, JSON.stringify(item))
  localStorage.setItem(`${key}_timestamp`, Date.now().toString())
}

function invalidate(key: string) {
  if(!localStorage) return
  localStorage.removeItem(key)
  localStorage.removeItem(`${key}_timestamp`)
}

function invalidateAllForContract(uuid: string) {
  if(!localStorage) return
  const keys = Object.keys(localStorage)
  keys.forEach((k) => {
    if(k.includes(uuid)) {
      localStorage.removeItem(k)
    }
  })
}