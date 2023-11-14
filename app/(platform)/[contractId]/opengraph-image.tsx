import { ellipsify, getContractAddress, getContractName, getNetworkFromAddress } from '@/lib/utils'
import { ImageResponse } from 'next/server'
import { VERIFIED_CONTRACTS, findContractByUUID } from '@/lib/verified-contracts'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Contract Browser'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { contractId: string } }) {
  const contractId = params.contractId as string
  const contractName = getContractName(contractId)
  const contractAddress = getContractAddress(contractId)
  const network = getNetworkFromAddress(contractAddress)
  const isVerified = !!findContractByUUID(contractId, network)

  return new ImageResponse(
    (
      <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 25,
        fontFamily: 'Inter, system-ui, sans-serif',
        color: 'white',
        background: '#f6f6f6',
        backgroundImage: 'linear-gradient(to bottom, #070a1b, #1f293b)',
        width: '100%',
        height: '100%',
        paddingTop: 50,
        paddingLeft: 50,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        letterSpacing: "-0.025em",
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        letterSpacing: 0,
        marginBottom: "4rem",
      }}
      >
        <svg width="80" height="80" style={{marginRight: "0.8rem"}} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100" fill="#25EF8E"/>
          <path d="M18.8035 73.5043L95.7265 27.3505V35.8975L18.8035 82.0513V73.5043Z" fill="white"/>
          <path d="M18.8035 87.1795L95.7265 41.0256V49.5726L18.8035 95.7265V87.1795Z" fill="white"/>
          <path d="M18.8035 102.564L95.7265 56.4103V64.9573L18.8035 111.111V102.564Z" fill="white"/>
          <path d="M18.8035 117.949L95.7265 71.7949V80.3419L18.8035 126.496V117.949Z" fill="white"/>
          <path d="M104.273 119.658L181.197 73.5043V82.0513L104.273 128.205V119.658Z" fill="white"/>
          <path d="M181.197 73.5043L104.273 27.3505V35.8975L181.197 82.0513V73.5043Z" fill="white"/>
          <path d="M164.957 78.6325L104.274 41.0256V49.5726L158.12 82.906L164.957 78.6325Z" fill="white"/>
          <path d="M152.991 85.4701L104.274 56.4103V64.9573L146.154 89.7436L152.991 85.4701Z" fill="white"/>
          <path d="M141.026 92.3077L104.273 71.7949V80.3419L134.188 96.5812L141.026 92.3077Z" fill="white"/>
          <path d="M18.8035 126.496L95.7265 172.65V164.103L18.8035 117.949V126.496Z" fill="white"/>
          <path d="M34.188 120.513L95.7264 157.265V148.718L41.0256 116.239L34.188 120.513Z" fill="white"/>
          <path d="M47.0085 113.675L95.7265 143.59V135.043L54.7009 109.402L47.0085 113.675Z" fill="white"/>
          <path d="M59.8291 106.838L95.7265 128.205V119.658L66.6667 102.564L59.8291 106.838Z" fill="white"/>
          <path d="M104.273 135.043L181.197 88.8889V97.4359L104.273 143.59V135.043Z" fill="white"/>
          <path d="M104.273 148.718L181.197 102.564V111.111L104.273 157.265V148.718Z" fill="white"/>
          <path d="M104.273 164.103L181.197 117.949V126.496L104.273 172.65V164.103Z" fill="white"/>
        </svg>
        <p tw="font-bold tracking-tighter text-5xl">
          Contract Browser 
          {/* <span tw="font-normal px-4 text-cyan-700">| Learn, Inspect, Compose</span> */}
        </p>
      </div>
      <div tw="flex flex-col">
        <p tw="text-7xl font-bold h-10 flex items-center">
          {ellipsify(contractName, 27)}
          {/* @ts-ignore */}
          {isVerified && <svg tw="mx-4" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                <linearGradient gradientTransform="rotate(333, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient">
                  <stop stopColor="#8b5cf6" stopOpacity="1" offset="0%"></stop>
                  <stop stopColor="#4338ca" stopOpacity="1" offset="100%"></stop>
                </linearGradient>
                </defs>
                  <path d="M52 26C52 21.96 49 18.63 45.11 18.09C46.12 16.75 46.73 15.09 46.73 13.28C46.73 8.85999 43.15 5.27999 38.73 5.27999C36.92 5.27999 35.26 5.88999 33.92 6.89999C33.38 3.00999 30.05 0.00999451 26.01 0.00999451C21.97 0.00999451 18.64 3.00999 18.1 6.89999C16.76 5.88999 15.1 5.27999 13.29 5.27999C8.86999 5.27999 5.28999 8.85999 5.28999 13.28C5.28999 15.09 5.89999 16.75 6.90999 18.09C3.01999 18.63 0.019989 21.96 0.019989 26C0.019989 30.04 3.01999 33.37 6.90999 33.91C5.89999 35.25 5.28999 36.91 5.28999 38.72C5.28999 43.14 8.86999 46.72 13.29 46.72C15.1 46.72 16.76 46.11 18.1 45.1C18.64 48.99 21.97 51.99 26.01 51.99C30.05 51.99 33.38 48.99 33.92 45.1C35.26 46.11 36.92 46.72 38.73 46.72C43.15 46.72 46.73 43.14 46.73 38.72C46.73 36.91 46.12 35.25 45.11 33.91C49 33.37 52 30.04 52 26ZM23 38.24L12 27.24L16.24 23L23 29.76L36.76 16L41 20.24L23 38.24Z" fill="url(#ffflux-gradient)"/>
                </svg>
          }
        </p>
        <p tw="text-5xl text-gray-200">by {contractAddress}</p>
        <span tw={`rounded-xl font-mono text-5xl text-center my-5 justify-center py-4 font-light uppercase ${network === 'testnet' ? "border-orange-600 bg-orange-400 hover:bg-orange-400 text-orange-800" : "border-green-600 bg-green-400 hover:bg-green-400 text-green-800"}`}>Deployed on {network.toUpperCase()}</span>
        <div tw="text-gray-300 text-base text-4xl">Explore this contract, and every other, on Contract Browser</div>
      </div>
    </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}