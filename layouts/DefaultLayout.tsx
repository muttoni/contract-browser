import { Navbar } from '@/components/Navbar'
import { Search } from '@/components/Search'
import { UserNav } from '@/components/UserNav'
import { ThemeProvider } from '@/components/ThemeProvider'

export default function DefaultLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Navbar className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        </div>
        {children}
      </main>
    </ThemeProvider>
  )
}