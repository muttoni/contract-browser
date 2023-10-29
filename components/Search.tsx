import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function Search() {
  return (
<>
  <Input
      type="search"
      placeholder="Search..."
      className="w-full h-14 text-lg"
    />
  <SearchIcon className="h-8 w-8 text-muted-foreground ml-[-45px] mt-[10px]" />
</>

  )
}