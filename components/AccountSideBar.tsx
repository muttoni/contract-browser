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


const renderers = {
  'coming-soon': (item) => (
    <Button
      disabled={true}
      variant="ghost"
      key={item.title}
      className="justify-start"
    >
      {item.title}
      <sup className="text-xs text-muted-foreground">WIP</sup>
    </Button>
  ),
  'link-out': (item) => (
    <a
      key={item.href}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "justify-start hover:bg-transparent hover:underline"
      )}
    >
      {item.title}&nbsp;<span> &#8599;</span>
    </a>
  ),
  default: (item, pathname) => (
    <Link
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
  ),
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const renderer = renderers[item.type] || renderers.default;
        return renderer(item, pathname);
      })}
    </nav>
  );
}