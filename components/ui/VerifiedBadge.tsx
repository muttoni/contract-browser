import Link from "next/link"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"

export const VerifiedBadge = ({ size = 3 }) => {
  return ( <HoverCard>
            <HoverCardTrigger asChild>
            <svg width="52" height="52" className={`h-${size} w-${size} `} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <linearGradient gradientTransform="rotate(333, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient">
              <stop stop-color="#8b5cf6" stop-opacity="1" offset="0%"></stop>
              <stop stop-color="#4338ca" stop-opacity="1" offset="100%"></stop>
            </linearGradient>
            </defs>
              <path d="M52 26C52 21.96 49 18.63 45.11 18.09C46.12 16.75 46.73 15.09 46.73 13.28C46.73 8.85999 43.15 5.27999 38.73 5.27999C36.92 5.27999 35.26 5.88999 33.92 6.89999C33.38 3.00999 30.05 0.00999451 26.01 0.00999451C21.97 0.00999451 18.64 3.00999 18.1 6.89999C16.76 5.88999 15.1 5.27999 13.29 5.27999C8.86999 5.27999 5.28999 8.85999 5.28999 13.28C5.28999 15.09 5.89999 16.75 6.90999 18.09C3.01999 18.63 0.019989 21.96 0.019989 26C0.019989 30.04 3.01999 33.37 6.90999 33.91C5.89999 35.25 5.28999 36.91 5.28999 38.72C5.28999 43.14 8.86999 46.72 13.29 46.72C15.1 46.72 16.76 46.11 18.1 45.1C18.64 48.99 21.97 51.99 26.01 51.99C30.05 51.99 33.38 48.99 33.92 45.1C35.26 46.11 36.92 46.72 38.73 46.72C43.15 46.72 46.73 43.14 46.73 38.72C46.73 36.91 46.12 35.25 45.11 33.91C49 33.37 52 30.04 52 26ZM23 38.24L12 27.24L16.24 23L23 29.76L36.76 16L41 20.24L23 38.24Z" fill="url(#ffflux-gradient)"/>
            </svg>

            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col space-y-2 font-sans text-sm text-start tracking-normal">
              <div className="text-sm font-bold">This contract is verified.</div>
              <div className="text-sm text-muted-foreground font-normal">You can safely import this contract.</div>
              <Link target="_blank" href="https://github.com/muttoni/contract-browser-new/blob/main/lib/official-contracts.ts" className="text-sm text-blue-600 hover:underline">
                Verify your contract
              </Link>
            </HoverCardContent>
          </HoverCard>
  )
}


// <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="1"><defs><linearGradient gradientTransform="rotate(333, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="#8b5cf6" stop-opacity="1" offset="0%"></stop><stop stop-color="#4338ca" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
//   <feTurbulence type="fractalNoise" baseFrequency="0.001 0.001" numOctaves="1" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
//   <feGaussianBlur stdDeviation="0 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
//   <feBlend mode="overlay" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
// </filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>