"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    type: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        !item.type || item.type !== 'coming-soon' ? <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start",
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          )}
        >
          {item.title}
        </Link>
        :
        <Button disabled={true} variant="ghost" key={item.title}
          className="justify-start">
          {item.title}<sup className="text-xs text-muted-foreground">WIP</sup>
        </Button>
      ))}
    </nav>
  )
}