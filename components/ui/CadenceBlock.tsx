"use client"

import cadenceHighlighter from '@/lib/cadencehighlighter'
import { use, useEffect, useState } from 'react'

export default function CadenceBlock({ code }) {
  const [htmlx, setHtmlx] = useState("")

  useEffect(() => {
    cadenceHighlighter.processCode(code).then((html) => {
      setHtmlx(html)
    })
  }, [code])

  return (
    <pre><code dangerouslySetInnerHTML={{ __html: htmlx}}></code></pre>
  )
}
