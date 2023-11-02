import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState } from 'react'
import { Button } from './button'
import { Check, Copy } from 'lucide-react'

export const CopyButton = ({ text, className } : {text: string, className?: string}) => {
  const [copied, setCopied] = useState(false)
  
  return (
    <CopyToClipboard text={text}>
      <Button variant="ghost" className="text-muted-foreground p-1 h-6" onClick={() => setCopied(true)}>
        {copied ?
          <Check className="h-4 w-4" />
        : <Copy className="h-4 w-4" />
        }
      </Button>
    </CopyToClipboard>
  )
}