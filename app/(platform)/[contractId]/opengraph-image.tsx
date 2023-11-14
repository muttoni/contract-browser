import { OGContractTemplate } from '@/components/OGContractTemplate'
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
export default async function Image() {

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          letterSpacing: 0,
        }}
        >
          <svg width="100" height="100" style={{marginRight: "1rem"}} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <p tw="font-bold tracking-tighter">Contract Browser</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}