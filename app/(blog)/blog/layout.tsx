"use client"
import { ThemeProvider } from '@/components/ThemeProvider'
import '@/styles/globals.css'
import '@/styles/code.css'
import { ModeToggle } from '@/components/ui/ModeToggle'
import Link from 'next/link'
import Image from "next/image"

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
              <Image src="/icon.png" alt="logo" className="object-contain max-w-[32px] min-w-[32px] h-[32px] md:h-[42px] md:w-auto" width="256" height="256" /> 
              <span className="text-lg inline-block leading-tighter tracking-tighter whitespace-nowrap">Contract Browser Blog</span>
            </Link>
            <ModeToggle />
              <div className="ml-auto flex items-center space-x-4">
                <Link href="/">Go to Contract Browser &rarr;</Link>
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