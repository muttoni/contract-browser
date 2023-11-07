"use client"
import { Navbar } from '@/components/Navbar'
import { Search } from '@/components/Search'
import { UserNav } from '@/components/UserNav'
import { ThemeProvider } from '@/components/ThemeProvider'
import { RecoilRoot } from 'recoil'
import '@/styles/globals.css'
import '@/styles/code.css'
//import '../config/fcl'

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
      <RecoilRoot>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container px-4 md:px-8 lg:px-16 min-h-screen w-full flex flex-col">
          <div className="flex-col py-2 md:py-4 md:flex">
            <div className="flex items-center">
              <Navbar className="" />
              <div className="ml-auto flex items-center space-x-4">
                <UserNav />
              </div>
            </div>
            <div className="flex flex-1 w-full pt-3 lg:pt-5">
            <Search /> 
            </div>
          </div>
          {children}
        </main>
      </ThemeProvider>
        </RecoilRoot>
        </body>
      </html>
  )
}