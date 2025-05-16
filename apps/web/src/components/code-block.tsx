'use client'

import { buttonVariants } from '@tech-stack/ui/components/button'
import { CheckIcon, CopyIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import {
  atomOneDark,
  atomOneLight,
} from 'react-syntax-highlighter/dist/esm/styles/hljs'

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), {
  ssr: false,
  loading: () => <span className="text-muted-foreground">Initializing...</span>,
})

export function CodeBlock({
  language,
  code,
}: {
  language: string
  code: string
}) {
  const [copied, setCopied] = useState(false)
  const { resolvedTheme } = useTheme()

  const copyToClipboard = async () => {
    if (code) {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full space-y-4 rounded-lg bg-muted p-4">
      <div className="font-mono text-sm">
        <SyntaxHighlighter
          language={language}
          style={resolvedTheme === 'dark' ? atomOneDark : atomOneLight}
          customStyle={{
            margin: 0,
            padding: 0,
            wordBreak: 'break-all',
            background: 'transparent',
            fontSize: '0.875rem',
          }}
          wrapLongLines={true}
        >
          {String(code)}
        </SyntaxHighlighter>
      </div>
      <button
        type="button"
        onClick={copyToClipboard}
        className={buttonVariants({ size: 'sm' })}
      >
        {copied ? (
          <>
            <CheckIcon size={16} />
            <span>Done</span>
          </>
        ) : (
          <>
            <CopyIcon size={16} />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  )
}
