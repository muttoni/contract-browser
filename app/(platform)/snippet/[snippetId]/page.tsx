"use client"

import CadenceBlock from "@/components/ui/CadenceBlock"
import { Badge } from "@/components/ui/badge"
import { columns } from "@/components/tables/ContractTableColumns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSnippet } from "@/hooks/useSnippet"
import { AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion"
import { Accordion, Button } from "flowbite-react"
import { Link } from "lucide-react"
import { useParams } from "next/navigation"
import { DataTable } from "@/components/tables/DataTable"
import { Skeleton } from "@/components/ui/skeleton"

export default function SnippetPage() {
  const { snippetId } : { snippetId: string} = useParams()
  const snippet = useSnippet(snippetId)

  return (
    <div className="space-y-6 pt-4 pb-16 flex flex-col flex-1">
    <div className="space-y-2">
      <h2 className="text-3xl items-center flex gap-2 font-bold tracking-tight">
        <span className="">{snippet?.name || <Skeleton className="w-[30vw] h-10" />}</span>
      </h2>
      <div className="flex items-center">
        {snippet ? <Badge variant="secondary" className="font-mono rounded-sm text-sm">{snippet?.type}</Badge>
        : <Skeleton className="w-[100px] h-6" />}
      </div>
    </div>

    <div className="flex flex-col flex-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <Tabs defaultValue={"code"} className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
            <TabsTrigger
              value="contracts"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Contracts ({snippet?.contracts_count || 0})
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="code" className="">
          {snippet?.code ? <CadenceBlock code={snippet?.code} /> : <Skeleton className="w-full h-[400px]" />}
        </TabsContent>

        <TabsContent value="contracts" className="">
        <div className="pb-4 font-semibold">
          Contracts that use <span className="font-mono">{snippet?.name}</span>
        </div>
          <DataTable columns={columns} data={snippet?.contracts} />
        </TabsContent>

      </Tabs>
    </div>
  </div>
  )
}