'use client'
import { Highlight, type PrismTheme } from 'prism-react-renderer'
import React from 'react'
import { CopyButton } from './CopyButton'

const codeTheme: PrismTheme = {
  plain: {
    color: 'var(--foreground)',
    backgroundColor: 'var(--card)',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: 'var(--muted-foreground)' },
    },
    {
      types: ['punctuation'],
      style: { color: 'var(--foreground)' },
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'attr-name'],
      style: { color: 'var(--primary)' },
    },
    {
      types: ['selector', 'string', 'char', 'builtin'],
      style: { color: 'var(--accent-foreground)' },
    },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: 'var(--secondary-foreground)' },
    },
    {
      types: ['function', 'class-name'],
      style: { color: 'var(--chart-3)' },
    },
    {
      types: ['keyword', 'atrule', 'important'],
      style: { color: 'var(--destructive)' },
    },
  ],
}

type Props = {
  code: string
  language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  if (!code) return null

  return (
    <Highlight code={code} language={language} theme={codeTheme}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre className="overflow-x-auto rounded border border-border bg-card p-4 text-xs text-card-foreground">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ className: 'table-row', line })}>
              <span className="table-cell select-none text-right text-muted-foreground">{i + 1}</span>
              <span className="table-cell pl-4">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
          <CopyButton code={code} />
        </pre>
      )}
    </Highlight>
  )
}
