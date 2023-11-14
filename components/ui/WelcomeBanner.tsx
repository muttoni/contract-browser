"use client"

import { Banner } from 'flowbite-react'
import { Sparkles, X } from 'lucide-react'
import Link from 'next/link'

import { useEffect, useState } from 'react'

const BANNER_COLLAPSED_KEY = '2.0-bannerCollapsed'

export default function WelcomeBanner() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleCollapse = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(BANNER_COLLAPSED_KEY, 'true')
      setIsCollapsed(true)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsCollapsed(localStorage.getItem(BANNER_COLLAPSED_KEY) === 'true')
    } else {
      setIsCollapsed(false)
    }
  }, [])

  if (isCollapsed) {
    return null
  }

  return (
    <Banner>
      <div className={`flex w-full justify-between border-b py-1 ${isCollapsed ?? 'hidden'}`}>
        <div className="mx-auto flex items-center">
          <p className="flex items-center text-sm font-normal">
            <Sparkles className="mr-2 h-4 w-4" />
            <span className="[&_p]:inline">
              Welcome to Contract Browser 2.0!&nbsp;
              <Link
                target="_blank"
                href="/blog/introducing-v2"
                className="decoration-600 dark:decoration-500 inline font-medium underline decoration-solid underline-offset-2 hover:no-underline"
              >
                Read more &rarr;
              </Link>
            </span>
          </p>
        </div>
        <Banner.CollapseButton
          color="gray"
          className="border-0 bg-transparent"
          onClick={handleCollapse}
        >
          <X className="h-4 w-4" />
        </Banner.CollapseButton>
      </div>
    </Banner>
  )
}

