
import { ThemeProvider } from '@/components/ThemeProvider'
import '@/styles/globals.css'
import '@/styles/code.css'
import { ModeToggle } from '@/components/ui/ModeToggle'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CBLogo } from '@/components/CBLogo'

import type { Metadata } from 'next'
import { generateMetadataObject } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_DOMAIN),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_DOMAIN,
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    images: '/social.png',
  },
  ...generateMetadataObject("Blog", "The Contract Browser Blog")
}

export default function RootLayout({ 
  children 
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={"min-h-screen w-full bg-background font-sans antialiased"}
      >
      <div className="absolute z-0 w-full h-full bg-gradient-to-b from-purple-950 to-transparent opacity-5 pointer-events-none"></div>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container px-4 md:px-8 lg:px-16 min-h-screen w-full flex flex-col">
          <div className="flex-col py-2 md:py-4 md:flex">
            <div className="flex items-center gap-4">
            <Link href="/blog" className="flex items-center text-sm space-x-2 font-medium transition-colors hover:text-primary">
              <CBLogo />
              <span className="text-lg inline-block leading-tighter tracking-tighter whitespace-nowrap"><span className='hidden md:inline-block me-1'>Contract Browser </span>Blog</span>
            </Link>
            <ModeToggle />
              <div className="ml-auto flex items-center space-x-4">
                <Link href="/">
                  <Button variant="outline">Go to Contract Browser &rarr;</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-1 w-full pt-3 lg:pt-5">
            </div>
          </div>
          {children}
        </main>
      </ThemeProvider>
        </body>
      </html>
  )
}