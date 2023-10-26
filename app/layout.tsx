"use client"
import { Navbar } from '@/components/Navbar'
import { Search } from '@/components/Search'
import { UserNav } from '@/components/UserNav'
import { ThemeProvider } from '@/components/ThemeProvider'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'

// Import FCL config
import '../config/fcl'

export default function RootLayout({ 
  children 
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={"min-h-screen bg-background font-sans antialiased"}
      >
    <RecoilRoot>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className="container mx-auto">
        <div className="flex-col p-8 md:flex">
          <div className="flex h-16 items-center">
            <Navbar className="me-6" />
            <Search />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
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