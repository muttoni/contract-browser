import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function withPrefix(address) {
  if (address == null) return null
  return "0x" + sansPrefix(cleanAddress(address))
}

export function sansPrefix(address, dontClean = false) {
  if (address == null) return null
  if (dontClean) return address.replace(/^0x/, "")
  return cleanAddress(address).replace(/^0x/, "")
}

/* global BigInt */

export function areAddressesEqual(address1, address2){
  return withPrefix(address1) === withPrefix(address2)
}

export function cleanAddress(addr : string, withPrefix: boolean = true) {
  var address = addr.replace(/^0x/, "")
  while (address.length<16){
    address = "0" + address
  }
  if(withPrefix) address = "0x" + address
  return address
}

export function formatNumber(input: number): string {
  return input.toLocaleString("en-US")
}

export function formatFlowBalance(input: number): string {
  return (parseFloat(input.toString() || "0") / 10e7).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })
}

export function storageCapacity(storage): {used: number, capacity: number, percentage: number} {
  let used = storage?.used ?? 1
  let capacity = storage?.capacity ?? 1
  return {
    used,
    capacity,
    percentage : ((used / capacity) * 100)
  }
}
export function getContractName(uuid) {
  return uuid ? uuid.split(".")[2] : ''
}
export function getContractAddress(uuid) {
  return uuid ? "0x" + uuid.split(".")[1] : ''
}

export function ellipsify(str, maxLength = 35) {
  if (str.length > maxLength) {
    return str.substr(0, Math.floor(maxLength * 0.66)) + '...' + str.substr(str.length- Math.floor(maxLength * 0.33), str.length);
  }
  return str;
}

export function formatStorageSize(input: number): string {
  const kb = 1024
  const mb = kb * 1024
  const gb = mb * 1024

  if (input < kb) {
    return `${input} bytes`
  } else if (input < mb) {
    return `${(input / kb).toFixed(2)} KB`
  } else if (input < gb) {
    return `${(input / mb).toFixed(2)} MB`
  } else {
    return `${(input / gb).toFixed(2)} GB`
  }
}
export function timeSince(date: Date) {
  var seconds = Math.floor((new Date() as any - +date) / 1000);
  var interval = seconds / 31536000;

  if (interval >= 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? " year" : " years");
  }

  interval = seconds / 2592000;
  if (interval >= 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? " month" : " months");
  }

  interval = seconds / 86400;
  if (interval >= 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? " day" : " days");
  }

  interval = seconds / 3600;
  if (interval >= 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? " hour" : " hours");
  }

  interval = seconds / 60;
  if (interval >= 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? " minute" : " minutes");
  }

  return Math.floor(seconds) + (Math.floor(seconds) === 1 ? " second" : " seconds");
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

// [n,k,d]-Linear code parameters
// The linear code used in the account addressing is a [64,45,7]
// It generates a [64,45]-code, which is the space of Flow account addresses.
//
// n is the size of the code words in bits,
// which is also the size of the account addresses in bits.
const linearCodeN = 64

// Columns of the parity-check matrix H of the [64,45]-code used for Flow addresses.
// H is a (n x p) matrix with coefficients in GF(2), each column is converted into
// a big endian integer representation of the GF(2) column vector.
// H is used to verify a code word is a valid account address.
const parityCheckMatrixColumns = [
	0x00001, 0x00002, 0x00004, 0x00008,
	0x00010, 0x00020, 0x00040, 0x00080,
	0x00100, 0x00200, 0x00400, 0x00800,
	0x01000, 0x02000, 0x04000, 0x08000,
	0x10000, 0x20000, 0x40000, 0x7328d,
	0x6689a, 0x6112f, 0x6084b, 0x433fd,
	0x42aab, 0x41951, 0x233ce, 0x22a81,
	0x21948, 0x1ef60, 0x1deca, 0x1c639,
	0x1bdd8, 0x1a535, 0x194ac, 0x18c46,
	0x1632b, 0x1529b, 0x14a43, 0x13184,
	0x12942, 0x118c1, 0x0f812, 0x0e027,
	0x0d00e, 0x0c83c, 0x0b01d, 0x0a831,
	0x0982b, 0x07034, 0x0682a, 0x05819,
	0x03807, 0x007d2, 0x00727, 0x0068e,
	0x0067c, 0x0059d, 0x004eb, 0x003b4,
	0x0036a, 0x002d9, 0x001c7, 0x0003f,
].map(BigInt)

const NETWORK_CODEWORDS = {
  "mainnet": BigInt(0),
  "testnet": BigInt("0x6834ba37b3980209"),
  "emulator": BigInt("0x1cb159857af02018")
}

const NETWORKS = new Set(["mainnet", "testnet"])

export function getNetworkFromAddress(address){
  var result = null;
  NETWORKS.forEach(element => {
    if (isValidAddressForNetwork({address:withPrefix(address), network: element})){
      result = element;
    }
  });
  return result;
}

export function getCleanLocation(window) {
  return window?.location?.origin + window?.location?.pathname?.replace(/\/+$/, "")
}

export function isValidAddressForNetwork({
  address,
  network
}) {
  if (!address) throw new Error("isValidAddressForNetwork({ address }) -- address is required")
  if (typeof address !== "string") throw new Error("isValidAddressForNetwork({ address }) -- address must be a string")
  if (!network) throw new Error("isValidAddressForNetwork({ network }) -- network is required")
  if (typeof network !== "string") throw new Error("isValidAddressForNetwork({ network }) -- network must be a string")

  if (!(NETWORKS.has(network))) throw new Error(`isValidAddressForNetwork({ network }) -- network=${network} is not supported`)

  let networkCodeword = NETWORK_CODEWORDS[network]
  if (typeof networkCodeword === "undefined") throw new Error(`isValidAddressForNetwork -- Could not find network codeword for network=${network}`)

	let codeWord = BigInt(address)
	codeWord ^= networkCodeword

	if (codeWord === BigInt(0)) {
		return false
	}

	// Multiply the code word GF(2)-vector by the parity-check matrix
	let parity = BigInt(0)
	for (let i = 0; i < linearCodeN; i++) {
		if ((codeWord & BigInt(1)) === BigInt(1)) {
			parity ^= parityCheckMatrixColumns[i]
		}
		codeWord >>= BigInt(1)
	}

	return (parity === BigInt(0)) && (codeWord === BigInt(0))
}

export function debounce(func, wait, immediate = false) {
  var timeout;

    return (...args) => {
      var context = this;

      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
};

export function calculateStringSizeInBytes(str: string): number {
  return new Blob([str]).size;
}
