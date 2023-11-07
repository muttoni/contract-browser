"use client"
import CadenceBlock from "@/components/ui/CadenceBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContract } from "@/hooks/useContract";
import { getContractName } from "@/lib/utils";
import { useParams } from "next/navigation"
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SnippetsPage() {
  const contractId = useParams().contractId as string
  const contract = useContract(contractId)
  const [ type, setType ] = React.useState("event")

  function getCountByType(type: string) {
    return contract?.snippetsObject?.snippets?.filter(snippet => snippet.type === type)?.length || 0
  }

  return (
    <>
    <div>
      <h3 className="text-lg font-medium">Snippets</h3>
      <p className="text-sm text-muted-foreground">
      Understand the anatomy of {getContractName(contractId)} by going through its building blocks.
      </p>
    </div>
    
    <div
      className={"group relative my-4 flex flex-col space-y-2"}
    >
      <Tabs defaultValue={type} className="relative mr-auto w-full" onValueChange={setType}>
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="event"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Events ({getCountByType("event")})
            </TabsTrigger>
            <TabsTrigger
              value="resource"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Resources ({getCountByType("resource")})
            </TabsTrigger>
            <TabsTrigger
              value="function"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Functions ({getCountByType("function")})
            </TabsTrigger>
            <TabsTrigger
              value="resource_interface"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Interfaces ({getCountByType("resource_interface")})
            </TabsTrigger>

            <TabsTrigger
              value="struct"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Structs ({getCountByType("struct")})
            </TabsTrigger>
          </TabsList>
        </div>

        {contract && contract.snippetsObject && (
        <>
          <TabsContent value={type} className="">
          <Accordion type="multiple" className="w-full">
            {contract.snippetsObject.snippets.filter(snippet => snippet.type === type).sort((a, b) => b.contracts_count - a.contracts_count).map((snippet, index) => (
              <AccordionItem key={snippet.code_hash} value={snippet.code_hash}>
                <AccordionTrigger className="">
                  <div>
                    <span className="font-mono">{snippet.name}</span>
                    <span className="text-muted-foreground text-xs ms-2">(used by {snippet.contracts_count} contracts)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CadenceBlock code={snippet.code} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
            {/* <ul>
              {contract.snippetsObject.snippets.filter(snippet => snippet.type === type).map((snippet, index) => (
                <li>
                  <div><CadenceBlock code={snippet.code} /></div>
                </li>
              ))}
            </ul> */}
          </TabsContent>
        </>
        )}
      </Tabs>
    </div>

    </>
    )
  }