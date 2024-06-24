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
      <div className={`hidden md:flex w-full justify-between border-b py-1 ${isCollapsed ?? 'hidden'}`}>
        <div className="mx-auto flex items-center">
          <p className="flex items-center text-sm font-normal">
          <svg className="h-4 w-4 me-2" viewBox="0 0 113 113" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.319 8.75L26.103 17.5L58.729 17.764C81.918 17.951 91.765 18.368 92.773 19.204C93.955 20.185 94.135 25.806 93.858 53.19C93.676 71.236 93.783 86.001 94.096 86.001C94.409 86 98.572 82.008 103.346 77.129L112.027 68.258V35.329C112.027 11.051 111.712 2.085 110.827 1.2C109.941 0.314001 100.839 0 76.081 0H42.536L34.319 8.75ZM5.229 38.295L0 43.59L0.263 77.545L0.527 111.5L34.548 111.763L68.57 112.026L73.833 106.697L79.096 101.367L78.811 89.934L78.527 78.5L71.782 84.769L65.036 91.038L42.782 90.769L20.527 90.5L20.256 69.656L19.986 48.813L27.68 40.906L35.374 33H22.916H10.459L5.229 38.295ZM50.262 48.264L38.027 60.529V67.264V74H44.291H50.556L63.291 61.236L76.027 48.472V42.236V36H69.262H62.497L50.262 48.264Z" fill="currentColor"/>
          </svg>

            <span className="[&_p]:inline">
              Stage your contracts for Crescendo!&nbsp;
              <Link
                target="_blank"
                href="https://flow.com/upgrade/crescendo"
                className="decoration-600 dark:decoration-500 inline font-medium underline decoration-solid underline-offset-2 hover:no-underline"
              >
                Learn more &rarr;
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

