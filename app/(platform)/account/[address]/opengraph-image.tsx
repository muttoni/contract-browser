import { getNetworkFromAddress } from '@/lib/utils'
import { ImageResponse } from 'next/server'

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
export default async function Image({ params }: { params: { address: string } }) {
  const address = params.address as string
  const network = getNetworkFromAddress(address)

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
          <path d="M20 73.7L93 31V49.7692L20 92V73.7Z" fill="white"/>
          <path d="M71.8212 106.292L93.8302 118.857L93.8306 136.943L56.0802 115.38L71.8212 106.292Z" fill="white"/>
          <path d="M20 126.3L93 169V150.231L20 108V126.3Z" fill="white"/>
          <path d="M20 104L93 63.0569V81.1427L20 122V104Z" fill="white"/>
          <path d="M181 126.3L107 169V150.231L181 108V126.3Z" fill="white"/>
          <path d="M128.906 93.7083L106.897 81.1427L106.897 63.0569L144.647 84.6202L128.906 93.7083Z" fill="white"/>
          <path d="M181 73.7L107 31V49.7692L181 92V73.7Z" fill="white"/>
          <path d="M181 96L107 136.943V118.857L181 78V96Z" fill="white"/>
        </svg>
        <p tw="font-bold tracking-tighter text-5xl">
          Contract Browser 
          {/* <span tw="font-normal px-4 text-cyan-700">| Learn, Inspect, Compose</span> */}
        </p>
      </div>
      <div tw="flex flex-col">
        <p tw="text-8xl font-bold h-10 flex items-center">
          {address}
        </p>
        <span tw={`rounded-xl font-mono text-5xl text-center my-10 justify-center py-4 font-light uppercase ${network === 'testnet' ? "border-orange-600 bg-orange-400 hover:bg-orange-400 text-orange-800" : "border-green-600 bg-green-400 hover:bg-green-400 text-green-800"}`}>{network.toUpperCase()}</span>
        <div tw="text-gray-300 text-base text-4xl my-10">view this account, and every other, on Contract Browser</div>
      </div>
    </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}